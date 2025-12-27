---
title: "YouTube.js"
description: "JavaScript client for YouTube's private API - access videos, search, comments, and streaming data without API keys or quotas"
template: "tool"
tags: ["javascript", "youtube", "api", "streaming"]
---

## TL;DR

**One-liner**: YouTube.js (youtubei.js) is a JavaScript client for YouTube's private InnerTube API that enables programmatic access to videos, search, comments, and streaming data.

**Core values**:
- Works without API keys or quotas
- Cross-platform (Node.js, Deno, browsers)
- Access to videos, comments, live chats, and streaming data
- No authentication required for basic operations

## Quick Start

### Installation

```bash
# npm
npm install youtubei.js@latest

# Yarn
yarn add youtubei.js@latest

# Deno
deno add npm:youtubei.js@latest
```

### Prerequisites

- Node.js 16.8+ (for Fetch API support)
- Modern browser or Deno runtime

### Verify Installation

```javascript
import { Innertube } from 'youtubei.js';
const innertube = await Innertube.create();
console.log('YouTube.js initialized successfully');
```

### First Command

```javascript
import { Innertube } from 'youtubei.js';

// Initialize client
const innertube = await Innertube.create();

// Search for videos
const search = await innertube.search('JavaScript tutorials');
console.log(search.results);
```

## Cheatsheet

| Operation | Code |
|-----------|------|
| **Search videos** | `await innertube.search('query')` |
| **Get video info** | `await innertube.getInfo('video_id')` |
| **Get basic info** | `await innertube.getBasicInfo('video_id')` |
| **Download video** | `await innertube.download('video_id', options)` |
| **Get streaming data** | `await innertube.getStreamingData('video_id')` |
| **Get channel** | `await innertube.getChannel('channel_id')` |
| **Get playlist** | `await innertube.getPlaylist('playlist_id')` |
| **Get comments** | `await innertube.getComments('video_id', 'TOP_COMMENTS')` |
| **Get home feed** | `await innertube.getHomeFeed()` |

## Gotchas

### Issue 1: Video downloads missing audio

**Cause**: High-quality videos (1080p+) on YouTube typically don't have audio encoded with them - audio and video are separate streams.

**Solution**:

```javascript
// Download video and audio separately, then merge using ffmpeg
const info = await innertube.getInfo('video_id');
const format = info.chooseFormat({ quality: '1080p', type: 'video+audio' });
```

### Issue 2: Streaming URLs expire quickly

**Cause**: Generated download links are valid for approximately 6 hours. After expiration, you'll need to fetch new URLs.

**Solution**:

```javascript
// Fetch fresh streaming data when needed
const streamingData = await innertube.getStreamingData('video_id');
// Use the URL immediately or regenerate when expired
```

### Issue 3: Rate limiting or blocks

**Cause**: YouTube may rate-limit or block requests that appear automated or excessive.

**Solution**:

```javascript
// Use cookies for authenticated sessions (reduces blocking)
const innertube = await Innertube.create({
  cookie: 'your_cookie_string',
  client_type: 'WEB'
});

// Add delays between requests
await new Promise(resolve => setTimeout(resolve, 1000));
```

## Next Steps

- [Official Documentation](https://ytjs.dev) - Comprehensive guide and API reference
- [GitHub Repository](https://github.com/LuanRT/YouTube.js) - Source code and issue tracking
- [Getting Started Guide](https://ytjs.dev/guide/getting-started) - Detailed setup and configuration
- [API Reference](https://ytjs.dev/api/classes/Innertube.html) - Complete method documentation
- [Discord Community](https://discord.gg/4VEGeTNenD) - Community support and discussions
