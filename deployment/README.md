# Amazon Web Services Deployment

Amazon Web Services deployment is driven by [Terraform](https://terraform.io/) and the [AWS Command Line Interface (CLI)](http://aws.amazon.com/cli/).

## Table of Contents

* [AWS Credentials](#aws-credentials)
* [Terraform](#terraform)
* [Environments](#environments)

## AWS Credentials

Using the AWS CLI, create an AWS profile named `geotrellis-demos`:

```bash
$ vagrant ssh
vagrant@vagrant-ubuntu-trusty-64:/vagrant$ aws --profile geotrellis-demos configure
AWS Access Key ID [****************F2DQ]:
AWS Secret Access Key [****************TLJ/]:
Default region name [us-east-1]: us-east-1
Default output format [None]:
```

You will be prompted to enter your AWS credentials, along with a default region. These credentials will be used to authenticate calls to the AWS API when using Terraform and the AWS CLI.

## Terraform

Next, use the Terraform wrapper script (`infra.sh`) to lookup the remote state of the infrastructure and assemble a plan for work to be done:

```bash
vagrant@vagrant-ubuntu-trusty-64:/vagrant$ export GEOTRELLIS_DEMOS_SETTINGS_BUCKET="geotrellis-demos.public-beta.config.us-east-1"
vagrant@vagrant-ubuntu-trusty-64:/vagrant$ export AWS_PROFILE="geotrellis-demos"
vagrant@vagrant-ubuntu-trusty-64:/vagrant$ ./scripts/infra.sh plan
```

Once the plan has been assembled, and you agree with the changes, apply it:

```bash
vagrant@vagrant-ubuntu-trusty-64:/vagrant$ ./scripts/infra.sh apply
```

This will attempt to apply the plan assembled in the previous step using a series API calls. In order to change specific attributes of the infrastructure, inspect the contents of the environment's configuration file in `variables.tf`.

## Environments

The Azavea Staging, PWD staging, OIT Beta and OIT Production environments make use of the same Terraform infrastructure plan.

To assemble a plan and apply it, follow the steps outlined above. However, depending on the environment, a different `GEOTRELLIS_DEMOS_SETTINGS_BUCKET` value is specified.

| Environment    | Settings bucket |
| -------------  | ------------- |
| Azavea Staging | geotrellis-demos.public-beta.config.us-east-1 |