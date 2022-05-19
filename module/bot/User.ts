import { IUpdate, IUser } from "./bot_api_types.ts";
import db from "./database.ts";
import dbTables, { usersColumns, TTrafficRuleRow } from "./databaseTables.ts";
import { pipe } from "https://deno.land/x/ramda@v0.27.2/mod.ts";
import { usersColumnsKeys, TUserRow } from "./databaseTables.ts";
import { sendMessage } from "./bot_api_methods.ts";

const isNewUser = (updateItem: IUpdate) =>
  updateItem.message?.text === "/start";

const getUserData = (updateItem: IUpdate) => updateItem.message?.from;

const getNewUsers = (result: IUpdate[]) =>
  result.filter(isNewUser).map(getUserData).filter(Boolean) as IUser[];

const addNewUsers = (users: IUser[]) => {
  const columns = Object.keys(usersColumns);
  const values = users.map((user) => Object.values(user));
  return db.insert(dbTables.users, columns, values);
};

const setNewUsers = pipe(getNewUsers, addNewUsers);

const arrToObj = (user: TUserRow) =>
  user.reduce(
    (previusValue, currentValue, currentIndex) => ({
      ...previusValue,
      [usersColumnsKeys[currentIndex]]: currentValue,
    }),
    {}
  ) as IUser;

const mapArrToObjUser = (users: TUserRow[]) => users.map(arrToObj);

const getAllUsers = () => {
  const users = db.selectAll<TUserRow>(dbTables.users);
  return mapArrToObjUser(users);
};

const sendTextMessageForAll = (text: string) => getAllUsers().forEach(user => sendMessage({ chat_id: user.id, text }));

const getTrafficRule = () => {
  const rules = db.selectAll<TTrafficRuleRow>(dbTables.traffic_rules);
  const rulesLength = rules.length;
  const randomIndex = Math.floor(Math.random() * rulesLength);
  const rule = rules[randomIndex];
  return `${rule[1]}\n${rule[2]}`;
};

const sendTrafficRule = () => sendTextMessageForAll(getTrafficRule());

//for all user at once! 
// TODO: send random road sign with description
// const sendRoadSign = () => '';

// TODO: send random road marking with description
// const sendRoadMarking = () => '';

// TODO: send one off rule or sign or road markings and other...
// const sendOneOff = () => '';

export default {
  getNewUsers,
  setNewUsers,
  getAllUsers,
  sendTrafficRule,
};
