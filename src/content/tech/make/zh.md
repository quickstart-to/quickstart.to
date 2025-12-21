---
title: "Make"
description: "5 分钟快速入门 Make 构建工具"
tags: ["build", "automation", "cli"]
---

## TL;DR

**是什么**：使用 Makefile 的经典构建自动化工具。

**为什么用**：通用、依赖跟踪、并行执行、简单语法。

## Quick Start

**创建 Makefile**：
```makefile
# Makefile
hello:
	echo "Hello, Make!"

build:
	go build -o app main.go

clean:
	rm -f app
```

**运行目标**：
```bash
make hello
make build
make clean
```

## Cheatsheet

| 语法 | 描述 |
|--------|-------------|
| `target: deps` | 定义带依赖的目标 |
| `$(VAR)` | 变量引用 |
| `$@` | 当前目标名 |
| `$<` | 第一个依赖 |
| `$^` | 所有依赖 |
| `.PHONY` | 标记非文件目标 |

## Gotchas

### 基础 Makefile

```makefile
# 变量
CC = gcc
CFLAGS = -Wall -g
SRC = main.c utils.c
OBJ = $(SRC:.c=.o)
TARGET = app

# 默认目标
all: $(TARGET)

# 链接
$(TARGET): $(OBJ)
	$(CC) $(CFLAGS) -o $@ $^

# 编译
%.o: %.c
	$(CC) $(CFLAGS) -c $< -o $@

# 清理
clean:
	rm -f $(OBJ) $(TARGET)

# 伪目标
.PHONY: all clean
```

### 常见模式

```makefile
# 任何语言的项目
.PHONY: all build test clean dev

# 默认
all: build

# 构建
build:
	npm run build

# 开发
dev:
	npm run dev

# 测试
test:
	npm test

# 清理
clean:
	rm -rf dist node_modules

# 安装依赖
deps:
	npm install

# 格式化代码
fmt:
	npm run format

# Lint
lint:
	npm run lint
```

### 变量和函数

```makefile
# 简单变量（使用时展开）
FILES = $(wildcard src/*.js)

# 立即变量（定义时展开）
NOW := $(shell date)

# 默认值
PORT ?= 3000

# 字符串替换
OBJS = $(SRCS:.c=.o)

# Shell 命令
VERSION = $(shell git describe --tags)

# 条件
ifdef DEBUG
  CFLAGS += -g
endif
```

### 依赖

```makefile
# 顺序依赖
deploy: test build
	./deploy.sh

# 模式规则
%.o: %.c %.h
	$(CC) -c $< -o $@

# 仅顺序先决条件（目录）
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

### 帮助目标

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

- [GNU Make 手册](https://www.gnu.org/software/make/manual/) - 官方文档
- [Make 教程](https://makefiletutorial.com/) - 交互式教程
- [Makefile 最佳实践](https://clarkgrubb.com/makefile-style-guide) - 风格指南
- [just](https://just.systems/) - 现代替代品
