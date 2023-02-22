// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

const ASSETS_EXTS = ['extc'];

config.resolver.assetExts.push(...ASSETS_EXTS);

module.exports = config;
