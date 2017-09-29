#
# S3 resources
#
module "docs" {
  source           = "github.com/azavea/terraform-aws-s3-origin?ref=0.2.0"
  bucket_name      = "${var.geotrellis_demos_bucket}"
  logs_bucket_name = "${var.geotrellis_demos_logs_bucket}"
  region           = "us-east-1"

  project     = "${var.project}"
  environment = "${var.environment}"
}
