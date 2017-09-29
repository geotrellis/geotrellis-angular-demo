#!/bin/bash

set -e

# Run TSLint on the project's TypeScript code

echo "Running TSLint:"
    
docker-compose run --rm --no-deps app yarn lint
