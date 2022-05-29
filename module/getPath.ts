import { join } from "https://deno.land/std@0.135.0/path/mod.ts";

export default (to: string, file: string) => join(to, file);
