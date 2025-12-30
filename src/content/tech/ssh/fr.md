---
title: "SSH"
description: "Démarrez avec SSH pour des connexions distantes sécurisées"
template: "tool"
tags: ["security", "remote", "networking"]
---

## TL;DR

**Quoi** : Secure Shell - protocole chiffré pour l'accès aux serveurs distants et le transfert de fichiers.

**Pourquoi** : Connexion sécurisée aux serveurs distants, transfert de fichiers et tunneling de connexions.

## Quick Start

**Connexion à un serveur** :

```bash
ssh user@hostname
ssh user@192.168.1.100
ssh -p 2222 user@hostname    # Custom port
```

**Générer une clé SSH (recommandé)** :

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
# Or RSA (wider compatibility)
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

**Copier la clé sur le serveur (connexion sans mot de passe)** :

```bash
ssh-copy-id user@hostname
# Or manually
cat ~/.ssh/id_ed25519.pub | ssh user@hostname "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"
```

**Configuration SSH pour les raccourcis** :

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

| Commande | Description |
|---------|-------------|
| `ssh user@host` | Connexion au serveur |
| `ssh -i key.pem user@host` | Utiliser une clé spécifique |
| `scp file user@host:/path` | Copier fichier vers serveur |
| `scp user@host:/path file` | Copier fichier depuis serveur |
| `scp -r dir user@host:/path` | Copier répertoire |
| `ssh -L 8080:localhost:80 user@host` | Redirection de port local |
| `ssh -R 8080:localhost:80 user@host` | Redirection de port distant |
| `ssh -D 1080 user@host` | Proxy SOCKS |
| `ssh-add ~/.ssh/key` | Ajouter clé à l'agent |

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
