---
title: "Linux Commands"
description: "Essentielle Linux-Befehle, die jeder Entwickler kennen sollte"
template: "tool"
tags: ["linux", "terminal", "shell"]
---

## TL;DR

**Was**: Kommandozeilen-Tools zur Navigation und Verwaltung von Linux/Unix-Systemen.

**Warum**: Automatisierung, Remote-Server-Verwaltung und Entwicklerproduktivität.

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

**Dateioperationen**:

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

| Befehl | Beschreibung |
|---------|-------------|
| `grep pattern file` | Text in Datei suchen |
| `find . -name "*.js"` | Dateien nach Namen finden |
| `chmod 755 file` | Berechtigungen ändern |
| `chown user:group file` | Besitzer ändern |
| `ps aux` | Prozesse auflisten |
| `kill PID` | Prozess beenden |
| `top` / `htop` | Prozesse überwachen |
| `df -h` | Speicherplatz |
| `du -sh dir` | Verzeichnisgröße |
| `tar -czf archive.tar.gz dir` | Komprimieren |
| `tar -xzf archive.tar.gz` | Entpacken |
| `curl -O url` | Datei herunterladen |
| `wget url` | Datei herunterladen |

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
