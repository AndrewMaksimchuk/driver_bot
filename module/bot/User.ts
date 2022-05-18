import { IUpdate, IUser } from "./types.ts";
import db from "./database.ts";
import dbTables, { usersColumns } from "./databaseTables.ts";
import { pipe } from "https://deno.land/x/ramda@v0.27.2/mod.ts";

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

const getAllUsers = () => db.selectAll(dbTables.users);

export default {
  getNewUsers,
  setNewUsers,
  getAllUsers,
};
