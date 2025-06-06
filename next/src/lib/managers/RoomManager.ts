// next/src/lib/managers/LobbyManager.ts
import { Server, Socket } from "socket.io";
import { Player, TeamStatus, Role, Room } from "../types";
import { generateRoomId, getInitialGameState } from "../gameRoom";
import { Events } from "../events";

/**
 * Manages the rooms in the application.
 */
export default class RoomManager {
  private rooms: Map<string, Room> = new Map();

  constructor(private io: Server) {
    io.on(Events.CONNECTION, (socket) => {
      socket.on(Events.CREATE_ROOM, (name?: string) =>
        this.handleCreateRoom(socket, name),
      );
      socket.on(Events.JOIN_ROOM, (roomId: string, name: string) =>
        this.handleJoinRoom(socket, roomId, name),
      );
      socket.on(Events.CHAT_MESSAGE, (roomId: string, name: string, msg: string) =>
        this.handleChatMessage(roomId, name, msg),
      );
      socket.on(Events.DISCONNECT, () => this.handleDisconnect(socket));
    });
  }

  /**
   * Handles the creation of a new room.
   *
   * @param ownerName - The name of the room owner.
   * @param callback - A callback function that will be called with the generated roomId.
   */
  private handleCreateRoom = (socket: Socket, ownerName = "") => {
    const roomId = generateRoomId();
    const owner: Player = {
      name: ownerName,
      team: TeamStatus.None,
      role: Role.None,
    };
    this.rooms.set(roomId, {
      roomId,
      owner,
      players: ownerName ? [owner] : [],
      gameState: getInitialGameState(),
    });
    if (ownerName) {
      socket.data.roomId = roomId;
      socket.data.name = ownerName;
      socket.join(roomId);
      this.broadcastPlayers(roomId);
    }
    socket.emit(Events.ROOM_CREATED, roomId);
  };

  /**
   * Handles the logic for a player joining a room.
   *
   * @param roomId - The ID of the room.
   * @param playerName - The name of the player joining the room.
   * @param callback - A callback function that will be called with a boolean indicating the success of the operation.
   */
  private handleJoinRoom = (
    socket: Socket,
    roomId: string,
    playerName: string,
  ) => {
    const room = this.rooms.get(roomId);
    if (!room) {
      socket.emit(Events.ROOM_JOINED, "");
      return;
    }

    const player: Player = {
      name: playerName,
      team: TeamStatus.None,
      role: Role.None,
    };
    room.players.push(player);
    socket.join(roomId);
    socket.data.roomId = roomId;
    socket.data.name = playerName;
    socket.emit(Events.ROOM_JOINED, roomId);
    this.broadcastPlayers(roomId);
  };

  private handleChatMessage = (
    roomId: string,
    name: string,
    message: string,
  ) => {
    this.io.to(roomId).emit(Events.CHAT_MESSAGE, { name, message });
  };

  private handleDisconnect = (socket: Socket) => {
    const { roomId, name } = socket.data as { roomId?: string; name?: string };
    if (!roomId || !name) return;
    const room = this.rooms.get(roomId);
    if (!room) return;
    room.players = room.players.filter((p) => p.name !== name);
    this.broadcastPlayers(roomId);
  };

  private broadcastPlayers = (roomId: string) => {
    const room = this.rooms.get(roomId);
    if (!room) return;
    this.io.to(roomId).emit(Events.PLAYERS_UPDATE, room.players);
  };
}

