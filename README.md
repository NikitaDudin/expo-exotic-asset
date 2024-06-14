[![npm version](https://img.shields.io/npm/v/expo-exotic-asset.svg?style=flat)](https://www.npmjs.com/package/expo-exotic-asset)
[![issues](https://img.shields.io/github/issues/nikitadudin/expo-exotic-asset.svg?style=flat)](https://github.com/nikitadudin/expo-exotic-asset/issues)

# expo-exotic-asset

Utilities for converting static local files into Expo Assets

# [ATTENTION] If you are using Expo SDK from version 51, then this library does not need to be used. Issue has been fixed.

# Why

### Fixed in EXPO SDK 51.
I ran into a problem that the static textures in the expo-tree are not loaded in the release build on the android platform. This solution circumvents this issue.

A texture from a static asset file works fine in debug mode. But doesn't work in Android release mode.

|Android debug | Android release |
| ------ | ------ |
| <img src="https://raw.githubusercontent.com/NikitaDudin/expo-exotic-asset/main/example/assets/debug.jpg" width='200'> |  <img src="https://raw.githubusercontent.com/NikitaDudin/expo-exotic-asset/main/example/assets/release.jpg" width='200'> |


# Linked issues

### Fixed in EXPO SDK 51.
- https://github.com/expo/expo/issues/20882
- https://github.com/expo/expo/issues/20797
- https://github.com/expo/expo-three/issues/54


# Installation

```
npm install expo-exotic-asset
```

```
yarn add expo-exotic-asset
```

# Usage

* `resolveExoticAsync` returns a promise that resolves a expo Asset or null

```ts
const asset = await resolveExoticAsync(require('asset/img.png)); // Asset or null
```

* `resolveExoticPathAsync` same as resolveExoticAsync but returns a promise that resolves file uri string or null

```ts
const uri = await resolveExoticPathAsync(require('asset/img.png)); // string or null
```

# Contributing

Contributions are very welcome!

Thanks for contributions!

## License

ISC [LICENSE](LICENSE)
