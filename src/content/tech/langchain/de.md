---
title: "LangChain"
description: "LLM-Anwendungs-Framework - Chains verketten, RAG, Agenten, Speicherverwaltung"
template: "tool"
tags: ["ai", "llm", "python"]
---

## TL;DR

**Was**: Framework zum Erstellen von Anwendungen, die von Sprachmodellen angetrieben werden.

**Warum**: LLM-Aufrufe verketten, Verbindung zu Datenquellen, Agenten, Speicherverwaltung.

## Quick Start

**Installation**:
```bash
pip install langchain langchain-openai
```

**Hello LangChain**:
```python
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage

# Modell initialisieren
llm = ChatOpenAI(model="gpt-4o-mini")

# Einfacher Aufruf
response = llm.invoke([HumanMessage(content="Hello!")])
print(response.content)
```

## Cheatsheet

| Konzept | Beschreibung |
|---------|-------------|
| LLM | Sprachmodell-Wrapper |
| Prompt | Eingabe-Template |
| Chain | Verknüpfte Operationen |
| Agent | Dynamischer Entscheidungsträger |
| Memory | Gesprächsverlauf |
| Retriever | Dokumentensuche |

## Gotchas

### Prompt templates

```python
from langchain_core.prompts import ChatPromptTemplate

# Einfaches Template
prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful assistant."),
    ("user", "{input}")
])

# Chain erstellen
chain = prompt | llm

# Aufrufen
response = chain.invoke({"input": "What is Python?"})
print(response.content)
```

### Output parsers

```python
from langchain_core.output_parsers import StrOutputParser, JsonOutputParser
from langchain_core.pydantic_v1 import BaseModel, Field

# String-Parser
chain = prompt | llm | StrOutputParser()
result = chain.invoke({"input": "Hello"})  # Gibt String zurück

# JSON-Parser mit Schema
class Joke(BaseModel):
    setup: str = Field(description="The setup")
    punchline: str = Field(description="The punchline")

parser = JsonOutputParser(pydantic_object=Joke)
prompt = ChatPromptTemplate.from_template(
    "Tell me a joke.\n{format_instructions}"
)
chain = prompt | llm | parser
```

### RAG (Retrieval Augmented Generation)

```python
from langchain_community.vectorstores import FAISS
from langchain_openai import OpenAIEmbeddings
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough

# Vector Store erstellen
embeddings = OpenAIEmbeddings()
texts = ["LangChain is a framework", "It helps build LLM apps"]
vectorstore = FAISS.from_texts(texts, embeddings)
retriever = vectorstore.as_retriever()

# RAG-Chain
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

### Agents

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

### Memory

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

- [LangChain Dokumentation](https://python.langchain.com/docs/) - Offizielle Docs
- [LangChain Hub](https://smith.langchain.com/hub) - Prompt-Templates
- [LangSmith](https://smith.langchain.com/) - Debugging & Tracing
- [LangGraph](https://langchain-ai.github.io/langgraph/) - Komplexe Workflows
