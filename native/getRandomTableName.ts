import setRandomNumberFromRange from "../module/bot/helpers/setRandomNumberFromRange.ts";
import { databaseTablesNames } from "./constants.ts";

export function getRandomTableName() {
  const tableNames = Object.keys(databaseTablesNames) as Array<
    keyof typeof databaseTablesNames
  >;
  const indexOfDatabaseTable = setRandomNumberFromRange(tableNames.length - 1);
  const selectedTableName = tableNames[indexOfDatabaseTable];
  return databaseTablesNames[selectedTableName];
}
