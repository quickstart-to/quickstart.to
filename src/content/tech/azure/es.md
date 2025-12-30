---
title: "Azure"
description: "Comienza con Microsoft Azure en 5 minutos"
template: "service"
tags: ["cloud", "devops", "microsoft"]
---

## TL;DR

**En una línea**: Azure es la plataforma cloud de Microsoft con 200+ servicios - ideal para empresas, nube híbrida y cargas de trabajo .NET.

**Capacidades principales**:
- Integración empresarial - Active Directory, Office 365, nube híbrida
- Compute - VMs, App Service, Functions, AKS
- Datos - SQL Database, Cosmos DB, Synapse Analytics
- IA/ML - Azure OpenAI, Cognitive Services, ML Studio

## Architecture

### Service Categories

- **Compute**: Virtual Machines, App Service, Functions, AKS (Kubernetes)
- **Storage**: Blob Storage, File Storage, Disk Storage, Archive
- **Database**: SQL Database, Cosmos DB, Cache for Redis, PostgreSQL
- **Networking**: Virtual Network, Load Balancer, CDN, Front Door
- **Identity**: Entra ID (Azure AD), Key Vault, Managed Identities

### Core Concepts

- **Subscription**: Contenedor de facturación para recursos de Azure
- **Resource Group**: Contenedor lógico que agrupa recursos relacionados
- **Region**: Ubicación geográfica para recursos
- **Tenant**: Instancia de Entra ID de una organización

## Quick Start

### Create Account

1. Ve a [azure.microsoft.com](https://azure.microsoft.com/)
2. Haz clic en "Comenzar gratis" ($200 de crédito por 30 días)
3. Inicia sesión con cuenta Microsoft
4. Crea un grupo de recursos en el Portal de Azure

### Install CLI

```bash
# macOS
brew install azure-cli

# Linux
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# Windows
winget install Microsoft.AzureCLI

# Verificar
az --version
```

### Login and Configure

```bash
# Iniciar sesión (abre navegador)
az login

# Establecer subscription
az account set --subscription "Mi Subscription"

# Verificar
az account show
```

### First Commands

```bash
# Crear grupo de recursos
az group create --name myResourceGroup --location eastus

# Listar grupos de recursos
az group list --output table
```

## Core Services

### Compute

| Servicio | Caso de uso | Modelo de precios |
|----------|-------------|-------------------|
| Virtual Machines | VMs IaaS | Por hora |
| App Service | Hosting web PaaS | Por plan |
| Functions | Serverless | Por ejecución |
| AKS | Kubernetes gestionado | Control plane gratis |

### Storage & Database

| Servicio | Caso de uso | Modelo de precios |
|----------|-------------|-------------------|
| Blob Storage | Almacenamiento de objetos | Por GB + transacciones |
| SQL Database | SQL Server gestionado | DTU o vCore |
| Cosmos DB | NoSQL global | RU/s + almacenamiento |
| Cache for Redis | Caché en memoria | Por instancia |

## Gotchas

### Cost Traps

- **VMs detenidas siguen cobrando discos**: Desasignar en lugar de solo detener
- **Direcciones IP públicas**: IPs estáticas cobran cuando no están asignadas
- **Cosmos DB RU/s**: Empezar bajo, escalar según sea necesario
- **Premium storage**: El almacenamiento regular es mucho más barato para desarrollo

### Permission Issues

- **Privilegios insuficientes**: Verificar asignaciones de rol en IAM
- **Resource provider no registrado**: `az provider register --namespace Microsoft.Compute`

### Common Errors

```bash
# "The subscription is not registered to use namespace"
az provider register --namespace Microsoft.Web

# "AuthorizationFailed"
# → Verificar asignación de rol en IAM del grupo de recursos

# "Resource group not found"
az group list --output table  # Verificar nombre del grupo
```

## Next Steps

- [Documentación de Azure](https://docs.microsoft.com/azure/)
- [Cuenta gratuita de Azure](https://azure.microsoft.com/free/)
- [Microsoft Learn](https://docs.microsoft.com/learn/azure/)
- [Azure Architecture Center](https://docs.microsoft.com/azure/architecture/)
