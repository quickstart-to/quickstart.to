---
title: "Go"
description: "简洁、高效、并发 - 用 Go 构建可靠的云服务和命令行工具"
template: "language"
tags: ["programming", "backend", "systems"]
---

## TL;DR

**一句话**：Go 是一门简单、快速的语言，让构建可靠软件变得容易。

**核心优势**：
- 编译成单一二进制文件，随处部署
- 内置 goroutine 并发支持
- 编译速度快，像脚本语言一样流畅
- 语法简单，一件事只有一种做法

## Philosophy

Go 是 Google 为解决实际问题而创建的：

- **简单优于巧妙** - 少即是多。不滥用泛型，不玩魔法。
- **组合优于继承** - 用接口和嵌入代替类层次结构
- **显式优于隐式** - 错误处理虽繁琐但清晰可见
- **快速构建，快速执行** - 开发者体验很重要

Go 故意省略了一些特性（异常、泛型直到 1.18、三元运算符）来保持简单可读。

## Quick Start

### 安装

```bash
# macOS
brew install go

# Linux
wget https://go.dev/dl/go1.24.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.24.linux-amd64.tar.gz
export PATH=$PATH:/usr/local/go/bin
```

### 验证（最新稳定版：1.24）

```bash
go version  # go version go1.24 linux/amd64
```

### 第一个程序

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

```bash
go run main.go
```

## Language Essentials

### 变量与类型

```go
// 类型推断
name := "Alice"      // string
age := 25            // int
height := 1.75       // float64
active := true       // bool

// 显式类型
var count int = 10
var items []string   // slice（动态数组）
var data map[string]int  // map
```

### 控制流

```go
// if-else（不需要括号）
if age >= 18 {
    fmt.Println("成年人")
} else if age >= 13 {
    fmt.Println("青少年")
} else {
    fmt.Println("儿童")
}

// for 循环（唯一的循环）
for i := 0; i < 5; i++ {
    fmt.Println(i)
}

// range 遍历 slice
for index, value := range items {
    fmt.Println(index, value)
}

// while 风格
for count > 0 {
    count--
}
```

### 函数

```go
// 基本函数
func greet(name string) string {
    return "Hello, " + name
}

// 多返回值
func divide(a, b int) (int, error) {
    if b == 0 {
        return 0, errors.New("除数不能为零")
    }
    return a / b, nil
}

// 使用
result, err := divide(10, 2)
if err != nil {
    log.Fatal(err)
}
```

### 错误处理

```go
// 错误是值，显式检查
file, err := os.Open("file.txt")
if err != nil {
    log.Fatal(err)
}
defer file.Close()  // 函数退出时运行

// 没有 try-catch，没有异常
```

### Goroutine 与 Channel

```go
// 启动 goroutine
go doSomething()

// Channel 用于通信
ch := make(chan int)
go func() { ch <- 42 }()
value := <-ch  // 接收
```

## Gotchas

### 未使用的变量导致编译错误

```go
x := 5  // error: x declared but not used

// 用空白标识符忽略
_ = someFunction()
```

### 导出的名称首字母大写

```go
// 公开（包外可见）
func PublicFunc() {}
type PublicStruct struct {}

// 私有（仅包内）
func privateFunc() {}
```

### nil slice vs 空 slice

```go
var s1 []int         // nil slice, len=0, cap=0
s2 := []int{}        // 空 slice, len=0, cap=0
s3 := make([]int, 0) // 空 slice, len=0, cap=0
// s1 == nil 是 true，s2 == nil 是 false
```

### 指针存在但没有指针运算

```go
x := 10
p := &x      // 取指针
*p = 20      // 解引用
fmt.Println(x)  // 20
```

## When to Choose

**适合**：
- 云服务和 API（Kubernetes、Docker 都是用 Go 写的）
- CLI 工具（启动快，单一二进制）
- 微服务（优秀的并发模型）
- DevOps 工具

**不适合**：
- GUI 应用（生态有限）
- 数据科学（用 Python）
- 前端（用 JavaScript/TypeScript）

**对比**：
| 方面 | Go | Rust | Python |
|------|-----|------|--------|
| 速度 | 快 | 最快 | 慢 |
| 内存 | GC | 手动（安全） | GC |
| 学习 | 简单 | 困难 | 最简单 |
| 用途 | 云/CLI | 系统 | 脚本/AI |

## Next Steps

- [Go 之旅](https://go.dev/tour/) - 交互式教程
- [Effective Go](https://go.dev/doc/effective_go) - 最佳实践
- [Go by Example](https://gobyexample.com/) - 代码示例
- [Go Wiki](https://go.dev/wiki/)

## Ecosystem

### 包管理器

```bash
go mod init myproject  # 初始化模块
go get pkg             # 添加依赖
go mod tidy            # 清理依赖
```

### 主流包

- **Web**：Gin、Echo、Fiber、Chi
- **数据库**：GORM、sqlx
- **测试**：testify、gomock
- **CLI**：Cobra、urfave/cli
