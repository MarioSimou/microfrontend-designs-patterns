locals {
  org    = "speakyourownideas"
  env    = var.env
  vpc_id = aws_vpc.vpc.id
  vpc_subnets_ids = [
    aws_subnet.vpc_public_subnet.id,
    aws_subnet.vpc_public_subnet_second.id
  ]
  vpc_rt_id           = aws_route_table.vpc_rt.id
  vpc_igw_id          = aws_internet_gateway.vpc_igw.id
  vpc_acl_id          = aws_vpc.vpc.default_network_acl_id
  services_bucket_arn = aws_s3_bucket.services_bucket.arn
  cluster_id          = aws_ecs_cluster.cluster.id
  acl_rules = [
    # ingress
    {
      from_port   = 443
      to_port     = 443
      rule_number = 10
      egress      = false
      protocol    = "tcp"
      rule_action = "allow"
    },
    {
        rule_number = 90
        egress = false
        protocol = "-1"
        rule_action = "deny"
    },
    {
      from_port = 1024
      to_port = 65534
      rule_number = 20
      egress = false
      protocol= "tcp"
      rule_action = "allow"
    },
    # egress
  ]
  services = [
    {
      name              = "shell"
      container_port    = 3000
      health_check_path = "/ping"
      security_group_rules = [
        {
          type        = "ingress",
          from_port   = 3000,
          to_port     = 3000
          protocol    = "tcp"
          cidr_blocks = ["0.0.0.0/0"]
        },
        {
          type : "egress",
          from_port   = -1
          to_port     = -1
          protocol    = "all"
          cidr_blocks = ["0.0.0.0/0"]
        }
      ]
      environment_files = [
        {
          value = "${local.services_bucket_arn}/shell/production.env"
          type  = "s3"
        }
      ]
      alb_listener_paths = []
      alb_listener_hostname = "speakyourownideas.com"
    },
    {
      name              = "posts"
      container_port    = 3001
      health_check_path = "/api/v1/ping"
      alb_listener_hostname = "posts.speakyourownideas.com"
      alb_listener_paths = ["/posts", "/posts/*"]
      security_group_rules = [
        {
          type        = "ingress",
          from_port   = 3001,
          to_port     = 3001
          protocol    = "tcp"
          cidr_blocks = ["0.0.0.0/0"]
        },
        {
          type : "egress",
          from_port   = -1
          to_port     = -1
          protocol    = "all"
          cidr_blocks = ["0.0.0.0/0"]
        }
      ]
      environment_files = [
        {
          value = "${local.services_bucket_arn}/posts/production.env",
          type  = "s3"
        }
      ]
    },
    {
      name              = "auth"
      container_port    = 3002
      health_check_path = "/api/v1/ping"
      domain            = "auth.speakyourownideas.com"
      alb_listener_hostname = "auth.speakyourownideas.com"
      alb_listener_paths = ["/sign-in", "/sign-up"]
      security_group_rules = [
        {
          type        = "ingress",
          from_port   = 3002,
          to_port     = 3002
          protocol    = "tcp"
          cidr_blocks = ["0.0.0.0/0"]
        },
        {
          type : "egress",
          from_port   = -1
          to_port     = -1
          protocol    = "all"
          cidr_blocks = ["0.0.0.0/0"]
        }
      ]
      environment_files = [
        {
          value = "${local.services_bucket_arn}/auth/production.env"
          type  = "s3"
        }
      ]
    }
  ]
  services_ecr_repositories_urls = [for repository in aws_ecr_repository.services_repositories : repository.repository_url]
  services_task_definitions_id   = [for taskDefinition in aws_ecs_task_definition.services_task_definition : taskDefinition.arn]
  services_target_groups_id      = [for tg in aws_alb_target_group.alb_tgs : tg.id]
  services_security_groups_ids   = [for sg in aws_security_group.services_sgs : sg.id]
  services_security_groups_rules = flatten(
    [
      for i, service in local.services : [
        for rule in service.security_group_rules : merge(rule, { security_group_id = element(local.services_security_groups_ids, i) })
      ]
    ]
  )
  services_alb_listener_path_rules = [
    for service in local.services : merge(service, {
      target_group_id = lookup(local.services_map, service.name).target_group_id
    }) if length(service.alb_listener_paths) > 0 
  ]
  services_map = zipmap(
    [for service in local.services : service.name],
    [
      for i, service in local.services : merge(
        service,
        {
          task_definition_id = element(local.services_task_definitions_id, i),
          target_group_id    = element(local.services_target_groups_id, i),
          security_group_id  = element(local.services_security_groups_ids, i),
          repository_url     = element(local.services_ecr_repositories_urls, i)
        }
      )
    ]
  )
}

# Data Buckets
resource "aws_s3_bucket" "services_bucket" {
  bucket        = "${local.org}-services-bucket"
  force_destroy = false

  tags = {
    Name        = "${local.org}-services-bucket"
    Environment = local.env
  }
}

