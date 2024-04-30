import type { TableToRow } from "./interfaces";
import { Database } from "bun:sqlite";
import { getRandomTableName } from "./getRandomTableName";
import { databaseTablesNames, databaseTablesNamesInUkraine } from "./constants";
import db from "./DRIVING.db" with { "type": "sqlite", embed: "true" };

function getRandomRow<T extends keyof TableToRow>(db: Database, tableName: T) {
  return db
    .query(`SELECT * FROM ${tableName} ORDER BY random() LIMIT 1`)
    .get() as TableToRow[T];
}

function printTableName(tableName: string) {
    console.log(tableName.toUpperCase(), "\n");
}

function main(db: Database) {
  const tableName = getRandomTableName();

  switch (tableName) {
    case databaseTablesNames.traffic_rules: {
      const tableRow = getRandomRow(db, tableName);
      printTableName(databaseTablesNamesInUkraine[tableName]);
      console.log(tableRow.header, "\n");
      console.log(tableRow.text);
      break;
    }

    case databaseTablesNames.tests_pdr: {
      printTableName(databaseTablesNamesInUkraine[tableName]);
      const tableRow = getRandomRow(db, tableName);

      if (tableRow.qustion === "") {
        main(db);
        break;
      }

      console.log(tableRow.theme, "\n");
      console.log("Питання", "\n", tableRow.qustion);
      console.log("Відповідь", "\n", tableRow.answer);
      break;
    }

    case databaseTablesNames.medicine: {
      const tableRow = getRandomRow(db, tableName);
      printTableName(databaseTablesNamesInUkraine[tableName]);
      console.log(tableRow.header, "\n");
      console.log(tableRow.text);
      break;
    }

    case databaseTablesNames.road_signs: {
      const tableRow = getRandomRow(db, tableName);
      printTableName(databaseTablesNamesInUkraine[tableName]);
      console.log(tableRow.header, "\n");
      console.log(tableRow.description);
      break;
    }

    case databaseTablesNames.road_marking: {
      const tableRow = getRandomRow(db, tableName);
      printTableName(databaseTablesNamesInUkraine[tableName]);
      console.log(tableRow.header, "\n");
      console.log(tableRow.description);
      break;
    }
  }

}

main(db);
db.close();
