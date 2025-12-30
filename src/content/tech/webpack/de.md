---
title: "Webpack"
description: "Modul-Bundler fur JavaScript - Code-Splitting, Loaders, Plugins fur komplexe Build-Pipelines"
template: "tool"
tags: ["bundler", "frontend", "build-tool"]
---

## TL;DR

**Was**: Ein statischer Modul-Bundler für moderne JavaScript-Anwendungen.

**Warum**: Assets bündeln, Code transformieren, Builds optimieren, umfangreiches Plugin-Ökosystem.

## Quick Start

**Installieren**:
```bash
npm init -y
npm install webpack webpack-cli --save-dev
```

**Dateien erstellen**:

`src/index.js`:
```javascript
import { greeting } from './greeting.js';
console.log(greeting('World'));
```

`src/greeting.js`:
```javascript
export function greeting(name) {
  return `Hello, ${name}!`;
}
```

**Bauen**:
```bash
npx webpack
```

Ausgabe wird in `dist/main.js` sein

## Cheatsheet

| Befehl | Beschreibung |
|---------|-------------|
| `npx webpack` | Bauen (Produktion) |
| `npx webpack --mode development` | Bauen (Entwicklung) |
| `npx webpack serve` | Dev-Server |
| `npx webpack --watch` | Watch-Modus |

**Basis-Konfiguration** (`webpack.config.js`):
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

- [Webpack Documentation](https://webpack.js.org/concepts/) - Offizielle Dokumentation
- [Webpack Guides](https://webpack.js.org/guides/) - Schritt-für-Schritt Anleitungen
- [Awesome Webpack](https://github.com/webpack-contrib/awesome-webpack) - Ressourcen
- Erwägen Sie [Vite](https://vitejs.dev/) für schnellere Entwicklung
