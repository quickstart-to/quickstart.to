---
title: "Pandas"
description: "Starten Sie mit Pandas Datenanalyse in 5 Minuten"
template: "tool"
tags: ["python", "data-science", "analysis"]
---

## TL;DR

**Was**: Python-Bibliothek für Datenmanipulation und -analyse.

**Warum**: DataFrames, einfache I/O, Datenbereinigung, Aggregation, Zeitreihen-Support.

## Quick Start

**Installation**:
```bash
pip install pandas
```

**Hello Pandas**:
```python
import pandas as pd

# Create DataFrame
df = pd.DataFrame({
    'name': ['Alice', 'Bob', 'Charlie'],
    'age': [25, 30, 35],
    'city': ['NYC', 'LA', 'Chicago']
})

print(df)
print(df.describe())
```

## Cheatsheet

| Operation | Code |
|-----------|------|
| CSV lesen | `pd.read_csv('file.csv')` |
| Excel lesen | `pd.read_excel('file.xlsx')` |
| CSV schreiben | `df.to_csv('file.csv')` |
| Head/Tail | `df.head()`, `df.tail()` |
| Info | `df.info()`, `df.describe()` |
| Form | `df.shape` |

## Gotchas

### Selection

```python
# Column selection
df['name']           # Single column (Series)
df[['name', 'age']]  # Multiple columns (DataFrame)

# Row selection
df.loc[0]                    # By label
df.iloc[0]                   # By position
df.loc[df['age'] > 25]       # By condition
df.query('age > 25')         # Query syntax

# Combined
df.loc[0, 'name']            # Single value
df.loc[0:2, ['name', 'age']] # Slice
```

### Data cleaning

```python
# Missing values
df.isna().sum()              # Count missing
df.dropna()                  # Drop rows with missing
df.fillna(0)                 # Fill missing with value
df['age'].fillna(df['age'].mean())  # Fill with mean

# Duplicates
df.duplicated().sum()        # Count duplicates
df.drop_duplicates()         # Remove duplicates

# Data types
df['age'] = df['age'].astype(int)
df['date'] = pd.to_datetime(df['date'])
```

### Aggregation

```python
# Basic stats
df['age'].mean()
df['age'].sum()
df['age'].max()

# Group by
df.groupby('city')['age'].mean()
df.groupby('city').agg({
    'age': ['mean', 'max'],
    'salary': 'sum'
})

# Pivot table
pd.pivot_table(df, values='sales', index='region', columns='year', aggfunc='sum')
```

### Merging

```python
# Merge (SQL-like join)
pd.merge(df1, df2, on='id')
pd.merge(df1, df2, on='id', how='left')  # left, right, outer, inner

# Concat
pd.concat([df1, df2])              # Stack rows
pd.concat([df1, df2], axis=1)      # Stack columns

# Join by index
df1.join(df2)
```

### Common operations

```python
# Apply function
df['name'] = df['name'].apply(str.upper)
df['age_group'] = df['age'].apply(lambda x: 'young' if x < 30 else 'old')

# Sorting
df.sort_values('age')
df.sort_values(['city', 'age'], ascending=[True, False])

# New columns
df['salary_k'] = df['salary'] / 1000
df['full_name'] = df['first'] + ' ' + df['last']

# Rename
df.rename(columns={'name': 'full_name'})
```

### I/O

```python
# Read
df = pd.read_csv('data.csv')
df = pd.read_excel('data.xlsx', sheet_name='Sheet1')
df = pd.read_json('data.json')
df = pd.read_sql('SELECT * FROM table', connection)

# Write
df.to_csv('output.csv', index=False)
df.to_excel('output.xlsx', index=False)
df.to_json('output.json')
```

## Next Steps

- [Pandas Documentation](https://pandas.pydata.org/docs/) - Offizielle Dokumentation
- [10 Minutes to Pandas](https://pandas.pydata.org/docs/user_guide/10min.html) - Schnelleinführung
- [Pandas Cheat Sheet](https://pandas.pydata.org/Pandas_Cheat_Sheet.pdf) - PDF-Referenz
- [Pandas Cookbook](https://pandas.pydata.org/docs/user_guide/cookbook.html) - Rezepte
