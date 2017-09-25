#!/bin/bash

set -ex

ZIP_FILE_NAME="geotrellis-demos"
BUCKET_NAME="${GEOTRELLIS_DEMOS_BUCKET}"

rm -rf /tmp/geotrellis-demos

unzip ${ZIP_FILE_NAME}.zip -d /tmp/geotrellis-demos

AWS_PROFILE="${AWS_PROFILE:-geotrellis-demos}" aws s3 sync \
    --acl public-read \
    --metadata-directive REPLACE \
    --cache-control max-age=500 \
    /tmp/geotrellis-demos/src/gd-frontend/dist s3://"${BUCKET_NAME}"

rm -rf /tmp/geotrellis-demos
