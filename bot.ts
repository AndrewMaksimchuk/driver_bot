import User from "./module/bot/User.ts";
import Bot from "./module/bot/Bot.ts";
import Log from "./module/bot/Log.ts";
import './module/bot/databaseTables.ts'

try {
  await Bot.update();
  User.sendTrafficRule();
} catch (error) {
  Log.error(error);
}
