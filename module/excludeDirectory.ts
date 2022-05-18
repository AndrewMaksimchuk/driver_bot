const directories = ['.git', '.vscode'];

export default (item: Deno.DirEntry) => !directories.includes(item.name);