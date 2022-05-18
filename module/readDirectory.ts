const defaultPath = Deno.cwd();

export default (path: string = defaultPath): Iterable<Deno.DirEntry> => Deno.readDirSync(path);
