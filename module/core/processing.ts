import type { PipeFirst } from "../type/index.ts";
import parser from "../parser.ts";

export default (pipeObject: PipeFirst) => pipeObject.map(parser);
