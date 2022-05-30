import { IUpdate } from "./bot_api_types.ts";
import db from "./database.ts";
import dbTables from "./databaseTables.ts";
import User from "./User.ts";
import Log from "./Log.ts";
import { getUpdates } from "./bot_api_methods.ts";
import { botCommands } from "./settings.ts";

/**
 * Set new offset value from database.
 */
const setOffsetUpdate = (lastResult: IUpdate) =>
  db.insert(dbTables.bot, ["offset"], [[`${lastResult.update_id + 1}`]]);

/**
 * Get offset value from database.
 */
const getOffsetUpdate = () =>
  db.selectColumn(dbTables.bot, "offset").at(-1) as number;

/**
 * Handler only for bot commands.
 */
const commandsHandler = (data: IUpdate[]) => {
  data.forEach((value) => {
    value.message?.entities?.forEach((messageEntity) => {
      if (messageEntity.type === "bot_command") {
        const command = value.message?.text?.slice(0, messageEntity.length);

        if (command === botCommands.start) {
          value.message?.from && User.addNewUsers([value.message?.from]);
        }

        if (command === botCommands.unsubscribe) {
          value.message?.from?.id && User.unsubscribe(value.message?.from?.id);
        }
      }
    });
  });
};

/**
 * Get new data from telegram server and set new offset value for next time.
 */
const update = async () => {
  const data = await getUpdates({ offset: getOffsetUpdate() });

  if (data.ok && data.result.length) {
    const lastResult = data.result.at(-1);
    lastResult?.update_id && setOffsetUpdate(lastResult);
    commandsHandler(data.result);
  }

  Log.log(data);
};

export default {
  setOffsetUpdate,
  getOffsetUpdate,
  update,
};
