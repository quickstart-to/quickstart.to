---
title: "Ansible"
description: "Automatisation IT sans agent - configurer serveurs, deployer apps, orchestrer workflows avec playbooks YAML"
template: "tool"
tags: ["devops", "automation", "configuration"]
---

## TL;DR

**Quoi**: Outil d'automatisation IT sans agent pour la gestion de configuration et le déploiement.

**Pourquoi**: Pas d'agents nécessaires, syntaxe YAML simple, opérations idempotentes, énorme bibliothèque de modules.

## Quick Start

**Installer**:
```bash
# macOS
brew install ansible

# Linux (pip)
pip install ansible

# Vérifier
ansible --version
```

**Première commande (ad-hoc)**:
```bash
# Ping localhost
ansible localhost -m ping

# Exécuter une commande sur des hôtes distants
ansible all -i "server1,server2," -m shell -a "uptime"
```

**Fichier d'inventaire** (`hosts.ini`):
```ini
[webservers]
web1.example.com
web2.example.com

[databases]
db1.example.com
```

## Cheatsheet

| Commande | Description |
|----------|-------------|
| `ansible all -m ping` | Ping tous les hôtes |
| `ansible-playbook play.yml` | Exécuter le playbook |
| `ansible-playbook -i hosts play.yml` | Avec inventaire |
| `ansible-galaxy install role` | Installer un rôle |
| `ansible-vault encrypt file` | Chiffrer un fichier |
| `ansible-doc -l` | Lister les modules |

## Gotchas

### Basic playbook

```yaml
# playbook.yml
---
- name: Configure web servers
  hosts: webservers
  become: yes

  tasks:
    - name: Install nginx
      apt:
        name: nginx
        state: present
        update_cache: yes

    - name: Start nginx
      service:
        name: nginx
        state: started
        enabled: yes

    - name: Copy config
      template:
        src: nginx.conf.j2
        dest: /etc/nginx/nginx.conf
      notify: Restart nginx

  handlers:
    - name: Restart nginx
      service:
        name: nginx
        state: restarted
```

### Variables

```yaml
# Dans le playbook
vars:
  http_port: 80
  max_clients: 200

# Dans un fichier vars
# vars/main.yml
app_name: myapp
app_version: "1.0.0"

# Utiliser les variables
- name: Create directory
  file:
    path: "/opt/{{ app_name }}"
    state: directory
```

### Common modules

```yaml
# Opérations sur les fichiers
- file: path=/tmp/test state=directory mode=0755
- copy: src=file.txt dest=/tmp/file.txt
- template: src=config.j2 dest=/etc/app/config

# Gestion des paquets
- apt: name=nginx state=present
- yum: name=httpd state=latest

# Gestion des services
- service: name=nginx state=started enabled=yes

# Commandes
- command: /usr/bin/make
- shell: echo $HOME > /tmp/home.txt
```

### Roles structure

```
roles/
  webserver/
    tasks/main.yml
    handlers/main.yml
    templates/
    files/
    vars/main.yml
    defaults/main.yml
```

## Next Steps

- [Documentation Ansible](https://docs.ansible.com/) - Documentation officielle
- [Ansible Galaxy](https://galaxy.ansible.com/) - Dépôt de rôles
- [Exemples Ansible](https://github.com/ansible/ansible-examples) - Playbooks exemples
- [Bonnes pratiques Ansible](https://docs.ansible.com/ansible/latest/tips_tricks/ansible_tips_tricks.html) - Conseils
