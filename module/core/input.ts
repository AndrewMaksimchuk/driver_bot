import type { DirEntry, Folder, PipeFirst } from "../type/index.ts";
import { pipe } from "https://deno.land/x/ramda@v0.27.2/mod.ts";
import getOnlyDirectories from "../getOnlyDirectories.ts";
import readFile from "../readFile.ts";
import getPath from "../getPath.ts";
import getOnlyDocuments from "../getOnlyDocuments.ts";
import getOnlyImages from "../getOnlyImages.ts";

const getHeader = pipe(getPath, readFile);
const getDescriptionFiles = pipe(getPath, getOnlyDocuments);
const getImageFiles = pipe(getPath, getOnlyImages);

const processing = (item: DirEntry): Folder => {
  const header = getHeader(item.path, "README.txt").trim();
  const descriptionFiles = getDescriptionFiles(item.path, "descriptions");
  const imageFiles = getImageFiles(item.path, "images");
  return {
    header,
    descriptionFiles,
    imageFiles,
    path: item.path,
  };
};

const path = "/home/andrew/code/terminal";

export default (): PipeFirst => getOnlyDirectories(path).map(processing);
