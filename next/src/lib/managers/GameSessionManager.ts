import { Server } from "socket.io";

// GameSessionManager.ts
export class GameSessionManager {
  constructor(private io: Server) {
    io.on("connection", (socket) => {
      console.log("GameSessionManager: A user connected");
      socket.on("join-game", this.handleJoinGame);
      // other game session related events...
    });
  }

  private handleJoinGame = (gameId: string) => {
    // handle joining game...
  };
  // other game session related methods...
}
