---
title: "AWS"
description: "Get started with Amazon Web Services in 5 minutes"
tags: ["cloud", "devops", "infrastructure"]
---

## TL;DR

**What**: Amazon's comprehensive cloud computing platform with 200+ services.

**Why**: Industry leader, vast service catalog, global infrastructure, pay-as-you-go pricing.

## Quick Start

**Install AWS CLI**:
```bash
# macOS
brew install awscli

# Linux
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip && sudo ./aws/install

# Verify
aws --version
```

**Configure credentials**:
```bash
aws configure
# Enter: Access Key ID, Secret Access Key, Region, Output format
```

**First commands**:
```bash
# List S3 buckets
aws s3 ls

# List EC2 instances
aws ec2 describe-instances
```

## Cheatsheet

| Command | Description |
|---------|-------------|
| `aws configure` | Set up credentials |
| `aws s3 ls` | List S3 buckets |
| `aws s3 cp file s3://bucket/` | Upload to S3 |
| `aws ec2 describe-instances` | List EC2 instances |
| `aws lambda list-functions` | List Lambda functions |
| `aws iam list-users` | List IAM users |
| `aws sts get-caller-identity` | Check current identity |

## Gotchas

### Core services

```
Compute:     EC2, Lambda, ECS, EKS
Storage:     S3, EBS, EFS
Database:    RDS, DynamoDB, ElastiCache
Networking:  VPC, Route 53, CloudFront
Security:    IAM, KMS, Secrets Manager
```

### S3 operations

```bash
# Create bucket
aws s3 mb s3://my-bucket-name

# Sync directory
aws s3 sync ./local-dir s3://bucket/prefix

# Download file
aws s3 cp s3://bucket/file.txt ./

# Delete bucket (must be empty)
aws s3 rb s3://bucket-name
```

### EC2 basics

```bash
# Launch instance
aws ec2 run-instances \
  --image-id ami-0abcdef1234567890 \
  --instance-type t2.micro \
  --key-name my-key

# Stop instance
aws ec2 stop-instances --instance-ids i-1234567890abcdef0

# Terminate instance
aws ec2 terminate-instances --instance-ids i-1234567890abcdef0
```

### IAM policies

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::bucket-name/*"
    }
  ]
}
```

## Next Steps

- [AWS Documentation](https://docs.aws.amazon.com/) - Official docs
- [AWS Free Tier](https://aws.amazon.com/free/) - Free resources
- [AWS Skill Builder](https://skillbuilder.aws/) - Training
- [AWS Well-Architected](https://aws.amazon.com/architecture/well-architected/) - Best practices
