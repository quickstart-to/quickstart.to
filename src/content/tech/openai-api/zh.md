---
title: "OpenAI API"
description: "5 分钟快速入门 OpenAI API"
tags: ["ai", "api", "gpt"]
---

## TL;DR

**是什么**：访问 OpenAI 的 GPT 模型、DALL-E、Whisper 等的 API。

**为什么用**：最先进的 AI 模型、易于集成、函数调用、嵌入向量。

## Quick Start

**安装**：
```bash
pip install openai
```

**Hello OpenAI**：
```python
from openai import OpenAI

client = OpenAI()  # 使用 OPENAI_API_KEY 环境变量

response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "user", "content": "Hello!"}
    ]
)

print(response.choices[0].message.content)
```

## Cheatsheet

| 模型 | 用途 |
|-------|----------|
| `gpt-4o` | 最新多模态 |
| `gpt-4o-mini` | 快速便宜 |
| `gpt-4-turbo` | 上一代旗舰 |
| `text-embedding-3-small` | 嵌入向量 |
| `dall-e-3` | 图像生成 |
| `whisper-1` | 语音转文字 |
| `tts-1` | 文字转语音 |

## Gotchas

### 聊天补全

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

### 流式输出

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

### 函数调用

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

### 嵌入向量

```python
response = client.embeddings.create(
    model="text-embedding-3-small",
    input="Hello world"
)

embedding = response.data[0].embedding
print(f"Dimension: {len(embedding)}")  # 1536
```

### 图像生成

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

### 视觉

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

- [OpenAI API 文档](https://platform.openai.com/docs) - 官方文档
- [API 参考](https://platform.openai.com/docs/api-reference) - 完整 API
- [Cookbook](https://cookbook.openai.com/) - 示例
- [Playground](https://platform.openai.com/playground) - 测试模型
