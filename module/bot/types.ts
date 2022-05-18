export interface IResponseSuccess<T> {
  ok: true;
  result: T[];
}

export interface IResponseError { 
  ok: false;
  description: string;
  error_code: number;
  parameters?: IResponseParameters;
}

export type TResponse<T> = IResponseSuccess<T> | IResponseError;

export interface IResponseParameters {
  migrate_to_chat_id?: number;
  retry_after?: number;
}

export interface IGetUpdates {
  offset?: number;
  limit?: number;
  timeout?: number;
  allowed_updates?: string[];
}

export interface IUpdate {
  update_id: number;
  message?: IMessage;
  edited_message?: IMessage;
  channel_post?: IMessage;
  edited_channel_post?: IMessage;
  inline_query?: IInlineQuery;
  chosen_inline_result?: IChosenInlineResult;
  callback_query?: ICallbackQuery;
  shipping_query?: IShippingQuery;
  pre_checkout_query?: IPreCheckoutQuery;
  poll?: IPoll;
  poll_answer?: IPollAnswer;
  my_chat_member?: IChatMemberUpdated;
  chat_member?: IChatMemberUpdated;
  chat_join_request?: IChatJoinRequest;
}

export interface IInlineQuery {
  id: string;
  from: IUser;
  query: string;
  offset: string;
  chat_type: string;
  location: ILocation;
}

export interface IChosenInlineResult {
  result_id: string;
  from: IUser;
  location?: ILocation;
  inline_message_id?: string;
  query: string;
}

export interface ICallbackQuery {
  id: string;
  from: IUser;
  message?: IMessage;
  inline_message_id?: string;
  chat_instance?: string;
  data?: string;
  game_short_name?: string;
}

export interface IShippingQuery {
  id: string;
  from: IUser;
  invoice_payload: string;
  shipping_address: IShippingAddress;
}

export interface IPreCheckoutQuery {
  id: string;
  from: IUser;
  currency: string;
  total_amount: number;
  invoice_payload: string;
  shipping_option_id?: string;
  order_info?: IOrderInfo;
}

export interface IPollAnswer {
  poll_id: string;
  user: IUser;
  option_ids: number[];
}

export interface IChatMemberBanned {
  status: string;
  user: IUser;
  until_date: number;
}

export interface IChatMemberLeft {
  status: string;
  user: IUser;
}

export interface IChatMemberRestricted {
  status: string;
  user: IUser;
  is_member: boolean;
  can_change_info: boolean;
  can_invite_users: boolean;
  can_pin_messages: boolean;
  can_send_messages: boolean;
  can_send_media_messages: boolean;
  can_send_polls: boolean;
  can_send_other_messages: boolean;
  can_add_web_page_previews: boolean;
  until_date: number;
}

export interface IChatMemberMember {
  status: string;
  user: IUser;
}

export interface IChatMemberAdministrator {
  status: string;
  user: IUser;
  can_be_edited: boolean;
  is_anonymous: boolean;
  can_manage_chat: boolean;
  can_delete_messages: boolean;
  can_manage_video_chats: boolean;
  can_restrict_members: boolean;
  can_promote_members: boolean;
  can_change_info: boolean;
  can_invite_users: boolean;
  can_post_messages?: boolean;
  can_edit_messages?: boolean;
  can_pin_messages?: boolean;
  custom_title?: string;
}

export interface IChatMemberOwner {
  status: string;
  user: IUser;
  is_anonymous: boolean;
  custom_title?: string;
}

export type TChatMember =
  | IChatMemberOwner
  | IChatMemberAdministrator
  | IChatMemberMember
  | IChatMemberRestricted
  | IChatMemberLeft
  | IChatMemberBanned;

export interface IChatMemberUpdated {
  chat: IChat;
  from: IUser;
  date: number;
  old_chat_member: TChatMember;
  new_chat_member: TChatMember;
  invite_link?: IChatInviteLink;
}

export interface IChatJoinRequest {
  chat: IChat;
  from: IUser;
  data: number;
  bio?: string;
  invite_link?: IChatInviteLink;
}

export interface IChatInviteLink {
  invite_link: string;
  creator: IUser;
  creates_join_request: boolean;
  is_primary: boolean;
  is_revoked: boolean;
  name?: string;
  expire_date?: number;
  member_limit?: number;
  pending_join_request_count?: number;
}

