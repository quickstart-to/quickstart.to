---
title: "LangChain"
description: "Comienza con LangChain en 5 minutos"
template: "tool"
tags: ["ai", "llm", "python"]
---

## TL;DR

**Qué**: Framework para construir aplicaciones impulsadas por modelos de lenguaje.

**Por qué**: Encadenar llamadas LLM, conectar a fuentes de datos, agentes, gestión de memoria.

## Quick Start

**Instalación**:
```bash
pip install langchain langchain-openai
```

**Hello LangChain**:
```python
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage

# Inicializar modelo
llm = ChatOpenAI(model="gpt-4o-mini")

# Invocación simple
response = llm.invoke([HumanMessage(content="Hello!")])
print(response.content)
```

## Cheatsheet

| Concepto | Descripción |
|---------|-------------|
| LLM | Wrapper de modelo de lenguaje |
| Prompt | Plantilla de entrada |
| Chain | Operaciones enlazadas |
| Agent | Tomador de decisiones dinámico |
| Memory | Historial de conversación |
| Retriever | Búsqueda de documentos |

## Gotchas

### Prompt templates

```python
from langchain_core.prompts import ChatPromptTemplate

# Plantilla simple
prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful assistant."),
    ("user", "{input}")
])

# Crear cadena
chain = prompt | llm

# Invocar
response = chain.invoke({"input": "What is Python?"})
print(response.content)
```

### Output parsers

```python
from langchain_core.output_parsers import StrOutputParser, JsonOutputParser
from langchain_core.pydantic_v1 import BaseModel, Field

# Parser de string
chain = prompt | llm | StrOutputParser()
result = chain.invoke({"input": "Hello"})  # Devuelve string

# Parser JSON con esquema
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

# Crear vector store
embeddings = OpenAIEmbeddings()
texts = ["LangChain is a framework", "It helps build LLM apps"]
vectorstore = FAISS.from_texts(texts, embeddings)
retriever = vectorstore.as_retriever()

# Cadena RAG
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

- [Documentación de LangChain](https://python.langchain.com/docs/) - Docs oficiales
- [LangChain Hub](https://smith.langchain.com/hub) - Plantillas de prompts
- [LangSmith](https://smith.langchain.com/) - Depuración y trazado
- [LangGraph](https://langchain-ai.github.io/langgraph/) - Flujos de trabajo complejos
