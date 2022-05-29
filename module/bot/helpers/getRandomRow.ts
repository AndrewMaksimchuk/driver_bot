import db from "../database.ts";
import setRandomNumberFromRange from "./setRandomNumberFromRange.ts";

/**
 * Get one random row of data from selected database table
 */
export default <T extends unknown[]>(tableName: string) => {
  const items = db.selectAll<T>(tableName);
  const randomIndex = setRandomNumberFromRange(items.length);
  return items[randomIndex];
};
