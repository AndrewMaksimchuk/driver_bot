import { join } from "https://deno.land/std@0.140.0/path/mod.ts";

const cwd = Deno.cwd();
export const publicPath = join(cwd, "public");
export const imagesPath = join(publicPath, "images");

const TOKEN = Deno.env.get("DRIVER_BOT");
export const DATABASE = Deno.env.get("DATABASE");
export const URL_BASE = `https://api.telegram.org/bot${TOKEN}/`;
