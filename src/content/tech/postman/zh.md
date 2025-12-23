---
title: "Postman"
description: "5 分钟快速入门 Postman API 测试"
template: "tool"
tags: ["api", "testing", "development"]
---

## TL;DR

**是什么**：用于构建、测试和文档化 API 的开发平台。

**为什么用**：可视化界面、集合管理、环境变量、自动化测试、团队协作。

## Quick Start

**安装**：从 [postman.com/downloads](https://www.postman.com/downloads/) 下载

**第一个请求**：
1. 点击 **New → Request**
2. 输入 URL：`https://jsonplaceholder.typicode.com/posts/1`
3. 点击 **Send**
4. 在底部面板查看响应

**创建集合**：
1. 点击 **Collections → Create Collection**
2. 命名为 "My API"
3. 添加请求进行组织

## Cheatsheet

| 功能 | 描述 |
|---------|-------------|
| Collections | 组织请求 |
| Environments | 变量集（开发/生产）|
| Variables | `{{variable}}` 语法 |
| Pre-request Script | 请求前运行 |
| Tests | 验证响应 |
| Runner | 批量执行 |

## Gotchas

### 环境变量

```javascript
// 在环境中设置
// BASE_URL: https://api.example.com
// TOKEN: your-auth-token

// 在请求 URL 中使用
// {{BASE_URL}}/users

// 在头部中使用
// Authorization: Bearer {{TOKEN}}
```

### 预请求脚本

```javascript
// 生成时间戳
pm.environment.set("timestamp", Date.now());

// 生成随机数据
pm.environment.set("randomEmail", `user${Math.random().toString(36).slice(2)}@test.com`);

// 从上一个请求获取数据
const token = pm.environment.get("authToken");
pm.request.headers.add({
    key: "Authorization",
    value: `Bearer ${token}`
});
```

### 测试脚本

```javascript
// 检查状态
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

// 检查响应时间
pm.test("Response time < 500ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});

// 检查响应体
pm.test("Has user id", function () {
    const json = pm.response.json();
    pm.expect(json).to.have.property("id");
    pm.expect(json.id).to.be.a("number");
});

// 保存到环境
const json = pm.response.json();
pm.environment.set("userId", json.id);

// 检查数组
pm.test("Returns array of users", function () {
    const json = pm.response.json();
    pm.expect(json).to.be.an("array");
    pm.expect(json.length).to.be.greaterThan(0);
});
```

### 集合运行器

```javascript
// 使用数据文件运行集合（CSV/JSON）
// data.json:
[
    { "email": "user1@test.com", "name": "User 1" },
    { "email": "user2@test.com", "name": "User 2" }
]

// 在请求体中
{
    "email": "{{email}}",
    "name": "{{name}}"
}

// 在测试中访问迭代数据
pm.test("User created", function () {
    const json = pm.response.json();
    pm.expect(json.email).to.eql(pm.iterationData.get("email"));
});
```

### Newman CLI

```bash
# 安装
npm install -g newman

# 运行集合
newman run collection.json

# 使用环境
newman run collection.json -e environment.json

# 生成报告
newman run collection.json -r html
```

## Next Steps

- [Postman 学习中心](https://learning.postman.com/) - 教程
- [Postman API](https://www.postman.com/postman/workspace/postman-public-workspace/) - Postman API
- [Newman](https://github.com/postmanlabs/newman) - CLI 运行器
- [Postman Flows](https://www.postman.com/product/flows/) - 可视化工作流
