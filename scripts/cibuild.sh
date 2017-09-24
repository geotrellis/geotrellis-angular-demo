#!/bin/bash

set -e

if [[ -n "${GEOTRELLIS_DEMO_DEBUG}" ]]; then
    set -x
else
    SILENT_FLAG=--silent
fi

function usage() {
    echo -n \
         "Usage: $(basename "$0")
Build application for staging or a release.
"
}

if [[ -n "${GIT_COMMIT}" ]]; then
    GIT_COMMIT="${GIT_COMMIT:0:7}"
else
    GIT_COMMIT="$(git rev-parse --short HEAD)"
fi

if [ "${BASH_SOURCE[0]}" = "${0}" ]; then
    if [ "${1:-}" = "--help" ]; then
        usage
    else
        # Cleanup dangling container images
        ./scripts/clean.sh

        # Install Node.js project dependencies
        docker-compose run --rm --no-deps app \
                       yarn install $SILENT_FLAG

        # Execute the test suite
        ./scripts/test.sh

        # Build static asset bundle
        docker-compose run --rm --no-deps \
                       -e NODE_ENV="${NODE_ENV:-production}" \
                       -e INSTALL_ENV="${INSTALL_ENV:-azavea}" \
                       -e VERSION="${GIT_COMMIT}" app \
                       yarn run bundle
    fi
fi
