#!/bin/bash

set -e

echo "Running testem:"

docker-compose -f docker-compose.test.yml exec app node_modules/.bin/testem -f testem.json "$*"
