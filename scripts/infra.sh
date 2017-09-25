#!/bin/bash

set -e

if [[ -n "${GEOTRELLIS_DEMOS_DEBUG}" ]]; then
    set -x
fi

DIR="$(dirname "$0")"
TERRAFORM_DIR="${DIR}/../deployment/terraform"

function usage() {
    echo -n \
"Usage: $(basename "$0") COMMAND OPTION[S]
Execute Terraform subcommands with remote state management.
"
}

if [ "${BASH_SOURCE[0]}" = "${0}" ]; then
    if [ "${1:-}" = "--help" ]; then
        usage
    else
        if [[ -n "${GEOTRELLIS_DEMOS_SETTINGS_BUCKET}" ]]; then
            TF_FILE_BASE_NAME=$(echo "${GEOTRELLIS_DEMOS_SETTINGS_BUCKET}" | tr . -)

            pushd "${TERRAFORM_DIR}"

            # Stop Terraform from trying to apply incorrect state across environments
            if [ -f ".terraform/terraform.tfstate" ] && ! grep -q "${GEOTRELLIS_DEMOS_SETTINGS_BUCKET}" ".terraform/terraform.tfstate"; then
                echo "ERROR: Incorrect target environment detected in Terraform state! Please run"
                echo "       the following command before proceeding:"
                echo
                echo "  rm -rf deployment/terraform/.terraform"
                echo
                exit 1
            fi

            aws s3 cp "s3://${GEOTRELLIS_DEMOS_SETTINGS_BUCKET}/terraform/terraform.tfvars" "${TF_FILE_BASE_NAME}.tfvars"

            terraform remote config \
                      -backend="s3" \
                      -backend-config="region=us-east-1" \
                      -backend-config="bucket=${GEOTRELLIS_DEMOS_SETTINGS_BUCKET}" \
                      -backend-config="key=terraform/state" \
                      -backend-config="encrypt=true"

            case "${1}" in
                fmt)
                    terraform "$@"
                    ;;
                taint)
                    terraform "$@"
                    ;;
                plan)
                    terraform plan \
                              -var-file="${TF_FILE_BASE_NAME}.tfvars" \
                              -out="${TF_FILE_BASE_NAME}.tfplan"
                    ;;
                apply)
                    terraform apply "${TF_FILE_BASE_NAME}.tfplan"
                    terraform remote push
                    ;;
                *)
                    echo "ERROR: I don't have support for that Terraform subcommand!"
                    exit 1
                    ;;
            esac

            popd
        else
            echo "ERROR: No GEOTRELLIS_DEMOS_SETTINGS_BUCKET variable defined."
            exit 1
        fi
    fi
fi
