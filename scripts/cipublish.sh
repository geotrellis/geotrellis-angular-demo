#!/bin/bash

set -e

if [[ -n "${GEOTRELLIS_DEMO_DEBUG}" ]]; then
    set -x
fi

function usage() {
    echo -n \
"Usage: $(basename "$0")
Build static bundle compressed archive.
"
}

if [ "${BASH_SOURCE[0]}" = "${0}" ]; then
    if [ "${1:-}" = "--help" ]; then
        usage
    else
        zip -r geotrellis-demo.zip dist/*
    fi
fi