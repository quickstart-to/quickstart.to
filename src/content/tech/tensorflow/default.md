---
title: "TensorFlow"
description: "Google ML framework - production-ready, TF Serving, mobile deployment, large ecosystem"
template: "tool"
tags: ["ai", "machine-learning", "python"]
---

## TL;DR

**What**: Google's open-source machine learning framework.

**Why**: Production-ready, TensorFlow Serving, mobile deployment, large ecosystem.

## Quick Start

**Install**:
```bash
pip install tensorflow
```

**Hello TensorFlow**:
```python
import tensorflow as tf

# Check version
print(tf.__version__)

# Simple tensor operations
a = tf.constant([[1, 2], [3, 4]])
b = tf.constant([[5, 6], [7, 8]])
print(tf.matmul(a, b))

# Check GPU
print("GPU available:", tf.config.list_physical_devices('GPU'))
```

## Cheatsheet

| Operation | Code |
|-----------|------|
| Create tensor | `tf.constant([1, 2, 3])` |
| Zeros/ones | `tf.zeros((3, 3))` |
| Random | `tf.random.normal((3, 3))` |
| Shape | `tensor.shape` |
| Reshape | `tf.reshape(x, (2, 3))` |
| To numpy | `tensor.numpy()` |

## Gotchas

### Sequential model

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

### Training

```python
# Load data
(x_train, y_train), (x_test, y_test) = tf.keras.datasets.mnist.load_data()
x_train = x_train.reshape(-1, 784).astype('float32') / 255.0
x_test = x_test.reshape(-1, 784).astype('float32') / 255.0

# Train
history = model.fit(
    x_train, y_train,
    epochs=10,
    batch_size=32,
    validation_split=0.2
)

# Evaluate
loss, accuracy = model.evaluate(x_test, y_test)
print(f'Test accuracy: {accuracy}')
```

### Functional API

```python
inputs = tf.keras.Input(shape=(784,))
x = layers.Dense(128, activation='relu')(inputs)
x = layers.Dense(64, activation='relu')(x)
outputs = layers.Dense(10, activation='softmax')(x)

model = tf.keras.Model(inputs=inputs, outputs=outputs)
```

### Custom training loop

```python
@tf.function
def train_step(model, optimizer, x, y, loss_fn):
    with tf.GradientTape() as tape:
        predictions = model(x, training=True)
        loss = loss_fn(y, predictions)
    gradients = tape.gradient(loss, model.trainable_variables)
    optimizer.apply_gradients(zip(gradients, model.trainable_variables))
    return loss

# Training loop
for epoch in range(epochs):
    for x_batch, y_batch in dataset:
        loss = train_step(model, optimizer, x_batch, y_batch, loss_fn)
```

### Save and load

```python
# Save entire model
model.save('model.keras')

# Load model
loaded_model = tf.keras.models.load_model('model.keras')

# Save weights only
model.save_weights('weights.h5')
model.load_weights('weights.h5')

# SavedModel format (for serving)
tf.saved_model.save(model, 'saved_model/')
```

## Next Steps

- [TensorFlow Documentation](https://www.tensorflow.org/api_docs) - Official docs
- [TensorFlow Tutorials](https://www.tensorflow.org/tutorials) - Step by step
- [Keras Documentation](https://keras.io/) - High-level API
- [TensorFlow Hub](https://tfhub.dev/) - Pretrained models
