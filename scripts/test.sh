#!/bin/bash

set -e

if [[ -n "${GEOTRELLIS_DEMO_DEBUG}" ]]; then
    set -x
fi

GIT_COMMIT="${GIT_COMMIT:-latest}"

function usage() {
    echo -n \
"Usage: $(basename "${0}") [OPTIONS]
Run linters and tests.
Options:
    --app       Lint Typescript, build static assets and run karma test
    --git       Run Git test
    --e2e       Run E2E test
    --karma     Run Karma test
    -h/--help   Display this help text
"
}

function app_tests() {
    # Lint Bash scripts
    if which shellcheck > /dev/null; then
        shellcheck scripts/*.sh
    fi

    # Lint TypeScript
    ./scripts/lint.sh

    # Run Unit Test
    echo "Run Karma test" | \
    docker-compose \
        -f docker-compose.test.yml \
        run --rm --no-deps app \
        yarn test
}

function git_tests() {
    # Fail build if any commit title contains these words
    if git log --oneline | grep -wiE "fixup|squash|wip"; then
        echo "ERROR: Please squash all changes before merging."
        exit 1
    fi
}

function karma() {
    echo "Run Karma test" | \
    docker-compose \
        -f docker-compose.test.yml \
        run --rm --no-deps app \
        yarn test
}

function e2e() {
    echo "Run E2E test" | \
    docker-compose \
        -f docker-compose.test.yml \
        run --rm --no-deps app \
        yarn e2e
}

if [ "${BASH_SOURCE[0]}" = "${0}" ]; then
    case "${1:-}" in
        -h|--help) usage ;;
        --git)     git_tests ;;
        --karma)   karma ;;
        --e2e)     e2e ;;
        --app|*)   app_tests ;;
    esac
fi