# VPC Service
resource "aws_vpc" "vpc" {
  cidr_block           = "172.31.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Env  = var.env
    Name = "${local.org}-${local.env}-vpc"
  }
}

resource "aws_subnet" "vpc_public_subnet" {
  vpc_id            = local.vpc_id
  cidr_block        = "172.31.1.0/24"
  availability_zone = "${var.aws_region}a"

  tags = {
    Env  = var.env
    Name = "${local.org}-${local.env}-vpc-public-subnet"
  }
}

resource "aws_subnet" "vpc_public_subnet_second" {
  vpc_id            = local.vpc_id
  cidr_block        = "172.31.2.0/24"
  availability_zone = "${var.aws_region}b"

  tags = {
    Env  = var.env
    Name = "${local.org}-${local.env}-vpc-public-subnet-second"
  }
}

resource "aws_internet_gateway" "vpc_igw" {
  vpc_id = local.vpc_id
  tags = {
    Env  = var.env
    Name = "${local.org}-${local.env}-vpc-igw"
  }
}

resource "aws_route_table" "vpc_rt" {
  vpc_id = local.vpc_id
  tags = {
    Name = "${local.org}-${local.env}-vpc-rt"
    Env  = var.env
  }
}

resource "aws_main_route_table_association" "vpc_rt_association" {
  vpc_id         = local.vpc_id
  route_table_id = local.vpc_rt_id
}


resource "aws_route_table_association" "rt_subnets_association" {
  count = length(local.vpc_subnets_ids)

  subnet_id      = element(local.vpc_subnets_ids, count.index)
  route_table_id = local.vpc_rt_id
}


resource "aws_network_acl_rule" "vpc_acl_rules" {
  count = length(local.acl_rules)

  network_acl_id = local.vpc_acl_id
  cidr_block     = aws_vpc.vpc.cidr_block
  from_port      = lookup(element(local.acl_rules, count.index), "from_port", -1)
  to_port        = lookup(element(local.acl_rules, count.index), "to_port", -1)
  rule_number    = element(local.acl_rules, count.index).rule_number
  egress         = element(local.acl_rules, count.index).egress
  protocol       = element(local.acl_rules, count.index).protocol
  rule_action    = element(local.acl_rules, count.index).rule_action
}

resource "aws_route" "vpc_rt_rules" {
  route_table_id         = local.vpc_rt_id
  gateway_id             = local.vpc_igw_id
  destination_cidr_block = "0.0.0.0/0"
}

resource "aws_security_group" "services_sgs" {
  count = length(local.services)

  name   = "${local.org}-${local.env}-${element(local.services, count.index).name}-sg"
  vpc_id = local.vpc_id

  tags = {
    Env  = local.env
    Name = "${local.org}-${local.env}-${element(local.services, count.index).name}-sg"
  }
}

resource "aws_security_group_rule" "services_sgs_rules" {
  count = length(local.services_security_groups_rules)

  type              = element(local.services_security_groups_rules, count.index).type
  from_port         = element(local.services_security_groups_rules, count.index).from_port
  to_port           = element(local.services_security_groups_rules, count.index).to_port
  protocol          = element(local.services_security_groups_rules, count.index).protocol
  cidr_blocks       = element(local.services_security_groups_rules, count.index).cidr_blocks
  security_group_id = element(local.services_security_groups_rules, count.index).security_group_id
}

resource "aws_security_group" "alb_sg" {
  name   = "${local.org}-${local.env}-alb-sg"
  vpc_id = local.vpc_id

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    from_port   = -1
    to_port     = -1
    protocol    = "all"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${local.org}-${local.env}-alb-sg"
    Env  = local.env
  }
}

# ALB Service
resource "aws_alb" "alb" {
  name                       = "${local.org}-${local.env}-alb"
  internal                   = false
  load_balancer_type         = "application"
  subnets                    = local.vpc_subnets_ids
  enable_deletion_protection = false
  security_groups = [
    aws_security_group.alb_sg.id
  ]

  tags = {
    Name = "${local.org}-${local.env}-alb"
    Env  = local.env
  }
}

resource "aws_alb_listener" "alb_listener" {
  load_balancer_arn = aws_alb.alb.arn
  port              = "443"
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-2016-08"
  certificate_arn   = var.domain_certificate_arn

  default_action {
    type             = "forward"
    target_group_arn = lookup(local.services_map, "shell").target_group_id
  }

  tags = {
    Name = "${local.org}-${local.env}-alb-listener"
    Env  = local.env
  }
}

resource "aws_alb_listener_rule" "alb_listener_rules_hostname" {
  for_each     = local.services_map
  listener_arn = aws_alb_listener.alb_listener.arn

  action {
    type             = "forward"
    target_group_arn = each.value.target_group_id
  }

  condition {
    host_header {
      values = [each.value.alb_listener_hostname]
    }
  }

  tags = {
    Name = "${local.org}-${local.env}-${each.key}-hostname-listener-rule"
    Env  = local.env
  }
}

