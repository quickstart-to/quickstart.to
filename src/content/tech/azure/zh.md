---
title: "Azure"
description: "微软企业云 - 无缝集成 Office 365、Active Directory 和混合基础设施"
template: "service"
tags: ["cloud", "devops", "microsoft"]
---

## TL;DR

**一句话**：Azure 是微软的云平台，拥有 200+ 服务——最适合企业、混合云和 .NET 工作负载。

**核心能力**：
- 企业集成 - Active Directory、Office 365、混合云
- 计算 - 虚拟机、App Service、Functions、AKS
- 数据 - SQL Database、Cosmos DB、Synapse Analytics
- AI/ML - Azure OpenAI、认知服务、ML Studio

## Architecture

### 服务分类

- **计算**：Virtual Machines、App Service、Functions、AKS（Kubernetes）
- **存储**：Blob Storage、File Storage、Disk Storage、Archive
- **数据库**：SQL Database、Cosmos DB、Cache for Redis、PostgreSQL
- **网络**：Virtual Network、Load Balancer、CDN、Front Door
- **身份**：Entra ID（Azure AD）、Key Vault、托管标识

### 核心概念

- **Subscription**：Azure 资源的计费容器
- **Resource Group**：逻辑容器，组织相关资源
- **Region**：资源的地理位置
- **Tenant**：组织的 Entra ID 实例

## Quick Start

### 创建账号

1. 访问 [azure.microsoft.com](https://azure.microsoft.com/)
2. 点击"免费开始"（30 天 $200 额度）
3. 使用 Microsoft 账号登录
4. 在 Azure Portal 中创建资源组

### 安装 CLI

```bash
# macOS
brew install azure-cli

# Linux
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# Windows
winget install Microsoft.AzureCLI

# 验证
az --version
```

### 登录和配置

```bash
# 登录（打开浏览器）
az login

# 设置订阅
az account set --subscription "My Subscription"

# 验证
az account show
```

### 第一个命令

```bash
# 创建资源组
az group create --name myResourceGroup --location eastus

# 列出资源组
az group list --output table
```

## Core Services

### 计算

| 服务 | 用途 | 定价模式 |
|------|------|----------|
| Virtual Machines | IaaS 虚拟机 | 按小时 |
| App Service | PaaS Web 托管 | 按计划 |
| Functions | 无服务器 | 按执行 |
| AKS | 托管 Kubernetes | 控制平面免费 |

### 存储和数据库

| 服务 | 用途 | 定价模式 |
|------|------|----------|
| Blob Storage | 对象存储 | 按 GB + 事务 |
| SQL Database | 托管 SQL Server | DTU 或 vCore |
| Cosmos DB | 全球 NoSQL | RU/s + 存储 |
| Cache for Redis | 内存缓存 | 按实例 |

## Gotchas

### 费用陷阱

- **停止的 VM 仍收磁盘费**：解除分配而不只是停止
- **公网 IP 地址**：静态 IP 未挂载时收费
- **Cosmos DB RU/s**：从低开始，按需扩展
- **高级存储**：开发环境用标准存储更便宜

### 权限问题

- **权限不足**：检查 IAM 中的角色分配
- **资源提供者未注册**：`az provider register --namespace Microsoft.Compute`

### 常见错误

```bash
# "The subscription is not registered to use namespace"
az provider register --namespace Microsoft.Web

# "AuthorizationFailed"
# → 检查资源组 IAM 中的角色分配

# "Resource group not found"
az group list --output table  # 验证组名
```

## Next Steps

- [Azure 文档](https://docs.microsoft.com/azure/)
- [Azure 免费账户](https://azure.microsoft.com/free/)
- [Microsoft Learn](https://docs.microsoft.com/learn/azure/)
- [Azure 架构中心](https://docs.microsoft.com/azure/architecture/)
