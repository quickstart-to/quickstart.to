---
title: "SSH"
description: "快速入门 SSH 安全远程连接"
tags: ["security", "remote", "networking"]
---

## TL;DR

**是什么**：Secure Shell - 用于远程服务器访问和文件传输的加密协议。

**为什么**：安全连接远程服务器、传输文件、建立隧道连接。

## Quick Start

**连接服务器**：

```bash
ssh user@hostname
ssh user@192.168.1.100
ssh -p 2222 user@hostname    # 自定义端口
```

**生成 SSH 密钥（推荐）**：

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
# 或者 RSA（兼容性更广）
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

**复制密钥到服务器（免密登录）**：

```bash
ssh-copy-id user@hostname
# 或手动复制
cat ~/.ssh/id_ed25519.pub | ssh user@hostname "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"
```

**SSH 配置快捷方式**：

```bash
# ~/.ssh/config
Host myserver
    HostName 192.168.1.100
    User admin
    Port 22
    IdentityFile ~/.ssh/id_ed25519

# 现在只需使用：ssh myserver
```

## Cheatsheet

| 命令 | 描述 |
|------|------|
| `ssh user@host` | 连接服务器 |
| `ssh -i key.pem user@host` | 使用指定密钥 |
| `scp file user@host:/path` | 复制文件到服务器 |
| `scp user@host:/path file` | 从服务器复制文件 |
| `scp -r dir user@host:/path` | 复制目录 |
| `ssh -L 8080:localhost:80 user@host` | 本地端口转发 |
| `ssh -R 8080:localhost:80 user@host` | 远程端口转发 |
| `ssh -D 1080 user@host` | SOCKS 代理 |
| `ssh-add ~/.ssh/key` | 添加密钥到代理 |

## Gotchas

### Permission denied (publickey)

```bash
# 检查密钥权限
chmod 700 ~/.ssh
chmod 600 ~/.ssh/id_ed25519
chmod 644 ~/.ssh/id_ed25519.pub

# 检查服务器 authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

### Connection refused

```bash
# 检查 SSH 服务是否运行
sudo systemctl status sshd

# 启动 SSH 服务
sudo systemctl start sshd

# 检查防火墙
sudo ufw allow 22
```

### Host key verification failed

```bash
# 删除旧密钥（确认安全后）
ssh-keygen -R hostname

# 或跳过检查（不建议用于生产环境）
ssh -o StrictHostKeyChecking=no user@host
```

### 保持连接活跃

```bash
# ~/.ssh/config
Host *
    ServerAliveInterval 60
    ServerAliveCountMax 3
```

## Next Steps

- [SSH Academy](https://www.ssh.com/academy/ssh)
- [GitHub SSH 设置](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)
- [SSH 隧道指南](https://www.ssh.com/academy/ssh/tunneling)
- [Mosh - 移动 Shell](https://mosh.org/)
