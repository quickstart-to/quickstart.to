---
title: "Ansible"
description: "Automatizacion IT sin agentes - configurar servidores, desplegar apps, orquestar workflows con playbooks YAML"
template: "tool"
tags: ["devops", "automation", "configuration"]
---

## TL;DR

**Qué**: Herramienta de automatización IT sin agentes para gestión de configuración y despliegue.

**Por qué**: No necesita agentes, sintaxis YAML simple, operaciones idempotentes, enorme biblioteca de módulos.

## Quick Start

**Instalar**:
```bash
# macOS
brew install ansible

# Linux (pip)
pip install ansible

# Verificar
ansible --version
```

**Primer comando (ad-hoc)**:
```bash
# Ping localhost
ansible localhost -m ping

# Ejecutar comando en hosts remotos
ansible all -i "server1,server2," -m shell -a "uptime"
```

**Archivo de inventario** (`hosts.ini`):
```ini
[webservers]
web1.example.com
web2.example.com

[databases]
db1.example.com
```

## Cheatsheet

| Comando | Descripción |
|---------|-------------|
| `ansible all -m ping` | Ping a todos los hosts |
| `ansible-playbook play.yml` | Ejecutar playbook |
| `ansible-playbook -i hosts play.yml` | Con inventario |
| `ansible-galaxy install role` | Instalar rol |
| `ansible-vault encrypt file` | Cifrar archivo |
| `ansible-doc -l` | Listar módulos |

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
# En el playbook
vars:
  http_port: 80
  max_clients: 200

# En archivo vars
# vars/main.yml
app_name: myapp
app_version: "1.0.0"

# Usar variables
- name: Create directory
  file:
    path: "/opt/{{ app_name }}"
    state: directory
```

### Common modules

```yaml
# Operaciones de archivos
- file: path=/tmp/test state=directory mode=0755
- copy: src=file.txt dest=/tmp/file.txt
- template: src=config.j2 dest=/etc/app/config

# Gestión de paquetes
- apt: name=nginx state=present
- yum: name=httpd state=latest

# Gestión de servicios
- service: name=nginx state=started enabled=yes

# Comandos
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

- [Documentación de Ansible](https://docs.ansible.com/) - Documentación oficial
- [Ansible Galaxy](https://galaxy.ansible.com/) - Repositorio de roles
- [Ejemplos de Ansible](https://github.com/ansible/ansible-examples) - Playbooks de ejemplo
- [Mejores prácticas de Ansible](https://docs.ansible.com/ansible/latest/tips_tricks/ansible_tips_tricks.html) - Consejos
