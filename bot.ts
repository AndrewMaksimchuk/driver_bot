import "./module/bot/databaseTables.ts";
import Bot from "./module/bot/Bot.ts";
import Log from "./module/bot/Log.ts";
import User from "./module/bot/User.ts";

try {
  await Bot.update();
  User.sendTogether();
} catch (error) {
  Log.error(error);
}
