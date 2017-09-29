#!/bin/bash

set -e

if [[ -n "${GEOTRELLIS_DEMOS_DEBUG}" ]]; then
    set -x
fi

function usage() {
    echo -n \
         "Usage: $(basename "$0")
Builds and pulls container images using docker-compose.
"
}

if [ "${BASH_SOURCE[0]}" = "${0}" ]
then
    if [ "${1:-}" = "--help" ]
    then
        usage
    else
        # Install yarn modules
        docker-compose \
            -f docker-compose.yml \
            run --rm --no-deps app \
            yarn install -s

        # Build bundles
        docker-compose \
            -f docker-compose.yml \
            run --rm --no-deps app \
            yarn build
    fi
fi
