---
title: "AWS"
description: "Démarrez avec Amazon Web Services en 5 minutes"
template: "service"
tags: ["cloud", "devops", "infrastructure"]
---

## TL;DR

**En une ligne**: AWS est la plateforme cloud d'Amazon avec 200+ services - le leader de l'industrie qui alimente Netflix, Airbnb et des millions d'entreprises.

**Capacités principales**:
- Compute - Instances EC2, Lambda serverless, conteneurs
- Stockage - S3 stockage objet, EBS stockage bloc
- Base de données - RDS, DynamoDB, ElastiCache
- Infrastructure mondiale - 30+ régions, 100+ emplacements edge

## Architecture

### Service Categories

- **Compute**: EC2 (serveurs virtuels), Lambda (serverless), ECS/EKS (conteneurs)
- **Storage**: S3 (objets), EBS (bloc), EFS (système de fichiers), Glacier (archive)
- **Database**: RDS (relationnel), DynamoDB (NoSQL), ElastiCache (en mémoire)
- **Networking**: VPC (réseau virtuel), Route 53 (DNS), CloudFront (CDN)
- **Security**: IAM (identité), KMS (chiffrement), Secrets Manager

### Core Concepts

- **Region**: Zone géographique avec plusieurs centres de données (ex: us-east-1)
- **Availability Zone**: Centre de données isolé dans une région
- **ARN**: Amazon Resource Name - identifiant unique pour toute ressource
- **IAM**: Identity and Access Management - contrôle qui peut faire quoi

## Quick Start

### Create Account

1. Allez sur [aws.amazon.com](https://aws.amazon.com/)
2. Cliquez sur "Create an AWS Account"
3. Fournissez email, infos de paiement (offre gratuite disponible)
4. Activez MFA pour le compte root (Security → MFA)

### Install CLI

```bash
# macOS
brew install awscli

# Linux
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip && sudo ./aws/install

# Vérifier
aws --version
```

### Configure Credentials

```bash
# Créer une clé d'accès: IAM → Users → Security credentials → Create access key
aws configure
# Entrez: Access Key ID, Secret Access Key, Region (ex: us-east-1), Format de sortie (json)
```

### First Commands

```bash
# Vérifier l'identité
aws sts get-caller-identity

# Lister les buckets S3
aws s3 ls
```

## Core Services

### Compute

| Service | Cas d'usage | Modèle de tarification |
|---------|-------------|------------------------|
| EC2 | Serveurs virtuels | Par heure/seconde |
| Lambda | Fonctions serverless | Par requête + durée |
| ECS/EKS | Orchestration de conteneurs | Ressources sous-jacentes |
| Lightsail | VPS simple | Mensuel fixe |

### Storage

| Service | Cas d'usage | Modèle de tarification |
|---------|-------------|------------------------|
| S3 | Stockage objet, hébergement statique | Par Go + requêtes |
| EBS | Stockage bloc pour EC2 | Par Go provisionné |
| EFS | Système de fichiers partagé | Par Go utilisé |
| Glacier | Stockage d'archive | Par Go (bon marché) |

### Database

| Service | Cas d'usage | Modèle de tarification |
|---------|-------------|------------------------|
| RDS | MySQL, PostgreSQL managé | Instance + stockage |
| DynamoDB | NoSQL, serverless | Par requête ou provisionné |
| ElastiCache | Redis/Memcached | Heures d'instance |

## Gotchas

### Cost Traps

- **EC2 oublié**: Les instances tournent 24/7 → **Configurer des alertes de facturation et utiliser l'arrêt automatique**
- **NAT Gateway**: 0,045$/heure + données → **Utiliser des instances NAT pour les environnements de dev**
- **Transfert de données sortant**: Les coûts s'accumulent → **Utiliser CloudFront pour le trafic important**
- **Snapshots EBS**: S'accumulent silencieusement → **Automatiser le nettoyage avec des politiques de cycle de vie**

### Permission Issues

- **AccessDenied**: Vérifier les politiques IAM → Utiliser `aws iam simulate-principal-policy` pour déboguer
- **Assume role échoué**: La politique de confiance doit autoriser l'entité appelante

### Common Errors

```bash
# "Unable to locate credentials"
aws configure  # Configurer les credentials

# "An error occurred (UnauthorizedOperation)"
# → Permission IAM manquante, vérifier la politique

# "The security token included in the request is expired"
# → Rafraîchir les credentials ou le token de session
```

## Next Steps

- [Documentation AWS](https://docs.aws.amazon.com/)
- [AWS Free Tier](https://aws.amazon.com/free/)
- [Calculateur de prix AWS](https://calculator.aws/)
- [AWS Well-Architected](https://aws.amazon.com/architecture/well-architected/)
