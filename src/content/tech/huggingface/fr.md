---
title: "Hugging Face"
description: "Démarrez avec Hugging Face Transformers en 5 minutes"
template: "tool"
tags: ["ai", "nlp", "transformers"]
---

## TL;DR

**Quoi** : Plateforme et bibliothèque pour les modèles NLP et ML de pointe.

**Pourquoi** : 100k+ modèles pré-entraînés, fine-tuning facile, API pipeline, model hub.

## Quick Start

**Installation** :
```bash
pip install transformers torch
```

**Hello Transformers** :
```python
from transformers import pipeline

# Analyse de sentiment
classifier = pipeline('sentiment-analysis')
result = classifier('I love using Hugging Face!')
print(result)  # [{'label': 'POSITIVE', 'score': 0.9998}]

# Génération de texte
generator = pipeline('text-generation', model='gpt2')
text = generator('Hello, I am', max_length=30)
print(text)
```

## Cheatsheet

| Pipeline | Description |
|----------|-------------|
| `sentiment-analysis` | Classifier le sentiment |
| `text-generation` | Générer du texte |
| `summarization` | Résumer du texte |
| `translation` | Traduire du texte |
| `question-answering` | Répondre aux questions |
| `fill-mask` | Remplir les tokens masqués |
| `zero-shot-classification` | Classifier sans entraînement |

## Gotchas

### Using specific models

```python
from transformers import AutoTokenizer, AutoModelForSequenceClassification

# Charger modèle et tokenizer
model_name = "distilbert-base-uncased-finetuned-sst-2-english"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(model_name)

# Tokeniser l'entrée
inputs = tokenizer("I love this!", return_tensors="pt")

# Obtenir les prédictions
outputs = model(**inputs)
predictions = outputs.logits.argmax(-1)
```

### Common pipelines

```python
from transformers import pipeline

# Résumé
summarizer = pipeline("summarization")
summary = summarizer(long_text, max_length=100, min_length=30)

# Question-réponse
qa = pipeline("question-answering")
answer = qa(question="What is Hugging Face?", context="Hugging Face is an AI company...")

# Traduction
translator = pipeline("translation_en_to_fr")
translation = translator("Hello, how are you?")

# Reconnaissance d'entités nommées
ner = pipeline("ner", grouped_entities=True)
entities = ner("My name is John and I work at Google in Paris")
```

### Fine-tuning

```python
from transformers import Trainer, TrainingArguments
from datasets import load_dataset

# Charger le dataset
dataset = load_dataset("imdb")

# Définir les arguments d'entraînement
training_args = TrainingArguments(
    output_dir="./results",
    num_train_epochs=3,
    per_device_train_batch_size=16,
    evaluation_strategy="epoch",
    save_strategy="epoch",
)

# Créer le trainer
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=dataset["train"],
    eval_dataset=dataset["test"],
    tokenizer=tokenizer,
)

# Entraîner
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
# Pousser le modèle vers le hub
model.push_to_hub("my-awesome-model")
tokenizer.push_to_hub("my-awesome-model")

# Charger depuis le hub
from transformers import AutoModel
model = AutoModel.from_pretrained("username/my-awesome-model")
```

## Next Steps

- [Documentation Hugging Face](https://huggingface.co/docs) - Docs officielles
- [Model Hub](https://huggingface.co/models) - Parcourir les modèles
- [Datasets](https://huggingface.co/docs/datasets) - Bibliothèque de datasets
- [Cours](https://huggingface.co/course) - Cours NLP gratuit
