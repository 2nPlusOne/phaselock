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
      socket.on(Events.CREATE_ROOM, this.handleCreateRoom);
      socket.on(Events.JOIN_ROOM, this.handleJoinRoom);
    });
  }

  /**
   * Handles the creation of a new room.
   *
   * @param ownerName - The name of the room owner.
   * @param callback - A callback function that will be called with the generated roomId.
   */
  private handleCreateRoom = (
    ownerName: string,
    callback: (roomId: string) => void,
  ) => {
    const roomId = generateRoomId();
    const owner: Player = {
      name: ownerName,
      team: TeamStatus.None,
      role: Role.None,
    };
    this.rooms.set(roomId, {
      roomId,
      owner,
      players: [owner],
      gameState: getInitialGameState(),
    });
    callback(roomId);
  };

  /**
   * Handles the logic for a player joining a room.
   *
   * @param roomId - The ID of the room.
   * @param playerName - The name of the player joining the room.
   * @param callback - A callback function that will be called with a boolean indicating the success of the operation.
   */
  private handleJoinRoom = (
    roomId: string,
    playerName: string,
    callback: (success: boolean) => void,
  ) => {
    const room = this.rooms.get(roomId);
    if (room) {
      const player: Player = {
        name: playerName,
        team: TeamStatus.None,
        role: Role.None,
      };
      room.players.push(player);
      callback(true);
    } else {
      callback(false);
    }
  };
}
