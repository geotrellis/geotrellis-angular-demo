#
# S3 resources
#
resource "template_file" "read_only_bucket_policy" {
  template = "${file("policies/s3-read-only-anonymous-user.json")}"

  vars {
    bucket = "${var.geotrellis_demo_bucket}"
  }
}

resource "aws_s3_bucket" "geotrellis_demo" {
  bucket = "${var.geotrellis_demo_bucket}"
  acl    = "private"
  policy = "${template_file.read_only_bucket_policy.rendered}"
}

resource "aws_s3_bucket" "geotrellis_demo_logs" {
  bucket = "${var.geotrellis_demo_logs_bucket}"
  acl    = "private"
}
