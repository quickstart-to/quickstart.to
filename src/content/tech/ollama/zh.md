---
title: "Ollama"
description: "在本地运行大语言模型 - Llama、Mistral 等开源 LLM 一键部署"
template: "tool"
tags: ["ai", "llm", "machine-learning"]
---

## TL;DR

**一句话**：Ollama 让你用一条命令在本地运行开源大语言模型——无需云端、无需 API 密钥、完全私密。

**核心价值**：
- 隐私安全 - 数据永不离开你的电脑
- 零成本 - 下载后无限次使用，无 API 费用
- 离线可用 - 无需联网即可运行
- 极简操作 - 一条命令拉取并运行任意模型

## Quick Start

### 安装

macOS: 下载 [Ollama for Mac](https://ollama.com/download/Ollama-darwin.zip)

Linux:
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

Windows: 下载 [Ollama for Windows](https://ollama.com/download/OllamaSetup.exe)

### 验证安装

```bash
ollama --version
```

### 运行第一个模型

```bash
ollama run llama3.2
```

这会自动下载并启动 Llama 3.2。输入问题按回车即可对话。

### 对话示例

```bash
>>> 法国的首都是哪里？
法国的首都是巴黎。

>>> /bye
```

## Cheatsheet

| 命令 | 说明 |
|------|------|
| `ollama run MODEL` | 运行模型（如未下载会自动下载） |
| `ollama pull MODEL` | 下载模型 |
| `ollama list` | 列出已下载的模型 |
| `ollama ps` | 显示正在运行的模型 |
| `ollama stop MODEL` | 停止运行中的模型 |
| `ollama show MODEL` | 显示模型详情 |
| `ollama rm MODEL` | 删除模型 |
| `ollama create NAME -f Modelfile` | 创建自定义模型 |
| `ollama serve` | 启动 Ollama 服务 |

### 热门模型

| 模型 | 大小 | 命令 |
|------|------|------|
| Llama 3.2 | 2GB | `ollama run llama3.2` |
| Llama 3.3 70B | 43GB | `ollama run llama3.3:70b` |
| Mistral | 4GB | `ollama run mistral` |
| Gemma 3 | 3GB | `ollama run gemma3` |
| DeepSeek-R1 | 4GB | `ollama run deepseek-r1` |
| Phi 4 | 9GB | `ollama run phi4` |
| Qwen 2.5 | 4GB | `ollama run qwen2.5` |

## API 使用

Ollama 在 `localhost:11434` 暴露兼容 OpenAI 的 REST API。

### 生成文本

```bash
curl http://localhost:11434/api/generate -d '{
  "model": "llama3.2",
  "prompt": "为什么天空是蓝色的？",
  "stream": false
}'
```

### 聊天补全

```bash
curl http://localhost:11434/api/chat -d '{
  "model": "llama3.2",
  "messages": [{"role": "user", "content": "你好！"}],
  "stream": false
}'
```

### Python 调用

```python
import requests

response = requests.post('http://localhost:11434/api/generate', json={
    'model': 'llama3.2',
    'prompt': '简单解释一下量子计算',
    'stream': False
})
print(response.json()['response'])
```

## 自定义模型 (Modelfile)

创建 `Modelfile` 来定制模型行为：

```dockerfile
FROM llama3.2

# 设置参数
PARAMETER temperature 0.7
PARAMETER top_p 0.9

# 系统提示词
SYSTEM """你是一个专业的编程助手。
总是提供清晰的解释和代码示例。"""
```

构建并运行：

```bash
ollama create myassistant -f Modelfile
ollama run myassistant
```

## Gotchas

### 模型下载卡住或很慢

**原因**：文件较大，网络问题

**解决**：
```bash
# 查看下载进度
ollama pull llama3.2 --verbose

# 先用小模型试试
ollama run gemma3:1b
```

### 内存不足 (OOM)

**原因**：模型对可用内存来说太大了

**解决**：
- 使用更小的模型变体（如 `llama3.2:1b` 而非 `llama3.2`）
- 关闭其他应用程序
- 内存需求：7B 模型需 8GB，13B 需 16GB，33B+ 需 32GB

### GPU 没被使用

**原因**：驱动缺失或 GPU 不支持

**解决**：
```bash
# 检查 GPU 是否被检测到
ollama run llama3.2 --verbose

# NVIDIA：安装 CUDA 驱动
# AMD：仅 Linux 支持 ROCm
# Apple Silicon：自动使用 Metal
```

### API 连接被拒绝

**原因**：Ollama 服务未运行

**解决**：
```bash
# 启动服务
ollama serve

# 或运行模型（会自动启动服务）
ollama run llama3.2
```

### 模型给出错误或幻觉答案

**原因**：大语言模型可能产生幻觉

**解决**：
- 复杂任务使用更大的模型
- 在提示词中添加上下文
- 重要信息需独立验证

## Next Steps

- [Ollama 模型库](https://ollama.com/library)
- [Ollama GitHub](https://github.com/ollama/ollama)
- [Ollama API 文档](https://github.com/ollama/ollama/blob/main/docs/api.md)
- [Modelfile 参考](https://github.com/ollama/ollama/blob/main/docs/modelfile.md)
