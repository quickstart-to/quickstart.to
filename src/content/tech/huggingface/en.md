---
title: "Hugging Face"
description: "Get started with Hugging Face Transformers in 5 minutes"
template: "tool"
tags: ["ai", "nlp", "transformers"]
---

## TL;DR

**What**: Platform and library for state-of-the-art NLP and ML models.

**Why**: 100k+ pretrained models, easy fine-tuning, pipeline API, model hub.

## Quick Start

**Install**:
```bash
pip install transformers torch
```

**Hello Transformers**:
```python
from transformers import pipeline

# Sentiment analysis
classifier = pipeline('sentiment-analysis')
result = classifier('I love using Hugging Face!')
print(result)  # [{'label': 'POSITIVE', 'score': 0.9998}]

# Text generation
generator = pipeline('text-generation', model='gpt2')
text = generator('Hello, I am', max_length=30)
print(text)
```

## Cheatsheet

| Pipeline | Description |
|----------|-------------|
| `sentiment-analysis` | Classify sentiment |
| `text-generation` | Generate text |
| `summarization` | Summarize text |
| `translation` | Translate text |
| `question-answering` | Answer questions |
| `fill-mask` | Fill masked tokens |
| `zero-shot-classification` | Classify without training |

## Gotchas

### Using specific models

```python
from transformers import AutoTokenizer, AutoModelForSequenceClassification

# Load model and tokenizer
model_name = "distilbert-base-uncased-finetuned-sst-2-english"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(model_name)

# Tokenize input
inputs = tokenizer("I love this!", return_tensors="pt")

# Get predictions
outputs = model(**inputs)
predictions = outputs.logits.argmax(-1)
```

### Common pipelines

```python
from transformers import pipeline

# Summarization
summarizer = pipeline("summarization")
summary = summarizer(long_text, max_length=100, min_length=30)

# Question answering
qa = pipeline("question-answering")
answer = qa(question="What is Hugging Face?", context="Hugging Face is an AI company...")

# Translation
translator = pipeline("translation_en_to_fr")
translation = translator("Hello, how are you?")

# Named entity recognition
ner = pipeline("ner", grouped_entities=True)
entities = ner("My name is John and I work at Google in Paris")
```

### Fine-tuning

```python
from transformers import Trainer, TrainingArguments
from datasets import load_dataset

# Load dataset
dataset = load_dataset("imdb")

# Define training arguments
training_args = TrainingArguments(
    output_dir="./results",
    num_train_epochs=3,
    per_device_train_batch_size=16,
    evaluation_strategy="epoch",
    save_strategy="epoch",
)

# Create trainer
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=dataset["train"],
    eval_dataset=dataset["test"],
    tokenizer=tokenizer,
)

# Train
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
# Push model to hub
model.push_to_hub("my-awesome-model")
tokenizer.push_to_hub("my-awesome-model")

# Load from hub
from transformers import AutoModel
model = AutoModel.from_pretrained("username/my-awesome-model")
```

## Next Steps

- [Hugging Face Documentation](https://huggingface.co/docs) - Official docs
- [Model Hub](https://huggingface.co/models) - Browse models
- [Datasets](https://huggingface.co/docs/datasets) - Dataset library
- [Course](https://huggingface.co/course) - Free NLP course
