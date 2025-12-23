---
title: "Ansible"
description: "Get started with Ansible automation in 5 minutes"
template: "tool"
tags: ["devops", "automation", "configuration"]
---

## TL;DR

**What**: Agentless IT automation tool for configuration management and deployment.

**Why**: No agents needed, simple YAML syntax, idempotent operations, huge module library.

## Quick Start

**Install**:
```bash
# macOS
brew install ansible

# Linux (pip)
pip install ansible

# Verify
ansible --version
```

**First command (ad-hoc)**:
```bash
# Ping localhost
ansible localhost -m ping

# Run command on remote hosts
ansible all -i "server1,server2," -m shell -a "uptime"
```

**Inventory file** (`hosts.ini`):
```ini
[webservers]
web1.example.com
web2.example.com

[databases]
db1.example.com
```

## Cheatsheet

| Command | Description |
|---------|-------------|
| `ansible all -m ping` | Ping all hosts |
| `ansible-playbook play.yml` | Run playbook |
| `ansible-playbook -i hosts play.yml` | With inventory |
| `ansible-galaxy install role` | Install role |
| `ansible-vault encrypt file` | Encrypt file |
| `ansible-doc -l` | List modules |

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
# In playbook
vars:
  http_port: 80
  max_clients: 200

# In vars file
# vars/main.yml
app_name: myapp
app_version: "1.0.0"

# Using variables
- name: Create directory
  file:
    path: "/opt/{{ app_name }}"
    state: directory
```

### Common modules

```yaml
# File operations
- file: path=/tmp/test state=directory mode=0755
- copy: src=file.txt dest=/tmp/file.txt
- template: src=config.j2 dest=/etc/app/config

# Package management
- apt: name=nginx state=present
- yum: name=httpd state=latest

# Service management
- service: name=nginx state=started enabled=yes

# Commands
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

- [Ansible Documentation](https://docs.ansible.com/) - Official docs
- [Ansible Galaxy](https://galaxy.ansible.com/) - Role repository
- [Ansible Examples](https://github.com/ansible/ansible-examples) - Sample playbooks
- [Ansible Best Practices](https://docs.ansible.com/ansible/latest/tips_tricks/ansible_tips_tricks.html) - Tips
