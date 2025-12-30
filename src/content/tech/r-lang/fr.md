---
title: "R"
description: "Specialiste du calcul statistique - analyse de donnees et visualisation avec ggplot2 et ecosysteme Tidyverse"
template: "language"
tags: ["programming", "data-science", "statistics"]
---

## TL;DR

**En bref** : R est le langage des statisticiens - conçu pour l'analyse de données et la visualisation.

**Points forts** :
- Fonctions statistiques intégrées
- Visualisation de premier ordre (ggplot2)
- Tidyverse pour la manipulation moderne des données
- 20 000+ packages sur CRAN

## Philosophy

R a été construit par des statisticiens pour des statisticiens :

- **Vecteurs d'abord** - Tout est un vecteur. Les opérations sont vectorisées par défaut.
- **Analyse interactive** - Conçu pour l'analyse exploratoire, pas pour les systèmes de production
- **Style fonctionnel** - Fonctions comme citoyens de première classe, données immuables préférées
- **Spécifique au domaine** - Pas généraliste, mais excellent dans ce qu'il fait

R privilégie la justesse statistique et la facilité d'analyse plutôt que les performances brutes.

## Quick Start

### Install

```bash
# macOS
brew install r

# Linux (Ubuntu)
sudo apt install r-base

# Windows - download from r-project.org
```

### Verify (latest: 4.5.2)

```bash
R --version  # R version 4.5.2
```

### First Program

Créez `hello.R` :
```r
print("Hello, World!")
```

```bash
Rscript hello.R
```

### Interactive R

```bash
R
> 2 + 2
[1] 4
> mean(c(1, 2, 3, 4, 5))
[1] 3
```

### RStudio (IDE recommandé)

Télécharger depuis [posit.co](https://posit.co/download/rstudio-desktop/)

## Language Essentials

### Variables & Types

```r
# Variables (use <- for assignment)
name <- "Alice"
age <- 25
price <- 19.99
active <- TRUE

# Vectors (fundamental data structure)
numbers <- c(1, 2, 3, 4, 5)
names <- c("Alice", "Bob", "Carol")

# Data frames (tables)
df <- data.frame(
  name = c("Alice", "Bob"),
  age = c(25, 30)
)
```

### Control Flow

```r
# if-else
if (age >= 18) {
  print("Adult")
} else if (age >= 13) {
  print("Teen")
} else {
  print("Child")
}

# ifelse (vectorized)
status <- ifelse(age >= 18, "Adult", "Minor")

# for loop
for (i in 1:5) {
  print(i)
}

# But prefer vectorized operations!
```

### Functions

```r
# Define function
greet <- function(name, greeting = "Hello") {
  paste(greeting, name, sep = ", ")
}

greet("Alice")           # "Hello, Alice"
greet("Bob", "Hi")       # "Hi, Bob"

# Anonymous function (R 4.1+)
add <- \(a, b) a + b
add(2, 3)  # 5
```

### Vectorized Operations

```r
x <- c(1, 2, 3, 4, 5)
y <- c(10, 20, 30, 40, 50)

# Operations apply element-wise
x + y      # c(11, 22, 33, 44, 55)
x * 2      # c(2, 4, 6, 8, 10)
x > 3      # c(FALSE, FALSE, FALSE, TRUE, TRUE)

# Functions work on vectors
mean(x)    # 3
sum(x)     # 15
sqrt(x)    # c(1, 1.41, 1.73, 2, 2.24)
```

### Data Manipulation (Tidyverse)

```r
library(dplyr)

# Pipe operator
df |>
  filter(age > 25) |>
  select(name, age) |>
  arrange(desc(age))

# Modern tidyverse style
df |>
  mutate(age_group = ifelse(age >= 30, "Senior", "Junior")) |>
  group_by(age_group) |>
  summarize(count = n(), avg_age = mean(age))
```

## Gotchas

### Les vecteurs sont indexés à partir de 1

```r
x <- c(10, 20, 30)
x[1]    # 10 (not 0!)
x[2:3]  # c(20, 30)
x[-1]   # c(20, 30) - negative means exclude
```

### <- vs = pour l'assignation

```r
x <- 10  # Preferred, always works
x = 10   # Works, but <- is idiomatic

# Important difference in function calls
mean(x = c(1,2,3))  # x is an argument
mean(x <- c(1,2,3)) # x is assigned AND passed
```

### Gestion des NA

```r
x <- c(1, 2, NA, 4)

mean(x)               # NA (NA propagates!)
mean(x, na.rm = TRUE) # 2.333...

is.na(x)              # c(FALSE, FALSE, TRUE, FALSE)
na.omit(x)            # c(1, 2, 4)
```

### Surprises avec les facteurs

```r
f <- factor(c("a", "b", "a"))
levels(f)     # c("a", "b")

# Be careful with conversions
as.numeric(factor(c("3", "1", "2")))  # c(2, 1, 3) - NOT c(3, 1, 2)!

# Correct way
as.numeric(as.character(factor(c("3", "1", "2"))))  # c(3, 1, 2)
```

## When to Choose

**Idéal pour** :
- Analyse statistique
- Visualisation de données
- Recherche académique
- Analyse exploratoire des données

**Moins adapté pour** :
- Développement web
- Systèmes de production
- Programmation générale
- Applications temps réel

**Comparaison** :
| Aspect | R | Python | Julia |
|--------|---|--------|-------|
| Stats | Excellent | Bon | En croissance |
| Viz | ggplot2 | matplotlib | Makie |
| Vitesse | Lent | Moyen | Rapide |
| Communauté | Stats/Bio | Général | Scientifique |

## Next Steps

- [R for Data Science](https://r4ds.hadley.nz/)
- [tidyverse](https://www.tidyverse.org/)
- [R Documentation](https://www.r-project.org/other-docs.html)
- [CRAN](https://cran.r-project.org/)

## Ecosystem

### Package Management

```r
# Install from CRAN
install.packages("tidyverse")

# Load package
library(tidyverse)

# Check installed packages
installed.packages()
```

### Essential Packages

- **Données** : dplyr, tidyr, data.table
- **Visualisation** : ggplot2, plotly
- **Modélisation** : caret, tidymodels
- **Reporting** : rmarkdown, Quarto
