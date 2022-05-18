import type {
  Folder,
  DirEntry,
  ParserObject,
  PipeSecond,
} from "./type/index.ts";
import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.22-alpha/deno-dom-wasm.ts";
import readFile from "./readFile.ts";

const handler = (
  dirEntry: DirEntry
): Omit<ParserObject, "header"> | undefined => {
  const page = readFile(dirEntry.path);

  const document = new DOMParser().parseFromString(page, "text/html");

  if (document) {
    const container = document.querySelector(".left_section")?.children;

    if (container) {
      const tail = container[1].children;
      const title = tail[0].textContent.trim();
      const description = tail[1].textContent
        .trim()
        .replaceAll("\t", "")
        .replaceAll("\n", "");
      const img = document
        .querySelector(".contain_mar > img:nth-child(1)")
        ?.getAttribute("src")
        ?.split("/")
        .at(-1);

      return { title, description, img };
    }
  }
};

export default (folder: Folder): PipeSecond => {
  const setFullImgPath = (doc: any) => {
    const obj = folder.imageFiles.find((item) => item.name === doc.img);
    if (obj) {
      doc.img = obj.path;
    }
    return doc;
  };

  const addHeader = (doc: any) => {
    doc.header = folder.header;
    return doc;
  };

  return folder.descriptionFiles
    .map(handler)
    .map(setFullImgPath)
    .map(addHeader);
};
