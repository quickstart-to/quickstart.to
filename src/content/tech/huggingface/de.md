---
title: "Hugging Face"
description: "ML/NLP-Plattform mit 100k+ Modellen - Transformers-Bibliothek, Pipeline-API, einfaches Fine-Tuning"
template: "tool"
tags: ["ai", "nlp", "transformers"]
---

## TL;DR

**Was**: Plattform und Bibliothek für modernste NLP- und ML-Modelle.

**Warum**: 100k+ vortrainierte Modelle, einfaches Fine-Tuning, Pipeline-API, Model Hub.

## Quick Start

**Installation**:
```bash
pip install transformers torch
```

**Hello Transformers**:
```python
from transformers import pipeline

# Sentiment-Analyse
classifier = pipeline('sentiment-analysis')
result = classifier('I love using Hugging Face!')
print(result)  # [{'label': 'POSITIVE', 'score': 0.9998}]

# Textgenerierung
generator = pipeline('text-generation', model='gpt2')
text = generator('Hello, I am', max_length=30)
print(text)
```

## Cheatsheet

| Pipeline | Beschreibung |
|----------|-------------|
| `sentiment-analysis` | Sentiment klassifizieren |
| `text-generation` | Text generieren |
| `summarization` | Text zusammenfassen |
| `translation` | Text übersetzen |
| `question-answering` | Fragen beantworten |
| `fill-mask` | Maskierte Token füllen |
| `zero-shot-classification` | Klassifizieren ohne Training |

## Gotchas

### Using specific models

```python
from transformers import AutoTokenizer, AutoModelForSequenceClassification

# Modell und Tokenizer laden
model_name = "distilbert-base-uncased-finetuned-sst-2-english"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(model_name)

# Eingabe tokenisieren
inputs = tokenizer("I love this!", return_tensors="pt")

# Vorhersagen erhalten
outputs = model(**inputs)
predictions = outputs.logits.argmax(-1)
```

### Common pipelines

```python
from transformers import pipeline

# Zusammenfassung
summarizer = pipeline("summarization")
summary = summarizer(long_text, max_length=100, min_length=30)

# Frage-Antwort
qa = pipeline("question-answering")
answer = qa(question="What is Hugging Face?", context="Hugging Face is an AI company...")

# Übersetzung
translator = pipeline("translation_en_to_fr")
translation = translator("Hello, how are you?")

# Named Entity Recognition
ner = pipeline("ner", grouped_entities=True)
entities = ner("My name is John and I work at Google in Paris")
```

### Fine-tuning

```python
from transformers import Trainer, TrainingArguments
from datasets import load_dataset

# Dataset laden
dataset = load_dataset("imdb")

# Trainingsargumente definieren
training_args = TrainingArguments(
    output_dir="./results",
    num_train_epochs=3,
    per_device_train_batch_size=16,
    evaluation_strategy="epoch",
    save_strategy="epoch",
)

# Trainer erstellen
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=dataset["train"],
    eval_dataset=dataset["test"],
    tokenizer=tokenizer,
)

# Trainieren
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
# Modell zum Hub pushen
model.push_to_hub("my-awesome-model")
tokenizer.push_to_hub("my-awesome-model")

# Vom Hub laden
from transformers import AutoModel
model = AutoModel.from_pretrained("username/my-awesome-model")
```

## Next Steps

- [Hugging Face Dokumentation](https://huggingface.co/docs) - Offizielle Docs
- [Model Hub](https://huggingface.co/models) - Modelle durchsuchen
- [Datasets](https://huggingface.co/docs/datasets) - Dataset-Bibliothek
- [Kurs](https://huggingface.co/course) - Kostenloser NLP-Kurs
