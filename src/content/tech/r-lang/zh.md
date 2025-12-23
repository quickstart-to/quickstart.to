---
title: "R"
description: "5 分钟快速入门 R 编程语言"
template: "language"
tags: ["programming", "data-science", "statistics"]
---

## TL;DR

**一句话**：R 是统计学家的语言——专为数据分析和可视化而生。

**核心优势**：
- 内置统计函数
- 一流的可视化（ggplot2）
- Tidyverse 现代数据处理
- CRAN 上有 20,000+ 包

## Philosophy

R 是由统计学家为统计学家设计的：

- **向量优先** - 一切都是向量。操作默认向量化。
- **交互式分析** - 为探索性数据分析设计，不是生产系统
- **函数式风格** - 函数是一等公民，偏好不可变数据
- **领域专用** - 不是通用语言，但在其领域很出色

R 优先考虑统计正确性和分析便利性，而非原始性能。

## Quick Start

### 安装

```bash
# macOS
brew install r

# Linux (Ubuntu)
sudo apt install r-base

# Windows - 从 r-project.org 下载
```

### 验证（最新版：4.5.2）

```bash
R --version  # R version 4.5.2
```

### 第一个程序

创建 `hello.R`：
```r
print("Hello, World!")
```

```bash
Rscript hello.R
```

### 交互式 R

```bash
R
> 2 + 2
[1] 4
> mean(c(1, 2, 3, 4, 5))
[1] 3
```

### RStudio（推荐 IDE）

从 [posit.co](https://posit.co/download/rstudio-desktop/) 下载

## Language Essentials

### 变量与类型

```r
# 变量（用 <- 赋值）
name <- "Alice"
age <- 25
price <- 19.99
active <- TRUE

# 向量（基础数据结构）
numbers <- c(1, 2, 3, 4, 5)
names <- c("Alice", "Bob", "Carol")

# 数据框（表格）
df <- data.frame(
  name = c("Alice", "Bob"),
  age = c(25, 30)
)
```

### 控制流

```r
# if-else
if (age >= 18) {
  print("成年人")
} else if (age >= 13) {
  print("青少年")
} else {
  print("儿童")
}

# ifelse（向量化）
status <- ifelse(age >= 18, "成年人", "未成年")

# for 循环
for (i in 1:5) {
  print(i)
}

# 但优先使用向量化操作！
```

### 函数

```r
# 定义函数
greet <- function(name, greeting = "Hello") {
  paste(greeting, name, sep = ", ")
}

greet("Alice")           # "Hello, Alice"
greet("Bob", "Hi")       # "Hi, Bob"

# 匿名函数（R 4.1+）
add <- \(a, b) a + b
add(2, 3)  # 5
```

### 向量化操作

```r
x <- c(1, 2, 3, 4, 5)
y <- c(10, 20, 30, 40, 50)

# 操作逐元素应用
x + y      # c(11, 22, 33, 44, 55)
x * 2      # c(2, 4, 6, 8, 10)
x > 3      # c(FALSE, FALSE, FALSE, TRUE, TRUE)

# 函数作用于向量
mean(x)    # 3
sum(x)     # 15
sqrt(x)    # c(1, 1.41, 1.73, 2, 2.24)
```

### 数据处理（Tidyverse）

```r
library(dplyr)

# 管道运算符
df |>
  filter(age > 25) |>
  select(name, age) |>
  arrange(desc(age))

# 现代 tidyverse 风格
df |>
  mutate(age_group = ifelse(age >= 30, "资深", "初级")) |>
  group_by(age_group) |>
  summarize(count = n(), avg_age = mean(age))
```

## Gotchas

### 向量索引从 1 开始

```r
x <- c(10, 20, 30)
x[1]    # 10（不是 0！）
x[2:3]  # c(20, 30)
x[-1]   # c(20, 30) - 负数表示排除
```

### <- vs = 赋值

```r
x <- 10  # 首选，总是有效
x = 10   # 也可以，但 <- 更地道

# 函数调用中的重要区别
mean(x = c(1,2,3))  # x 是参数
mean(x <- c(1,2,3)) # x 被赋值并传递
```

### NA 处理

```r
x <- c(1, 2, NA, 4)

mean(x)               # NA（NA 会传播！）
mean(x, na.rm = TRUE) # 2.333...

is.na(x)              # c(FALSE, FALSE, TRUE, FALSE)
na.omit(x)            # c(1, 2, 4)
```

### Factor 陷阱

```r
f <- factor(c("a", "b", "a"))
levels(f)     # c("a", "b")

# 转换时小心
as.numeric(factor(c("3", "1", "2")))  # c(2, 1, 3) - 不是 c(3, 1, 2)！

# 正确方式
as.numeric(as.character(factor(c("3", "1", "2"))))  # c(3, 1, 2)
```

## When to Choose

**适合**：
- 统计分析
- 数据可视化
- 学术研究
- 探索性数据分析

**不适合**：
- Web 开发
- 生产系统
- 通用编程
- 实时应用

**对比**：
| 方面 | R | Python | Julia |
|------|---|--------|-------|
| 统计 | 优秀 | 良好 | 成长中 |
| 可视化 | ggplot2 | matplotlib | Makie |
| 速度 | 慢 | 中等 | 快 |
| 社区 | 统计/生物 | 通用 | 科学 |

## Next Steps

- [R 数据科学](https://r4ds.hadley.nz/)
- [tidyverse](https://www.tidyverse.org/)
- [R 文档](https://www.r-project.org/other-docs.html)
- [CRAN](https://cran.r-project.org/)

## Ecosystem

### 包管理

```r
# 从 CRAN 安装
install.packages("tidyverse")

# 加载包
library(tidyverse)

# 查看已安装的包
installed.packages()
```

### 核心包

- **数据**：dplyr、tidyr、data.table
- **可视化**：ggplot2、plotly
- **建模**：caret、tidymodels
- **报告**：rmarkdown、Quarto
