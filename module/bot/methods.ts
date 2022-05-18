import type {
  IUser,
  IGetUpdates,
  IUpdate,
  ISendMessage,
  IMessage,
} from "./types.ts";
import { setUrl } from "./helpers.ts";
import httpClient from "./httpClient.ts";

export const getMe = async () => await httpClient.get<IUser>(setUrl("getMe"));

export const getUpdates = async (query?: IGetUpdates) => {
  return query
    ? await httpClient.get<IUpdate>(setUrl("getUpdates", query))
    : await httpClient.get<IUpdate>(setUrl("getUpdates"));
};

// type TSendMessageHandler = (query: ISendMessage) => Promise<IMessage>;
// export const sendMessage: TSendMessageHandler = async (query) =>
//   await (await fetch(setUrl("sendMessage", query))).json();

// type TSendMessageHandler = (query: ISendMessage) => Promise<IMessage>;
export const sendMessage = async (query: ISendMessage) =>
  await httpClient.get<IMessage>(setUrl("sendMessage", query));
