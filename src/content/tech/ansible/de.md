---
title: "Ansible"
description: "Starten Sie mit Ansible-Automatisierung in 5 Minuten"
template: "tool"
tags: ["devops", "automation", "configuration"]
---

## TL;DR

**Was**: Agentenloses IT-Automatisierungstool für Konfigurationsmanagement und Deployment.

**Warum**: Keine Agenten erforderlich, einfache YAML-Syntax, idempotente Operationen, riesige Modulbibliothek.

## Quick Start

**Installieren**:
```bash
# macOS
brew install ansible

# Linux (pip)
pip install ansible

# Überprüfen
ansible --version
```

**Erster Befehl (ad-hoc)**:
```bash
# Localhost pingen
ansible localhost -m ping

# Befehl auf Remote-Hosts ausführen
ansible all -i "server1,server2," -m shell -a "uptime"
```

**Inventory-Datei** (`hosts.ini`):
```ini
[webservers]
web1.example.com
web2.example.com

[databases]
db1.example.com
```

## Cheatsheet

| Befehl | Beschreibung |
|--------|--------------|
| `ansible all -m ping` | Alle Hosts pingen |
| `ansible-playbook play.yml` | Playbook ausführen |
| `ansible-playbook -i hosts play.yml` | Mit Inventory |
| `ansible-galaxy install role` | Rolle installieren |
| `ansible-vault encrypt file` | Datei verschlüsseln |
| `ansible-doc -l` | Module auflisten |

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
# Im Playbook
vars:
  http_port: 80
  max_clients: 200

# In vars-Datei
# vars/main.yml
app_name: myapp
app_version: "1.0.0"

# Variablen verwenden
- name: Create directory
  file:
    path: "/opt/{{ app_name }}"
    state: directory
```

### Common modules

```yaml
# Dateioperationen
- file: path=/tmp/test state=directory mode=0755
- copy: src=file.txt dest=/tmp/file.txt
- template: src=config.j2 dest=/etc/app/config

# Paketverwaltung
- apt: name=nginx state=present
- yum: name=httpd state=latest

# Service-Verwaltung
- service: name=nginx state=started enabled=yes

# Befehle
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

- [Ansible-Dokumentation](https://docs.ansible.com/) - Offizielle Dokumentation
- [Ansible Galaxy](https://galaxy.ansible.com/) - Rollen-Repository
- [Ansible-Beispiele](https://github.com/ansible/ansible-examples) - Beispiel-Playbooks
- [Ansible Best Practices](https://docs.ansible.com/ansible/latest/tips_tricks/ansible_tips_tricks.html) - Tipps
