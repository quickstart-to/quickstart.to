---
title: "R"
description: "Get started with R programming language in 5 minutes"
tags: ["programming", "data-science", "statistics"]
---

## TL;DR

**What**: A programming language and environment for statistical computing and graphics.

**Why**: Built for statistics, excellent visualization (ggplot2), vast package ecosystem, industry standard for data science.

## Quick Start

**Install**:

macOS:
```bash
brew install r
```

Linux (Ubuntu/Debian):
```bash
sudo apt install r-base
```

Windows: Download from [r-project.org](https://www.r-project.org/)

**Verify installation**:
```bash
R --version
```

**Hello World**:

Create `hello.R`:
```r
print("Hello, World!")
```

Run it:
```bash
Rscript hello.R
```

**Interactive R**:
```bash
R
```

**Install RStudio** (recommended IDE):
Download from [posit.co](https://posit.co/download/rstudio-desktop/)

## Cheatsheet

| Command | Description |
|---------|-------------|
| `Rscript file.R` | Run R script |
| `R` | Start interactive R |
| `install.packages("pkg")` | Install package |
| `library(pkg)` | Load package |
| `help(func)` | Get help |
| `?func` | Quick help |
| `q()` | Quit R |

## Gotchas

### Vectors are 1-indexed

```r
x <- c(10, 20, 30)
x[1]    # 10 (not 0!)
x[2:3]  # 20, 30
```

### <- vs = for assignment

```r
x <- 10  # Preferred assignment
x = 10   # Also works, but <- is idiomatic

# Use = for function arguments
mean(x = c(1,2,3))
```

### Vectorized operations

```r
x <- c(1, 2, 3)
y <- c(4, 5, 6)

x + y      # c(5, 7, 9)
x * 2      # c(2, 4, 6)
x > 1      # c(FALSE, TRUE, TRUE)
```

### NA handling

```r
x <- c(1, 2, NA, 4)
mean(x)           # NA
mean(x, na.rm = TRUE)  # 2.333...
is.na(x)          # c(FALSE, FALSE, TRUE, FALSE)
```

## Next Steps

- [R Documentation](https://www.r-project.org/other-docs.html) - Official docs
- [R for Data Science](https://r4ds.hadley.nz/) - Free online book
- [tidyverse](https://www.tidyverse.org/) - Data science packages
- [CRAN](https://cran.r-project.org/) - Package repository
