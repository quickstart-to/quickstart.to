---
title: "OpenAI API"
description: "Démarrez avec l'API OpenAI en 5 minutes"
template: "tool"
tags: ["ai", "api", "gpt"]
---

## TL;DR

**Quoi** : API pour accéder aux modèles GPT d'OpenAI, DALL-E, Whisper et plus.

**Pourquoi** : Modèles IA de pointe, intégration facile, appel de fonctions, embeddings.

## Quick Start

**Installation** :
```bash
pip install openai
```

**Hello OpenAI** :
```python
from openai import OpenAI

client = OpenAI()  # Uses OPENAI_API_KEY env var

response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "user", "content": "Hello!"}
    ]
)

print(response.choices[0].message.content)
```

## Cheatsheet

| Modèle | Cas d'usage |
|-------|----------|
| `gpt-4o` | Dernier multimodal |
| `gpt-4o-mini` | Rapide et économique |
| `gpt-4-turbo` | Ancien flagship |
| `text-embedding-3-small` | Embeddings |
| `dall-e-3` | Génération d'images |
| `whisper-1` | Parole vers texte |
| `tts-1` | Texte vers parole |

## Gotchas

### Chat completions

```python
from openai import OpenAI
client = OpenAI()

response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "What is Python?"},
        {"role": "assistant", "content": "Python is a programming language."},
        {"role": "user", "content": "What can I do with it?"}
    ],
    temperature=0.7,
    max_tokens=500
)

print(response.choices[0].message.content)
```

### Streaming

```python
stream = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": "Tell me a story"}],
    stream=True
)

for chunk in stream:
    if chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="")
```

### Function calling

```python
tools = [{
    "type": "function",
    "function": {
        "name": "get_weather",
        "description": "Get the weather for a location",
        "parameters": {
            "type": "object",
            "properties": {
                "location": {"type": "string", "description": "City name"},
                "unit": {"type": "string", "enum": ["celsius", "fahrenheit"]}
            },
            "required": ["location"]
        }
    }
}]

response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": "What's the weather in Paris?"}],
    tools=tools
)

if response.choices[0].message.tool_calls:
    tool_call = response.choices[0].message.tool_calls[0]
    print(f"Function: {tool_call.function.name}")
    print(f"Arguments: {tool_call.function.arguments}")
```

### Embeddings

```python
response = client.embeddings.create(
    model="text-embedding-3-small",
    input="Hello world"
)

embedding = response.data[0].embedding
print(f"Dimension: {len(embedding)}")  # 1536
```

### Image generation

```python
response = client.images.generate(
    model="dall-e-3",
    prompt="A white cat sitting on a windowsill",
    size="1024x1024",
    quality="standard",
    n=1
)

image_url = response.data[0].url
print(image_url)
```

### Vision

```python
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{
        "role": "user",
        "content": [
            {"type": "text", "text": "What's in this image?"},
            {"type": "image_url", "image_url": {"url": "https://example.com/image.jpg"}}
        ]
    }]
)

print(response.choices[0].message.content)
```

## Next Steps

- [OpenAI API Documentation](https://platform.openai.com/docs) - Documentation officielle
- [API Reference](https://platform.openai.com/docs/api-reference) - API complète
- [Cookbook](https://cookbook.openai.com/) - Exemples
- [Playground](https://platform.openai.com/playground) - Tester les modèles
