/** Represents a spectrum as a tuple of two strings. */
export type Spectrum = [string, string];

/** Represents a game room. */
export interface Room {
  /** Unique identifier for the room. */
  roomId: string;
  /** The player who owns the room. */
  owner: Player;
  /** Array of players in the room. */
  players: Player[];
  /** The current state of the game. */
  gameState: GameState;
}

/** Represents the different phases of the game. */
export enum GamePhase {
  SetupGame,
  PickTeams,
  GiveClue,
  MakeGuess,
  CounterGuess,
  ViewScore,
}

/** Represents a player. */
export interface Player {
  /** The name of the player. */
  name: string;
  /** The team status of the player. */
  team: TeamStatus;
  /** The role of the player. */
  role: Role;
}

/** Represents a player's team. */
export enum TeamStatus {
  LeftBrain,
  RightBrain,
  None,
}

/** Represents the state of the game. */
export interface GameState {
  /** The current phase of the game. */
  gamePhase: GamePhase;
  /** The current round number. */
  roundNumber: number;
  /** The player who is the psychic. */
  psychic: Player | null;
  /** The current spectrum. */
  spectrum: Spectrum | null;
  /** The target location on the spectrum. */
  target: number;
  /** The clue given by the psychic. */
  clue: string;
  /** The guess made. */
  guess: number;
  /** The scores for each team. */
  scores: {
    [TeamStatus.LeftBrain]: number;
    [TeamStatus.RightBrain]: number;
  };
  /** The summary of previous turns. */
  previousTurns: TurnSummary[];
}

/** Represents a summary of a turn. */
export interface TurnSummary {
  /** The name of the team. */
  teamName: string;
  /** The name of the psychic. */
  psychicName: string;
  /** The spectrum for the turn. */
  spectrum: Spectrum;
  /** The clue given. */
  clue: string;
  /** The guess made. */
  guess: number;
}

/** Represents the current role of a player. */
export enum Role {
  Psychic,
  Guesser,
  None,
}
