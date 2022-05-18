import { IUpdate } from "./types.ts";
import db from "./database.ts";
import dbTables from "./databaseTables.ts";

const setOffsetUpdate = (lastResult: IUpdate) =>
  db.insert(dbTables.bot, ["offset"], [[`${lastResult.update_id + 1}`]]);

const getOffsetUpdate = () => db.selectColumn(dbTables.bot, "offset").at(-1) as number;

export default {
  setOffsetUpdate,
  getOffsetUpdate,
};
