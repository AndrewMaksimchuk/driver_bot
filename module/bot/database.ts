import { DB } from "https://deno.land/x/sqlite@v3.4.0/mod.ts";
import { DATABASE } from "./settings.ts";
// import type { TTableList } from './databaseTables.ts';

type TTableColumnList = Record<string, string>;

export interface IUpdateColumn {
  table: string;
  id: string | number;
  column: string;
  value: string | number;
}

type TOperators =
  | "="
  | ">"
  | "<"
  | ">="
  | "<="
  | "<>"
  | "BETWEEN"
  | "LIKE"
  | "IN";

class Sqlite {
  private db: DB;

  constructor(dbName: string) {
    this.db = new DB(dbName);
  }

  private setQuery<T extends unknown[]>(sql: string) {
    return this.db.query<T>(sql);
  }

  private setColumnQuery(columnList: TTableColumnList) {
    return Object.entries(columnList)
      .map((item) => `${item[0]} ${item[1]}`)
      .toString();
  }

  public createTable(tableName: string, columnList: TTableColumnList) {
    const columnQuery = this.setColumnQuery(columnList);
    return this.setQuery(`
    CREATE TABLE IF NOT EXISTS ${tableName} (
      ${columnQuery}
    )`);
  }

  public insert(table: string, column: string[], values: Array<string[]>) {
    if (!values.length) return;
    const columnNumber = column.length;
    const veluesPlaces = `(${Array(columnNumber).fill("?")})`;

    const insertRow = (el: string[]) => {
      const query = `
      INSERT INTO ${table} (${column})
      VALUES ${veluesPlaces}`;
      return this.db.query(query, el);
    };

    return values.map(insertRow);
  }

  public selectAll<T extends unknown[]>(table: string) {
    const query = `
    SELECT * FROM ${table}
    `;
    return this.setQuery<T>(query);
  }

  public selectColumn(table: string, column: string | string[]) {
    const query = `
    SELECT ${column} FROM ${table}
    `;
    return this.setQuery(query).flat(1);
  }

  public selectColumns(table: string, column: string[]) {
    const query = `
    SELECT ${column.toString()} FROM ${table}
    `;
    return this.setQuery(query);
  }

  public deleteAll(table: string) {
    const query = `DELETE FROM ${table}`;
    this.setQuery(query);
  }

  public deleteById(table: string, id: string | number) {
    const query = `
      DELETE FROM ${table}
      WHERE id = ${id};
    `;
    return this.setQuery(query);
  }

  public deleteBy(
    table: string,
    columnName: string,
    columnValue: string | number,
  ) {
    const query = `
      DELETE FROM ${table}
      WHERE ${columnName} = ${columnValue};
    `;
    return this.setQuery(query);
  }

  public updateColumn<T extends unknown[]>(params: IUpdateColumn) {
    const query = `
    UPDATE ${params.table}
    SET ${params.column} = '${params.value}'
    WHERE id = ${params.id}; 
    `;
    return this.setQuery<T>(query);
  }

  public close() {
    this.db.close();
  }

  // public selectAllWhere<T extends unknown[]>(table: TTableList, columnNane: string, columnValue: string | number, operator: TOperators = "=") {
  public selectAllWhere<T extends unknown[]>(
    table: string,
    columnNane: string,
    columnValue: string | number,
    operator: TOperators = "=",
  ) {
    const query = `
    SELECT *
    FROM ${table}
    WHERE ${columnNane} ${operator} ${columnValue} OR ${columnNane} IS NULL;
    `;
    return this.setQuery<T>(query);
  }
}

if (DATABASE === undefined) {
  throw new Error(
    `Неможливо підключитися до бази данних.\n Відсутнє значання змінної навколишнього середовища "DATABASE"!\n`,
  );
}

const db = new Sqlite(DATABASE);

export default db;
