import type { DirEntry, Folder, PipeFirst } from "../type/index.ts";
import pipe from "https://deno.land/x/ramda@v0.27.2/source/pipe.js";
import getOnlyDirectories from "../getOnlyDirectories.ts";
import readFile from "../readFile.ts";
import getPath from "../getPath.ts";
import getOnlyDocuments from "../getOnlyDocuments.ts";
import getOnlyImages from "../getOnlyImages.ts";

const setPath = () => {
  const path = Deno.env.get("DRIVER_BOT_PATH");

  if (path) {
    return path;
  }

  console.log("[ ERROR  ]  DRIVER_BOT_PATH not set!");
  console.log("            Must be directory of 'vodiy' project with road signs and descriptions to them.");
  console.log("            https://github.com/AndrewMaksimchuk/vodiy")
  Deno.exit(1);
}

const path = setPath();
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

export default (): PipeFirst => getOnlyDirectories(path).map(processing);
