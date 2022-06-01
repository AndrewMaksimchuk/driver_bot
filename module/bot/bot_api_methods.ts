import type {
  IGetChatMenuButton,
  IGetUpdates,
  ISendMessage,
  ISendPhoto,
  ISetChatMenuButton,
  ISetMyCommands,
  IUpdate,
  IUser,
} from "./bot_api_types.ts";
import {
  setKeyValueToString,
  setUrl,
  truncationText,
} from "./helpers/index.ts";
import httpClient from "./httpClient.ts";

/** getMe */
export const getMe = async () => await httpClient.get<IUser>(setUrl("getMe"));

/** getUpdates */
export const getUpdates = async (query?: IGetUpdates) => {
  return query
    ? await httpClient.get<IUpdate[]>(setUrl("getUpdates", query))
    : await httpClient.get<IUpdate[]>(setUrl("getUpdates"));
};

/** sendMessage */
export const sendMessage = async (query: ISendMessage) => {
  const maxTextLength = 4096;
  query.text = truncationText(query.text, maxTextLength);
  return await httpClient.get(setUrl("sendMessage", query));
};

/** sendPhoto */
export const sendPhoto = async (query: ISendPhoto) => {
  const maxCaptionLength = 1024;
  const body = new FormData();
  body.append("chat_id", query.chat_id.toString());
  body.append("photo", query.photo);
  query.caption &&
    body.append("caption", truncationText(query.caption, maxCaptionLength));
  return await httpClient.post(setUrl("sendPhoto"), body);
};

// logOut
// close
// Formatting options
// forwardMessage
// copyMessage
// sendAudio
// sendDocument
// sendVideo
// sendAnimation
// sendVoice
// sendVideoNote
// sendMediaGroup
// sendLocation
// editMessageLiveLocation
// stopMessageLiveLocation
// sendVenue
// sendContact
// sendPoll
// sendDice
// sendChatAction
// getUserProfilePhotos
// getFile
// banChatMember
// unbanChatMember
// restrictChatMember
// promoteChatMember
// setChatAdministratorCustomTitle
// banChatSenderChat
// unbanChatSenderChat
// setChatPermissions
// exportChatInviteLink
// createChatInviteLink
// editChatInviteLink
// revokeChatInviteLink
// approveChatJoinRequest
// declineChatJoinRequest
// setChatPhoto
// deleteChatPhoto
// setChatTitle
// setChatDescription
// pinChatMessage
// unpinChatMessage
// unpinAllChatMessages
// leaveChat
// getChat
// getChatAdministrators
// getChatMemberCount
// getChatMember
// setChatStickerSet
// deleteChatStickerSet
// answerCallbackQuery

/** setMyCommands */
export const setMyCommands = async (query: ISetMyCommands) => {
  interface TPreparedQuery {
    commands: string;
    scope?: string;
    language_code?: string;
  }

  const preparedQuery = setKeyValueToString(query);
  return await httpClient.get(setUrl("setMyCommands", preparedQuery));
};

// deleteMyCommands
// getMyCommands

/** setChatMenuButton */
export const setChatMenuButton = async (query?: ISetChatMenuButton) => {
  const response = query?.menu_button
    ? await httpClient.get(
      setUrl("setChatMenuButton", {
        ...query,
        menu_button: JSON.stringify(query.menu_button),
      }),
    )
    : await httpClient.get(setUrl("setChatMenuButton", query));

  return response;
};

/** getChatMenuButton */
export const getChatMenuButton = async (query?: IGetChatMenuButton) =>
  await httpClient.get(setUrl("getChatMenuButton", query));

// setMyDefaultAdministratorRights
// getMyDefaultAdministratorRights
// Inline mode methods