resource "aws_alb_listener_rule" "alb_listener_rules_path" {
  count     = length(local.services_alb_listener_path_rules)
  listener_arn = aws_alb_listener.alb_listener.arn

  action {
    type             = "forward"
    target_group_arn = element(local.services_alb_listener_path_rules, count.index).target_group_id
  }

  condition {
    path_pattern {
      values = element(local.services_alb_listener_path_rules, count.index).alb_listener_paths
    }
  }

  tags = {
    Name = "${local.org}-${local.env}-${element(local.services_alb_listener_path_rules, count.index).name}-path-listener-rule"
    Env  = local.env
  }
}

resource "aws_alb_target_group" "alb_tgs" {
  count = length(local.services)

  name        = "${local.org}-${local.env}-${element(local.services, count.index).name}-tg"
  vpc_id      = local.vpc_id
  protocol    = "HTTP"
  port        = "80"
  target_type = "ip"

  health_check {
    enabled             = true
    interval            = 30
    port                = element(local.services, count.index).container_port
    path                = element(local.services, count.index).health_check_path
    unhealthy_threshold = 3
  }

  tags = {
    Name = "${local.org}-${local.env}-${element(local.services, count.index).name}-tg"
    Env  = local.env
  }
}

# ECS Environment & ECR Services
resource "aws_ecr_repository" "services_repositories" {
  count = length(local.services)

  name                 = "${local.org}-${local.env}-${element(local.services, count.index).name}"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = false
  }

  tags = {
    Name = "${local.org}-${local.env}-${element(local.services, count.index).name}"
    Env  = local.env
  }
}

resource "aws_ecs_cluster" "cluster" {
  name = "${local.org}-${local.env}-cluster"

  setting {
    name  = "containerInsights"
    value = "enabled"
  }
}

resource "aws_ecs_cluster_capacity_providers" "cluster_capacity_providers" {
  cluster_name       = aws_ecs_cluster.cluster.name
  capacity_providers = ["FARGATE"]
  default_capacity_provider_strategy {
    capacity_provider = "FARGATE"
    base              = 0
  }

}

resource "aws_iam_role" "services_role" {
  name = "ecs-services-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow",
        Principal = {
          Service = [
            "ec2.amazonaws.com",
            "ecs-tasks.amazonaws.com",
            "s3.amazonaws.com",
          ]
        }
      }
    ]
  })

  inline_policy {
    name = "ecs-service-policy"

    policy = jsonencode({
      Version = "2012-10-17"
      Statement = [
        {
          Action   = ["ecr:*", "ecs:*", "ec2:*", "s3:*", "logs:*", "cloudwatch:*"]
          Effect   = "Allow"
          Resource = "*"

        }
      ]
    })
  }

  tags = {
    Name = "${local.org}-${local.env}-services-role"
    Env  = local.env
  }
}

resource "aws_ecs_task_definition" "services_task_definition" {
  count = length(local.services)

  family                   = element(local.services, count.index).name
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = lookup(element(local.services, count.index), "cpu", 512)
  memory                   = lookup(element(local.services, count.index), "memory", 1024)
  execution_role_arn       = aws_iam_role.services_role.arn
  container_definitions = jsonencode([
    {
      name             = element(local.services, count.index).name
      image            = element(local.services_ecr_repositories_urls, count.index)
      environmentFiles = element(local.services, count.index).environment_files
      portMappings = [
        {
          containerPort = element(local.services, count.index).container_port
          hostPort      = element(local.services, count.index).container_port
        }
      ],
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          awslogs-group         = local.org
          awslogs-region        = var.aws_region
          awslogs-create-group  = "true"
          awslogs-stream-prefix = "services"
        }
      }
    }
  ])

  tags = {
    Name = "${local.org}-${local.env}-${element(local.services, count.index).name}"
    Env  = local.env
  }
}

resource "aws_ecs_service" "services" {
  for_each = local.services_map

  name    = each.key
  cluster = local.cluster_id

  task_definition       = each.value.task_definition_id
  force_new_deployment  = true
  desired_count         = 1 // change to 1 when the infrastructure is created
  launch_type           = "FARGATE"
  wait_for_steady_state = false

  network_configuration {
    subnets = local.vpc_subnets_ids
    security_groups = [
      each.value.security_group_id
    ]
    assign_public_ip = true
  }

  deployment_circuit_breaker {
    enable   = false
    rollback = false
  }

  deployment_controller {
    type = "ECS"
  }

  load_balancer {
    container_name   = each.key
    target_group_arn = each.value.target_group_id
    container_port   = each.value.container_port
  }

  depends_on = [
    aws_alb_listener.alb_listener,
    aws_alb_listener_rule.alb_listener_rules_hostname,
    aws_alb_listener_rule.alb_listener_rules_path
  ]
}