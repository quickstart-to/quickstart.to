---
title: "AWS"
description: "5 分钟快速入门 Amazon Web Services"
tags: ["cloud", "devops", "infrastructure"]
---

## TL;DR

**是什么**：亚马逊的综合云计算平台，拥有 200+ 服务。

**为什么用**：行业领导者、丰富的服务目录、全球基础设施、按需付费。

## Quick Start

**安装 AWS CLI**：
```bash
# macOS
brew install awscli

# Linux
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip && sudo ./aws/install

# 验证
aws --version
```

**配置凭证**：
```bash
aws configure
# 输入：Access Key ID、Secret Access Key、区域、输出格式
```

**首个命令**：
```bash
# 列出 S3 存储桶
aws s3 ls

# 列出 EC2 实例
aws ec2 describe-instances
```

## Cheatsheet

| 命令 | 描述 |
|---------|-------------|
| `aws configure` | 设置凭证 |
| `aws s3 ls` | 列出 S3 存储桶 |
| `aws s3 cp file s3://bucket/` | 上传到 S3 |
| `aws ec2 describe-instances` | 列出 EC2 实例 |
| `aws lambda list-functions` | 列出 Lambda 函数 |
| `aws iam list-users` | 列出 IAM 用户 |
| `aws sts get-caller-identity` | 检查当前身份 |

## Gotchas

### 核心服务

```
计算：       EC2, Lambda, ECS, EKS
存储：       S3, EBS, EFS
数据库：     RDS, DynamoDB, ElastiCache
网络：       VPC, Route 53, CloudFront
安全：       IAM, KMS, Secrets Manager
```

### S3 操作

```bash
# 创建存储桶
aws s3 mb s3://my-bucket-name

# 同步目录
aws s3 sync ./local-dir s3://bucket/prefix

# 下载文件
aws s3 cp s3://bucket/file.txt ./

# 删除存储桶（必须为空）
aws s3 rb s3://bucket-name
```

### EC2 基础

```bash
# 启动实例
aws ec2 run-instances \
  --image-id ami-0abcdef1234567890 \
  --instance-type t2.micro \
  --key-name my-key

# 停止实例
aws ec2 stop-instances --instance-ids i-1234567890abcdef0

# 终止实例
aws ec2 terminate-instances --instance-ids i-1234567890abcdef0
```

### IAM 策略

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

- [AWS 文档](https://docs.aws.amazon.com/) - 官方文档
- [AWS 免费套餐](https://aws.amazon.com/free/) - 免费资源
- [AWS Skill Builder](https://skillbuilder.aws/) - 培训
- [AWS 架构完善](https://aws.amazon.com/architecture/well-architected/) - 最佳实践
