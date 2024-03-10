export type Spectrum = [string, string];

export interface GameSession {
  gameSessionId: string;
  gameState: GameState;
}

export enum RoundPhase {
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

export type TeamNames = {
  [key in TeamStatus]: string;
};

export type Players = {
  [playerId: string]: Player;
};

export interface GameState {
  teamNames: TeamNames;
  roundPhase: RoundPhase;
  roundNumber: number;
  players: Players;
  psychic: Player;
  spectrum: Spectrum;
  target: number;
  clue: string;
  guess: number;
  scores: {
    [team in TeamStatus]: number;
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
}
