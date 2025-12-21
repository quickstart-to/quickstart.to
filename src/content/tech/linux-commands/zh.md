---
title: "Linux 命令"
description: "开发者必备的 Linux 命令速查"
tags: ["linux", "terminal", "shell"]
---

## TL;DR

**是什么**：用于导航和管理 Linux/Unix 系统的命令行工具。

**为什么**：自动化、远程服务器管理、提升开发效率。

## Quick Start

**导航**：

```bash
pwd                 # 显示当前目录
ls                  # 列出文件
ls -la              # 列出所有文件及详情
cd /path/to/dir     # 切换目录
cd ..               # 返回上级目录
cd ~                # 返回主目录
```

**文件操作**：

```bash
cat file.txt        # 显示文件内容
less file.txt       # 分页查看文件
head -n 10 file     # 前 10 行
tail -n 10 file     # 后 10 行
tail -f log.txt     # 实时跟踪文件变化

cp source dest      # 复制文件
mv source dest      # 移动/重命名文件
rm file             # 删除文件
rm -rf dir          # 删除目录（小心！）
mkdir dirname       # 创建目录
touch file.txt      # 创建空文件
```

## Cheatsheet

| 命令 | 描述 |
|------|------|
| `grep pattern file` | 在文件中搜索文本 |
| `find . -name "*.js"` | 按名称查找文件 |
| `chmod 755 file` | 更改权限 |
| `chown user:group file` | 更改所有者 |
| `ps aux` | 列出进程 |
| `kill PID` | 终止进程 |
| `top` / `htop` | 监控进程 |
| `df -h` | 磁盘空间 |
| `du -sh dir` | 目录大小 |
| `tar -czf archive.tar.gz dir` | 压缩 |
| `tar -xzf archive.tar.gz` | 解压 |
| `curl -O url` | 下载文件 |
| `wget url` | 下载文件 |

## Gotchas

### 权限不足

```bash
# 使用 sudo 执行管理员操作
sudo command

# 或更改权限
chmod +x script.sh
```

### 命令未找到

```bash
# 检查是否已安装
which command
type command

# 安装软件包
apt install package      # Debian/Ubuntu
yum install package      # CentOS/RHEL
brew install package     # macOS
```

### 安全删除文件

```bash
# 在 rm -rf 前务必检查
ls target_dir           # 先列出
rm -rf target_dir       # 再删除

# 使用回收站代替
trash-put file          # 需先安装 trash-cli
```

### 管道和重定向

```bash
# 将输出传递给另一个命令
cat file.txt | grep "error"

# 重定向输出到文件
echo "hello" > file.txt    # 覆盖
echo "hello" >> file.txt   # 追加

# 重定向错误
command 2>&1 | tee log.txt
```

## Next Steps

- [Linux 命令行基础](https://linuxcommand.org/)
- [命令行的艺术](https://github.com/jlevy/the-art-of-command-line)
- [Explain Shell](https://explainshell.com/)
- [tldr 手册](https://tldr.sh/)
