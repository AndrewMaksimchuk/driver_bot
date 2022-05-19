import { DB } from "https://deno.land/x/sqlite@v3.4.0/mod.ts";
import { DATABASE_NAME } from "./settings.ts";

type TTableColumnList = Record<string, string>;

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

  public deleteById(table: string, id: number) {
    const query = `
      DELETE FROM ${table}
      WHERE id = ${id};
    `;
    return this.setQuery(query);
  }

  public close() {
    this.db.close();
  }
}

const db = new Sqlite(DATABASE_NAME);

export default db;
