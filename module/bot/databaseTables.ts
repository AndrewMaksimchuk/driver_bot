import db from "./database.ts";

/**
 * List of all exist tables
 */
const tables = {
  bot: "bot",
  users: "users",
  traffic_rules: "traffic_rules",
  tests_pdr: "tests_pdr",
  medicine: "medicine",
  road_signs: "road_signs",
  road_marking: "road_marking",
};

export default tables;

/* CREATE TABLE IF NOT EXIST */

/**
 * Table only for bot
 */
export const botColumns = {
  id: "INTEGER PRIMARY KEY AUTOINCREMENT",
  offset: "TEXT NOT NULL",
};
export type TBotColumns = keyof typeof botColumns;
db.createTable(tables.bot, botColumns);

/**
 * Table only for users data
 */
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
  language_code?: string
];
db.createTable(tables.users, usersColumns);

/**
 * Table only for traffic rules
 */
export const trafficRulesColumns = {
  id: "INTEGER PRIMARY KEY AUTOINCREMENT",
  header: "TEXT NOT NULL",
  text: "TEXT NOT NULL",
};
export interface TTrafficRule {
  id: number;
  header: string;
  text: string;
}
export type TTrafficRuleRow = [id_0: number, header_1: string, text_2: string];
db.createTable(tables.traffic_rules, trafficRulesColumns);

/**
 * Table for tests
 */
export interface ITestPdr {
  id: number;
  number: number;
  qustion: string;
  answer: string;
  images: string[] | null;
}

export type TTestPdrRow = [
  id_0: number,
  number_1: number,
  qustion_2: string,
  answer_3: string,
  images_4: string // as json in string type
];

const testPdrColumns: Record<keyof ITestPdr, string> = {
  id: "INTEGER PRIMARY KEY AUTOINCREMENT",
  number: "INTEGER NOT NULL UNIQUE", // this column need to be with unique value
  qustion: "TEXT NOT NULL",
  answer: "TEXT NOT NULL",
  images: "TEXT", // as json in string type
};

db.createTable(tables.tests_pdr, testPdrColumns);

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

export interface IRoadSign {
  id: number;
  header: string;
  number: string;
  description: string;
  file_id: string | null;
  photo_name: string;
}

export type TRoadSign = [
  id_0: number,
  header_1: string,
  number_2: string,
  description_3: string,
  file_id_4: string,
  photo_name_5: string
];

export const roadKeys = [
  "id",
  "header",
  "number",
  "description",
  "file_id",
  "photo_name",
];

const roadSignColumns: Record<keyof IRoadSign, string> = {
  id: "INTEGER PRIMARY KEY AUTOINCREMENT",
  header: "TEXT NOT NULL",
  number: "TEXT NOT NULL UNIQUE",
  description: "TEXT NOT NULL",
  file_id: "TEXT UNIQUE",
  photo_name: "TEXT NOT NULL",
};

db.createTable(tables.road_signs, roadSignColumns);

// TODO: create "road_marking" table
