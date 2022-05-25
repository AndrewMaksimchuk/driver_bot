import db from "./database.ts";
import dbTables, {
  usersColumns,
  TTrafficRuleRow,
  usersColumnsKeys,
  TUserRow,
  TTestPdrRow,
  TMedicineRow,
  TRoadSign,
  roadKeys,
  IRoadSign,
} from "./databaseTables.ts";
import { IUpdate, IUser, IMessage } from "./bot_api_types.ts";
import { pipe } from "https://deno.land/x/ramda@v0.27.2/mod.ts";
import { sendMessage, sendPhoto } from "./bot_api_methods.ts";
import {
  setRandomNumberFromRange,
  getImage,
  getRandomRow,
  tupleToObject,
} from "./helpers.ts";
import Store from './Store.ts';

// FIXME: all tuple conver to object

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

const sendMessageForAll = (text: string) =>
  getAllUsers().forEach((user) => {
    sendMessage({ chat_id: user.id, text });
    sendRoadSign(user);
  });

const getTrafficRule = () => {
  const rules = db.selectAll<TTrafficRuleRow>(dbTables.traffic_rules);
  const randomIndex = setRandomNumberFromRange(rules.length);
  const rule = rules[randomIndex];
  return `${rule[1]}\n${rule[2]}`;
};

const sendTrafficRule = () => sendMessageForAll(getTrafficRule());

// TODO: Delete user from database
// Unsubscribe
// const unsubscribe = () => ;

/**
 * Get road sign from database or if exist in store from store
 */
const getRoadSign = () => {
  if (Store.get.sign) return Store.get.sign;
  const roadSign = getRandomRow<TRoadSign>(dbTables.road_signs);
  const sign = tupleToObject<IRoadSign>(roadSign, roadKeys);
  Store.set.sign = sign;
  return sign;
};

/**
 * Update value of "file_id" column because this value is missing
 */
const updateRoadSignFileId = (message: IMessage, roadSign: IRoadSign) => {
  const photo = message.photo;

  if (photo) {
    const { file_id } = photo[0];

    file_id &&
      db.updateColumn({
        table: dbTables.road_signs,
        id: roadSign.id,
        column: "file_id",
        value: file_id,
      });
  }
};

/**
 * Send to user some selected road sign
 */
const sendRoadSign = async (user: IUser) => {
  const roadSign = getRoadSign();

  if (roadSign.file_id) {
    // TODO: Check if send photo success
    return await sendPhoto({
      chat_id: user.id,
      photo: roadSign.file_id,
      caption: roadSign.description,
    });
  }

  const file = await getImage(roadSign.photo_name);
  if (!file) return;

  const response = await sendPhoto({
    chat_id: user.id,
    photo: file,
    caption: roadSign.description,
  });

  if (response.ok === true) updateRoadSignFileId(response.result, roadSign);
};

// TODO: send random road marking with description
// const sendRoadMarking = () => '';

const getTestPdr = () => {
  const tests = db.selectAll<TTestPdrRow>(dbTables.tests_pdr);
  const randomIndex = setRandomNumberFromRange(tests.length);
  const test = tests[randomIndex];
  return `Питання\n${test[2]}\n${test[3]}`;
  // return `Питання №${test[1]}\n${test[2]}\n${test[3]}`;
};

const sendTestPdr = () => sendMessageForAll(getTestPdr());

const getMedicineItem = () => {
  const items = db.selectAll<TMedicineRow>(dbTables.medicine);
  const randomIndex = setRandomNumberFromRange(items.length);
  const medicineItem = items[randomIndex];
  return `${medicineItem[1]}\n${medicineItem[2]}`;
};

const sendMedicineItem = () => sendMessageForAll(getMedicineItem());

/**
 * Concatenate text with another text
 */
const concatenateTextMessages = (messages: string[]) =>
  messages.reduce((prev, curr) => `${prev}\n\n\n${curr}`, "");

/**
 * Send multiple text message in one big message
 */
const sendTogether = () => {
  const sentence = [getTrafficRule(), getTestPdr(), getMedicineItem()];
  const text = concatenateTextMessages(sentence);
  sendMessageForAll(text);
}

export default {
  getNewUsers,
  setNewUsers,
  getAllUsers,
  sendTrafficRule,
  sendRoadSign,
  sendTestPdr,
  sendTogether,
  sendMedicineItem,
};
