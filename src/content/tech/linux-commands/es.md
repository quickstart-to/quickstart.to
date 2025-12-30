---
title: "Linux Commands"
description: "Comandos Linux esenciales que todo desarrollador debería conocer"
template: "tool"
tags: ["linux", "terminal", "shell"]
---

## TL;DR

**Qué**: Herramientas de línea de comandos para navegar y gestionar sistemas Linux/Unix.

**Por qué**: Automatización, gestión de servidores remotos y productividad del desarrollador.

## Quick Start

**Navegación**:

```bash
pwd                 # Print working directory
ls                  # List files
ls -la              # List all files with details
cd /path/to/dir     # Change directory
cd ..               # Go up one level
cd ~                # Go to home directory
```

**Operaciones de archivos**:

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

| Comando | Descripción |
|---------|-------------|
| `grep pattern file` | Buscar texto en archivo |
| `find . -name "*.js"` | Encontrar archivos por nombre |
| `chmod 755 file` | Cambiar permisos |
| `chown user:group file` | Cambiar propietario |
| `ps aux` | Listar procesos |
| `kill PID` | Matar proceso |
| `top` / `htop` | Monitorear procesos |
| `df -h` | Espacio en disco |
| `du -sh dir` | Tamaño del directorio |
| `tar -czf archive.tar.gz dir` | Comprimir |
| `tar -xzf archive.tar.gz` | Extraer |
| `curl -O url` | Descargar archivo |
| `wget url` | Descargar archivo |

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
