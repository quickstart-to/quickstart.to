---
title: "YouTube.js"
description: "一个 JavaScript 版 YouTube 私有 API 客户端 - 无需 API 密钥或配额即可访问视频、评论、直播聊天和流媒体数据"
template: "tool"
tags: ["youtube", "video", "streaming", "api", "nodejs"]
---

## TL;DR

**一句话**:YouTube.js(youtubei.js)是一个功能完整的 JavaScript 客户端,用于访问 YouTube 的私有 InnerTube API,支持 Node.js、Deno 和浏览器。

**核心价值**:
- 无需 API 密钥或配额限制
- 访问视频、评论、直播聊天和流媒体数据
- 跨平台支持(Node.js、Deno、浏览器)
- 完全控制视频下载和流媒体播放

## Quick Start

### 前置要求

- Node.js 16.8+(使用 undici 的 fetch 实现)
- 支持 EventTarget 和 CustomEvent
- 符合规范的 fetch,支持 ReadableStream

### 安装

```bash
# npm
npm install youtubei.js@latest

# Yarn
yarn add youtubei.js@latest

# Deno
deno add npm:youtubei.js@latest

# Git(最新开发版)
npm install github:LuanRT/YouTube.js
```

### 验证安装

```javascript
import { Innertube } from 'youtubei.js';

const youtube = await Innertube.create();
console.log('YouTube.js 初始化成功!');
```

### 第一个命令

```javascript
import { Innertube } from 'youtubei.js';

const youtube = await Innertube.create();

// 搜索视频
const results = await youtube.search('JavaScript 教程');
console.log(results.videos[0].title);

// 获取视频信息
const info = await youtube.getBasicInfo('dQw4w9WgXcQ');
console.log(info.basic_info.title);
```

## Cheatsheet

| 操作 | 代码 |
|------|------|
| 初始化客户端 | `const yt = await Innertube.create()` |
| 搜索视频 | `await yt.search('关键词')` |
| 获取基本信息 | `await yt.getBasicInfo('videoId')` |
| 获取完整信息 | `await yt.getInfo('videoId')` |
| 下载视频 | `const stream = await info.download()` |
| 选择格式 | `info.chooseFormat({ type: 'audio', quality: 'best' })` |
| 获取流媒体 URL | `format.decipher(yt.session.player)` |
| 转换为 DASH | `info.toDash()` |
| 获取评论 | `await yt.getComments('videoId')` |
| 访问直播聊天 | `const livechat = info.getLiveChat()` |

## Gotchas

### 问题 1:下载的视频没有音频

**原因**:YouTube 对许多格式将视频和音频作为单独的流提供。默认下载可能只包含视频。

**解决**:

```javascript
const info = await youtube.getInfo('videoId');

// 选择同时包含视频和音频的特定格式
const format = info.chooseFormat({
  type: 'video+audio',
  quality: 'best'
});

// 或者分别下载音频和视频然后合并
const audioFormat = info.chooseFormat({ type: 'audio', quality: 'best' });
const videoFormat = info.chooseFormat({ type: 'video', quality: 'best' });
```

### 问题 2:流媒体 URL 过期

**原因**:YouTube 为流媒体生成有时间限制的 URL。这些 URL 通常在 6 小时后过期。

**解决**:

```javascript
// 流媒体播放时始终获取新的信息
const info = await youtube.getBasicInfo('videoId');
const url = info.streaming_data?.formats[0].decipher(yt.session.player);

// 对于长时间运行的应用,定期刷新 URL
```

### 问题 3:速率限制和封锁

**原因**:如果 YouTube 检测到自动化访问模式,可能会限制速率或封锁请求。

**解决**:

```javascript
// 在请求之间使用合理的延迟
await new Promise(resolve => setTimeout(resolve, 1000));

// 考虑实现指数退避
// 对于大量使用情况,轮换 IP 地址或使用代理
```

## Next Steps

- [官方文档](https://ytjs.dev) - 综合指南和 API 参考
- [GitHub 仓库](https://github.com/LuanRT/YouTube.js) - 源代码和示例
- [API 参考](https://www.ytjs.dev/api/classes/Innertube) - 完整的 Innertube 类文档
- [下载示例](https://github.com/LuanRT/YouTube.js/tree/main/examples) - 常见任务的代码示例
- [入门指南](https://ytjs.dev/guide/getting-started) - 详细的设置说明
