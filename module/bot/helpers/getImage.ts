import { join } from "https://deno.land/std@0.140.0/path/mod.ts";
import { imagesPath } from "../settings.ts";
import getFile from "./getFile.ts";

/*  Extends "getFile" function
*/
export default async (fileName: string) =>
  await getFile(fileName, join(imagesPath, fileName));
