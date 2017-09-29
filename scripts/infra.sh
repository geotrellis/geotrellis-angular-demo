#!/bin/bash

set -e

if [[ -n "${GEOTRELLIS_DEMO_DEBUG}" ]]; then
    set -x
fi

function usage() {
    echo -n \
         "Usage: $(basename "$0") COMMAND [OPTIONS]

Execute Terraform subcommands with remote state management.

Required:

  AWS_PROFILE: Configuration profile name used to create AWS resources
  GEOTRELLIS_DEMO_SITE_BUCKET: Bucket to house the application; CDN origin
  GEOTRELLIS_DEMO_SETTINGS_BUCKET: Bucket to house infrastructure state and variables

"
}

DIR=$(dirname ${0})
if [ "${BASH_SOURCE[0]}" = "${0}" ]
then
    if [ "${1:-}" = "--help" ]
    then
        usage
    else
        if [[ -n "${GEOTRELLIS_DEMO_SETTINGS_BUCKET}" ]] && [[ -n "${GEOTRELLIS_DEMO_SITE_BUCKET}" ]]; then

            pushd "$(dirname "$0")/../deployment/terraform"

            aws s3 cp "s3://${GEOTRELLIS_DEMO_SETTINGS_BUCKET}/terraform/terraform.tfvars" "${GEOTRELLIS_DEMO_SETTINGS_BUCKET}.tfvars"

            case "${1}" in
                plan)
                    rm -rf .terraform terraform.tfstate*
                    terraform init -backend-config="bucket=${GEOTRELLIS_DEMO_SETTINGS_BUCKET}" \
                                   -backend-config="key=terraform/state"

                    terraform plan \
                              -var-file="${GEOTRELLIS_DEMO_SETTINGS_BUCKET}.tfvars" \
                              -out="${GEOTRELLIS_DEMO_SETTINGS_BUCKET}.tfplan"

                    aws s3 sync --dryrun --delete ../../dist/_site "s3://${GEOTRELLIS_DEMO_SITE_BUCKET}"
                    ;;
                apply)
                    terraform apply "${GEOTRELLIS_DEMO_SETTINGS_BUCKET}.tfplan"
                    aws s3 sync --delete ../../dist/_site "s3://${GEOTRELLIS_DEMO_SITE_BUCKET}"
                    ;;
                *)
                    echo "ERROR: I don't have support for that Terraform subcommand!"
                    exit 1
                    ;;
            esac

            popd
        else
            echo "ERROR: No GEOTRELLIS_DEMO_SETTINGS_BUCKET or GEOTRELLIS_DEMO_SITE_BUCKET variable defined."
            exit 1
        fi
    fi
fi
