---
title: "OpenAI API"
description: "Comienza con la API de OpenAI en 5 minutos"
template: "tool"
tags: ["ai", "api", "gpt"]
---

## TL;DR

**Qué**: API para acceder a los modelos GPT de OpenAI, DALL-E, Whisper y más.

**Por qué**: Modelos de IA de última generación, integración fácil, llamadas a funciones, embeddings.

## Quick Start

**Instalación**:
```bash
pip install openai
```

**Hello OpenAI**:
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

| Modelo | Caso de uso |
|-------|----------|
| `gpt-4o` | Último multimodal |
| `gpt-4o-mini` | Rápido y económico |
| `gpt-4-turbo` | Flagship anterior |
| `text-embedding-3-small` | Embeddings |
| `dall-e-3` | Generación de imágenes |
| `whisper-1` | Voz a texto |
| `tts-1` | Texto a voz |

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

- [OpenAI API Documentation](https://platform.openai.com/docs) - Documentación oficial
- [API Reference](https://platform.openai.com/docs/api-reference) - API completa
- [Cookbook](https://cookbook.openai.com/) - Ejemplos
- [Playground](https://platform.openai.com/playground) - Probar modelos
