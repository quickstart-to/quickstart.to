---
title: "Hugging Face"
description: "AI/ML 模型平台 - 10万+ 预训练模型、易于微调、pipeline API"
template: "tool"
tags: ["ai", "nlp", "transformers"]
---

## TL;DR

**是什么**：提供最先进 NLP 和 ML 模型的平台和库。

**为什么用**：100k+ 预训练模型、易于微调、pipeline API、模型中心。

## Quick Start

**安装**：
```bash
pip install transformers torch
```

**Hello Transformers**：
```python
from transformers import pipeline

# 情感分析
classifier = pipeline('sentiment-analysis')
result = classifier('I love using Hugging Face!')
print(result)  # [{'label': 'POSITIVE', 'score': 0.9998}]

# 文本生成
generator = pipeline('text-generation', model='gpt2')
text = generator('Hello, I am', max_length=30)
print(text)
```

## Cheatsheet

| Pipeline | 描述 |
|----------|-------------|
| `sentiment-analysis` | 情感分类 |
| `text-generation` | 文本生成 |
| `summarization` | 文本摘要 |
| `translation` | 翻译 |
| `question-answering` | 问答 |
| `fill-mask` | 填充掩码 |
| `zero-shot-classification` | 零样本分类 |

## Gotchas

### 使用特定模型

```python
from transformers import AutoTokenizer, AutoModelForSequenceClassification

# 加载模型和分词器
model_name = "distilbert-base-uncased-finetuned-sst-2-english"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(model_name)

# 分词输入
inputs = tokenizer("I love this!", return_tensors="pt")

# 获取预测
outputs = model(**inputs)
predictions = outputs.logits.argmax(-1)
```

### 常用 pipeline

```python
from transformers import pipeline

# 摘要
summarizer = pipeline("summarization")
summary = summarizer(long_text, max_length=100, min_length=30)

# 问答
qa = pipeline("question-answering")
answer = qa(question="What is Hugging Face?", context="Hugging Face is an AI company...")

# 翻译
translator = pipeline("translation_en_to_fr")
translation = translator("Hello, how are you?")

# 命名实体识别
ner = pipeline("ner", grouped_entities=True)
entities = ner("My name is John and I work at Google in Paris")
```

### 微调

```python
from transformers import Trainer, TrainingArguments
from datasets import load_dataset

# 加载数据集
dataset = load_dataset("imdb")

# 定义训练参数
training_args = TrainingArguments(
    output_dir="./results",
    num_train_epochs=3,
    per_device_train_batch_size=16,
    evaluation_strategy="epoch",
    save_strategy="epoch",
)

# 创建训练器
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=dataset["train"],
    eval_dataset=dataset["test"],
    tokenizer=tokenizer,
)

# 训练
trainer.train()
```

### 嵌入向量

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

### 使用 Hub

```python
# 推送模型到 hub
model.push_to_hub("my-awesome-model")
tokenizer.push_to_hub("my-awesome-model")

# 从 hub 加载
from transformers import AutoModel
model = AutoModel.from_pretrained("username/my-awesome-model")
```

## Next Steps

- [Hugging Face 文档](https://huggingface.co/docs) - 官方文档
- [模型中心](https://huggingface.co/models) - 浏览模型
- [Datasets](https://huggingface.co/docs/datasets) - 数据集库
- [课程](https://huggingface.co/course) - 免费 NLP 课程
