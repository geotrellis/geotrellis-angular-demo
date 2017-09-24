#!/bin/bash

set -ex

ZIP_FILE_NAME="geotrellis-demo"
BUCKET_NAME="${GEOTRELLIS_DEMO_BUCKET}"

rm -rf /tmp/geotrellis-demo

unzip ${ZIP_FILE_NAME}.zip -d /tmp/geotrellis-demo

AWS_PROFILE="${AWS_PROFILE:-geotrellis-demo}" aws s3 sync \
    --acl public-read \
    --metadata-directive REPLACE \
    --cache-control max-age=500 \
    /tmp/geotrellis-demo/dist s3://"${BUCKET_NAME}"

rm -rf /tmp/geotrellis-demo
