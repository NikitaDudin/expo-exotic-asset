import { Asset } from 'expo-asset';
import { resolveAsync } from 'expo-asset-utils';
import {
  cacheDirectory,
  copyAsync,
  getInfoAsync,
} from 'expo-file-system';

/**
 * Helping function for loading files with exotic extensions from "assets" folder.
 * Allows to bypass the problem of downloading files on the Android platform in release mode.
 * List of exotic extensions should be added to metro.config.js
 *
 * @example
 * ```
 * const { getDefaultConfig } = require('expo/metro-config');
 *
 * const config = getDefaultConfig(__dirname);
 *
 * const ASSETS_EXTS = ['extc'];
 *
 * config.resolver.assetExts.push(...ASSETS_EXTS);
 *
 * module.exports = config;
 *```
 *
 * Current list of exotic extensions: "extc".
 *
 * @param {number} uri - Static resource id, the value of require('path/to/asset/file').
 *
 * @returns expo Asset or null.
 */
async function resolveExoticAsync(uri: number | string): Promise<Asset | null> {
  try {
    const { name: assetName, type, hash } = Asset.fromModule(uri);
    const extension = assetName.split('.').pop();

    if (type !== 'extc' || !extension) {
      return await resolveAsync(uri);
    }

    const path = `${cacheDirectory}ExoticAssetFile-${assetName}-${hash}.${extension}`;

    const info = await getInfoAsync(path);

    if (!info.exists) {
      const from = await resolveAsync(uri);
      await copyAsync({ from: from.localUri || from.uri, to: path });
    }

    return await resolveAsync(path);
  } catch (e) {
    return null;
  }
}

export default resolveExoticAsync;
