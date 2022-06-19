variable "aws_region" {
  type    = string
  default = "eu-west-1"
}

variable "env" {
  type    = string
  default = "prod"
  validation {
    condition     = contains(["prod", "stage"], var.env)
    error_message = "Environment should either be 'prod' or 'stage'."
  }
}

variable "domain_certificate_arn" {
  type = string
}