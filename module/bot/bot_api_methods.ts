import type {
  IUser,
  IGetUpdates,
  IUpdate,
  ISendMessage,
  ISendPhoto,
} from "./bot_api_types.ts";
import { setUrl } from "./helpers.ts";
import httpClient from "./httpClient.ts";

export const getMe = async () => await httpClient.get<IUser>(setUrl("getMe"));

export const getUpdates = async (query?: IGetUpdates) => {
  return query
    ? await httpClient.get<IUpdate[]>(setUrl("getUpdates", query))
    : await httpClient.get<IUpdate[]>(setUrl("getUpdates"));
};

export const sendMessage = async (query: ISendMessage) =>
  await httpClient.get(setUrl("sendMessage", query));

export const sendPhoto = async (query: ISendPhoto) => {
  const body = new FormData();
  body.append("chat_id", query.chat_id.toString());
  body.append("photo", query.photo);
  query.caption && body.append("caption", query.caption);
  return await httpClient.post(setUrl("sendPhoto"), body);
};
