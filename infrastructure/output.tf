output "alb_dns" {
  value = aws_alb.alb.dns_name
}

output "vpc_id" {
  value = local.vpc_id
}

output "vpc_rt_id" {
  value = local.vpc_rt_id
}

output "vpc_igw_id" {
  value = local.vpc_igw_id
}

output "vpc_acl_id" {
  value = local.vpc_acl_id
}

output "ecs_services" {
  value = local.services_map
}

output "services_bucket_id" {
  value = aws_s3_bucket.services_bucket.arn
}