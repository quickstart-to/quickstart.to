---
title: "Make"
description: "Build automation with Makefiles - define tasks, track dependencies, run parallel builds"
template: "tool"
tags: ["build", "automation", "cli"]
---

## TL;DR

**What**: Classic build automation tool using Makefiles.

**Why**: Universal, dependency tracking, parallel execution, simple syntax.

## Quick Start

**Create Makefile**:
```makefile
# Makefile
hello:
	echo "Hello, Make!"

build:
	go build -o app main.go

clean:
	rm -f app
```

**Run targets**:
```bash
make hello
make build
make clean
```

## Cheatsheet

| Syntax | Description |
|--------|-------------|
| `target: deps` | Define target with dependencies |
| `$(VAR)` | Variable reference |
| `$@` | Current target name |
| `$<` | First dependency |
| `$^` | All dependencies |
| `.PHONY` | Mark non-file targets |

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

- [GNU Make Manual](https://www.gnu.org/software/make/manual/) - Official docs
- [Make Tutorial](https://makefiletutorial.com/) - Interactive tutorial
- [Makefile Best Practices](https://clarkgrubb.com/makefile-style-guide) - Style guide
- [just](https://just.systems/) - Modern alternative
