import db from "./database.ts";
import dbTables, {
  IRoadMark,
  IRoadSign,
  ITestPdr,
  roadKeys,
  testKeys,
  TMedicineRow,
  TRoadMark,
  TRoadSign,
  TTestPdrRow,
  TTrafficRuleRow,
  TUserRow,
  usersColumns,
  usersColumnsKeys,
  ITrafficRule,
  trafficRuleKeys,
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
    {},
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

  const caption =
    `${roadSign.header.toUpperCase()}\n${roadSign.description.trim()}`;

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

  if (response.ok === true) {
    updateFileId(response.result, roadSign, "road_signs");
  }
};

/** Send different message to all users in database. */
const sendMessageForAll = (text: string) =>
  getAllUsers().forEach(async (user) => {
    await sendMessage({ chat_id: user.id, text });
    if (userSettings.testPdr) await sendTestPdr(user);
    if (userSettings.roadSign) await sendRoadSign(user);
    if (userSettings.roadMark) await sendRoadMark(user);
  });

/** Get random selected traffic rule. */
const getTrafficRule = () => {
  if (Store.get.rule) {
    return `${Store.get.rule.header}\n${Store.get.rule.text}`;
  }

  const ruleRow = getRandomRow<TTrafficRuleRow>(
    dbTables.traffic_rules,
    currentDay,
  );

  const rule = tupleToObject<ITrafficRule>(ruleRow, trafficRuleKeys);
  return `${rule.header}\n${rule.text}`;
};

/** Get road sign from database or if exist in store from store. */
const getRoadSign = () => {
  if (Store.get.sign) return Store.get.sign;
  const roadSign = getRandomRow<TRoadSign>(dbTables.road_signs, currentDay);
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
  const roadMark = getRoadMark();

  const caption =
    `${roadMark.header.toUpperCase()}\n${roadMark.description.trim()}`;

  if (roadMark.file_id) {
    return await sendPhoto({
      chat_id: user.id,
      photo: roadMark.file_id,
      caption,
    });
  }

  const file = await getImage(roadMark.photo_name);
  if (!file) return;

  const response = await sendPhoto({
    chat_id: user.id,
    photo: file,
    caption,
  });

  if (response.ok === true) {
    updateFileId(response.result, roadMark, "road_marking");
  }
};

/** Get random pdr test from database */
const getTestPdr = () => {
  if (Store.get.test) return Store.get.test;
  const testRow = getRandomRow<TTestPdrRow>(dbTables.tests_pdr, currentDay);
  const test = tupleToObject<ITestPdr>(testRow, testKeys);
  Store.set.test = test;
  return test;
};

/** Send pdr test to users */
const sendTestPdr = async (user: IUser) => {
  const testPdr = getTestPdr();

  if (testPdr.photo_name) {
    const caption = `ПИТАННЯ\n${testPdr.qustion}\n${testPdr.answer}`;

    if (testPdr.file_id) {
      return await sendPhoto({
        chat_id: user.id,
        photo: testPdr.file_id,
        caption,
      });
    }

    const file = await getImage(testPdr.photo_name);
    if (!file) return;

    const response = await sendPhoto({
      chat_id: user.id,
      photo: file,
      caption,
    });

    if (response.ok === true) {
      updateFileId(response.result, testPdr, "tests_pdr");
    }
    return;
  }

  const text = `ПИТАННЯ\n${testPdr.qustion}\n${testPdr.answer}`;
  await sendMessage({ chat_id: user.id, text });
};

/** Get medicine item from database */
const getMedicineItem = () => {
  const items = db.selectAll<TMedicineRow>(dbTables.medicine);
  const randomIndex = setRandomNumberFromRange(items.length);
  const medicineItem = items[randomIndex];
  return `${medicineItem[1]}\n${medicineItem[2]}`;
};

/** Concatenate text with another text. */
const concatenateTextMessages = (messages: string[]) =>
  messages.reduce((prev, curr) => `${prev}\n\n\n${curr}`, "");

/** Send multiple text message in one big message. */
const sendTogether = () => {
  const sentence = [];

  if (userSettings.trafficRule) sentence.push(getTrafficRule());
  if (userSettings.medicine) sentence.push(getMedicineItem());

  const text = concatenateTextMessages(sentence);
  sendMessageForAll(text);
};

/** Delete user from database. */
const unsubscribe = (userId: number) => db.deleteById(dbTables.users, userId);

export default {
  sendTogether,
  unsubscribe,
  addNewUsers,
};
