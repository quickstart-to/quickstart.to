---
title: "R"
description: "5 分钟快速入门 R 编程语言"
tags: ["programming", "data-science", "statistics"]
---

## TL;DR

**是什么**：用于统计计算和图形的编程语言和环境。

**为什么用**：专为统计设计、出色的可视化（ggplot2）、庞大的包生态系统、数据科学行业标准。

## Quick Start

**安装**：

macOS:
```bash
brew install r
```

Linux (Ubuntu/Debian):
```bash
sudo apt install r-base
```

Windows: 从 [r-project.org](https://www.r-project.org/) 下载

**验证安装**：
```bash
R --version
```

**Hello World**：

创建 `hello.R`：
```r
print("Hello, World!")
```

运行：
```bash
Rscript hello.R
```

**交互式 R**：
```bash
R
```

**安装 RStudio**（推荐的 IDE）：
从 [posit.co](https://posit.co/download/rstudio-desktop/) 下载

## Cheatsheet

| 命令 | 描述 |
|---------|-------------|
| `Rscript file.R` | 运行 R 脚本 |
| `R` | 启动交互式 R |
| `install.packages("pkg")` | 安装包 |
| `library(pkg)` | 加载包 |
| `help(func)` | 获取帮助 |
| `?func` | 快速帮助 |
| `q()` | 退出 R |

## Gotchas

### 向量索引从 1 开始

```r
x <- c(10, 20, 30)
x[1]    # 10（不是 0！）
x[2:3]  # 20, 30
```

### <- vs = 赋值

```r
x <- 10  # 首选赋值方式
x = 10   # 也可以，但 <- 更地道

# 函数参数使用 =
mean(x = c(1,2,3))
```

### 向量化操作

```r
x <- c(1, 2, 3)
y <- c(4, 5, 6)

x + y      # c(5, 7, 9)
x * 2      # c(2, 4, 6)
x > 1      # c(FALSE, TRUE, TRUE)
```

### NA 处理

```r
x <- c(1, 2, NA, 4)
mean(x)           # NA
mean(x, na.rm = TRUE)  # 2.333...
is.na(x)          # c(FALSE, FALSE, TRUE, FALSE)
```

## Next Steps

- [R 文档](https://www.r-project.org/other-docs.html) - 官方文档
- [R 数据科学](https://r4ds.hadley.nz/) - 免费在线书籍
- [tidyverse](https://www.tidyverse.org/) - 数据科学包
- [CRAN](https://cran.r-project.org/) - 包仓库
