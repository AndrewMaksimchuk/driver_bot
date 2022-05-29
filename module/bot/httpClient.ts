import { IMessage, TResponse } from "./bot_api_types.ts";
import Log from "./Log.ts";

export const get = async <T = IMessage>(url: string): Promise<TResponse<T>> => {
  const response = await fetch(url);
  const responseData = await response.json();

  Log.log(responseData);
  return responseData;
};

export const post = async <T = IMessage>(
  url: string,
  body: FormData,
): Promise<TResponse<T>> => {
  const init: RequestInit = {
    method: "POST",
    body,
  };

  const response = await fetch(url, init);
  const responseData = await response.json();

  Log.log(responseData);
  return responseData;
};

export default {
  get,
  post,
};
