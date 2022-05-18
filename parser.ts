import { pipe } from "https://deno.land/x/ramda@v0.27.2/mod.ts";
import input from "./module/core/input.ts";
import processing from "./module/core/processing.ts";
import output from "./module/core/output.ts";

try {
  pipe(input, processing, output)();
} catch (error) {
  Deno.writeTextFileSync('PARSER_ERROR.log', error + '\n', {append: true});
}
