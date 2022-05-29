import { publicPath } from "../settings.ts";
import Log from "../Log.ts";

/**
 * Return `File` object for add to `FormData` object by `append` method.
 */
export default async (fileName: string, path: string = publicPath) => {
  try {
    const file = await Deno.readFile(path);
    return new File([file], fileName);
  } catch (error) {
    Log.error(error);
    Log.error(`Відсутній файл "${fileName}" за адресом у системі: ${path}`);
    return null;
  }
};
