#!/bin/bash

set -e

echo "Bundling tests:"

# Using exec instead of run because it starts a lot faster.
docker-compose -f docker-compose.test.yml exec app yarn run test-bundle
