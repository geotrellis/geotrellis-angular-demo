resource "aws_cloudfront_distribution" "geotrellis_demos" {
  origin {
    domain_name = "${aws_s3_bucket.geotrellis_demos.id}.s3.amazonaws.com"
    origin_id   = "geotrellisDemosOriginEastId"
  }

  enabled             = true
  comment             = "Geotrellis Demos (${var.environment})"
  default_root_object = "index.html"
  retain_on_delete    = true

  price_class = "PriceClass_All"

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD", "OPTIONS"]
    target_origin_id = "geotrellisDemosOriginEastId"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    compress               = true
    viewer_protocol_policy = "allow-all"

    # Only applies if the origin adds Cache-Control headers. The
    # CloudFront default is also 0.
    min_ttl = 0

    # Five minutes, and only applies when the origin DOES NOT
    # supply Cache-Control headers.
    default_ttl = 300

    # One day, but only applies if the origin adds Cache-Control
    # headers. The CloudFront default is 31536000 (one year).
    max_ttl = 86400
  }

  custom_error_response {
    error_caching_min_ttl = "0"
    error_code            = "403"
    response_code         = "200"
    response_page_path    = "/index.html"
  }

  custom_error_response {
    error_caching_min_ttl = "0"
    error_code            = "404"
    response_code         = "200"
    response_page_path    = "/index.html"
  }

  logging_config {
    include_cookies = false
    bucket          = "${aws_s3_bucket.geotrellis_demos_logs.id}.s3.amazonaws.com"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}
