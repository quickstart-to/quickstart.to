---
title: "Terraform"
description: "Infrastructure as Code - provisionner des ressources cloud sur AWS, Azure, GCP avec gestion d'etat"
template: "tool"
tags: ["devops", "infrastructure", "iac"]
---

## TL;DR

**Quoi** : Un outil d'infrastructure as code pour provisionner des ressources cloud.

**Pourquoi** : Syntaxe déclarative, multi-cloud, gestion d'état, infrastructure reproductible.

## Quick Start

**Installer** :
```bash
brew install terraform  # macOS
# or download from terraform.io
```

**Create `main.tf`** :
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

**Exécuter** :
```bash
terraform init
terraform plan
terraform apply
```

## Cheatsheet

| Commande | Description |
|---------|-------------|
| `terraform init` | Initialiser le répertoire de travail |
| `terraform plan` | Prévisualiser les changements |
| `terraform apply` | Appliquer les changements |
| `terraform destroy` | Détruire l'infrastructure |
| `terraform fmt` | Formater le code |
| `terraform validate` | Valider la configuration |
| `terraform output` | Afficher les outputs |
| `terraform state list` | Lister les ressources dans l'état |

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

- [Terraform Documentation](https://developer.hashicorp.com/terraform/docs) - Documentation officielle
- [Terraform Registry](https://registry.terraform.io/) - Providers et modules
- [Terraform Tutorials](https://developer.hashicorp.com/terraform/tutorials) - Apprendre
- [Terraform Best Practices](https://www.terraform-best-practices.com/) - Bonnes pratiques
