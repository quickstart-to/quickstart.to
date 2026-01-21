---
title: "Google Cloud"
description: "Google's cloud infrastructure - home of Kubernetes, BigQuery, and cutting-edge AI/ML with global network"
template: "service"
tags: ["cloud", "devops", "google"]
---

## TL;DR

**One-liner**: Google Cloud is Google's cloud platform with 100+ services - the birthplace of Kubernetes and leader in data/ML.

**Core Capabilities**:
- Compute - VMs, containers, serverless (Cloud Run is excellent)
- Data - BigQuery for analytics, Firestore for NoSQL
- ML/AI - Vertex AI, pre-trained models
- Kubernetes - GKE, the best managed K8s experience

## Architecture

### Service Categories

- **Compute**: Compute Engine (VMs), Cloud Run (serverless), GKE (Kubernetes), Cloud Functions
- **Storage**: Cloud Storage (objects), Persistent Disk, Filestore
- **Database**: Cloud SQL (relational), Firestore (NoSQL), Bigtable, Spanner
- **Analytics**: BigQuery, Dataflow, Pub/Sub, Dataproc
- **ML/AI**: Vertex AI, Vision AI, Speech-to-Text, Translation

### Core Concepts

- **Project**: Container for resources and billing
- **Region/Zone**: Geographic locations for resources
- **Service Account**: Identity for applications (not users)
- **IAM**: Identity and Access Management - roles and permissions

## Quick Start

### Create Account

1. Go to [cloud.google.com](https://cloud.google.com/)
2. Click "Get started for free" ($300 credit for 90 days)
3. Create a project in Cloud Console
4. Enable billing for the project

### Install CLI

```bash
# macOS
brew install google-cloud-sdk

# Linux
curl https://sdk.cloud.google.com | bash
exec -l $SHELL

# Verify
gcloud --version
```

### Initialize and Authenticate

```bash
# Initialize (opens browser for auth)
gcloud init

# Set project
gcloud config set project PROJECT_ID

# Verify
gcloud config list
```

### First Commands

```bash
# List projects
gcloud projects list

# List compute instances
gcloud compute instances list
```

## Core Services

### Compute

| Service | Use Case | Pricing Model |
|---------|----------|---------------|
| Compute Engine | Virtual machines | Per second |
| Cloud Run | Serverless containers | Per request + CPU/memory |
| GKE | Managed Kubernetes | Cluster + nodes |
| Cloud Functions | Event-driven functions | Per invocation |

### Storage & Database

| Service | Use Case | Pricing Model |
|---------|----------|---------------|
| Cloud Storage | Object storage | Per GB + operations |
| Cloud SQL | Managed MySQL/PostgreSQL | Instance + storage |
| Firestore | NoSQL document DB | Per operation + storage |
| BigQuery | Data warehouse | Per query (TB scanned) |

## Gotchas

### Cost Traps

- **BigQuery queries**: Scan entire columns → **Use LIMIT, partitioning, and preview**
- **Idle GKE clusters**: Control plane charges → **Use Autopilot or delete unused clusters**
- **Network egress**: Cross-region charges → **Keep resources in same region**
- **Persistent disks**: Unattached disks still charge → **Delete unused disks**

### Permission Issues

- **403 Forbidden**: Check IAM roles → Ensure service account has correct roles
- **API not enabled**: Enable API in console or `gcloud services enable SERVICE_NAME`

### Common Errors

```bash
# "The project PROJECT_ID does not exist"
gcloud projects list  # Verify project name

# "PERMISSION_DENIED: Request had insufficient authentication"
gcloud auth login  # Re-authenticate

# "API not enabled"
gcloud services enable compute.googleapis.com
```

## Next Steps

- [Google Cloud Documentation](https://cloud.google.com/docs)
- [Google Cloud Free Tier](https://cloud.google.com/free)
- [Google Cloud Skills Boost](https://www.cloudskillsboost.google/)
- [Google Cloud Architecture Center](https://cloud.google.com/architecture)
