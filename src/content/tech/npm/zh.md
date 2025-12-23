---
title: "npm"
description: "5 分钟快速入门 npm 包管理器"
template: "tool"
tags: ["nodejs", "package-manager", "javascript"]
---

## TL;DR

**是什么**：Node.js 的默认包管理器。

**为什么用**：最大的包注册表、随 Node.js 附带、脚本、工作区。

## Quick Start

**安装**（随 Node.js 附带）：
```bash
# 检查版本
npm --version

# 初始化项目
npm init -y

# 安装包
npm install lodash
```

## Cheatsheet

| 命令 | 描述 |
|---------|-------------|
| `npm init` | 创建 package.json |
| `npm install` | 安装依赖 |
| `npm install pkg` | 添加包 |
| `npm install -D pkg` | 添加开发依赖 |
| `npm uninstall pkg` | 移除包 |
| `npm update` | 更新包 |
| `npm run script` | 运行脚本 |
| `npm publish` | 发布包 |

## Gotchas

### 安装包

```bash
# 生产依赖
npm install express

# 开发依赖
npm install -D typescript

# 全局包
npm install -g nodemon

# 特定版本
npm install lodash@4.17.21

# 从 git
npm install git+https://github.com/user/repo.git
```

### package.json 脚本

```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "build": "tsc",
    "test": "jest",
    "lint": "eslint .",
    "pretest": "npm run lint",
    "postbuild": "npm run test"
  }
}
```

```bash
# 运行脚本
npm run dev
npm start        # 'start' 不需要 'run'
npm test         # 'test' 不需要 'run'
```

### 版本管理

```bash
# 查看版本
npm view lodash versions

# 安装最新版
npm install lodash@latest

# package.json 中的版本范围
"lodash": "^4.17.21"   # ^: 次版本更新 (4.x.x)
"lodash": "~4.17.21"   # ~: 补丁更新 (4.17.x)
"lodash": "4.17.21"    # 精确版本
"lodash": "*"          # 任何版本
```

### 工作区（monorepo）

```json
// package.json
{
  "workspaces": [
    "packages/*"
  ]
}
```

```bash
# 安装所有工作区依赖
npm install

# 在特定工作区运行脚本
npm run build -w packages/core

# 向工作区添加依赖
npm install lodash -w packages/utils
```

### 发布

```bash
# 登录
npm login

# 发布
npm publish

# 带标签发布
npm publish --tag beta

# 更新版本
npm version patch  # 1.0.0 -> 1.0.1
npm version minor  # 1.0.0 -> 1.1.0
npm version major  # 1.0.0 -> 2.0.0
```

### 配置

```bash
# 查看配置
npm config list

# 设置镜像源
npm config set registry https://registry.npmmirror.com

# 使用 .npmrc
registry=https://registry.npmmirror.com
save-exact=true
```

## Next Steps

- [npm 文档](https://docs.npmjs.com/) - 官方文档
- [npm 注册表](https://www.npmjs.com/) - 包搜索
- [package.json 指南](https://docs.npmjs.com/cli/v9/configuring-npm/package-json) - 配置参考
- [npm CLI 参考](https://docs.npmjs.com/cli/v9/commands) - 所有命令
