---
title: "Azure"
description: "5 分钟快速入门 Microsoft Azure"
tags: ["cloud", "devops", "microsoft"]
---

## TL;DR

**是什么**：微软的云计算平台，拥有 200+ 服务。

**为什么用**：企业集成、混合云支持、强大的 .NET 生态系统、AI/ML 服务。

## Quick Start

**安装 Azure CLI**：
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

**登录和配置**：
```bash
# 登录（打开浏览器）
az login

# 设置订阅
az account set --subscription "My Subscription"

# 列出订阅
az account list --output table
```

## Cheatsheet

| 命令 | 描述 |
|---------|-------------|
| `az login` | 登录 Azure |
| `az account list` | 列出订阅 |
| `az group list` | 列出资源组 |
| `az vm list` | 列出虚拟机 |
| `az storage account list` | 列出存储账户 |
| `az webapp list` | 列出 Web 应用 |
| `az aks list` | 列出 AKS 集群 |

## Gotchas

### 核心服务

```
计算：       虚拟机, App Service, Functions, AKS
存储：       Blob 存储, 文件存储, 磁盘存储
数据库：     SQL 数据库, Cosmos DB, Redis 缓存
网络：       虚拟网络, 负载均衡器, CDN
身份：       Entra ID (Azure AD), Key Vault
```

### 资源组

```bash
# 创建资源组
az group create --name myResourceGroup --location eastus

# 列出资源组中的资源
az resource list --resource-group myResourceGroup

# 删除资源组
az group delete --name myResourceGroup
```

### 虚拟机

```bash
# 创建虚拟机
az vm create \
  --resource-group myResourceGroup \
  --name myVM \
  --image Ubuntu2204 \
  --admin-username azureuser \
  --generate-ssh-keys

# 启动/停止虚拟机
az vm start --resource-group myResourceGroup --name myVM
az vm stop --resource-group myResourceGroup --name myVM

# 删除虚拟机
az vm delete --resource-group myResourceGroup --name myVM
```

### App Service

```bash
# 创建 Web 应用
az webapp create \
  --resource-group myResourceGroup \
  --plan myAppServicePlan \
  --name myUniqueAppName \
  --runtime "NODE:18-lts"

# 从 Git 部署
az webapp deployment source config \
  --name myUniqueAppName \
  --resource-group myResourceGroup \
  --repo-url https://github.com/user/repo \
  --branch main
```

## Next Steps

- [Azure 文档](https://docs.microsoft.com/azure/) - 官方文档
- [Azure 免费账户](https://azure.microsoft.com/free/) - 免费套餐
- [Azure Learn](https://docs.microsoft.com/learn/azure/) - 培训路径
- [Azure 架构中心](https://docs.microsoft.com/azure/architecture/) - 最佳实践
