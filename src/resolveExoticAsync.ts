import { Asset } from 'expo-asset';
import { cacheDirectory, getInfoAsync } from 'expo-file-system';

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
    const { hash, type } = asset;

    // Expo SDK 51: fix ios "asset is not readable". https://github.com/expo/expo/issues/29759
    if (asset.localUri?.includes('.expo-internal')) {
      const expfile = `${cacheDirectory}ExponentAsset-${hash}.${type}`;
      const info = await getInfoAsync(expfile);

      if (info.exists) {
        return Asset.fromURI(expfile);
      }
    }

    return asset;
  } catch (e) {
    return null;
  }
}

export default resolveExoticAsync;
