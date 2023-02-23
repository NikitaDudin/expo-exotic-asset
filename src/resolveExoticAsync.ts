import { Asset } from 'expo-asset';
import {
  cacheDirectory,
  copyAsync,
  getInfoAsync,
} from 'expo-file-system';

/**
 * Helping function for loading files from "assets" folder.
 * Allows to bypass the problem of downloading files on the Android platform in release mode.
 *
 * @param {number | string} uri - Static resource id, the value of require('path/to/asset/file').
 *
 * @returns {Promise<Asset | null>} expo Asset or null.
 */
async function resolveExoticAsync(uri: number | string): Promise<Asset | null> {
  try {
    const [asset] = await Asset.loadAsync(uri);
    const { hash, type, name } = asset;
    const fileName = ['ExoticAssetFile', name, hash].join('-');
    const path = `${cacheDirectory}${[fileName, type].filter(Boolean).join('.')}`;

    const info = await getInfoAsync(path);

    if (!info.exists) {
      await copyAsync({ from: asset.localUri || asset.uri, to: path });
    }

    const fileReference = Asset.fromURI(path);
    // https://github.com/expo/expo-asset-utils/blob/master/src/resolveAsync.ts#L30
    fileReference.localUri = path;

    return fileReference;
  } catch (e) {
    return null;
  }
}

export default resolveExoticAsync;
