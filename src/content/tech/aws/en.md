---
title: "AWS"
description: "Get started with Amazon Web Services in 5 minutes"
template: "service"
tags: ["cloud", "devops", "infrastructure"]
---

## TL;DR

**One-liner**: AWS is Amazon's cloud platform with 200+ services - the industry leader powering Netflix, Airbnb, and millions of businesses.

**Core Capabilities**:
- Compute - EC2 instances, Lambda serverless, containers
- Storage - S3 object storage, EBS block storage
- Database - RDS, DynamoDB, ElastiCache
- Global infrastructure - 30+ regions, 100+ edge locations

## Architecture

### Service Categories

- **Compute**: EC2 (virtual servers), Lambda (serverless), ECS/EKS (containers)
- **Storage**: S3 (objects), EBS (block), EFS (file system), Glacier (archive)
- **Database**: RDS (relational), DynamoDB (NoSQL), ElastiCache (in-memory)
- **Networking**: VPC (virtual network), Route 53 (DNS), CloudFront (CDN)
- **Security**: IAM (identity), KMS (encryption), Secrets Manager

### Core Concepts

- **Region**: Geographic area with multiple data centers (e.g., us-east-1)
- **Availability Zone**: Isolated data center within a region
- **ARN**: Amazon Resource Name - unique identifier for any resource
- **IAM**: Identity and Access Management - controls who can do what

## Quick Start

### Create Account

1. Go to [aws.amazon.com](https://aws.amazon.com/)
2. Click "Create an AWS Account"
3. Provide email, payment info (free tier available)
4. Enable MFA for root account (Security → MFA)

### Install CLI

```bash
# macOS
brew install awscli

# Linux
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip && sudo ./aws/install

# Verify
aws --version
```

### Configure Credentials

```bash
# Create access key: IAM → Users → Security credentials → Create access key
aws configure
# Enter: Access Key ID, Secret Access Key, Region (e.g., us-east-1), Output format (json)
```

### First Commands

```bash
# Check identity
aws sts get-caller-identity

# List S3 buckets
aws s3 ls
```

## Core Services

### Compute

| Service | Use Case | Pricing Model |
|---------|----------|---------------|
| EC2 | Virtual servers | Per hour/second |
| Lambda | Serverless functions | Per request + duration |
| ECS/EKS | Container orchestration | Underlying resources |
| Lightsail | Simple VPS | Fixed monthly |

### Storage

| Service | Use Case | Pricing Model |
|---------|----------|---------------|
| S3 | Object storage, static hosting | Per GB + requests |
| EBS | Block storage for EC2 | Per GB provisioned |
| EFS | Shared file system | Per GB used |
| Glacier | Archive storage | Per GB (cheap) |

### Database

| Service | Use Case | Pricing Model |
|---------|----------|---------------|
| RDS | Managed MySQL, PostgreSQL | Instance + storage |
| DynamoDB | NoSQL, serverless | Per request or provisioned |
| ElastiCache | Redis/Memcached | Instance hours |

## Gotchas

### Cost Traps

- **Forgot to stop EC2**: Instances run 24/7 → **Set billing alerts and use auto-stop**
- **NAT Gateway**: $0.045/hour + data → **Use NAT instances for dev environments**
- **Data transfer out**: Charges add up → **Use CloudFront for heavy traffic**
- **EBS snapshots**: Accumulate silently → **Automate cleanup with lifecycle policies**

### Permission Issues

- **AccessDenied**: Check IAM policies → Use `aws iam simulate-principal-policy` to debug
- **Assume role failed**: Trust policy must allow the caller entity

### Common Errors

```bash
# "Unable to locate credentials"
aws configure  # Set up credentials

# "An error occurred (UnauthorizedOperation)"
# → Missing IAM permission, check policy

# "The security token included in the request is expired"
# → Refresh credentials or session token
```

## Next Steps

- [AWS Documentation](https://docs.aws.amazon.com/)
- [AWS Free Tier](https://aws.amazon.com/free/)
- [AWS Pricing Calculator](https://calculator.aws/)
- [AWS Well-Architected](https://aws.amazon.com/architecture/well-architected/)
