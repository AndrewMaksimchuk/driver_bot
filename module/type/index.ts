export type OsEntity<T> = T & { path: string };

export type DirEntry = OsEntity<Deno.DirEntry>;

export interface Folder {
  header: string;
  descriptionFiles: DirEntry[];
  imageFiles: DirEntry[];
  path: string;
}

export type PipeFirst = Folder[];

export interface ParserObject {
  header?: string;
  img?: string | undefined;
  title: string;
  description: string;
}

export type PipeSecond = ParserObject[];
