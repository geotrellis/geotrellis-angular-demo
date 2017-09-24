#!/bin/bash

set -e

if [[ -n "${GEOTRELLIS_DEMO_DEBUG}" ]]; then
    set -x
fi

GIT_COMMIT="${GIT_COMMIT:-latest}"

function usage() {
    echo -n \
"Usage: $(basename "${0}")

Run linters and tests.
"
}

function app_tests() {
    # Lint Bash scripts
    if which shellcheck > /dev/null; then
        shellcheck scripts/*.sh
    fi

    # Lint JavaScript
    ./scripts/lint.sh

    # Build the test bundle
    docker-compose \
        -f docker-compose.test.yml \
        run --rm --no-deps app \
        yarn run test-bundle

    # Run tests
    echo "xvfb-run node_modules/.bin/testem -f testem.json ci" | \
    docker-compose -f docker-compose.test.yml run --rm app /bin/bash
}

function git_tests() {
    # Fail build if any commit title contains these words
    if git log --oneline | grep -wiE "fixup|squash|wip"; then
        echo "ERROR: Please squash all changes before merging."
        exit 1
    fi
}

function testem() {
    GIT_COMMIT="${GIT_COMMIT}" docker-compose \
              exec app ./node_modules/.bin/testem -f testem.json
}

if [ "${BASH_SOURCE[0]}" = "${0}" ]; then
    case "${1:-}" in
        -h|--help) usage ;;
        --git)     git_tests ;;
        --testem)  testem ;;
        *)         app_tests ;;
    esac
fi
