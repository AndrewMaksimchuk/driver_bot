import db from './database.ts'

const tables = {
    bot: 'bot',
    users: 'users',
    traffic_rules: 'traffic_rules',
}

export default tables;

/* CREATE TABLE IF NOT EXIST */
export const botColumns = {
    id: "INTEGER PRIMARY KEY AUTOINCREMENT",
    offset: "TEXT NOT NULL",
};
export type TBotColumns = keyof typeof botColumns;
db.createTable(tables.bot, botColumns);

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

export const trafficRulesColumns = {
    id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
    header: 'TEXT NOT NULL',
    text: 'TEXT NOT NULL',
}
export interface TTrafficRule {
    id: number;
    header: string;
    text: string;
}
export type TTrafficRuleRow = [id_0: number, header_1: string, text_2: string];
db.createTable(tables.traffic_rules, trafficRulesColumns);
