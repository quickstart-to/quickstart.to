---
title: "YouTube.js"
description: "Un cliente JavaScript para la API privada de YouTube - accede a videos, comentarios, chats en vivo y datos de transmisión sin claves API ni cuotas"
template: "tool"
tags: ["youtube", "video", "streaming", "api", "nodejs"]
---

## TL;DR

**En una línea**: YouTube.js (youtubei.js) es un cliente JavaScript completo para la API privada InnerTube de YouTube que funciona en Node.js, Deno y navegadores.

**Valores principales**:
- No requiere claves API ni cuotas
- Acceso a videos, comentarios, chats en vivo y datos de transmisión
- Soporte multiplataforma (Node.js, Deno, navegadores)
- Control total sobre descargas de videos y transmisión

## Quick Start

### Prerequisitos

- Node.js 16.8+ (usa la implementación fetch de undici)
- Soporte para EventTarget y CustomEvent
- Fetch compatible con especificaciones con soporte ReadableStream

### Instalación

```bash
# npm
npm install youtubei.js@latest

# Yarn
yarn add youtubei.js@latest

# Deno
deno add npm:youtubei.js@latest

# Git (versión edge)
npm install github:LuanRT/YouTube.js
```

### Verificar instalación

```javascript
import { Innertube } from 'youtubei.js';

const youtube = await Innertube.create();
console.log('¡YouTube.js inicializado correctamente!');
```

### Primer comando

```javascript
import { Innertube } from 'youtubei.js';

const youtube = await Innertube.create();

// Buscar videos
const results = await youtube.search('tutoriales de JavaScript');
console.log(results.videos[0].title);

// Obtener información del video
const info = await youtube.getBasicInfo('dQw4w9WgXcQ');
console.log(info.basic_info.title);
```

## Cheatsheet

| Operación | Código |
|-----------|--------|
| Inicializar cliente | `const yt = await Innertube.create()` |
| Buscar videos | `await yt.search('consulta')` |
| Obtener info básica | `await yt.getBasicInfo('videoId')` |
| Obtener info completa | `await yt.getInfo('videoId')` |
| Descargar video | `const stream = await info.download()` |
| Elegir formato | `info.chooseFormat({ type: 'audio', quality: 'best' })` |
| Obtener URL de transmisión | `format.decipher(yt.session.player)` |
| Convertir a DASH | `info.toDash()` |
| Obtener comentarios | `await yt.getComments('videoId')` |
| Acceder al chat en vivo | `const livechat = info.getLiveChat()` |

## Gotchas

### Problema 1: Descargas de video sin audio

**Razón**: YouTube proporciona video y audio como flujos separados para muchos formatos. La descarga predeterminada puede incluir solo el video.

**Solución**:

```javascript
const info = await youtube.getInfo('videoId');

// Elegir formato específico con video y audio
const format = info.chooseFormat({
  type: 'video+audio',
  quality: 'best'
});

// O descargar audio y video por separado y fusionarlos
const audioFormat = info.chooseFormat({ type: 'audio', quality: 'best' });
const videoFormat = info.chooseFormat({ type: 'video', quality: 'best' });
```

### Problema 2: Las URL de transmisión expiran

**Razón**: YouTube genera URL con límite de tiempo para transmisión. Estas URL normalmente expiran después de 6 horas.

**Solución**:

```javascript
// Siempre obtener información nueva al transmitir
const info = await youtube.getBasicInfo('videoId');
const url = info.streaming_data?.formats[0].decipher(yt.session.player);

// Para aplicaciones de larga duración, actualizar las URL periódicamente
```

### Problema 3: Limitación de velocidad y bloqueos

**Razón**: YouTube puede limitar o bloquear solicitudes si detecta patrones de acceso automatizado.

**Solución**:

```javascript
// Usar retrasos razonables entre solicitudes
await new Promise(resolve => setTimeout(resolve, 1000));

// Considerar implementar retroceso exponencial
// Rotar direcciones IP o usar proxies para uso de alto volumen
```

## Next Steps

- [Documentación oficial](https://ytjs.dev) - Guías completas y referencia API
- [Repositorio GitHub](https://github.com/LuanRT/YouTube.js) - Código fuente y ejemplos
- [Referencia API](https://www.ytjs.dev/api/classes/Innertube) - Documentación completa de la clase Innertube
- [Ejemplos de descarga](https://github.com/LuanRT/YouTube.js/tree/main/examples) - Ejemplos de código para tareas comunes
- [Guía de inicio](https://ytjs.dev/guide/getting-started) - Instrucciones detalladas de configuración
