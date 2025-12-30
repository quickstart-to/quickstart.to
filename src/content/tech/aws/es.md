---
title: "AWS"
description: "La mayor plataforma cloud del mundo - compute, storage, bases de datos, AI/ML y 200+ servicios detrás de Netflix y Airbnb"
template: "service"
tags: ["cloud", "devops", "infrastructure"]
---

## TL;DR

**En una línea**: AWS es la plataforma cloud de Amazon con 200+ servicios - el líder de la industria que impulsa Netflix, Airbnb y millones de empresas.

**Capacidades principales**:
- Compute - Instancias EC2, Lambda serverless, contenedores
- Almacenamiento - S3 almacenamiento de objetos, EBS almacenamiento en bloque
- Base de datos - RDS, DynamoDB, ElastiCache
- Infraestructura global - 30+ regiones, 100+ ubicaciones edge

## Architecture

### Service Categories

- **Compute**: EC2 (servidores virtuales), Lambda (serverless), ECS/EKS (contenedores)
- **Storage**: S3 (objetos), EBS (bloque), EFS (sistema de archivos), Glacier (archivo)
- **Database**: RDS (relacional), DynamoDB (NoSQL), ElastiCache (en memoria)
- **Networking**: VPC (red virtual), Route 53 (DNS), CloudFront (CDN)
- **Security**: IAM (identidad), KMS (cifrado), Secrets Manager

### Core Concepts

- **Region**: Área geográfica con múltiples centros de datos (ej: us-east-1)
- **Availability Zone**: Centro de datos aislado dentro de una región
- **ARN**: Amazon Resource Name - identificador único para cualquier recurso
- **IAM**: Identity and Access Management - controla quién puede hacer qué

## Quick Start

### Create Account

1. Ve a [aws.amazon.com](https://aws.amazon.com/)
2. Haz clic en "Create an AWS Account"
3. Proporciona email, info de pago (capa gratuita disponible)
4. Habilita MFA para la cuenta root (Security → MFA)

### Install CLI

```bash
# macOS
brew install awscli

# Linux
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip && sudo ./aws/install

# Verificar
aws --version
```

### Configure Credentials

```bash
# Crear clave de acceso: IAM → Users → Security credentials → Create access key
aws configure
# Ingresa: Access Key ID, Secret Access Key, Region (ej: us-east-1), Formato de salida (json)
```

### First Commands

```bash
# Verificar identidad
aws sts get-caller-identity

# Listar buckets S3
aws s3 ls
```

## Core Services

### Compute

| Servicio | Caso de uso | Modelo de precios |
|----------|-------------|-------------------|
| EC2 | Servidores virtuales | Por hora/segundo |
| Lambda | Funciones serverless | Por solicitud + duración |
| ECS/EKS | Orquestación de contenedores | Recursos subyacentes |
| Lightsail | VPS simple | Mensual fijo |

### Storage

| Servicio | Caso de uso | Modelo de precios |
|----------|-------------|-------------------|
| S3 | Almacenamiento de objetos, hosting estático | Por GB + solicitudes |
| EBS | Almacenamiento en bloque para EC2 | Por GB provisionado |
| EFS | Sistema de archivos compartido | Por GB usado |
| Glacier | Almacenamiento de archivo | Por GB (económico) |

### Database

| Servicio | Caso de uso | Modelo de precios |
|----------|-------------|-------------------|
| RDS | MySQL, PostgreSQL gestionado | Instancia + almacenamiento |
| DynamoDB | NoSQL, serverless | Por solicitud o provisionado |
| ElastiCache | Redis/Memcached | Horas de instancia |

## Gotchas

### Cost Traps

- **EC2 olvidado**: Las instancias corren 24/7 → **Configurar alertas de facturación y usar auto-stop**
- **NAT Gateway**: $0.045/hora + datos → **Usar instancias NAT para entornos de desarrollo**
- **Transferencia de datos saliente**: Los costos se acumulan → **Usar CloudFront para tráfico alto**
- **Snapshots EBS**: Se acumulan silenciosamente → **Automatizar limpieza con políticas de ciclo de vida**

### Permission Issues

- **AccessDenied**: Verificar políticas IAM → Usar `aws iam simulate-principal-policy` para depurar
- **Assume role fallido**: La política de confianza debe permitir la entidad que llama

### Common Errors

```bash
# "Unable to locate credentials"
aws configure  # Configurar credenciales

# "An error occurred (UnauthorizedOperation)"
# → Falta permiso IAM, verificar política

# "The security token included in the request is expired"
# → Actualizar credenciales o token de sesión
```

## Next Steps

- [Documentación de AWS](https://docs.aws.amazon.com/)
- [AWS Free Tier](https://aws.amazon.com/free/)
- [Calculadora de precios AWS](https://calculator.aws/)
- [AWS Well-Architected](https://aws.amazon.com/architecture/well-architected/)
