---
title: "Scikit-learn"
description: "Comienza con Scikit-learn en 5 minutos"
template: "tool"
tags: ["python", "machine-learning", "data-science"]
---

## TL;DR

**Qué**: La biblioteca de machine learning más popular de Python para ML clásico.

**Por qué**: API simple, algoritmos completos, excelente documentación, herramientas de preprocesamiento.

## Quick Start

**Instalar**:
```bash
pip install scikit-learn
```

**Hello Scikit-learn**:
```python
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# Load data
iris = load_iris()
X_train, X_test, y_train, y_test = train_test_split(
    iris.data, iris.target, test_size=0.2, random_state=42
)

# Train
model = RandomForestClassifier()
model.fit(X_train, y_train)

# Predict
predictions = model.predict(X_test)
print(f"Accuracy: {accuracy_score(y_test, predictions):.2f}")
```

## Cheatsheet

| Tipo de algoritmo | Clases |
|---------------|---------|
| Clasificación | `LogisticRegression`, `SVC`, `RandomForestClassifier` |
| Regresión | `LinearRegression`, `SVR`, `RandomForestRegressor` |
| Clustering | `KMeans`, `DBSCAN`, `AgglomerativeClustering` |
| Dimensionalidad | `PCA`, `TSNE`, `LDA` |
| Preprocesamiento | `StandardScaler`, `MinMaxScaler`, `LabelEncoder` |

## Gotchas

### Preprocesamiento

```python
from sklearn.preprocessing import StandardScaler, LabelEncoder, OneHotEncoder
from sklearn.impute import SimpleImputer

# Numerical scaling
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Label encoding
encoder = LabelEncoder()
y_encoded = encoder.fit_transform(['cat', 'dog', 'cat'])

# One-hot encoding
onehot = OneHotEncoder(sparse_output=False)
X_onehot = onehot.fit_transform(X_categorical)

# Handle missing values
imputer = SimpleImputer(strategy='mean')
X_imputed = imputer.fit_transform(X)
```

### Pipelines

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

### Validación cruzada

```python
from sklearn.model_selection import cross_val_score, GridSearchCV

# Simple cross-validation
scores = cross_val_score(model, X, y, cv=5)
print(f"Mean accuracy: {scores.mean():.2f} (+/- {scores.std() * 2:.2f})")

# Grid search
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

### Evaluación del modelo

```python
from sklearn.metrics import (
    classification_report, confusion_matrix,
    mean_squared_error, r2_score
)

# Classification
print(classification_report(y_test, predictions))
print(confusion_matrix(y_test, predictions))

# Regression
mse = mean_squared_error(y_test, predictions)
r2 = r2_score(y_test, predictions)
print(f"MSE: {mse:.2f}, R2: {r2:.2f}")
```

### Algoritmos comunes

```python
# Classification
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.naive_bayes import GaussianNB

# Regression
from sklearn.linear_model import Ridge, Lasso
from sklearn.tree import DecisionTreeRegressor

# Clustering
from sklearn.cluster import KMeans, DBSCAN
```

## Next Steps

- [Scikit-learn Documentation](https://scikit-learn.org/stable/) - Documentación oficial
- [User Guide](https://scikit-learn.org/stable/user_guide.html) - Tutoriales
- [API Reference](https://scikit-learn.org/stable/modules/classes.html) - API completa
- [Examples](https://scikit-learn.org/stable/auto_examples/) - Ejemplos de código
