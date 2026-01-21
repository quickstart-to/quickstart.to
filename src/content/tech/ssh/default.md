---
title: "SSH"
description: "Secure remote server access - encrypted connections, key-based auth, tunneling for safe data transfer"
template: "tool"
tags: ["security", "remote", "networking"]
---

## TL;DR

**What**: Secure Shell - encrypted protocol for remote server access and file transfer.

**Why**: Securely connect to remote servers, transfer files, and tunnel connections.

## Quick Start

**Connect to a server**:

```bash
ssh user@hostname
ssh user@192.168.1.100
ssh -p 2222 user@hostname    # Custom port
```

**Generate SSH key (recommended)**:

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
# Or RSA (wider compatibility)
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

**Copy key to server (passwordless login)**:

```bash
ssh-copy-id user@hostname
# Or manually
cat ~/.ssh/id_ed25519.pub | ssh user@hostname "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"
```

**SSH config for shortcuts**:

```bash
# ~/.ssh/config
Host myserver
    HostName 192.168.1.100
    User admin
    Port 22
    IdentityFile ~/.ssh/id_ed25519

# Now just use: ssh myserver
```

## Cheatsheet

| Command | Description |
|---------|-------------|
| `ssh user@host` | Connect to server |
| `ssh -i key.pem user@host` | Use specific key |
| `scp file user@host:/path` | Copy file to server |
| `scp user@host:/path file` | Copy file from server |
| `scp -r dir user@host:/path` | Copy directory |
| `ssh -L 8080:localhost:80 user@host` | Local port forward |
| `ssh -R 8080:localhost:80 user@host` | Remote port forward |
| `ssh -D 1080 user@host` | SOCKS proxy |
| `ssh-add ~/.ssh/key` | Add key to agent |

## Gotchas

### Permission denied (publickey)

```bash
# Check key permissions
chmod 700 ~/.ssh
chmod 600 ~/.ssh/id_ed25519
chmod 644 ~/.ssh/id_ed25519.pub

# Check server authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

### Connection refused

```bash
# Check if SSH service is running
sudo systemctl status sshd

# Start SSH service
sudo systemctl start sshd

# Check firewall
sudo ufw allow 22
```

### Host key verification failed

```bash
# Remove old key (after verifying it's safe)
ssh-keygen -R hostname

# Or skip check (not recommended for production)
ssh -o StrictHostKeyChecking=no user@host
```

### Keep connection alive

```bash
# ~/.ssh/config
Host *
    ServerAliveInterval 60
    ServerAliveCountMax 3
```

## Next Steps

- [SSH Academy](https://www.ssh.com/academy/ssh)
- [GitHub SSH Setup](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)
- [SSH Tunneling Guide](https://www.ssh.com/academy/ssh/tunneling)
- [Mosh - Mobile Shell](https://mosh.org/)
