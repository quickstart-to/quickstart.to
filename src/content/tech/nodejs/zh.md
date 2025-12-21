---
title: "Node.js"
description: "5 分钟快速入门 Node.js 运行时"
tags: ["javascript", "runtime", "backend"]
---

## TL;DR

**是什么**：基于 Chrome V8 引擎的 JavaScript 运行时，用于服务端开发。

**为什么**：在浏览器之外运行 JavaScript，构建快速可扩展的网络应用。

## Quick Start

**安装（推荐使用 nvm）**：

```bash
# 安装 nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

# 安装最新 LTS 版本
nvm install --lts

# 验证安装
node -v  # v24.12.0
npm -v
```

**其他安装方式**：

macOS: `brew install node`

Windows: `choco install nodejs` 或从 [nodejs.org](https://nodejs.org) 下载

**第一个程序**：

```javascript
// hello.js
console.log('Hello, Node.js!');
```

```bash
node hello.js
```

**创建 Web 服务器**：

```javascript
// server.js
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World\n');
});

server.listen(3000, () => {
  console.log('服务器运行在 http://localhost:3000/');
});
```

```bash
node server.js
```

## Cheatsheet

| 命令 | 描述 |
|------|------|
| `node file.js` | 运行 JavaScript 文件 |
| `node -e "code"` | 执行内联代码 |
| `node --version` | 显示 Node.js 版本 |
| `npm init -y` | 初始化新项目 |
| `npm install pkg` | 安装包 |
| `npm install -g pkg` | 全局安装 |
| `npm run script` | 运行 package.json 脚本 |
| `npx command` | 不安装直接运行包 |

## Gotchas

### 安装后找不到 'node' 命令

```bash
# 重新加载 shell 配置
source ~/.bashrc  # 或 ~/.zshrc
# 或者重启终端
```

### npm 权限错误 EACCES

```bash
# 使用 nvm 代替系统安装
# 或修复 npm 权限：
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
```

### 回调地狱

```javascript
// 使用 async/await 代替
async function getData() {
  const result = await fetch('https://api.example.com');
  return result.json();
}
```

### ES Modules 与 CommonJS

```javascript
// CommonJS（默认）
const fs = require('fs');

// ES Modules（使用 .mjs 或在 package.json 设置 "type": "module"）
import fs from 'fs';
```

## Next Steps

- [Node.js 官方文档](https://nodejs.org/docs/latest/api/)
- [npm 文档](https://docs.npmjs.com/)
- [Express.js 框架](https://expressjs.com/)
- [Node.js 最佳实践](https://github.com/goldbergyoni/nodebestpractices)