export interface IMessage {
  message_id: number;
  from?: IUser;
  sender_chat?: IChat;
  date: number;
  chat: IChat;
  forward_from?: IUser;
  forward_from_chat?: IChat;
  forward_from_message_id?: number;
  forward_signature?: string;
  forward_sender_name?: string;
  forward_date?: number;
  is_automatic_forward?: true;
  reply_to_message?: IMessage;
  via_bot?: IUser;
  edit_date?: number;
  has_protected_content?: true;
  media_group_id?: string;
  author_signature?: string;
  text?: string;
  entities?: IMessageEntity[];
  animation?: IAnimation;
  audio?: IAudio;
  document?: IDocument;
  photo?: IPhotoSize[];
  sticker?: ISticker;
  video?: IVideo;
  video_note?: IVideoNote;
  voice?: IVoice;
  caption?: string;
  caption_entities?: IMessageEntity[];
  contact?: IContact;
  dice?: IDice;
  game?: IGame;
  poll?: IPoll;
  venue?: IVenue;
  location?: ILocation;
  new_chat_members?: IUser[];
  left_chat_member?: IUser;
  new_chat_title?: string;
  new_chat_photo?: IPhotoSize[];
  delete_chat_photo?: true;
  group_chat_created?: true;
  supergroup_chat_created?: true;
  channel_chat_created?: true;
  message_auto_delete_timer_changed?: IMessageAutoDeleteTimerChanged;
  migrate_to_chat_id?: number;
  migrate_from_chat_id?: number;
  pinned_message?: IMessage;
  invoice?: IInvoice;
  successful_payment?: ISuccessfulPayment;
  connected_website?: string;
  passport_data?: IPassportData;
  proximity_alert_triggered?: ProximityAlertTriggered;
  video_chat_scheduled?: VideoChatScheduled;
  video_chat_started?: VideoChatStarted;
  video_chat_ended?: VideoChatEnded;
  video_chat_participants_invited?: VideoChatParticipantsInvited;
  web_app_data?: WebAppData;
  reply_markup?: InlineKeyboardMarkup;
}

export interface IChat {
  id: number;
  type: string;
  title?: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  photo?: ChatPhoto;
  bio?: string;
  has_private_forwards?: true;
  description?: string;
  invite_link?: string;
  pinned_message?: IMessage;
  permissions?: ChatPermissions;
  slow_mode_delay?: number;
  message_auto_delete_time?: number;
  has_protected_content?: true;
  sticker_set_name?: string;
  can_set_sticker_set?: true;
  linked_chat_id?: number;
  location?: ChatLocation;
}

export interface ChatPhoto {
  small_file_id: string;
  small_file_unique_id: string;
  big_file_id: string;
  big_file_unique_id: string;
}

export interface ChatPermissions {
  can_send_messages?: boolean;
  can_send_media_messages?: boolean;
  can_send_polls?: boolean;
  can_send_other_messages?: boolean;
  can_add_web_page_previews?: boolean;
  can_change_info?: boolean;
  can_invite_IUsers?: boolean;
  can_pin_messages?: boolean;
}

export interface ChatLocation {
  location: ILocation;
  address: string;
}

export interface IAnimation {
  file_id: string;
  file_unique_id: string;
  width: number;
  height: number;
  duration: number;
  thumb?: IPhotoSize;
  file_name?: string;
  mime_type?: string;
  file_size?: number;
}

export interface IAudio {
  file_id: string;
  file_unique_id: string;
  duration: number;
  performer?: string;
  title?: string;
  file_name?: string;
  mime_type?: string;
  file_size?: number;
  thumb?: IPhotoSize;
}

export interface IDocument {
  file_id: string;
  file_unique_id: string;
  thumb?: IPhotoSize;
  file_name?: string;
  mime_type?: string;
  file_size?: number;
}

export interface IPhotoSize {
  file_id: string;
  file_unique_id: string;
  width: number;
  height: number;
  file_size?: number;
}

export interface ISticker {
  file_id: string;
  file_unique_id: string;
  width: number;
  height: number;
  is_animated: boolean;
  is_video: boolean;
  thumb?: IPhotoSize;
  emoji?: string;
  set_name?: string;
  mask_position?: MaskPosition;
  file_size?: number;
}

export interface MaskPosition {
  point: string;
  x_shift: number;
  y_shift: number;
  scale: number;
}

export interface IVideo {
  file_id: string;
  file_unique_id: string;
  width: number;
  height: number;
  duration: number;
  thumb?: IPhotoSize;
  file_name?: string;
  mime_type?: string;
  file_size?: number;
}

export interface IVideoNote {
  file_id: string;
  file_unique_id: string;
  length: number;
  duration: number;
  thumb?: IPhotoSize;
  file_size?: number;
}

export interface IVoice {
  file_id: string;
  file_unique_id: string;
  duration: number;
  mime_type?: string;
  file_size?: number;
}

export interface IContact {
  phone_number: string;
  first_name: string;
  last_name?: string;
  IUser_id?: number;
  vcard?: string;
}

export interface IDice {
  emoji: string;
  value: number;
}

export interface IGame {
  title: string;
  description: string;
  photo: IPhotoSize[];
  text?: string;
  text_entities?: IMessageEntity[];
  animation?: IAnimation;
}

