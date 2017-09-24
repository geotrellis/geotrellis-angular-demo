#!/bin/bash

set -e

if [[ -n "${GEOTRELLIS_DEMO_DEBUG}" ]]; then
    set -x
fi

function usage() {
    echo -n "$(basename "${0}") [OPTION]
Login to a running Docker container\'s shell.
Options:
    app       App container
    --help    Display this help text
"
}

if [ "${1:-}" = "--help" ]
    then
        usage
    else
        docker-compose exec app /bin/bash
fi

if [ -n "$NORMAL_CONTAINER" ]; then
    docker-compose exec "${1}" /bin/bash
fi
