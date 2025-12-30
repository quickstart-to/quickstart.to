---
title: "Hugging Face"
description: "Comienza con Hugging Face Transformers en 5 minutos"
template: "tool"
tags: ["ai", "nlp", "transformers"]
---

## TL;DR

**Qué**: Plataforma y biblioteca para modelos de NLP y ML de última generación.

**Por qué**: 100k+ modelos preentrenados, fine-tuning fácil, API pipeline, model hub.

## Quick Start

**Instalación**:
```bash
pip install transformers torch
```

**Hello Transformers**:
```python
from transformers import pipeline

# Análisis de sentimiento
classifier = pipeline('sentiment-analysis')
result = classifier('I love using Hugging Face!')
print(result)  # [{'label': 'POSITIVE', 'score': 0.9998}]

# Generación de texto
generator = pipeline('text-generation', model='gpt2')
text = generator('Hello, I am', max_length=30)
print(text)
```

## Cheatsheet

| Pipeline | Descripción |
|----------|-------------|
| `sentiment-analysis` | Clasificar sentimiento |
| `text-generation` | Generar texto |
| `summarization` | Resumir texto |
| `translation` | Traducir texto |
| `question-answering` | Responder preguntas |
| `fill-mask` | Rellenar tokens enmascarados |
| `zero-shot-classification` | Clasificar sin entrenamiento |

## Gotchas

### Using specific models

```python
from transformers import AutoTokenizer, AutoModelForSequenceClassification

# Cargar modelo y tokenizer
model_name = "distilbert-base-uncased-finetuned-sst-2-english"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(model_name)

# Tokenizar entrada
inputs = tokenizer("I love this!", return_tensors="pt")

# Obtener predicciones
outputs = model(**inputs)
predictions = outputs.logits.argmax(-1)
```

### Common pipelines

```python
from transformers import pipeline

# Resumen
summarizer = pipeline("summarization")
summary = summarizer(long_text, max_length=100, min_length=30)

# Pregunta-respuesta
qa = pipeline("question-answering")
answer = qa(question="What is Hugging Face?", context="Hugging Face is an AI company...")

# Traducción
translator = pipeline("translation_en_to_fr")
translation = translator("Hello, how are you?")

# Reconocimiento de entidades nombradas
ner = pipeline("ner", grouped_entities=True)
entities = ner("My name is John and I work at Google in Paris")
```

### Fine-tuning

```python
from transformers import Trainer, TrainingArguments
from datasets import load_dataset

# Cargar dataset
dataset = load_dataset("imdb")

# Definir argumentos de entrenamiento
training_args = TrainingArguments(
    output_dir="./results",
    num_train_epochs=3,
    per_device_train_batch_size=16,
    evaluation_strategy="epoch",
    save_strategy="epoch",
)

# Crear trainer
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=dataset["train"],
    eval_dataset=dataset["test"],
    tokenizer=tokenizer,
)

# Entrenar
trainer.train()
```

### Embeddings

```python
from transformers import AutoTokenizer, AutoModel
import torch

tokenizer = AutoTokenizer.from_pretrained("sentence-transformers/all-MiniLM-L6-v2")
model = AutoModel.from_pretrained("sentence-transformers/all-MiniLM-L6-v2")

def get_embeddings(text):
    inputs = tokenizer(text, return_tensors="pt", padding=True, truncation=True)
    with torch.no_grad():
        outputs = model(**inputs)
    return outputs.last_hidden_state.mean(dim=1)

embedding = get_embeddings("Hello world")
```

### Using the Hub

```python
# Subir modelo al hub
model.push_to_hub("my-awesome-model")
tokenizer.push_to_hub("my-awesome-model")

# Cargar desde el hub
from transformers import AutoModel
model = AutoModel.from_pretrained("username/my-awesome-model")
```

## Next Steps

- [Documentación de Hugging Face](https://huggingface.co/docs) - Docs oficiales
- [Model Hub](https://huggingface.co/models) - Explorar modelos
- [Datasets](https://huggingface.co/docs/datasets) - Biblioteca de datasets
- [Curso](https://huggingface.co/course) - Curso NLP gratuito
