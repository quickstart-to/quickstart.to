---
title: "TensorFlow"
description: "5 分钟快速入门 TensorFlow"
tags: ["ai", "machine-learning", "python"]
---

## TL;DR

**是什么**：谷歌的开源机器学习框架。

**为什么用**：生产就绪、TensorFlow Serving、移动部署、大型生态系统。

## Quick Start

**安装**：
```bash
pip install tensorflow
```

**Hello TensorFlow**：
```python
import tensorflow as tf

# 检查版本
print(tf.__version__)

# 简单张量操作
a = tf.constant([[1, 2], [3, 4]])
b = tf.constant([[5, 6], [7, 8]])
print(tf.matmul(a, b))

# 检查 GPU
print("GPU available:", tf.config.list_physical_devices('GPU'))
```

## Cheatsheet

| 操作 | 代码 |
|-----------|------|
| 创建张量 | `tf.constant([1, 2, 3])` |
| 零/一 | `tf.zeros((3, 3))` |
| 随机 | `tf.random.normal((3, 3))` |
| 形状 | `tensor.shape` |
| 重塑 | `tf.reshape(x, (2, 3))` |
| 转 numpy | `tensor.numpy()` |

## Gotchas

### Sequential 模型

```python
import tensorflow as tf
from tensorflow.keras import layers, models

model = models.Sequential([
    layers.Dense(128, activation='relu', input_shape=(784,)),
    layers.Dropout(0.2),
    layers.Dense(64, activation='relu'),
    layers.Dense(10, activation='softmax')
])

model.compile(
    optimizer='adam',
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)

model.summary()
```

### 训练

```python
# 加载数据
(x_train, y_train), (x_test, y_test) = tf.keras.datasets.mnist.load_data()
x_train = x_train.reshape(-1, 784).astype('float32') / 255.0
x_test = x_test.reshape(-1, 784).astype('float32') / 255.0

# 训练
history = model.fit(
    x_train, y_train,
    epochs=10,
    batch_size=32,
    validation_split=0.2
)

# 评估
loss, accuracy = model.evaluate(x_test, y_test)
print(f'Test accuracy: {accuracy}')
```

### 函数式 API

```python
inputs = tf.keras.Input(shape=(784,))
x = layers.Dense(128, activation='relu')(inputs)
x = layers.Dense(64, activation='relu')(x)
outputs = layers.Dense(10, activation='softmax')(x)

model = tf.keras.Model(inputs=inputs, outputs=outputs)
```

### 自定义训练循环

```python
@tf.function
def train_step(model, optimizer, x, y, loss_fn):
    with tf.GradientTape() as tape:
        predictions = model(x, training=True)
        loss = loss_fn(y, predictions)
    gradients = tape.gradient(loss, model.trainable_variables)
    optimizer.apply_gradients(zip(gradients, model.trainable_variables))
    return loss

# 训练循环
for epoch in range(epochs):
    for x_batch, y_batch in dataset:
        loss = train_step(model, optimizer, x_batch, y_batch, loss_fn)
```

### 保存和加载

```python
# 保存整个模型
model.save('model.keras')

# 加载模型
loaded_model = tf.keras.models.load_model('model.keras')

# 仅保存权重
model.save_weights('weights.h5')
model.load_weights('weights.h5')

# SavedModel 格式（用于服务）
tf.saved_model.save(model, 'saved_model/')
```

## Next Steps

- [TensorFlow 文档](https://www.tensorflow.org/api_docs) - 官方文档
- [TensorFlow 教程](https://www.tensorflow.org/tutorials) - 分步教程
- [Keras 文档](https://keras.io/) - 高级 API
- [TensorFlow Hub](https://tfhub.dev/) - 预训练模型
