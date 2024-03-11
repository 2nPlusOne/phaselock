export type Spectrum = [string, string];

export interface Room {
  roomId: string;
  owner: Player;
  players: Player[];
  gameState: GameState;
}

export enum GamePhase {
  SetupGame,
  PickTeams,
  GiveClue,
  MakeGuess,
  CounterGuess,
  ViewScore,
}

export interface Player {
  name: string;
  team: TeamStatus;
  role: Role;
}

export enum TeamStatus {
  LeftBrain,
  RightBrain,
  None,
}

export interface GameState {
  gamePhase: GamePhase;
  roundNumber: number;
  psychic: Player | null;
  spectrum: Spectrum | null;
  target: number;
  clue: string;
  guess: number;
  scores: {
    [TeamStatus.LeftBrain]: number;
    [TeamStatus.RightBrain]: number;
  };
  previousTurns: TurnSummary[];
}

export interface TurnSummary {
  teamName: string;
  psychicName: string;
  spectrum: Spectrum;
  clue: string;
  guess: number;
}

export enum Role {
  Psychic,
  Guesser,
  None,
}
