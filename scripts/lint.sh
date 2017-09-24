#!/bin/bash

set -e

# Run ESLint on the project's JavaScript code

echo "Running ESLint:"

docker-compose run --rm -T app node_modules/.bin/eslint js/ --ext .js --ext .jsx
