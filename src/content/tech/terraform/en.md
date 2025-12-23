---
title: "Terraform"
description: "Get started with Terraform infrastructure as code in 5 minutes"
template: "tool"
tags: ["devops", "infrastructure", "iac"]
---

## TL;DR

**What**: An infrastructure as code tool for provisioning cloud resources.

**Why**: Declarative syntax, multi-cloud, state management, reproducible infrastructure.

## Quick Start

**Install**:
```bash
brew install terraform  # macOS
# or download from terraform.io
```

**Create `main.tf`**:
```hcl
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

resource "aws_instance" "example" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"

  tags = {
    Name = "example-instance"
  }
}
```

**Run**:
```bash
terraform init
terraform plan
terraform apply
```

## Cheatsheet

| Command | Description |
|---------|-------------|
| `terraform init` | Initialize working directory |
| `terraform plan` | Preview changes |
| `terraform apply` | Apply changes |
| `terraform destroy` | Destroy infrastructure |
| `terraform fmt` | Format code |
| `terraform validate` | Validate configuration |
| `terraform output` | Show outputs |
| `terraform state list` | List resources in state |

## Gotchas

### Variables

```hcl
# variables.tf
variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t2.micro"
}

# main.tf
resource "aws_instance" "example" {
  instance_type = var.instance_type
}

# terraform.tfvars
instance_type = "t3.small"
```

### Outputs

```hcl
output "instance_ip" {
  value       = aws_instance.example.public_ip
  description = "Public IP of the instance"
}
```

### Data sources

```hcl
data "aws_ami" "ubuntu" {
  most_recent = true
  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"]
  }
  owners = ["099720109477"]
}

resource "aws_instance" "example" {
  ami = data.aws_ami.ubuntu.id
}
```

### Modules

```hcl
module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "5.0.0"

  name = "my-vpc"
  cidr = "10.0.0.0/16"
}
```

## Next Steps

- [Terraform Documentation](https://developer.hashicorp.com/terraform/docs) - Official docs
- [Terraform Registry](https://registry.terraform.io/) - Providers and modules
- [Terraform Tutorials](https://developer.hashicorp.com/terraform/tutorials) - Learn
- [Terraform Best Practices](https://www.terraform-best-practices.com/) - Guidelines
