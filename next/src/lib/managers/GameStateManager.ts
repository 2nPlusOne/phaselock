import { Server } from "socket.io";

// GameStateManager.ts
export default class GameStateManager {
  constructor(private io: Server) {
    io.on("connection", (socket) => {
      console.log("GameStateManager: A user connected");
      socket.on("game-state-change", this.handleGameStateChange);
      // other game state related events...
    });
  }

  private handleGameStateChange = (newState: any) => {
    // handle game state change...
  };
  // other game state related methods...
}
