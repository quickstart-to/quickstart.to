---
title: "YouTube.js"
description: "Un client JavaScript pour l'API privée de YouTube - accédez aux vidéos, commentaires, chats en direct et données de streaming sans clés API ni quotas"
template: "tool"
tags: ["youtube", "video", "streaming", "api", "nodejs"]
---

## TL;DR

**En une ligne** : YouTube.js (youtubei.js) est un client JavaScript complet pour l'API privée InnerTube de YouTube qui fonctionne sur Node.js, Deno et les navigateurs.

**Valeurs principales** :
- Aucune clé API ou quota requis
- Accès aux vidéos, commentaires, chats en direct et données de streaming
- Support multiplateforme (Node.js, Deno, navigateurs)
- Contrôle total des téléchargements et du streaming vidéo

## Quick Start

### Prérequis

- Node.js 16.8+ (utilise l'implémentation fetch d'undici)
- Support EventTarget et CustomEvent
- Fetch conforme aux spécifications avec support ReadableStream

### Installation

```bash
# npm
npm install youtubei.js@latest

# Yarn
yarn add youtubei.js@latest

# Deno
deno add npm:youtubei.js@latest

# Git (version edge)
npm install github:LuanRT/YouTube.js
```

### Vérifier l'installation

```javascript
import { Innertube } from 'youtubei.js';

const youtube = await Innertube.create();
console.log('YouTube.js initialisé avec succès !');
```

### Première commande

```javascript
import { Innertube } from 'youtubei.js';

const youtube = await Innertube.create();

// Rechercher des vidéos
const results = await youtube.search('tutoriels JavaScript');
console.log(results.videos[0].title);

// Obtenir les informations d'une vidéo
const info = await youtube.getBasicInfo('dQw4w9WgXcQ');
console.log(info.basic_info.title);
```

## Cheatsheet

| Opération | Code |
|-----------|------|
| Initialiser le client | `const yt = await Innertube.create()` |
| Rechercher des vidéos | `await yt.search('requête')` |
| Obtenir infos de base | `await yt.getBasicInfo('videoId')` |
| Obtenir infos complètes | `await yt.getInfo('videoId')` |
| Télécharger une vidéo | `const stream = await info.download()` |
| Choisir le format | `info.chooseFormat({ type: 'audio', quality: 'best' })` |
| Obtenir l'URL de streaming | `format.decipher(yt.session.player)` |
| Convertir en DASH | `info.toDash()` |
| Obtenir les commentaires | `await yt.getComments('videoId')` |
| Accéder au chat en direct | `const livechat = info.getLiveChat()` |

## Gotchas

### Problème 1 : Téléchargements vidéo sans audio

**Raison** : YouTube diffuse la vidéo et l'audio sous forme de flux séparés pour de nombreux formats. Le téléchargement par défaut peut ne contenir que la vidéo.

**Solution** :

```javascript
const info = await youtube.getInfo('videoId');

// Choisir un format spécifique avec vidéo et audio
const format = info.chooseFormat({
  type: 'video+audio',
  quality: 'best'
});

// Ou télécharger l'audio et la vidéo séparément et les fusionner
const audioFormat = info.chooseFormat({ type: 'audio', quality: 'best' });
const videoFormat = info.chooseFormat({ type: 'video', quality: 'best' });
```

### Problème 2 : Expiration des URL de streaming

**Raison** : YouTube génère des URL à durée limitée pour le streaming. Ces URL expirent généralement après 6 heures.

**Solution** :

```javascript
// Toujours récupérer de nouvelles informations lors du streaming
const info = await youtube.getBasicInfo('videoId');
const url = info.streaming_data?.formats[0].decipher(yt.session.player);

// Pour les applications à long terme, actualiser les URL périodiquement
```

### Problème 3 : Limitation de débit et blocages

**Raison** : YouTube peut limiter le débit ou bloquer les requêtes s'il détecte des modèles d'accès automatisés.

**Solution** :

```javascript
// Utiliser des délais raisonnables entre les requêtes
await new Promise(resolve => setTimeout(resolve, 1000));

// Envisager l'implémentation d'un backoff exponentiel
// Alterner les adresses IP ou utiliser des proxys pour un usage intensif
```

## Next Steps

- [Documentation officielle](https://ytjs.dev) - Guides complets et référence API
- [Dépôt GitHub](https://github.com/LuanRT/YouTube.js) - Code source et exemples
- [Référence API](https://www.ytjs.dev/api/classes/Innertube) - Documentation complète de la classe Innertube
- [Exemples de téléchargement](https://github.com/LuanRT/YouTube.js/tree/main/examples) - Exemples de code pour les tâches courantes
- [Guide de démarrage](https://ytjs.dev/guide/getting-started) - Instructions de configuration détaillées
