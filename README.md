# expo-exotic-asset

Utilities for converting static local files into Expo Assets

# Why

I ran into a problem that the static textures in the expo-tree are not loaded in the release build on the android platform. This solution circumvents this issue.

# Linked issues

- https://github.com/expo/expo/issues/20882
- https://github.com/expo/expo/issues/20797
- https://github.com/expo/expo-three/issues/54

etc.

# API documentation

* `resolveExoticAsync` returns a promise that resolves a expo Asset or null

```ts
const asset = await resolveExoticAsync(require('asset/img.png.extc)); // Asset or null
```

* `resolveExoticPathAsync` same as resolveExoticAsync but returns a promise that resolves file uri string or null

```ts
const uri = await resolveExoticPathAsync(require('asset/img.png.extc)); // string or null
```

# Installation

```
npm install expo-exotic-asset
```

```
yarn add expo-exotic-asset
```

# Configure

Add the `extc` extension for all problems static asset files.

```asset/img.png.extc```

Add the following code to metro.config.js

```js
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

const ASSETS_EXTS = ['extc']; // <- this

config.resolver.assetExts.push(...ASSETS_EXTS); // <- this

module.exports = config;
```

See example.

# Contributing

Contributions are very welcome!

Thanks for contributions!
