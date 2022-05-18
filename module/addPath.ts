import { join } from "https://deno.land/std@0.135.0/path/mod.ts";
import { OsEntity } from './type/index.ts';

export default <T extends Deno.DirEntry>(obj: T, path: string): OsEntity<T> => ({...obj, path: join(path, obj.name)});