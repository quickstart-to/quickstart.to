---
title: "Scikit-learn"
description: "5 分钟快速入门 Scikit-learn"
template: "tool"
tags: ["python", "machine-learning", "data-science"]
---

## TL;DR

**是什么**：Python 最流行的经典机器学习库。

**为什么用**：简单 API、全面算法、优秀文档、预处理工具。

## Quick Start

**安装**：
```bash
pip install scikit-learn
```

**Hello Scikit-learn**：
```python
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# 加载数据
iris = load_iris()
X_train, X_test, y_train, y_test = train_test_split(
    iris.data, iris.target, test_size=0.2, random_state=42
)

# 训练
model = RandomForestClassifier()
model.fit(X_train, y_train)

# 预测
predictions = model.predict(X_test)
print(f"Accuracy: {accuracy_score(y_test, predictions):.2f}")
```

## Cheatsheet

| 算法类型 | 类 |
|---------------|---------|
| 分类 | `LogisticRegression`, `SVC`, `RandomForestClassifier` |
| 回归 | `LinearRegression`, `SVR`, `RandomForestRegressor` |
| 聚类 | `KMeans`, `DBSCAN`, `AgglomerativeClustering` |
| 降维 | `PCA`, `TSNE`, `LDA` |
| 预处理 | `StandardScaler`, `MinMaxScaler`, `LabelEncoder` |

## Gotchas

### 预处理

```python
from sklearn.preprocessing import StandardScaler, LabelEncoder, OneHotEncoder
from sklearn.impute import SimpleImputer

# 数值缩放
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# 标签编码
encoder = LabelEncoder()
y_encoded = encoder.fit_transform(['cat', 'dog', 'cat'])

# 独热编码
onehot = OneHotEncoder(sparse_output=False)
X_onehot = onehot.fit_transform(X_categorical)

# 处理缺失值
imputer = SimpleImputer(strategy='mean')
X_imputed = imputer.fit_transform(X)
```

### Pipeline

```python
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVC

pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('svm', SVC(kernel='rbf'))
])

pipeline.fit(X_train, y_train)
predictions = pipeline.predict(X_test)
```

### 交叉验证

```python
from sklearn.model_selection import cross_val_score, GridSearchCV

# 简单交叉验证
scores = cross_val_score(model, X, y, cv=5)
print(f"Mean accuracy: {scores.mean():.2f} (+/- {scores.std() * 2:.2f})")

# 网格搜索
param_grid = {
    'n_estimators': [50, 100, 200],
    'max_depth': [None, 10, 20]
}

grid_search = GridSearchCV(
    RandomForestClassifier(),
    param_grid,
    cv=5,
    scoring='accuracy'
)
grid_search.fit(X_train, y_train)

print(f"Best params: {grid_search.best_params_}")
print(f"Best score: {grid_search.best_score_:.2f}")
```

### 模型评估

```python
from sklearn.metrics import (
    classification_report, confusion_matrix,
    mean_squared_error, r2_score
)

# 分类
print(classification_report(y_test, predictions))
print(confusion_matrix(y_test, predictions))

# 回归
mse = mean_squared_error(y_test, predictions)
r2 = r2_score(y_test, predictions)
print(f"MSE: {mse:.2f}, R2: {r2:.2f}")
```

### 常用算法

```python
# 分类
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.naive_bayes import GaussianNB

# 回归
from sklearn.linear_model import Ridge, Lasso
from sklearn.tree import DecisionTreeRegressor

# 聚类
from sklearn.cluster import KMeans, DBSCAN
```

## Next Steps

- [Scikit-learn 文档](https://scikit-learn.org/stable/) - 官方文档
- [用户指南](https://scikit-learn.org/stable/user_guide.html) - 教程
- [API 参考](https://scikit-learn.org/stable/modules/classes.html) - 完整 API
- [示例](https://scikit-learn.org/stable/auto_examples/) - 代码示例
