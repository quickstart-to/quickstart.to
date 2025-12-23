---
title: "Pandas"
description: "5 分钟快速入门 Pandas 数据分析"
template: "tool"
tags: ["python", "data-science", "analysis"]
---

## TL;DR

**是什么**：Python 数据操作和分析库。

**为什么用**：DataFrame、易于 I/O、数据清洗、聚合、时间序列支持。

## Quick Start

**安装**：
```bash
pip install pandas
```

**Hello Pandas**：
```python
import pandas as pd

# 创建 DataFrame
df = pd.DataFrame({
    'name': ['Alice', 'Bob', 'Charlie'],
    'age': [25, 30, 35],
    'city': ['NYC', 'LA', 'Chicago']
})

print(df)
print(df.describe())
```

## Cheatsheet

| 操作 | 代码 |
|-----------|------|
| 读取 CSV | `pd.read_csv('file.csv')` |
| 读取 Excel | `pd.read_excel('file.xlsx')` |
| 写入 CSV | `df.to_csv('file.csv')` |
| 头/尾 | `df.head()`, `df.tail()` |
| 信息 | `df.info()`, `df.describe()` |
| 形状 | `df.shape` |

## Gotchas

### 选择

```python
# 列选择
df['name']           # 单列（Series）
df[['name', 'age']]  # 多列（DataFrame）

# 行选择
df.loc[0]                    # 按标签
df.iloc[0]                   # 按位置
df.loc[df['age'] > 25]       # 按条件
df.query('age > 25')         # 查询语法

# 组合
df.loc[0, 'name']            # 单个值
df.loc[0:2, ['name', 'age']] # 切片
```

### 数据清洗

```python
# 缺失值
df.isna().sum()              # 统计缺失
df.dropna()                  # 删除有缺失的行
df.fillna(0)                 # 用值填充缺失
df['age'].fillna(df['age'].mean())  # 用均值填充

# 重复值
df.duplicated().sum()        # 统计重复
df.drop_duplicates()         # 删除重复

# 数据类型
df['age'] = df['age'].astype(int)
df['date'] = pd.to_datetime(df['date'])
```

### 聚合

```python
# 基本统计
df['age'].mean()
df['age'].sum()
df['age'].max()

# 分组
df.groupby('city')['age'].mean()
df.groupby('city').agg({
    'age': ['mean', 'max'],
    'salary': 'sum'
})

# 数据透视表
pd.pivot_table(df, values='sales', index='region', columns='year', aggfunc='sum')
```

### 合并

```python
# Merge（类 SQL join）
pd.merge(df1, df2, on='id')
pd.merge(df1, df2, on='id', how='left')  # left, right, outer, inner

# Concat
pd.concat([df1, df2])              # 堆叠行
pd.concat([df1, df2], axis=1)      # 堆叠列

# 按索引 Join
df1.join(df2)
```

### 常用操作

```python
# 应用函数
df['name'] = df['name'].apply(str.upper)
df['age_group'] = df['age'].apply(lambda x: 'young' if x < 30 else 'old')

# 排序
df.sort_values('age')
df.sort_values(['city', 'age'], ascending=[True, False])

# 新列
df['salary_k'] = df['salary'] / 1000
df['full_name'] = df['first'] + ' ' + df['last']

# 重命名
df.rename(columns={'name': 'full_name'})
```

### I/O

```python
# 读取
df = pd.read_csv('data.csv')
df = pd.read_excel('data.xlsx', sheet_name='Sheet1')
df = pd.read_json('data.json')
df = pd.read_sql('SELECT * FROM table', connection)

# 写入
df.to_csv('output.csv', index=False)
df.to_excel('output.xlsx', index=False)
df.to_json('output.json')
```

## Next Steps

- [Pandas 文档](https://pandas.pydata.org/docs/) - 官方文档
- [10 分钟入门 Pandas](https://pandas.pydata.org/docs/user_guide/10min.html) - 快速入门
- [Pandas 速查表](https://pandas.pydata.org/Pandas_Cheat_Sheet.pdf) - PDF 参考
- [Pandas Cookbook](https://pandas.pydata.org/docs/user_guide/cookbook.html) - 食谱
