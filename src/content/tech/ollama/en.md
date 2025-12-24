---
title: "Ollama"
description: "Run LLMs locally - Llama, Mistral, and more on your machine"
template: "tool"
tags: ["ai", "llm", "machine-learning"]
---

## TL;DR

**One-liner**: Ollama lets you run open-source LLMs locally with a single command - no cloud, no API keys, complete privacy.

**Core Value**:
- Privacy - your data never leaves your machine
- No API costs - run models unlimited times after download
- Offline capable - works without internet
- Simple - one command to pull and run any model

## Quick Start

### Install

macOS: Download [Ollama for Mac](https://ollama.com/download/Ollama-darwin.zip)

Linux:
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

Windows: Download [Ollama for Windows](https://ollama.com/download/OllamaSetup.exe)

### Verify

```bash
ollama --version
```

### Run Your First Model

```bash
ollama run llama3.2
```

This downloads and starts Llama 3.2. Type a prompt and press Enter.

### Chat Example

```bash
>>> What is the capital of France?
The capital of France is Paris.

>>> /bye
```

## Cheatsheet

| Command | Description |
|---------|-------------|
| `ollama run MODEL` | Run a model (downloads if needed) |
| `ollama pull MODEL` | Download a model |
| `ollama list` | List downloaded models |
| `ollama ps` | Show running models |
| `ollama stop MODEL` | Stop a running model |
| `ollama show MODEL` | Show model details |
| `ollama rm MODEL` | Delete a model |
| `ollama create NAME -f Modelfile` | Create custom model |
| `ollama serve` | Start Ollama server |

### Popular Models

| Model | Size | Command |
|-------|------|---------|
| Llama 3.2 | 2GB | `ollama run llama3.2` |
| Llama 3.3 70B | 43GB | `ollama run llama3.3:70b` |
| Mistral | 4GB | `ollama run mistral` |
| Gemma 3 | 3GB | `ollama run gemma3` |
| DeepSeek-R1 | 4GB | `ollama run deepseek-r1` |
| Phi 4 | 9GB | `ollama run phi4` |
| Qwen 2.5 | 4GB | `ollama run qwen2.5` |

## API Usage

Ollama exposes an OpenAI-compatible REST API on `localhost:11434`.

### Generate Text

```bash
curl http://localhost:11434/api/generate -d '{
  "model": "llama3.2",
  "prompt": "Why is the sky blue?",
  "stream": false
}'
```

### Chat Completion

```bash
curl http://localhost:11434/api/chat -d '{
  "model": "llama3.2",
  "messages": [{"role": "user", "content": "Hello!"}],
  "stream": false
}'
```

### Use with Python

```python
import requests

response = requests.post('http://localhost:11434/api/generate', json={
    'model': 'llama3.2',
    'prompt': 'Explain quantum computing briefly',
    'stream': False
})
print(response.json()['response'])
```

## Custom Models (Modelfile)

Create a `Modelfile` to customize behavior:

```dockerfile
FROM llama3.2

# Set parameters
PARAMETER temperature 0.7
PARAMETER top_p 0.9

# System prompt
SYSTEM """You are a helpful coding assistant.
Always provide clear explanations with examples."""
```

Build and run:

```bash
ollama create myassistant -f Modelfile
ollama run myassistant
```

## Gotchas

### Model download stuck or slow

**Reason**: Large files, network issues

**Solution**:
```bash
# Check download progress
ollama pull llama3.2 --verbose

# Use a smaller model first
ollama run gemma3:1b
```

### Out of memory (OOM)

**Reason**: Model too large for available RAM

**Solution**:
- Use smaller model variants (e.g., `llama3.2:1b` instead of `llama3.2`)
- Close other applications
- Memory requirements: 8GB for 7B models, 16GB for 13B, 32GB for 33B+

### GPU not being used

**Reason**: Missing drivers or unsupported GPU

**Solution**:
```bash
# Check if GPU is detected
ollama run llama3.2 --verbose

# NVIDIA: Install CUDA drivers
# AMD: ROCm support on Linux only
# Apple Silicon: Metal used automatically
```

### API connection refused

**Reason**: Ollama server not running

**Solution**:
```bash
# Start the server
ollama serve

# Or run a model (auto-starts server)
ollama run llama3.2
```

### Model gives wrong or hallucinated answers

**Reason**: LLMs can hallucinate

**Solution**:
- Use larger models for complex tasks
- Add context in your prompts
- Verify important information independently

## Next Steps

- [Ollama Model Library](https://ollama.com/library)
- [Ollama GitHub](https://github.com/ollama/ollama)
- [Ollama API Docs](https://github.com/ollama/ollama/blob/main/docs/api.md)
- [Modelfile Reference](https://github.com/ollama/ollama/blob/main/docs/modelfile.md)
