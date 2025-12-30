---
title: "Google Cloud"
description: "Googles Cloud-Infrastruktur - Heimat von Kubernetes, BigQuery und modernster AI/ML mit globalem Netzwerk"
template: "service"
tags: ["cloud", "devops", "google"]
---

## TL;DR

**Eine Zeile**: Google Cloud ist Googles Cloud-Plattform mit 100+ Services - der Geburtsort von Kubernetes und führend in Daten/ML.

**Kernfähigkeiten**:
- Compute - VMs, Container, Serverless (Cloud Run ist ausgezeichnet)
- Daten - BigQuery für Analytics, Firestore für NoSQL
- ML/KI - Vertex AI, vortrainierte Modelle
- Kubernetes - GKE, die beste verwaltete K8s-Erfahrung

## Architecture

### Service Categories

- **Compute**: Compute Engine (VMs), Cloud Run (serverless), GKE (Kubernetes), Cloud Functions
- **Storage**: Cloud Storage (Objekte), Persistent Disk, Filestore
- **Datenbank**: Cloud SQL (relational), Firestore (NoSQL), Bigtable, Spanner
- **Analytics**: BigQuery, Dataflow, Pub/Sub, Dataproc
- **ML/KI**: Vertex AI, Vision AI, Speech-to-Text, Translation

### Core Concepts

- **Projekt**: Container für Ressourcen und Abrechnung
- **Region/Zone**: Geografische Standorte für Ressourcen
- **Service Account**: Identität für Anwendungen (nicht Benutzer)
- **IAM**: Identity and Access Management - Rollen und Berechtigungen

## Quick Start

### Create Account

1. Gehe zu [cloud.google.com](https://cloud.google.com/)
2. Klicke auf "Kostenlos starten" ($300 Guthaben für 90 Tage)
3. Erstelle ein Projekt in der Cloud Console
4. Aktiviere die Abrechnung für das Projekt

### Install CLI

```bash
# macOS
brew install google-cloud-sdk

# Linux
curl https://sdk.cloud.google.com | bash
exec -l $SHELL

# Verifizieren
gcloud --version
```

### Initialize and Authenticate

```bash
# Initialisieren (öffnet Browser zur Authentifizierung)
gcloud init

# Projekt setzen
gcloud config set project PROJECT_ID

# Verifizieren
gcloud config list
```

### First Commands

```bash
# Projekte auflisten
gcloud projects list

# Compute-Instanzen auflisten
gcloud compute instances list
```

## Core Services

### Compute

| Service | Anwendungsfall | Preismodell |
|---------|----------|---------------|
| Compute Engine | Virtuelle Maschinen | Pro Sekunde |
| Cloud Run | Serverless Container | Pro Request + CPU/Speicher |
| GKE | Verwaltetes Kubernetes | Cluster + Nodes |
| Cloud Functions | Event-gesteuerte Funktionen | Pro Aufruf |

### Storage & Database

| Service | Anwendungsfall | Preismodell |
|---------|----------|---------------|
| Cloud Storage | Objekt-Speicher | Pro GB + Operationen |
| Cloud SQL | Verwaltetes MySQL/PostgreSQL | Instanz + Speicher |
| Firestore | NoSQL Dokument-DB | Pro Operation + Speicher |
| BigQuery | Data Warehouse | Pro Query (TB gescannt) |

## Gotchas

### Cost Traps

- **BigQuery-Queries**: Scannen ganze Spalten → **LIMIT, Partitionierung und Preview verwenden**
- **Inaktive GKE-Cluster**: Control-Plane-Gebühren → **Autopilot nutzen oder ungenutzte Cluster löschen**
- **Netzwerk-Egress**: Cross-Region-Gebühren → **Ressourcen in derselben Region halten**
- **Persistent Disks**: Nicht angeschlossene Disks kosten trotzdem → **Ungenutzte Disks löschen**

### Permission Issues

- **403 Forbidden**: IAM-Rollen prüfen → Sicherstellen, dass Service Account korrekte Rollen hat
- **API nicht aktiviert**: API in Console aktivieren oder `gcloud services enable SERVICE_NAME`

### Common Errors

```bash
# "The project PROJECT_ID does not exist"
gcloud projects list  # Projektnamen verifizieren

# "PERMISSION_DENIED: Request had insufficient authentication"
gcloud auth login  # Neu authentifizieren

# "API not enabled"
gcloud services enable compute.googleapis.com
```

## Next Steps

- [Google Cloud Dokumentation](https://cloud.google.com/docs)
- [Google Cloud Free Tier](https://cloud.google.com/free)
- [Google Cloud Skills Boost](https://www.cloudskillsboost.google/)
- [Google Cloud Architecture Center](https://cloud.google.com/architecture)
