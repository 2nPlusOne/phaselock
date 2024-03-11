import { v4 as uuidv4 } from "uuid";
import { GamePhase, GameState, TeamStatus } from "./types";

/**
 * Generates a unique room ID using the uuidv4 function.
 * @returns {string} The generated room ID.
 */
export const generateRoomId = () => {
  return uuidv4();
};

/**
 * Returns the initial game state.
 * @returns The initial game state.
 */
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
