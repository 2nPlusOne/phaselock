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
    socket.join(roomId);
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
    socket.emit(Events.ROOM_JOINED, roomId);
  };
}
