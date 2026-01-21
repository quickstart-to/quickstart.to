---
title: "Linux Commands"
description: "Essential Linux commands every developer should know"
template: "tool"
tags: ["linux", "terminal", "shell"]
---

## TL;DR

**What**: Command-line tools for navigating and managing Linux/Unix systems.

**Why**: Automation, remote server management, and developer productivity.

## Quick Start

**Navigation**:

```bash
pwd                 # Print working directory
ls                  # List files
ls -la              # List all files with details
cd /path/to/dir     # Change directory
cd ..               # Go up one level
cd ~                # Go to home directory
```

**File operations**:

```bash
cat file.txt        # Display file content
less file.txt       # View file with pagination
head -n 10 file     # First 10 lines
tail -n 10 file     # Last 10 lines
tail -f log.txt     # Follow file changes

cp source dest      # Copy file
mv source dest      # Move/rename file
rm file             # Remove file
rm -rf dir          # Remove directory (careful!)
mkdir dirname       # Create directory
touch file.txt      # Create empty file
```

## Cheatsheet

| Command | Description |
|---------|-------------|
| `grep pattern file` | Search text in file |
| `find . -name "*.js"` | Find files by name |
| `chmod 755 file` | Change permissions |
| `chown user:group file` | Change ownership |
| `ps aux` | List processes |
| `kill PID` | Kill process |
| `top` / `htop` | Monitor processes |
| `df -h` | Disk space |
| `du -sh dir` | Directory size |
| `tar -czf archive.tar.gz dir` | Compress |
| `tar -xzf archive.tar.gz` | Extract |
| `curl -O url` | Download file |
| `wget url` | Download file |

## Gotchas

### Permission denied

```bash
# Add sudo for admin operations
sudo command

# Or change permissions
chmod +x script.sh
```

### Command not found

```bash
# Check if installed
which command
type command

# Install the package
apt install package      # Debian/Ubuntu
yum install package      # CentOS/RHEL
brew install package     # macOS
```

### Delete files safely

```bash
# Always double-check before rm -rf
ls target_dir           # List first
rm -rf target_dir       # Then delete

# Use trash instead
trash-put file          # Install trash-cli first
```

### Pipe and redirect

```bash
# Pipe output to another command
cat file.txt | grep "error"

# Redirect output to file
echo "hello" > file.txt    # Overwrite
echo "hello" >> file.txt   # Append

# Redirect errors
command 2>&1 | tee log.txt
```

## Next Steps

- [Linux Command Line Basics](https://linuxcommand.org/)
- [The Art of Command Line](https://github.com/jlevy/the-art-of-command-line)
- [Explain Shell](https://explainshell.com/)
- [tldr pages](https://tldr.sh/)
