import db from "./database.ts";

/** List of all exist tables */
const tables = {
  bot: "bot",
  users: "users",
  traffic_rules: "traffic_rules",
  tests_pdr: "tests_pdr",
  medicine: "medicine",
  road_signs: "road_signs",
  road_marking: "road_marking",
  inscriptions_and_symbols: "inscriptions_and_symbols",
};

export type TTableList = keyof typeof tables;

export default tables;

/* CREATE TABLE IF NOT EXIST */

/** Table only for bot */
export const botColumns = {
  id: "INTEGER PRIMARY KEY AUTOINCREMENT",
  offset: "TEXT NOT NULL",
};
export type TBotColumns = keyof typeof botColumns;
db.createTable(tables.bot, botColumns);

/** Table only for users data */
export const usersColumns = {
  id: "INTEGER PRIMARY KEY",
  is_bot: "INTEGER NOT NULL",
  first_name: "TEXT NOT NULL",
  last_name: "TEXT NOT NULL",
  username: "TEXT NOT NULL",
  language_code: "TEXT NOT NULL",
};

export const usersColumnsKeys: string[] = Object.keys(usersColumns);
export type TUserColumns = keyof typeof usersColumns;
export type TUserRow = [
  id: number,
  is_bot: boolean,
  first_name: string,
  last_name?: string,
  username?: string,
  language_code?: string,
];
db.createTable(tables.users, usersColumns);

/** Table only for traffic rules */
export const trafficRulesColumns = {
  id: "INTEGER PRIMARY KEY AUTOINCREMENT",
  header: "TEXT NOT NULL",
  text: "TEXT NOT NULL",
  updated_day: "INTEGER",
};
export interface TTrafficRule {
  id: number;
  header: string;
  text: string;
  updated_day: number | null;
}
export type TTrafficRuleRow = [
  id_0: number,
  header_1: string,
  text_2: string,
  updated_day_3: number,
];
db.createTable(tables.traffic_rules, trafficRulesColumns);

/** Table for tests "tests_pdr" */
export interface ITestPdr {
  id: number;
  qustion: string;
  answer: string;
  updated_day: number | null;
  theme: string | null;
  photo_name: string | null;
  item: number | null;
  file_id: string | null;
}

export type TTestPdrRow = [
  id_0: number,
  qustion_1: string,
  answer_2: string,
  updated_day_3: number,
  theme_4: string | null,
  photo_name_5: string | null,
  item_6: number | null,
  file_id_7: string | null,
];

export const testKeys = [
  "id",
  "qustion",
  "answer",
  "updated_day",
  "theme",
  "photo_name",
  "item",
  "file_id",
];

const testPdrColumns: Record<keyof ITestPdr, string> = {
  id: "INTEGER PRIMARY KEY AUTOINCREMENT",
  qustion: "TEXT NOT NULL UNIQUE",
  answer: "TEXT NOT NULL",
  updated_day: "INTEGER",
  theme: "TEXT",
  photo_name: "TEXT",
  item: "INTEGER",
  file_id: "TEXT",
};

db.createTable(tables.tests_pdr, testPdrColumns);

/** Table for medicine */
interface IMedicine {
  id: number;
  header: string;
  text: string;
}

export type TMedicineRow = [id_0: number, header_1: string, text_2: string];

const medicineColumns: Record<keyof IMedicine, string> = {
  id: "INTEGER PRIMARY KEY AUTOINCREMENT",
  header: "TEXT NOT NULL",
  text: "TEXT NOT NULL",
};

db.createTable(tables.medicine, medicineColumns);

/** Table for road sign */
export interface IRoadSign {
  id: number;
  header: string;
  number: string;
  description: string;
  file_id: string | null;
  photo_name: string;
  updated_day: number | null;
}

export type TRoadSign = [
  id_0: number,
  header_1: string,
  number_2: string,
  description_3: string,
  file_id_4: string,
  photo_name_5: string,
  updated_day_6: number,
];

export const roadKeys = [
  "id",
  "header",
  "number",
  "description",
  "file_id",
  "photo_name",
  "updated_day",
];

const roadSignColumns: Record<keyof IRoadSign, string> = {
  id: "INTEGER PRIMARY KEY AUTOINCREMENT",
  header: "TEXT NOT NULL",
  number: "TEXT NOT NULL UNIQUE",
  description: "TEXT NOT NULL",
  file_id: "TEXT UNIQUE",
  photo_name: "TEXT NOT NULL",
  updated_day: "INTEGER",
};

db.createTable(tables.road_signs, roadSignColumns);

/** Table for road marking */
export interface IRoadMark {
  id: number;
  header: string;
  number: string;
  description: string;
  file_id: string | null;
  photo_name: string;
  updated_day: number | null;
}

export type TRoadMark = [
  id_0: number,
  header_1: string,
  number_2: string,
  description_3: string,
  file_id_4: string,
  photo_name_5: string,
  updated_day_6: number,
];

export const roadMarkingKeys = [
  "id",
  "header",
  "number",
  "description",
  "file_id",
  "photo_name",
  "updated_day",
];

const roadMarkingColumns: Record<keyof IRoadMark, string> = {
  id: "INTEGER PRIMARY KEY AUTOINCREMENT",
  header: "TEXT NOT NULL",
  number: "TEXT NOT NULL UNIQUE",
  description: "TEXT NOT NULL",
  file_id: "TEXT",
  photo_name: "TEXT NOT NULL",
  updated_day: "INTEGER",
};

db.createTable(tables.road_marking, roadMarkingColumns);

/** Table for inscriptions and symbols */
export interface IInscriptionsAndSymbols {
  id: number;
  header: string;
  description: string;
  photo_name: string;
  file_id: string | null;
  updated_day: number | null;
}

export type TInscriptionsAndSymbolsRow = [
  id_0: number,
  header_1: string,
  description_2: string,
  photo_name_3: string,
  file_id_4: string | null,
  updated_day_5: number | null,
];

export const inscriptionsAndSymbolsKeys = [
  "id",
  "header",
  "description",
  "photo_name",
  "file_id",
  "updated_day",
];

const inscriptionsAndSymbolsColumns: Record<
  keyof IInscriptionsAndSymbols,
  string
> = {
  id: "INTEGER PRIMARY KEY AUTOINCREMENT",
  header: "TEXT NOT NULL",
  description: "TEXT NOT NULL",
  photo_name: "TEXT NOT NULL",
  file_id: "TEXT",
  updated_day: "INTEGER",
};

db.createTable(tables.inscriptions_and_symbols, inscriptionsAndSymbolsColumns);
