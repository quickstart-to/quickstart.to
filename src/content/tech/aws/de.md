---
title: "AWS"
description: "Weltgrößte Cloud-Plattform - Compute, Storage, Datenbanken, AI/ML und 200+ Services hinter Netflix und Airbnb"
template: "service"
tags: ["cloud", "devops", "infrastructure"]
---

## TL;DR

**Eine Zeile**: AWS ist Amazons Cloud-Plattform mit 200+ Services - der Branchenführer, der Netflix, Airbnb und Millionen von Unternehmen betreibt.

**Kernfähigkeiten**:
- Compute - EC2-Instanzen, Lambda Serverless, Container
- Storage - S3 Objektspeicher, EBS Blockspeicher
- Datenbank - RDS, DynamoDB, ElastiCache
- Globale Infrastruktur - 30+ Regionen, 100+ Edge-Standorte

## Architecture

### Service Categories

- **Compute**: EC2 (virtuelle Server), Lambda (serverless), ECS/EKS (Container)
- **Storage**: S3 (Objekte), EBS (Block), EFS (Dateisystem), Glacier (Archiv)
- **Database**: RDS (relational), DynamoDB (NoSQL), ElastiCache (In-Memory)
- **Networking**: VPC (virtuelles Netzwerk), Route 53 (DNS), CloudFront (CDN)
- **Security**: IAM (Identität), KMS (Verschlüsselung), Secrets Manager

### Core Concepts

- **Region**: Geografisches Gebiet mit mehreren Rechenzentren (z.B. us-east-1)
- **Availability Zone**: Isoliertes Rechenzentrum innerhalb einer Region
- **ARN**: Amazon Resource Name - eindeutige Kennung für jede Ressource
- **IAM**: Identity and Access Management - kontrolliert, wer was tun kann

## Quick Start

### Create Account

1. Gehen Sie zu [aws.amazon.com](https://aws.amazon.com/)
2. Klicken Sie auf "Create an AWS Account"
3. Geben Sie E-Mail, Zahlungsinformationen an (kostenlose Stufe verfügbar)
4. Aktivieren Sie MFA für das Root-Konto (Security → MFA)

### Install CLI

```bash
# macOS
brew install awscli

# Linux
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip && sudo ./aws/install

# Überprüfen
aws --version
```

### Configure Credentials

```bash
# Zugriffsschlüssel erstellen: IAM → Users → Security credentials → Create access key
aws configure
# Eingeben: Access Key ID, Secret Access Key, Region (z.B. us-east-1), Ausgabeformat (json)
```

### First Commands

```bash
# Identität prüfen
aws sts get-caller-identity

# S3-Buckets auflisten
aws s3 ls
```

## Core Services

### Compute

| Service | Anwendungsfall | Preismodell |
|---------|----------------|-------------|
| EC2 | Virtuelle Server | Pro Stunde/Sekunde |
| Lambda | Serverless-Funktionen | Pro Anfrage + Dauer |
| ECS/EKS | Container-Orchestrierung | Zugrundeliegende Ressourcen |
| Lightsail | Einfacher VPS | Monatlich fest |

### Storage

| Service | Anwendungsfall | Preismodell |
|---------|----------------|-------------|
| S3 | Objektspeicher, statisches Hosting | Pro GB + Anfragen |
| EBS | Blockspeicher für EC2 | Pro bereitgestelltes GB |
| EFS | Gemeinsames Dateisystem | Pro genutztes GB |
| Glacier | Archivspeicher | Pro GB (günstig) |

### Database

| Service | Anwendungsfall | Preismodell |
|---------|----------------|-------------|
| RDS | Verwaltetes MySQL, PostgreSQL | Instanz + Speicher |
| DynamoDB | NoSQL, serverless | Pro Anfrage oder bereitgestellt |
| ElastiCache | Redis/Memcached | Instanzstunden |

## Gotchas

### Cost Traps

- **EC2 nicht gestoppt**: Instanzen laufen 24/7 → **Abrechnungsalarme setzen und Auto-Stop verwenden**
- **NAT Gateway**: 0,045$/Stunde + Daten → **NAT-Instanzen für Entwicklungsumgebungen verwenden**
- **Ausgehende Datenübertragung**: Kosten summieren sich → **CloudFront für hohen Traffic verwenden**
- **EBS Snapshots**: Sammeln sich still an → **Bereinigung mit Lifecycle-Richtlinien automatisieren**

### Permission Issues

- **AccessDenied**: IAM-Richtlinien prüfen → `aws iam simulate-principal-policy` zum Debuggen verwenden
- **Assume Role fehlgeschlagen**: Trust Policy muss die aufrufende Entität erlauben

### Common Errors

```bash
# "Unable to locate credentials"
aws configure  # Anmeldedaten einrichten

# "An error occurred (UnauthorizedOperation)"
# → Fehlende IAM-Berechtigung, Richtlinie prüfen

# "The security token included in the request is expired"
# → Anmeldedaten oder Sitzungstoken aktualisieren
```

## Next Steps

- [AWS-Dokumentation](https://docs.aws.amazon.com/)
- [AWS Free Tier](https://aws.amazon.com/free/)
- [AWS-Preisrechner](https://calculator.aws/)
- [AWS Well-Architected](https://aws.amazon.com/architecture/well-architected/)
