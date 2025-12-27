---
title: "YouTube.js"
description: "Ein JavaScript-Client für YouTubes private API - Zugriff auf Videos, Kommentare, Live-Chats und Streaming-Daten ohne API-Schlüssel oder Kontingente"
template: "tool"
tags: ["youtube", "video", "streaming", "api", "nodejs"]
---

## TL;DR

**Eine Zeile**: YouTube.js (youtubei.js) ist ein vollständiger JavaScript-Client für YouTubes private InnerTube-API, der in Node.js, Deno und Browsern funktioniert.

**Kernwerte**:
- Keine API-Schlüssel oder Kontingente erforderlich
- Zugriff auf Videos, Kommentare, Live-Chats und Streaming-Daten
- Plattformübergreifende Unterstützung (Node.js, Deno, Browser)
- Volle Kontrolle über Video-Downloads und Streaming

## Quick Start

### Voraussetzungen

- Node.js 16.8+ (verwendet undici's fetch-Implementierung)
- EventTarget- und CustomEvent-Unterstützung
- Spezifikationskonforme fetch mit ReadableStream-Unterstützung

### Installation

```bash
# npm
npm install youtubei.js@latest

# Yarn
yarn add youtubei.js@latest

# Deno
deno add npm:youtubei.js@latest

# Git (Edge-Version)
npm install github:LuanRT/YouTube.js
```

### Installation überprüfen

```javascript
import { Innertube } from 'youtubei.js';

const youtube = await Innertube.create();
console.log('YouTube.js erfolgreich initialisiert!');
```

### Erster Befehl

```javascript
import { Innertube } from 'youtubei.js';

const youtube = await Innertube.create();

// Videos suchen
const results = await youtube.search('JavaScript-Tutorials');
console.log(results.videos[0].title);

// Video-Informationen abrufen
const info = await youtube.getBasicInfo('dQw4w9WgXcQ');
console.log(info.basic_info.title);
```

## Cheatsheet

| Vorgang | Code |
|---------|------|
| Client initialisieren | `const yt = await Innertube.create()` |
| Videos suchen | `await yt.search('Suchanfrage')` |
| Grundlegende Infos abrufen | `await yt.getBasicInfo('videoId')` |
| Vollständige Infos abrufen | `await yt.getInfo('videoId')` |
| Video herunterladen | `const stream = await info.download()` |
| Format wählen | `info.chooseFormat({ type: 'audio', quality: 'best' })` |
| Streaming-URL abrufen | `format.decipher(yt.session.player)` |
| In DASH konvertieren | `info.toDash()` |
| Kommentare abrufen | `await yt.getComments('videoId')` |
| Live-Chat zugreifen | `const livechat = info.getLiveChat()` |

## Gotchas

### Problem 1: Video-Downloads ohne Audio

**Grund**: YouTube liefert Video und Audio für viele Formate als separate Streams. Der Standard-Download enthält möglicherweise nur Video.

**Lösung**:

```javascript
const info = await youtube.getInfo('videoId');

// Spezifisches Format mit Video und Audio wählen
const format = info.chooseFormat({
  type: 'video+audio',
  quality: 'best'
});

// Oder Audio und Video separat herunterladen und zusammenführen
const audioFormat = info.chooseFormat({ type: 'audio', quality: 'best' });
const videoFormat = info.chooseFormat({ type: 'video', quality: 'best' });
```

### Problem 2: Streaming-URLs laufen ab

**Grund**: YouTube generiert zeitlich begrenzte URLs für Streaming. Diese URLs laufen normalerweise nach 6 Stunden ab.

**Lösung**:

```javascript
// Beim Streaming immer neue Informationen abrufen
const info = await youtube.getBasicInfo('videoId');
const url = info.streaming_data?.formats[0].decipher(yt.session.player);

// Für lang laufende Apps URLs regelmäßig aktualisieren
```

### Problem 3: Ratenbegrenzung und Sperrungen

**Grund**: YouTube kann Anfragen begrenzen oder blockieren, wenn automatisierte Zugriffsmuster erkannt werden.

**Lösung**:

```javascript
// Angemessene Verzögerungen zwischen Anfragen verwenden
await new Promise(resolve => setTimeout(resolve, 1000));

// Exponentielles Backoff in Betracht ziehen
// IP-Adressen rotieren oder Proxys für hohe Volumen verwenden
```

## Next Steps

- [Offizielle Dokumentation](https://ytjs.dev) - Umfassende Anleitungen und API-Referenz
- [GitHub-Repository](https://github.com/LuanRT/YouTube.js) - Quellcode und Beispiele
- [API-Referenz](https://www.ytjs.dev/api/classes/Innertube) - Vollständige Innertube-Klassendokumentation
- [Download-Beispiele](https://github.com/LuanRT/YouTube.js/tree/main/examples) - Code-Beispiele für häufige Aufgaben
- [Erste Schritte](https://ytjs.dev/guide/getting-started) - Detaillierte Einrichtungsanleitung
