---
title: "Webpack"
description: "Comienza con el bundler Webpack en 5 minutos"
template: "tool"
tags: ["bundler", "frontend", "build-tool"]
---

## TL;DR

**Qué**: Un empaquetador de módulos estáticos para aplicaciones JavaScript modernas.

**Por qué**: Empaquetar assets, transformar código, optimizar builds, extenso ecosistema de plugins.

## Quick Start

**Instalar**:
```bash
npm init -y
npm install webpack webpack-cli --save-dev
```

**Crear archivos**:

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

**Build**:
```bash
npx webpack
```

La salida estará en `dist/main.js`

## Cheatsheet

| Comando | Descripción |
|---------|-------------|
| `npx webpack` | Build (producción) |
| `npx webpack --mode development` | Build (desarrollo) |
| `npx webpack serve` | Servidor de dev |
| `npx webpack --watch` | Modo watch |

**Configuración básica** (`webpack.config.js`):
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

- [Webpack Documentation](https://webpack.js.org/concepts/) - Documentación oficial
- [Webpack Guides](https://webpack.js.org/guides/) - Guías paso a paso
- [Awesome Webpack](https://github.com/webpack-contrib/awesome-webpack) - Recursos
- Considera [Vite](https://vitejs.dev/) para desarrollo más rápido