export interface IPoll {
  id: string;
  question: string;
  options: PollOption[];
  total_voter_count: number;
  is_closed: boolean;
  is_anonymous: boolean;
  type: string;
  allows_multiple_answers: boolean;
  correct_option_id?: number;
  explanation?: string;
  explanation_entities?: IMessageEntity[];
  open_period?: number;
  close_date?: number;
}

export interface PollOption {
  text: string;
  voter_count: number;
}

export interface IVenue {
  location: ILocation;
  title: string;
  address: string;
  foursquare_id?: string;
  foursquare_type?: string;
  google_place_id?: string;
  google_place_type?: string;
}

export interface ILocation {
  longitude: number;
  latitude: number;
  horizontal_accuracy?: number;
  live_period?: number;
  heading?: number;
  proximity_alert_radius?: number;
}

export interface IMessageAutoDeleteTimerChanged {
  message_auto_delete_time: number;
}

export interface IInvoice {
  title: string;
  description: string;
  start_parameter: string;
  currency: string;
  total_amount: number;
}

export interface ISuccessfulPayment {
  currency: string;
  total_amount: number;
  invoice_payload: string;
  shipping_option_id?: string;
  order_info?: IOrderInfo;
  telegram_payment_charge_id: string;
  provider_payment_charge_id: string;
}

export interface IOrderInfo {
  name?: string;
  phone_number?: string;
  email?: string;
  shipping_address?: IShippingAddress;
}

export interface IShippingAddress {
  country_code: string;
  state: string;
  city: string;
  street_line1: string;
  street_line2: string;
  post_code: string;
}

export interface IPassportData {
  data: EncryptedPassportElement[];
  credentials: EncryptedCredentials;
}

export interface EncryptedPassportElement {
  type: string;
  data?: string;
  phone_number?: string;
  email?: string;
  files?: PassportFile[];
  front_side?: PassportFile;
  reverse_side?: PassportFile;
  selfie?: PassportFile;
  translation?: PassportFile[];
  hash: string;
}

export interface PassportFile {
  file_id: string;
  file_unique_id: string;
  file_size: number;
  file_date: number;
}

export interface EncryptedCredentials {
  data: string;
  hash: string;
  secret: string;
}

export interface ProximityAlertTriggered {
  traveler: IUser;
  watcher: IUser;
  distance: number;
}

export interface VideoChatScheduled {
  start_date: number;
}

export interface VideoChatStarted {
  VideoChatStarted: "this is empty object";
}

export interface VideoChatEnded {
  duration: number;
}

export interface VideoChatParticipantsInvited {
  IUsers: IUser[];
}

export interface WebAppData {
  data: string;
  button_text: string;
}

export interface IUser {
  id: number;
  is_bot: boolean;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  can_join_groups?: boolean;
  can_read_all_group_messages?: boolean;
  supports_inline_queries?: boolean;
}

export interface IMessageEntity {
  type: string;
  offset: number;
  length: number;
  url?: string;
  IUser?: IUser;
  language?: string;
}

export interface WebAppInfo {
  url: string;
}

export interface LoginUrl {
  url: string;
  forward_text?: string;
  bot_username?: string;
  request_write_access?: boolean;
}

export type CallbackGame = () => void;

export interface InlineKeyboardButton {
  text: string;
  url?: string;
  callback_data?: string;
  web_app?: WebAppInfo;
  login_url?: LoginUrl;
  switch_inline_query?: string;
  switch_inline_query_current_chat?: string;
  callback_game?: CallbackGame;
  pay?: boolean;
}

export interface KeyboardButtonPollType {
  type?: string;
}

export interface KeyboardButton {
  text: string;
  request_contact?: boolean;
  request_location?: boolean;
  request_poll?: KeyboardButtonPollType;
  web_app?: WebAppInfo;
}

export interface InlineKeyboardMarkup {
  inline_keyboard: Array<InlineKeyboardButton[]>;
}

export interface ReplyKeyboardMarkup {
  keyboard: Array<KeyboardButton[]>;
  resize_keyboard?: boolean;
  one_time_keyboard?: boolean;
  input_field_placeholder?: string;
  selective?: boolean;
}

export interface ReplyKeyboardRemove {
  remove_keyboard: true;
  selective?: boolean;
}

export interface ForceReply {
  force_reply: true;
  input_field_placeholder?: string;
  selective?: boolean;
}

export interface ISendMessage {
  chat_id: number | string;
  text: string;
  parse_mode?: string;
  entities?: IMessageEntity[];
  disable_web_page_preview?: boolean;
  disable_notification?: boolean;
  protect_content?: boolean;
  reply_to_message_id?: number;
  allow_sending_without_reply?: boolean;
  reply_markup?:
    | InlineKeyboardMarkup
    | ReplyKeyboardMarkup
    | ReplyKeyboardRemove
    | ForceReply;
}
