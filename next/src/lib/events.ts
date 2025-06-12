/** Enum representing various events. */
export enum Events {
  /** Event fired when a new connection request begins. */
  CONNECT = "connect",

  /** Event fired when a socket connection is successfully established. */
  CONNECTION = "connection",

  /** Event fired when a connection is disconnected. */
  DISCONNECT = "disconnect",

  /** Event fired when the client initiates room creation. */
  CREATE_ROOM = "create-room",

  /** Event fired when a room is successfully created. */
  ROOM_CREATED = "room-created",

  /** Event fired when a user joins a room. */
  JOIN_ROOM = "join-room",

  /** Event fired when the server confirms a user joined a room. */
  ROOM_JOINED = "room-joined",

  /** Event fired when the list of players in a room changes. */
  PLAYERS_UPDATE = "players-update",

  /** Event fired to transmit chat messages. */
  CHAT_MESSAGE = "chat-message",
}
