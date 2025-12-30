---
title: "Terraform"
description: "基础设施即代码 - 声明式配置 AWS、Azure、GCP 云资源，带状态管理"
template: "tool"
tags: ["devops", "infrastructure", "iac"]
---

## TL;DR

**是什么**：用于配置云资源的基础设施即代码工具。

**为什么用**：声明式语法、多云支持、状态管理、可复现的基础设施。

## Quick Start

**安装**：
```bash
brew install terraform  # macOS
# 或从 terraform.io 下载
```

**创建 `main.tf`**：
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

**运行**：
```bash
terraform init
terraform plan
terraform apply
```

## Cheatsheet

| 命令 | 描述 |
|---------|-------------|
| `terraform init` | 初始化工作目录 |
| `terraform plan` | 预览更改 |
| `terraform apply` | 应用更改 |
| `terraform destroy` | 销毁基础设施 |
| `terraform fmt` | 格式化代码 |
| `terraform validate` | 验证配置 |
| `terraform output` | 显示输出 |
| `terraform state list` | 列出状态中的资源 |

## Gotchas

### 变量

```hcl
# variables.tf
variable "instance_type" {
  description = "EC2 实例类型"
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

### 输出

```hcl
output "instance_ip" {
  value       = aws_instance.example.public_ip
  description = "实例的公网 IP"
}
```

### 数据源

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

### 模块

```hcl
module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "5.0.0"

  name = "my-vpc"
  cidr = "10.0.0.0/16"
}
```

## Next Steps

- [Terraform 文档](https://developer.hashicorp.com/terraform/docs) - 官方文档
- [Terraform Registry](https://registry.terraform.io/) - Provider 和模块
- [Terraform 教程](https://developer.hashicorp.com/terraform/tutorials) - 学习
- [Terraform 最佳实践](https://www.terraform-best-practices.com/) - 指南
