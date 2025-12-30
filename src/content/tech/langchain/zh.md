---
title: "LangChain"
description: "LLM 应用框架 - 链接调用、连接数据源、Agent、记忆管理"
template: "tool"
tags: ["ai", "llm", "python"]
---

## TL;DR

**是什么**：用于构建大语言模型应用的框架。

**为什么用**：链接 LLM 调用、连接数据源、Agent、记忆管理。

## Quick Start

**安装**：
```bash
pip install langchain langchain-openai
```

**Hello LangChain**：
```python
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage

# 初始化模型
llm = ChatOpenAI(model="gpt-4o-mini")

# 简单调用
response = llm.invoke([HumanMessage(content="Hello!")])
print(response.content)
```

## Cheatsheet

| 概念 | 描述 |
|---------|-------------|
| LLM | 语言模型封装 |
| Prompt | 输入模板 |
| Chain | 链接操作 |
| Agent | 动态决策器 |
| Memory | 对话历史 |
| Retriever | 文档检索 |

## Gotchas

### 提示模板

```python
from langchain_core.prompts import ChatPromptTemplate

# 简单模板
prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful assistant."),
    ("user", "{input}")
])

# 创建链
chain = prompt | llm

# 调用
response = chain.invoke({"input": "What is Python?"})
print(response.content)
```

### 输出解析器

```python
from langchain_core.output_parsers import StrOutputParser, JsonOutputParser
from langchain_core.pydantic_v1 import BaseModel, Field

# 字符串解析器
chain = prompt | llm | StrOutputParser()
result = chain.invoke({"input": "Hello"})  # 返回字符串

# 带 schema 的 JSON 解析器
class Joke(BaseModel):
    setup: str = Field(description="The setup")
    punchline: str = Field(description="The punchline")

parser = JsonOutputParser(pydantic_object=Joke)
prompt = ChatPromptTemplate.from_template(
    "Tell me a joke.\n{format_instructions}"
)
chain = prompt | llm | parser
```

### RAG（检索增强生成）

```python
from langchain_community.vectorstores import FAISS
from langchain_openai import OpenAIEmbeddings
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough

# 创建向量存储
embeddings = OpenAIEmbeddings()
texts = ["LangChain is a framework", "It helps build LLM apps"]
vectorstore = FAISS.from_texts(texts, embeddings)
retriever = vectorstore.as_retriever()

# RAG 链
template = """Answer based on context:
{context}

Question: {question}
"""
prompt = ChatPromptTemplate.from_template(template)

chain = (
    {"context": retriever, "question": RunnablePassthrough()}
    | prompt
    | llm
    | StrOutputParser()
)

response = chain.invoke("What is LangChain?")
```

### Agent

```python
from langchain.agents import create_tool_calling_agent, AgentExecutor
from langchain_core.tools import tool

@tool
def search(query: str) -> str:
    """Search for information."""
    return f"Results for: {query}"

@tool
def calculator(expression: str) -> str:
    """Calculate math expression."""
    return str(eval(expression))

tools = [search, calculator]

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful assistant."),
    ("human", "{input}"),
    ("placeholder", "{agent_scratchpad}")
])

agent = create_tool_calling_agent(llm, tools, prompt)
executor = AgentExecutor(agent=agent, tools=tools)

result = executor.invoke({"input": "What is 25 * 4?"})
```

### 记忆

```python
from langchain_core.chat_history import InMemoryChatMessageHistory
from langchain_core.runnables.history import RunnableWithMessageHistory

store = {}

def get_session_history(session_id: str):
    if session_id not in store:
        store[session_id] = InMemoryChatMessageHistory()
    return store[session_id]

chain_with_history = RunnableWithMessageHistory(
    chain,
    get_session_history,
    input_messages_key="input",
    history_messages_key="history"
)

response = chain_with_history.invoke(
    {"input": "My name is John"},
    config={"configurable": {"session_id": "user123"}}
)
```

## Next Steps

- [LangChain 文档](https://python.langchain.com/docs/) - 官方文档
- [LangChain Hub](https://smith.langchain.com/hub) - 提示模板
- [LangSmith](https://smith.langchain.com/) - 调试和追踪
- [LangGraph](https://langchain-ai.github.io/langgraph/) - 复杂工作流
