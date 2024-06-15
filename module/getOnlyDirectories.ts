import pipe from "https://deno.land/x/ramda@v0.27.2/source/pipe.js";
import readDirectory from "./readDirectory.ts";
import excludeDirectory from "./excludeDirectory.ts";
import addPath from "./addPath.ts";

import type { DirEntry } from "./type/index.ts";

const directories: DirEntry[] = [];

const push = (el: DirEntry) => directories.push(el);

const composition = pipe(addPath, push);

export default (path: string): DirEntry[] => {
  for (const dirEntry of readDirectory(path)) {
    dirEntry.isDirectory && excludeDirectory(dirEntry) &&
      composition(dirEntry, path);
  }
  return directories;
};
