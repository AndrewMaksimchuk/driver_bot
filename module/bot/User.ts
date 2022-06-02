import db from "./database.ts";
import dbTables, {
  IRoadSign,
  roadKeys,
  TMedicineRow,
  TRoadSign,
  TTestPdrRow,
  TTrafficRuleRow,
  TUserRow,
  usersColumns,
  usersColumnsKeys,
  IRoadMark,
  TRoadMark,
} from "./databaseTables.ts";
import type { IUser } from "./bot_api_types.ts";
import { sendMessage, sendPhoto } from "./bot_api_methods.ts";
import {
  getImage,
  getRandomRow,
  setRandomNumberFromRange,
  tupleToObject,
  updateFileId,
} from "./helpers/index.ts";
import Store from "./Store.ts";
import { userSettings } from "./settings.ts";

const currentDay = new Date().getDay();

// FIXME: all tuple conver to object

/** Add new user data to database. */
const addNewUsers = (users: IUser[]) => {
  const columns = Object.keys(usersColumns);
  const values = users.map((user) => Object.values(user));
  return db.insert(dbTables.users, columns, values);
};

/** Convert array structure to object shape. */
const arrToObj = (user: TUserRow) =>
  user.reduce(
    (previusValue, currentValue, currentIndex) => ({
      ...previusValue,
      [usersColumnsKeys[currentIndex]]: currentValue,
    }),
    {}
  ) as IUser;

/** Convert array structure of database row to object shape. */
const mapArrToObjUser = (users: TUserRow[]) => users.map(arrToObj);

/** Get all users in database. */
const getAllUsers = () => {
  const users = db.selectAll<TUserRow>(dbTables.users);
  return mapArrToObjUser(users);
};

/**
 * Send to user some selected road sign
 */
const sendRoadSign = async (user: IUser) => {
  const roadSign = getRoadSign();

  const caption = `${roadSign.header.toUpperCase()}\n${roadSign.description.trim()}`;

  if (roadSign.file_id) {
    return await sendPhoto({
      chat_id: user.id,
      photo: roadSign.file_id,
      caption,
    });
  }

  const file = await getImage(roadSign.photo_name);
  if (!file) return;

  const response = await sendPhoto({
    chat_id: user.id,
    photo: file,
    caption,
  });

  if (response.ok === true)
    updateFileId(response.result, roadSign, "road_signs");
};

/** Send different message to all users in database. */
const sendMessageForAll = (text: string) =>
  getAllUsers().forEach(async (user) => {
    await sendMessage({ chat_id: user.id, text });
    await sendRoadSign(user);
    await sendRoadMark(user);
  });

/** Get random selected traffic rule. */
const getTrafficRule = () => {
  const rule = getRandomRow<TTrafficRuleRow>(
    dbTables.traffic_rules,
    currentDay
  );
  return `${rule[1]}\n${rule[2]}`;
};

/** Get road sign from database or if exist in store from store. */
const getRoadSign = () => {
  if (Store.get.sign) return Store.get.sign;
  const roadSign = getRandomRow<TRoadSign>(dbTables.road_signs, currentDay); // FIXME: Some bug with use type union => Argument of type 'string' is not assignable to parameter of type '"bot" | "users" | "traffic_rules" | "tests_pdr" | "medicine" | "road_signs" | "road_marking"'.deno-ts(2345)
  const sign = tupleToObject<IRoadSign>(roadSign, roadKeys);
  Store.set.sign = sign;
  return sign;
};

/** Get random road mark from database */
const getRoadMark = () => {
  if (Store.get.mark) return Store.get.mark;
  const roadMark = getRandomRow<TRoadMark>(dbTables.road_marking, currentDay);
  const mark = tupleToObject<IRoadMark>(roadMark, roadKeys);
  Store.set.mark = mark;
  return mark;
};

/** Send random road marking */
const sendRoadMark = async (user: IUser) => {
  const roadMakr = getRoadMark();

  const caption = `${roadMakr.header.toUpperCase()}\n${roadMakr.description.trim()}`;

  if (roadMakr.file_id) {
    return await sendPhoto({
      chat_id: user.id,
      photo: roadMakr.file_id,
      caption,
    });
  }

  const file = await getImage(roadMakr.photo_name);
  if (!file) return;

  const response = await sendPhoto({
    chat_id: user.id,
    photo: file,
    caption,
  });

  if (response.ok === true)
    updateFileId(response.result, roadMakr, "road_marking");
};

/** Get random pdr test from database */
const getTestPdr = () => {
  const test = getRandomRow<TTestPdrRow>(dbTables.tests_pdr, currentDay);
  return `ПИТАННЯ\n${test[1]}\n${test[2]}`;
};

/** Send pdr test to users */
const sendTestPdr = () => sendMessageForAll(getTestPdr());

/** Get medicine item from database */
const getMedicineItem = () => {
  const items = db.selectAll<TMedicineRow>(dbTables.medicine);
  const randomIndex = setRandomNumberFromRange(items.length);
  const medicineItem = items[randomIndex];
  return `${medicineItem[1]}\n${medicineItem[2]}`;
};

/** Send medicine item to users */
const sendMedicineItem = () => sendMessageForAll(getMedicineItem());

/** Concatenate text with another text. */
const concatenateTextMessages = (messages: string[]) =>
  messages.reduce((prev, curr) => `${prev}\n\n\n${curr}`, "");

/** Send multiple text message in one big message. */
const sendTogether = () => {
  const sentence = [];

  if (userSettings.trafficRule) sentence.push(getTrafficRule());
  if (userSettings.testPdr) sentence.push(getTestPdr());
  if (userSettings.medicine) sentence.push(getMedicineItem());

  const text = concatenateTextMessages(sentence);
  sendMessageForAll(text);
};

/** Delete user from database. */
const unsubscribe = (userId: number) => db.deleteById(dbTables.users, userId);

/** Send message with traffice rule to all users. */
const sendTrafficRule = () => sendMessageForAll(getTrafficRule());

export default {
  getAllUsers,
  sendTrafficRule,
  sendRoadSign,
  sendTestPdr,
  sendTogether,
  sendMedicineItem,
  unsubscribe,
  addNewUsers,
};
