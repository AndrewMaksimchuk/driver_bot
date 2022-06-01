// import type { TTableList } from '../databaseTables.ts';
import db, { IUpdateColumn } from "../database.ts";
import setRandomNumberFromRange from "./setRandomNumberFromRange.ts";

const currentDay = (new Date()).getDay();

// Represent database data row from table, not all column only 'id' thet exist in all tables.
type TRow = [id: number | string];

/** Update column 'update_day' for this item to today */
const updated = <T extends TRow>(item: T, tableName: string) => {
  const updateQueryParams: IUpdateColumn = {
    table: tableName,
    column: "updated_day",
    value: currentDay,
    id: item[0], // item is array of column value from database table - item === row of table
  };

  return db.updateColumn(updateQueryParams);
};

const returned = <T>(items: T[], tableName: string) => {
  const randomIndex = setRandomNumberFromRange(items.length);
  const item = items[randomIndex];

  updated(item as unknown as TRow, tableName);

  return item;
};

/**
 * Get one random row of data from selected database table
 */
// export default <T extends unknown[]>(tableName: TTableList, updatedDay?: number) => {
export default <T extends unknown[]>(
  tableName: string,
  updatedDay?: number,
) => {
  if (updatedDay) {
    const items = db.selectAllWhere<T>(
      tableName,
      "updated_day",
      currentDay,
      "<>",
    );
    return returned(items, tableName);
  }

  const items = db.selectAll<T>(tableName);
  return returned(items, tableName);
};
