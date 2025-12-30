---
title: "AWS"
description: "全球最大云平台 - 计算、存储、数据库、AI/ML 等 200+ 服务，驱动 Netflix 和 Airbnb"
template: "service"
tags: ["cloud", "devops", "infrastructure"]
---

## TL;DR

**一句话**：AWS 是亚马逊的云平台，拥有 200+ 服务——行业领导者，支撑 Netflix、Airbnb 和数百万企业。

**核心能力**：
- 计算 - EC2 实例、Lambda 无服务器、容器
- 存储 - S3 对象存储、EBS 块存储
- 数据库 - RDS、DynamoDB、ElastiCache
- 全球基础设施 - 30+ 区域、100+ 边缘站点

## Architecture

### 服务分类

- **计算**：EC2（虚拟服务器）、Lambda（无服务器）、ECS/EKS（容器）
- **存储**：S3（对象）、EBS（块）、EFS（文件系统）、Glacier（归档）
- **数据库**：RDS（关系型）、DynamoDB（NoSQL）、ElastiCache（内存）
- **网络**：VPC（虚拟网络）、Route 53（DNS）、CloudFront（CDN）
- **安全**：IAM（身份）、KMS（加密）、Secrets Manager

### 核心概念

- **Region**：地理区域，包含多个数据中心（如 us-east-1）
- **Availability Zone**：区域内的隔离数据中心
- **ARN**：Amazon Resource Name - 任何资源的唯一标识符
- **IAM**：身份和访问管理 - 控制谁能做什么

## Quick Start

### 创建账号

1. 访问 [aws.amazon.com](https://aws.amazon.com/)
2. 点击"创建 AWS 账户"
3. 提供邮箱、支付信息（有免费套餐）
4. 为根账户启用 MFA（安全 → MFA）

### 安装 CLI

```bash
# macOS
brew install awscli

# Linux
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip && sudo ./aws/install

# 验证
aws --version
```

### 配置凭证

```bash
# 创建访问密钥：IAM → 用户 → 安全凭证 → 创建访问密钥
aws configure
# 输入：Access Key ID、Secret Access Key、区域（如 us-east-1）、输出格式（json）
```

### 第一个命令

```bash
# 检查身份
aws sts get-caller-identity

# 列出 S3 存储桶
aws s3 ls
```

## Core Services

### 计算

| 服务 | 用途 | 定价模式 |
|------|------|----------|
| EC2 | 虚拟服务器 | 按小时/秒 |
| Lambda | 无服务器函数 | 按请求 + 时长 |
| ECS/EKS | 容器编排 | 底层资源费用 |
| Lightsail | 简单 VPS | 固定月费 |

### 存储

| 服务 | 用途 | 定价模式 |
|------|------|----------|
| S3 | 对象存储、静态托管 | 按 GB + 请求 |
| EBS | EC2 块存储 | 按预置 GB |
| EFS | 共享文件系统 | 按使用 GB |
| Glacier | 归档存储 | 按 GB（便宜）|

### 数据库

| 服务 | 用途 | 定价模式 |
|------|------|----------|
| RDS | 托管 MySQL、PostgreSQL | 实例 + 存储 |
| DynamoDB | NoSQL、无服务器 | 按请求或预置 |
| ElastiCache | Redis/Memcached | 实例小时 |

## Gotchas

### 费用陷阱

- **忘记停止 EC2**：实例 24/7 运行 → **设置账单告警，使用自动停止**
- **NAT 网关**：$0.045/小时 + 数据 → **开发环境用 NAT 实例**
- **出站流量**：费用累积 → **大流量用 CloudFront**
- **EBS 快照**：悄悄累积 → **用生命周期策略自动清理**

### 权限问题

- **AccessDenied**：检查 IAM 策略 → 用 `aws iam simulate-principal-policy` 调试
- **Assume role 失败**：信任策略必须允许调用方实体

### 常见错误

```bash
# "Unable to locate credentials"
aws configure  # 设置凭证

# "An error occurred (UnauthorizedOperation)"
# → 缺少 IAM 权限，检查策略

# "The security token included in the request is expired"
# → 刷新凭证或会话令牌
```

## Next Steps

- [AWS 文档](https://docs.aws.amazon.com/)
- [AWS 免费套餐](https://aws.amazon.com/free/)
- [AWS 定价计算器](https://calculator.aws/)
- [AWS 架构完善](https://aws.amazon.com/architecture/well-architected/)
