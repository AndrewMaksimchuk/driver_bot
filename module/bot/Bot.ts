import { IUpdate } from "./bot_api_types.ts";
import db from "./database.ts";
import dbTables from "./databaseTables.ts";
import User from "./User.ts";
import Log from "./Log.ts";
import { getUpdates } from "./bot_api_methods.ts";

const setOffsetUpdate = (lastResult: IUpdate) =>
  db.insert(dbTables.bot, ["offset"], [[`${lastResult.update_id + 1}`]]);

const getOffsetUpdate = () =>
  db.selectColumn(dbTables.bot, "offset").at(-1) as number;

const update = async () => {
  const data = await getUpdates({ offset: getOffsetUpdate() });

  if (data.ok && data.result.length) {
    const lastResult = data.result.at(-1);
    lastResult?.update_id && setOffsetUpdate(lastResult);
    User.setNewUsers(data.result);
  }

  Log.log(data);
};

export default {
  setOffsetUpdate,
  getOffsetUpdate,
  update,
};
