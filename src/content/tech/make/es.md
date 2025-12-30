---
title: "Make"
description: "Comienza con la herramienta de construcción Make en 5 minutos"
template: "tool"
tags: ["build", "automation", "cli"]
---

## TL;DR

**Qué**: Herramienta clásica de automatización de construcción usando Makefiles.

**Por qué**: Universal, seguimiento de dependencias, ejecución paralela, sintaxis simple.

## Quick Start

**Crear Makefile**:
```makefile
# Makefile
hello:
	echo "Hello, Make!"

build:
	go build -o app main.go

clean:
	rm -f app
```

**Ejecutar targets**:
```bash
make hello
make build
make clean
```

## Cheatsheet

| Sintaxis | Descripción |
|--------|-------------|
| `target: deps` | Definir target con dependencias |
| `$(VAR)` | Referencia de variable |
| `$@` | Nombre del target actual |
| `$<` | Primera dependencia |
| `$^` | Todas las dependencias |
| `.PHONY` | Marcar targets que no son archivos |

## Gotchas

### Basic Makefile

```makefile
# Variables
CC = gcc
CFLAGS = -Wall -g
SRC = main.c utils.c
OBJ = $(SRC:.c=.o)
TARGET = app

# Default target
all: $(TARGET)

# Link
$(TARGET): $(OBJ)
	$(CC) $(CFLAGS) -o $@ $^

# Compile
%.o: %.c
	$(CC) $(CFLAGS) -c $< -o $@

# Clean
clean:
	rm -f $(OBJ) $(TARGET)

# Phony targets
.PHONY: all clean
```

### Common patterns

```makefile
# Project for any language
.PHONY: all build test clean dev

# Default
all: build

# Build
build:
	npm run build

# Development
dev:
	npm run dev

# Test
test:
	npm test

# Clean
clean:
	rm -rf dist node_modules

# Install dependencies
deps:
	npm install

# Format code
fmt:
	npm run format

# Lint
lint:
	npm run lint
```

### Variables and functions

```makefile
# Simple variable (expanded when used)
FILES = $(wildcard src/*.js)

# Immediate variable (expanded when defined)
NOW := $(shell date)

# Default value
PORT ?= 3000

# String substitution
OBJS = $(SRCS:.c=.o)

# Shell command
VERSION = $(shell git describe --tags)

# Conditional
ifdef DEBUG
  CFLAGS += -g
endif
```

### Dependencies

```makefile
# Sequential dependencies
deploy: test build
	./deploy.sh

# Pattern rule
%.o: %.c %.h
	$(CC) -c $< -o $@

# Order-only prerequisites (directories)
$(OBJ): | build_dir

build_dir:
	mkdir -p build
```

### Docker Makefile

```makefile
.PHONY: build run push clean

IMAGE = myapp
TAG = latest

build:
	docker build -t $(IMAGE):$(TAG) .

run:
	docker run -p 3000:3000 $(IMAGE):$(TAG)

push:
	docker push $(IMAGE):$(TAG)

shell:
	docker run -it $(IMAGE):$(TAG) /bin/sh

clean:
	docker rmi $(IMAGE):$(TAG)
```

### Help target

```makefile
.PHONY: help
help:
	@echo "Available targets:"
	@echo "  build    - Build the application"
	@echo "  test     - Run tests"
	@echo "  clean    - Remove build artifacts"
	@echo "  deploy   - Deploy to production"
```

## Next Steps

- [GNU Make Manual](https://www.gnu.org/software/make/manual/) - Documentación oficial
- [Make Tutorial](https://makefiletutorial.com/) - Tutorial interactivo
- [Makefile Best Practices](https://clarkgrubb.com/makefile-style-guide) - Guía de estilo
- [just](https://just.systems/) - Alternativa moderna
