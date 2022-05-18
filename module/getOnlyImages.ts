import { pipe } from "https://deno.land/x/ramda@v0.27.2/mod.ts";
import readDirectory from "./readDirectory.ts";
import addPath from "./addPath.ts";

import type { DirEntry } from "./type/index.ts";

export default (path: string) => {
  const images: DirEntry[] = [];

  const push = (el: DirEntry) => images.push(el);

  const composition = pipe(addPath, push);

  for (const dirEntry of readDirectory(path)) {
    dirEntry.isFile &&
      dirEntry.name.includes(".png") &&
      composition(dirEntry, path);
  }
  return images;
};
