---
title: "SSH"
description: "Starten Sie mit SSH für sichere Remote-Verbindungen"
template: "tool"
tags: ["security", "remote", "networking"]
---

## TL;DR

**Was**: Secure Shell - verschlüsseltes Protokoll für Remote-Server-Zugriff und Dateitransfer.

**Warum**: Sichere Verbindung zu Remote-Servern, Dateiübertragung und Tunnel-Verbindungen.

## Quick Start

**Verbindung zu einem Server**:

```bash
ssh user@hostname
ssh user@192.168.1.100
ssh -p 2222 user@hostname    # Custom port
```

**SSH-Schlüssel generieren (empfohlen)**:

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
# Or RSA (wider compatibility)
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

**Schlüssel auf Server kopieren (passwortlose Anmeldung)**:

```bash
ssh-copy-id user@hostname
# Or manually
cat ~/.ssh/id_ed25519.pub | ssh user@hostname "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"
```

**SSH-Konfiguration für Shortcuts**:

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

| Befehl | Beschreibung |
|---------|-------------|
| `ssh user@host` | Verbindung zum Server |
| `ssh -i key.pem user@host` | Bestimmten Schlüssel verwenden |
| `scp file user@host:/path` | Datei zum Server kopieren |
| `scp user@host:/path file` | Datei vom Server kopieren |
| `scp -r dir user@host:/path` | Verzeichnis kopieren |
| `ssh -L 8080:localhost:80 user@host` | Lokale Portweiterleitung |
| `ssh -R 8080:localhost:80 user@host` | Remote-Portweiterleitung |
| `ssh -D 1080 user@host` | SOCKS-Proxy |
| `ssh-add ~/.ssh/key` | Schlüssel zum Agent hinzufügen |

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
