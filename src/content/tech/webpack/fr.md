---
title: "Webpack"
description: "Démarrez avec le bundler Webpack en 5 minutes"
template: "tool"
tags: ["bundler", "frontend", "build-tool"]
---

## TL;DR

**Quoi** : Un bundler de modules statiques pour les applications JavaScript modernes.

**Pourquoi** : Bundler les assets, transformer le code, optimiser les builds, écosystème de plugins extensif.

## Quick Start

**Installer** :
```bash
npm init -y
npm install webpack webpack-cli --save-dev
```

**Créer les fichiers** :

`src/index.js` :
```javascript
import { greeting } from './greeting.js';
console.log(greeting('World'));
```

`src/greeting.js` :
```javascript
export function greeting(name) {
  return `Hello, ${name}!`;
}
```

**Build** :
```bash
npx webpack
```

La sortie sera dans `dist/main.js`

## Cheatsheet

| Commande | Description |
|---------|-------------|
| `npx webpack` | Build (production) |
| `npx webpack --mode development` | Build (développement) |
| `npx webpack serve` | Serveur de dev |
| `npx webpack --watch` | Mode watch |

**Config de base** (`webpack.config.js`) :
```javascript
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development',
};
```

## Gotchas

### Loaders for non-JS files

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/,
        type: 'asset/resource',
      },
    ],
  },
};
```

### Dev server

```bash
npm install webpack-dev-server --save-dev
```

```javascript
module.exports = {
  devServer: {
    static: './dist',
    hot: true,
    port: 3000,
  },
};
```

### HTML plugin

```bash
npm install html-webpack-plugin --save-dev
```

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
};
```

## Next Steps

- [Webpack Documentation](https://webpack.js.org/concepts/) - Documentation officielle
- [Webpack Guides](https://webpack.js.org/guides/) - Guides étape par étape
- [Awesome Webpack](https://github.com/webpack-contrib/awesome-webpack) - Ressources
- Considérez [Vite](https://vitejs.dev/) pour un développement plus rapide
