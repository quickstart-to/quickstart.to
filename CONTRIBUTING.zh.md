# 贡献指南

> 一切事物的精华指南

[English](./CONTRIBUTING.md)

感谢你有兴趣为 quickstart.to 做贡献！本指南将帮助你入门。

## 贡献类型

### 1. 新 Quickstart

为某项技术或技能添加新指南。

**要求：**
- 标题必须清晰具体
- 描述必须在 10-200 个字符之间
- 内容应该能在 5 分钟或更短时间内完成
- 只包含必要步骤，不要多余内容

### 2. 翻译

将现有的 quickstart 翻译成其他语言。

**支持的语言：**
- 英语 (en)
- 中文 (zh)
- 德语 (de)
- 法语 (fr)
- 西班牙语 (es)

### 3. 改进

修复错别字、提高清晰度或更新过时信息。

### 4. 新模板

添加新的内容模板类型（维护者级别贡献）。

**步骤：**
1. 创建模板文件：`src/templates/{name}.md`
2. 更新类型定义：`scripts/validate/types.ts`
3. 更新文档：`CLAUDE.md`、`CONTRIBUTING.md`

## 开始

### 1. Fork 并克隆

```bash
git clone https://github.com/YOUR_USERNAME/quickstart.to.git
cd quickstart.to
pnpm install
```

### 2. 创建新 Quickstart

```bash
pnpm new
```

或手动创建：

```
src/content/{category}/{id}/
├── {lang}.md       # 任意语言 (en.md, zh.md, de.md 等)
└── assets/         # 可选的图片
```

### 3. Frontmatter 格式

```yaml
---
title: "你的标题"
description: "简短描述（10-200 个字符）"
tags: ["标签1", "标签2"]
---
```

### 4. 内容结构

```markdown
## 概述
简短介绍。

## 前提条件
- 条目 1
- 条目 2

## 步骤

### 第一步：开始
在这里写说明。

### 第二步：下一步
更多说明。

## 总结
快速回顾。
```

### 5. 验证内容

```bash
pnpm validate
```

### 6. 本地测试

```bash
pnpm dev
```

### 7. 提交 Pull Request

1. 创建新分支：`git checkout -b feat/my-quickstart`
2. 提交你的更改
3. 推送到你的 fork
4. 打开 Pull Request

## 风格指南

### 写作风格

- **简洁**：没有废话，只有要点
- **可操作**：每个部分都应该有清晰的步骤
- **具体**：包含确切的命令和代码

### 代码块

始终指定语言：

```bash
# 好的写法
npm install package
```

### 图片

- 放在 quickstart 目录内的 `assets/` 文件夹中
- 使用小写字母和连字符命名：`step-1-install.png`
- 使用相对路径引用：`![截图](./assets/screenshot.png)`

## ID 命名规则

- 使用小写字母、数字和连字符
- 不允许下划线、空格或特殊字符
- 示例：`docker`、`react-hooks`、`git入门`

## 验证规则

| 规则 | 描述 |
|------|------|
| ID 命名 | 不允许 `_` `/` 空格 `?#&=.` |
| ID 冲突 | 同一 ID 只能存在于一个分类中 |
| Frontmatter | 必须有 title 和 description |
| 描述长度 | 10-200 个字符 |
| 资源命名 | 小写字母和连字符 |

## 需要帮助？

- 打开 [Issue](https://github.com/quickstart-to/quickstart.to/issues)
- 查看现有的 [Discussions](https://github.com/quickstart-to/quickstart.to/discussions)

## 许可证

通过贡献，你同意你的贡献将在 MIT 许可证下发布。
