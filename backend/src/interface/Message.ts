export interface Message {
  messageID: string;
  computerID: string;
  message: string;
  messageType: MESSAGE_TYPES;
}

export enum MESSAGE_TYPES {
  FUNCTION = "function",
  UUID = "uuid",
  MESSAGE = "message",
}
