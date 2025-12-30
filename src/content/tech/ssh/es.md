---
title: "SSH"
description: "Comienza con SSH para conexiones remotas seguras"
template: "tool"
tags: ["security", "remote", "networking"]
---

## TL;DR

**Qué**: Secure Shell - protocolo cifrado para acceso a servidores remotos y transferencia de archivos.

**Por qué**: Conectar de forma segura a servidores remotos, transferir archivos y tunelizar conexiones.

## Quick Start

**Conectar a un servidor**:

```bash
ssh user@hostname
ssh user@192.168.1.100
ssh -p 2222 user@hostname    # Custom port
```

**Generar clave SSH (recomendado)**:

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
# Or RSA (wider compatibility)
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

**Copiar clave al servidor (inicio de sesión sin contraseña)**:

```bash
ssh-copy-id user@hostname
# Or manually
cat ~/.ssh/id_ed25519.pub | ssh user@hostname "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"
```

**Configuración SSH para atajos**:

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

| Comando | Descripción |
|---------|-------------|
| `ssh user@host` | Conectar al servidor |
| `ssh -i key.pem user@host` | Usar clave específica |
| `scp file user@host:/path` | Copiar archivo al servidor |
| `scp user@host:/path file` | Copiar archivo desde servidor |
| `scp -r dir user@host:/path` | Copiar directorio |
| `ssh -L 8080:localhost:80 user@host` | Redirección de puerto local |
| `ssh -R 8080:localhost:80 user@host` | Redirección de puerto remoto |
| `ssh -D 1080 user@host` | Proxy SOCKS |
| `ssh-add ~/.ssh/key` | Agregar clave al agente |

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
