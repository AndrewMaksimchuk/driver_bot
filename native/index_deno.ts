import type { TableToRow } from "./interfaces.ts";
import { getRandomTableName } from "./getRandomTableName.ts";
import { databaseTablesNames, databaseTablesNamesInUkraine } from "./constants.ts";
// @ts-ignore
import { DB } from "https://deno.land/x/sqlite@v3.4.0/mod.ts";

const db = new DB("DRIVING.db");

function getRandomRow<T extends keyof TableToRow>(db: any, tableName: T) {
  return db.query(`SELECT * FROM ${tableName} ORDER BY random() LIMIT 1`) as TableToRow[T];
}

function printTableName(tableName: string) {
    console.log(tableName.toUpperCase(), "\n");
}

function main(db: any) {
  const tableName = getRandomTableName();

  switch (tableName) {
    case databaseTablesNames.traffic_rules: {
        const tableRow = getRandomRow(db, tableName);
        printTableName(databaseTablesNamesInUkraine[tableName]);
        // @ts-ignore
      console.log(tableRow[0]);
      break;
    }

    case databaseTablesNames.tests_pdr: {
      printTableName(databaseTablesNamesInUkraine[tableName]);
      const tableRow = getRandomRow(db, tableName);

    //   if (tableRow.qustion === "") {
    //     main(db);
    //     break;
    //   }
        // @ts-ignore
    console.log(tableRow[0]);
      break;
    }

    case databaseTablesNames.medicine: {
      const tableRow = getRandomRow(db, tableName);
      printTableName(databaseTablesNamesInUkraine[tableName]);
        // @ts-ignore
      console.log(tableRow[0]);
      break;
    }

    case databaseTablesNames.road_signs: {
      const tableRow = getRandomRow(db, tableName);
      printTableName(databaseTablesNamesInUkraine[tableName]);
        // @ts-ignore
      console.log(tableRow[0]);
      break;
    }

    case databaseTablesNames.road_marking: {
      const tableRow = getRandomRow(db, tableName);
      printTableName(databaseTablesNamesInUkraine[tableName]);
        // @ts-ignore
      console.log(tableRow[0]);
      break;
    }
  }
}

main(db);
db.close();
