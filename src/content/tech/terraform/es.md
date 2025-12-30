---
title: "Terraform"
description: "Infraestructura como Codigo - aprovisionar recursos cloud en AWS, Azure, GCP con gestion de estado"
template: "tool"
tags: ["devops", "infrastructure", "iac"]
---

## TL;DR

**Qué**: Una herramienta de infrastructure as code para aprovisionar recursos en la nube.

**Por qué**: Sintaxis declarativa, multi-cloud, gestión de estado, infraestructura reproducible.

## Quick Start

**Instalar**:
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

**Ejecutar**:
```bash
terraform init
terraform plan
terraform apply
```

## Cheatsheet

| Comando | Descripción |
|---------|-------------|
| `terraform init` | Inicializar directorio de trabajo |
| `terraform plan` | Previsualizar cambios |
| `terraform apply` | Aplicar cambios |
| `terraform destroy` | Destruir infraestructura |
| `terraform fmt` | Formatear código |
| `terraform validate` | Validar configuración |
| `terraform output` | Mostrar outputs |
| `terraform state list` | Listar recursos en el estado |

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

- [Terraform Documentation](https://developer.hashicorp.com/terraform/docs) - Documentación oficial
- [Terraform Registry](https://registry.terraform.io/) - Providers y módulos
- [Terraform Tutorials](https://developer.hashicorp.com/terraform/tutorials) - Aprender
- [Terraform Best Practices](https://www.terraform-best-practices.com/) - Buenas prácticas
