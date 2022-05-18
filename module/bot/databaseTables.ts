import db from './database.ts'

const tables = {
    bot: 'bot',
    users: 'users',
}

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
export type TUserColumns = keyof typeof usersColumns;
db.createTable(tables.users, usersColumns);

export default tables;
