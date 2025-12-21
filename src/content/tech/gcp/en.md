---
title: "Google Cloud"
description: "Get started with Google Cloud Platform in 5 minutes"
tags: ["cloud", "devops", "google"]
---

## TL;DR

**What**: Google's cloud computing platform with 100+ services.

**Why**: Big data/ML leadership, Kubernetes origin, global network, competitive pricing.

## Quick Start

**Install gcloud CLI**:
```bash
# macOS
brew install google-cloud-sdk

# Linux
curl https://sdk.cloud.google.com | bash

# Verify
gcloud --version
```

**Initialize and authenticate**:
```bash
# Initialize (opens browser)
gcloud init

# Set project
gcloud config set project PROJECT_ID

# List configurations
gcloud config list
```

## Cheatsheet

| Command | Description |
|---------|-------------|
| `gcloud init` | Initialize SDK |
| `gcloud auth login` | Authenticate |
| `gcloud projects list` | List projects |
| `gcloud compute instances list` | List VMs |
| `gcloud container clusters list` | List GKE clusters |
| `gcloud functions list` | List Cloud Functions |
| `gcloud run services list` | List Cloud Run services |

## Gotchas

### Core services

```
Compute:     Compute Engine, Cloud Run, GKE, Cloud Functions
Storage:     Cloud Storage, Persistent Disk, Filestore
Database:    Cloud SQL, Firestore, Bigtable, Spanner
Analytics:   BigQuery, Dataflow, Pub/Sub
ML/AI:       Vertex AI, Vision AI, Natural Language
```

### Cloud Storage (GCS)

```bash
# Create bucket
gcloud storage buckets create gs://my-bucket-name

# Upload file
gcloud storage cp file.txt gs://my-bucket/

# List objects
gcloud storage ls gs://my-bucket/

# Download file
gcloud storage cp gs://my-bucket/file.txt ./
```

### Compute Engine

```bash
# Create VM
gcloud compute instances create my-vm \
  --zone=us-central1-a \
  --machine-type=e2-micro \
  --image-family=debian-11 \
  --image-project=debian-cloud

# SSH to VM
gcloud compute ssh my-vm --zone=us-central1-a

# Stop/Delete VM
gcloud compute instances stop my-vm --zone=us-central1-a
gcloud compute instances delete my-vm --zone=us-central1-a
```

### Cloud Run

```bash
# Deploy from source
gcloud run deploy my-service \
  --source . \
  --region us-central1 \
  --allow-unauthenticated

# Deploy container
gcloud run deploy my-service \
  --image gcr.io/PROJECT_ID/my-image \
  --region us-central1
```

## Next Steps

- [Google Cloud Documentation](https://cloud.google.com/docs) - Official docs
- [Google Cloud Free Tier](https://cloud.google.com/free) - Free resources
- [Google Cloud Skills Boost](https://www.cloudskillsboost.google/) - Training
- [Google Cloud Architecture Center](https://cloud.google.com/architecture) - Best practices
