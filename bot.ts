// import type { IUser } from "./module/type/bot.ts";
// import { getMe, sendMessage, getUpdates } from "./module/bot/methods.ts";
import { getUpdates, sendMessage } from "./module/bot/methods.ts";
import User from "./module/bot/User.ts";
import Bot from "./module/bot/Bot.ts";
import Log from "./module/bot/Log.ts";
import "./module/bot/database.ts";
// import { pipe } from "https://deno.land/x/ramda@v0.27.2/mod.ts";

// const setNewUser = pipe(User.getNewUsers, User.setNewUsers);

const botUpdate = async () => {
  // const jsonData = await getMe();
  // const jsonData = await sendMessage({chat_id: 467765524, text: 'Hello'});

  const data = await getUpdates({ offset: Bot.getOffsetUpdate() });

  if (data.ok && data.result.length) {
    const lastResult = data.result.at(-1);
    lastResult?.update_id && Bot.setOffsetUpdate(lastResult);
    User.setNewUsers(data.result);
  }

  Log.log(data);
};

try {
  await botUpdate();

  // User.getAllUsers().forEach(user => sendMessage())

} catch (error) {
  Log.error(error);
}
