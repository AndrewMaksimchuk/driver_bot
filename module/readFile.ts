export default (path: string): string => {
  const decoder = new TextDecoder("utf-8");
  const data = Deno.readFileSync(path);
  return decoder.decode(data);
};