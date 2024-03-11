import { v4 as uuidv4 } from "uuid";
import { GamePhase, GameState, TeamStatus } from "./types";

export const generateRoomId = () => {
  return uuidv4();
};

export const getInitialGameState = () => {
  return {
    gamePhase: GamePhase.SetupGame,
    roundNumber: 0,
    psychic: null,
    spectrum: null,
    target: 0,
    clue: "",
    guess: 0,
    scores: {
      [TeamStatus.LeftBrain]: 0,
      [TeamStatus.RightBrain]: 0,
    },
    previousTurns: [],
  } as GameState;
};
