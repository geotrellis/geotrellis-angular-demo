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
    help      Display this help text
"
}

case $1 in
    app) NORMAL_CONTAINER=1 ;;
    help|*)           usage; exit 1 ;;
esac

if [ -n "$NORMAL_CONTAINER" ]; then
    docker-compose exec "${1}" /bin/bash
fi
