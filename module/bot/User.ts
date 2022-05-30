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
} from "./databaseTables.ts";
import { IMessage, IUser } from "./bot_api_types.ts";
import { sendMessage, sendPhoto } from "./bot_api_methods.ts";
import {
  getImage,
  getRandomRow,
  setRandomNumberFromRange,
  tupleToObject,
} from "./helpers/index.ts";
import Store from "./Store.ts";
import { userSettings } from "./settings.ts";

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

  const caption = roadSign.description.trim().slice(0, 1024); // FIXME: Bag with 'header' property, don`t show in caption in telegram app

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
    caption: roadSign.description,
  });

  if (response.ok === true) updateRoadSignFileId(response.result, roadSign);
};

/** Send different message to all users in database. */
const sendMessageForAll = (text: string) =>
  getAllUsers().forEach(async (user) => {
    await sendMessage({ chat_id: user.id, text });
    await sendRoadSign(user);
  });

/** Get random selected traffic rule. */
const getTrafficRule = () => {
  const rules = db.selectAll<TTrafficRuleRow>(dbTables.traffic_rules);
  const randomIndex = setRandomNumberFromRange(rules.length);
  const rule = rules[randomIndex];
  return `${rule[1]}\n${rule[2]}`;
};

/** Send message with traffice rule to all users. */
const sendTrafficRule = () => sendMessageForAll(getTrafficRule());

/** Get road sign from database or if exist in store from store. */
const getRoadSign = () => {
  if (Store.get.sign) return Store.get.sign;
  const roadSign = getRandomRow<TRoadSign>(dbTables.road_signs);
  const sign = tupleToObject<IRoadSign>(roadSign, roadKeys);
  Store.set.sign = sign;
  return sign;
};

/** Update value of "file_id" column because this value is missing. */
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

// TODO: send random road marking with description
// const sendRoadMarking = () => '';

/** */
const getTestPdr = () => {
  const tests = db.selectAll<TTestPdrRow>(dbTables.tests_pdr);
  const randomIndex = setRandomNumberFromRange(tests.length);
  const test = tests[randomIndex];
  return `ПИТАННЯ\n${test[2]}\n${test[3]}`;
};

/** */
const sendTestPdr = () => sendMessageForAll(getTestPdr());

/** */
const getMedicineItem = () => {
  const items = db.selectAll<TMedicineRow>(dbTables.medicine);
  const randomIndex = setRandomNumberFromRange(items.length);
  const medicineItem = items[randomIndex];
  return `${medicineItem[1]}\n${medicineItem[2]}`;
};

/** */
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
