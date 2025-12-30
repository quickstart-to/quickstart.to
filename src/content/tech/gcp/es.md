---
title: "Google Cloud"
description: "Comienza con Google Cloud Platform en 5 minutos"
template: "service"
tags: ["cloud", "devops", "google"]
---

## TL;DR

**En una línea**: Google Cloud es la plataforma cloud de Google con más de 100 servicios - el lugar de nacimiento de Kubernetes y líder en datos/ML.

**Capacidades principales**:
- Compute - VMs, contenedores, serverless (Cloud Run es excelente)
- Datos - BigQuery para analytics, Firestore para NoSQL
- ML/IA - Vertex AI, modelos pre-entrenados
- Kubernetes - GKE, la mejor experiencia K8s gestionada

## Architecture

### Service Categories

- **Compute**: Compute Engine (VMs), Cloud Run (serverless), GKE (Kubernetes), Cloud Functions
- **Storage**: Cloud Storage (objetos), Persistent Disk, Filestore
- **Base de datos**: Cloud SQL (relacional), Firestore (NoSQL), Bigtable, Spanner
- **Analytics**: BigQuery, Dataflow, Pub/Sub, Dataproc
- **ML/IA**: Vertex AI, Vision AI, Speech-to-Text, Translation

### Core Concepts

- **Proyecto**: Contenedor para recursos y facturación
- **Región/Zona**: Ubicaciones geográficas para recursos
- **Service Account**: Identidad para aplicaciones (no usuarios)
- **IAM**: Identity and Access Management - roles y permisos

## Quick Start

### Create Account

1. Ve a [cloud.google.com](https://cloud.google.com/)
2. Haz clic en "Empezar gratis" ($300 de crédito por 90 días)
3. Crea un proyecto en Cloud Console
4. Habilita la facturación para el proyecto

### Install CLI

```bash
# macOS
brew install google-cloud-sdk

# Linux
curl https://sdk.cloud.google.com | bash
exec -l $SHELL

# Verificar
gcloud --version
```

### Initialize and Authenticate

```bash
# Inicializar (abre navegador para auth)
gcloud init

# Establecer proyecto
gcloud config set project PROJECT_ID

# Verificar
gcloud config list
```

### First Commands

```bash
# Listar proyectos
gcloud projects list

# Listar instancias de compute
gcloud compute instances list
```

## Core Services

### Compute

| Servicio | Caso de uso | Modelo de precios |
|---------|----------|---------------|
| Compute Engine | Máquinas virtuales | Por segundo |
| Cloud Run | Contenedores serverless | Por request + CPU/memoria |
| GKE | Kubernetes gestionado | Cluster + nodes |
| Cloud Functions | Funciones event-driven | Por invocación |

### Storage & Database

| Servicio | Caso de uso | Modelo de precios |
|---------|----------|---------------|
| Cloud Storage | Almacenamiento de objetos | Por GB + operaciones |
| Cloud SQL | MySQL/PostgreSQL gestionado | Instancia + almacenamiento |
| Firestore | DB documento NoSQL | Por operación + almacenamiento |
| BigQuery | Data warehouse | Por query (TB escaneados) |

## Gotchas

### Cost Traps

- **Queries de BigQuery**: Escanean columnas enteras → **Usa LIMIT, particionamiento y preview**
- **Clusters GKE inactivos**: Cargos del control plane → **Usa Autopilot o elimina clusters no usados**
- **Egress de red**: Cargos cross-región → **Mantén recursos en la misma región**
- **Persistent disks**: Discos no adjuntos aún cobran → **Elimina discos no usados**

### Permission Issues

- **403 Forbidden**: Verifica roles IAM → Asegura que el service account tiene los roles correctos
- **API no habilitada**: Habilita API en consola o `gcloud services enable SERVICE_NAME`

### Common Errors

```bash
# "The project PROJECT_ID does not exist"
gcloud projects list  # Verifica el nombre del proyecto

# "PERMISSION_DENIED: Request had insufficient authentication"
gcloud auth login  # Re-autenticar

# "API not enabled"
gcloud services enable compute.googleapis.com
```

## Next Steps

- [Documentación de Google Cloud](https://cloud.google.com/docs)
- [Google Cloud Free Tier](https://cloud.google.com/free)
- [Google Cloud Skills Boost](https://www.cloudskillsboost.google/)
- [Google Cloud Architecture Center](https://cloud.google.com/architecture)
