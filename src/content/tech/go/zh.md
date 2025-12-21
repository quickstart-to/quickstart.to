---
title: "Go"
description: "5 分钟快速入门 Go 编程语言"
tags: ["programming", "backend", "systems"]
---

## TL;DR

**是什么**：一种静态类型、编译型语言，设计简洁高效。

**为什么用**：编译速度快、内置并发支持、语法简单，非常适合云服务和后端开发。

## Quick Start

**安装**：

macOS:
```bash
brew install go
```

Linux:
```bash
wget https://go.dev/dl/go1.23.4.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.23.4.linux-amd64.tar.gz
export PATH=$PATH:/usr/local/go/bin
```

Windows: 从 [go.dev/dl](https://go.dev/dl/) 下载安装

**验证安装**：
```bash
go version
```

**Hello World**：
```bash
mkdir hello && cd hello
go mod init hello
```

创建 `main.go`：
```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
```

运行：
```bash
go run main.go
```

## Cheatsheet

| 命令 | 描述 |
|---------|-------------|
| `go run file.go` | 运行 Go 文件 |
| `go build` | 编译包 |
| `go mod init name` | 初始化模块 |
| `go mod tidy` | 清理依赖 |
| `go get pkg` | 添加依赖 |
| `go test` | 运行测试 |
| `go fmt` | 格式化代码 |
| `go vet` | 检查代码问题 |

## Gotchas

### GOPATH vs Go Modules

```bash
# 使用 Go Modules（现代方式）
go mod init myproject
# GOPATH 是旧方式，Go 1.16 后默认使用 modules
```

### 未使用的变量会导致编译错误

```go
// 这段代码无法编译
x := 5  // 未使用的变量

// 如果需要忽略返回值，使用空白标识符
_ = someFunction()
```

### 导出的名称首字母大写

```go
// 公开（导出）
func PublicFunc() {}

// 私有（未导出）
func privateFunc() {}
```

## Next Steps

- [Go 之旅](https://go.dev/tour/) - 交互式教程
- [Effective Go](https://go.dev/doc/effective_go) - 最佳实践
- [Go by Example](https://gobyexample.com/) - 代码示例
- [Go 官方文档](https://go.dev/doc/)
