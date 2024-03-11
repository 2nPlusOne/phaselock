// next/src/lib/managers/LobbyManager.ts
import { Server, Socket } from "socket.io";
import { Player, TeamStatus, Role, Room } from "../types";
import { generateRoomId, getInitialGameState } from "../gameRoom";

class RoomManager {
  private rooms: Map<string, Room> = new Map();

  constructor(private io: Server) {
    io.on("connection", (socket) => {
      socket.on("create-lobby", this.handleCreateLobby);
      socket.on("join-lobby", this.handleJoinLobby);
    });
  }

  private handleCreateLobby = (
    ownerName: string,
    callback: (lobbyId: string) => void,
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

  private handleJoinLobby = (
    lobbyId: string,
    playerName: string,
    callback: (success: boolean) => void,
  ) => {
    const lobby = this.rooms.get(lobbyId);
    if (lobby) {
      const player: Player = {
        name: playerName,
        team: TeamStatus.None,
        role: Role.None,
      };
      lobby.players.push(player);
      callback(true);
    } else {
      callback(false);
    }
  };
}

export default RoomManager;
