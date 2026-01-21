---
title: "YouTube.js"
description: "A JavaScript client for YouTube's private API - access videos, comments, live chats, and streaming data without API keys or quotas"
template: "tool"
tags: ["youtube", "video", "streaming", "api", "nodejs"]
---

## TL;DR

**One-liner**: YouTube.js (youtubei.js) is a full-featured JavaScript client for YouTube's private InnerTube API that works in Node.js, Deno, and browsers.

**Core values**:
- No API keys or quotas required
- Access videos, comments, live chats, and streaming data
- Cross-platform support (Node.js, Deno, browsers)
- Full control over video downloads and streaming

## Quick Start

### Prerequisites

- Node.js 16.8+ (uses undici's fetch implementation)
- EventTarget and CustomEvent support
- Spec-compliant fetch with ReadableStream support

### Installation

```bash
# npm
npm install youtubei.js@latest

# Yarn
yarn add youtubei.js@latest

# Deno
deno add npm:youtubei.js@latest

# Git (edge version)
npm install github:LuanRT/YouTube.js
```

### Verify Installation

```javascript
import { Innertube } from 'youtubei.js';

const youtube = await Innertube.create();
console.log('YouTube.js initialized successfully!');
```

### First Command

```javascript
import { Innertube } from 'youtubei.js';

const youtube = await Innertube.create();

// Search for videos
const results = await youtube.search('JavaScript tutorials');
console.log(results.videos[0].title);

// Get video info
const info = await youtube.getBasicInfo('dQw4w9WgXcQ');
console.log(info.basic_info.title);
```

## Cheatsheet

| Operation | Code |
|-----------|------|
| Initialize client | `const yt = await Innertube.create()` |
| Search videos | `await yt.search('query')` |
| Get basic info | `await yt.getBasicInfo('videoId')` |
| Get full info | `await yt.getInfo('videoId')` |
| Download video | `const stream = await info.download()` |
| Choose format | `info.chooseFormat({ type: 'audio', quality: 'best' })` |
| Get streaming URL | `format.decipher(yt.session.player)` |
| Convert to DASH | `info.toDash()` |
| Get comments | `await yt.getComments('videoId')` |
| Access live chat | `const livechat = info.getLiveChat()` |

## Gotchas

### Issue 1: Video downloads missing audio

**Reason**: YouTube serves video and audio as separate streams for many formats. The default download may only include video.

**Solution**:

```javascript
const info = await youtube.getInfo('videoId');

// Choose specific format with both video and audio
const format = info.chooseFormat({
  type: 'video+audio',
  quality: 'best'
});

// Or download audio and video separately and merge them
const audioFormat = info.chooseFormat({ type: 'audio', quality: 'best' });
const videoFormat = info.chooseFormat({ type: 'video', quality: 'best' });
```

### Issue 2: Streaming URLs expire

**Reason**: YouTube generates time-limited URLs for streaming. These URLs typically expire after 6 hours.

**Solution**:

```javascript
// Always fetch fresh info when streaming
const info = await youtube.getBasicInfo('videoId');
const url = info.streaming_data?.formats[0].decipher(yt.session.player);

// For long-running apps, refresh URLs periodically
```

### Issue 3: Rate limiting and blocks

**Reason**: YouTube may rate-limit or block requests if they detect automated access patterns.

**Solution**:

```javascript
// Use reasonable delays between requests
await new Promise(resolve => setTimeout(resolve, 1000));

// Consider implementing exponential backoff
// Rotate IP addresses or use proxies for high-volume use cases
```

## Next Steps

- [Official Documentation](https://ytjs.dev) - Comprehensive guides and API reference
- [GitHub Repository](https://github.com/LuanRT/YouTube.js) - Source code and examples
- [API Reference](https://www.ytjs.dev/api/classes/Innertube) - Full Innertube class documentation
- [Download Examples](https://github.com/LuanRT/YouTube.js/tree/main/examples) - Code samples for common tasks
- [Getting Started Guide](https://ytjs.dev/guide/getting-started) - Detailed setup instructions
