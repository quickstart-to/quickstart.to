---
title: "jq"
description: "命令行 JSON 处理器 - 在脚本和管道中解析、过滤、转换 JSON 数据"
template: "tool"
tags: ["cli", "json", "data-processing"]
---

## TL;DR

**是什么**：轻量级命令行 JSON 处理器。

**为什么用**：解析、过滤、转换 JSON，可脚本化，管道友好。

## Quick Start

**安装**：
```bash
# macOS
brew install jq

# Ubuntu/Debian
sudo apt install jq

# 检查版本
jq --version
```

**基本用法**：
```bash
# 美化打印
echo '{"name":"John"}' | jq '.'

# 获取字段
echo '{"name":"John"}' | jq '.name'

# 从文件
jq '.' data.json
```

## Cheatsheet

| 过滤器 | 描述 |
|--------|-------------|
| `.` | 身份（整个输入）|
| `.field` | 获取字段 |
| `.[]` | 遍历数组 |
| `.[0]` | 数组索引 |
| `\|` | 管道过滤器 |
| `select()` | 过滤项 |
| `map()` | 转换项 |

## Gotchas

### 基本选择

```bash
# 示例 JSON
echo '{"user":{"name":"John","age":30}}' | jq '.'

# 获取嵌套字段
echo '{"user":{"name":"John"}}' | jq '.user.name'
# 输出: "John"

# 获取原始字符串（无引号）
echo '{"name":"John"}' | jq -r '.name'
# 输出: John

# 多个字段
echo '{"name":"John","age":30}' | jq '.name, .age'
```

### 数组

```bash
# 示例数组
echo '[1,2,3,4,5]' | jq '.'

# 获取所有元素
echo '[1,2,3]' | jq '.[]'

# 按索引获取
echo '["a","b","c"]' | jq '.[1]'
# 输出: "b"

# 切片
echo '[1,2,3,4,5]' | jq '.[2:4]'
# 输出: [3,4]

# 数组长度
echo '[1,2,3]' | jq 'length'
```

### 数组中的对象

```bash
# 示例数据
DATA='[{"name":"John","age":30},{"name":"Jane","age":25}]'

# 获取所有名字
echo $DATA | jq '.[].name'

# 获取第一项
echo $DATA | jq '.[0]'

# 映射到新结构
echo $DATA | jq 'map({n: .name, a: .age})'
```

### 过滤

```bash
# 选择项
echo '[1,2,3,4,5]' | jq 'map(select(. > 2))'
# 输出: [3,4,5]

# 过滤对象
DATA='[{"name":"John","age":30},{"name":"Jane","age":25}]'
echo $DATA | jq '.[] | select(.age > 26)'

# 多条件
echo $DATA | jq '.[] | select(.age > 20 and .name == "John")'
```

### 转换

```bash
# 映射值
echo '[1,2,3]' | jq 'map(. * 2)'
# 输出: [2,4,6]

# 添加字段
echo '{"name":"John"}' | jq '. + {age: 30}'

# 更新字段
echo '{"count":1}' | jq '.count += 1'

# 删除字段
echo '{"name":"John","age":30}' | jq 'del(.age)'

# 构建新对象
echo '{"first":"John","last":"Doe"}' | jq '{fullName: "\(.first) \(.last)"}'
```

### 实用示例

```bash
# 解析 API 响应
curl -s https://api.github.com/users/octocat | jq '{name, company, location}'

# 统计项数
cat data.json | jq 'length'

# 求和
echo '[{"price":10},{"price":20}]' | jq '[.[].price] | add'

# 按字段分组
echo '[{"type":"a"},{"type":"b"},{"type":"a"}]' | jq 'group_by(.type)'

# 排序
echo '[3,1,2]' | jq 'sort'
echo '[{"name":"B"},{"name":"A"}]' | jq 'sort_by(.name)'
```

## Next Steps

- [jq 手册](https://jqlang.github.io/jq/manual/) - 官方文档
- [jq Playground](https://jqplay.org/) - 在线尝试
- [jq Cookbook](https://github.com/stedolan/jq/wiki/Cookbook) - 食谱
- [jqterm](https://jqterm.com/) - 交互式探索
