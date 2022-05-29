import type { PipeSecond } from "../type/index.ts";

export default (outputObject: PipeSecond) =>
  Deno.writeTextFile(
    "database.json",
    JSON.stringify({ roadSigns: outputObject }),
  );
