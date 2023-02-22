import resolveExoticAsync  from "./resolveExoticAsync";

/**
* Helping function for loading files with exotic extensions from "assets" folder.
*
* @param {number} uri - Static resource id, the value of require('path/to/asset/file').
*
* @returns {Promise<string | null>}  path to local file: 'file:///var/image.png' or null.
*/
async function resolveExoticPathAsync(uri: number): Promise<string | null> {
  const asset = await resolveExoticAsync(uri);

  return asset ? (asset.localUri || asset.uri) : null;
}

export default resolveExoticPathAsync;
