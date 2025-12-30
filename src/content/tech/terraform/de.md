---
title: "Terraform"
description: "Infrastructure as Code - Cloud-Ressourcen deklarativ auf AWS, Azure, GCP mit Zustandsverwaltung bereitstellen"
template: "tool"
tags: ["devops", "infrastructure", "iac"]
---

## TL;DR

**Was**: Ein Infrastructure-as-Code-Tool zum Bereitstellen von Cloud-Ressourcen.

**Warum**: Deklarative Syntax, Multi-Cloud, Zustandsverwaltung, reproduzierbare Infrastruktur.

## Quick Start

**Installieren**:
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

**Ausführen**:
```bash
terraform init
terraform plan
terraform apply
```

## Cheatsheet

| Befehl | Beschreibung |
|---------|-------------|
| `terraform init` | Arbeitsverzeichnis initialisieren |
| `terraform plan` | Änderungen vorschauen |
| `terraform apply` | Änderungen anwenden |
| `terraform destroy` | Infrastruktur zerstören |
| `terraform fmt` | Code formatieren |
| `terraform validate` | Konfiguration validieren |
| `terraform output` | Outputs anzeigen |
| `terraform state list` | Ressourcen im State auflisten |

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

- [Terraform Documentation](https://developer.hashicorp.com/terraform/docs) - Offizielle Dokumentation
- [Terraform Registry](https://registry.terraform.io/) - Provider und Module
- [Terraform Tutorials](https://developer.hashicorp.com/terraform/tutorials) - Lernen
- [Terraform Best Practices](https://www.terraform-best-practices.com/) - Richtlinien
