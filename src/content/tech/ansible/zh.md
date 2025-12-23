---
title: "Ansible"
description: "5 分钟快速入门 Ansible 自动化"
template: "tool"
tags: ["devops", "automation", "configuration"]
---

## TL;DR

**是什么**：无代理的 IT 自动化工具，用于配置管理和部署。

**为什么用**：无需代理、简单的 YAML 语法、幂等操作、丰富的模块库。

## Quick Start

**安装**：
```bash
# macOS
brew install ansible

# Linux (pip)
pip install ansible

# 验证
ansible --version
```

**第一个命令（ad-hoc）**：
```bash
# Ping 本地主机
ansible localhost -m ping

# 在远程主机上运行命令
ansible all -i "server1,server2," -m shell -a "uptime"
```

**主机清单文件**（`hosts.ini`）：
```ini
[webservers]
web1.example.com
web2.example.com

[databases]
db1.example.com
```

## Cheatsheet

| 命令 | 描述 |
|---------|-------------|
| `ansible all -m ping` | Ping 所有主机 |
| `ansible-playbook play.yml` | 运行 playbook |
| `ansible-playbook -i hosts play.yml` | 使用指定主机清单 |
| `ansible-galaxy install role` | 安装 role |
| `ansible-vault encrypt file` | 加密文件 |
| `ansible-doc -l` | 列出模块 |

## Gotchas

### 基础 playbook

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

### 变量

```yaml
# 在 playbook 中
vars:
  http_port: 80
  max_clients: 200

# 在变量文件中
# vars/main.yml
app_name: myapp
app_version: "1.0.0"

# 使用变量
- name: Create directory
  file:
    path: "/opt/{{ app_name }}"
    state: directory
```

### 常用模块

```yaml
# 文件操作
- file: path=/tmp/test state=directory mode=0755
- copy: src=file.txt dest=/tmp/file.txt
- template: src=config.j2 dest=/etc/app/config

# 包管理
- apt: name=nginx state=present
- yum: name=httpd state=latest

# 服务管理
- service: name=nginx state=started enabled=yes

# 命令
- command: /usr/bin/make
- shell: echo $HOME > /tmp/home.txt
```

### Roles 结构

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

- [Ansible 文档](https://docs.ansible.com/) - 官方文档
- [Ansible Galaxy](https://galaxy.ansible.com/) - Role 仓库
- [Ansible 示例](https://github.com/ansible/ansible-examples) - 示例 playbook
- [Ansible 最佳实践](https://docs.ansible.com/ansible/latest/tips_tricks/ansible_tips_tricks.html) - 技巧
