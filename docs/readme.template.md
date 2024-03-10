[//]: # (This file is only used by the `npm run docs command` to generate the README.md file. Do not edit README.md directly.)

# Phaselock Design Documentation

> A web adaptation of [Wavelength](https://www.wavelength.zone/) by Wolfgang Warsch, Alex Hague, and Justin Vickers.

## Game Overview

Phaselock is an online multiplayer party game where players try to read each other's minds. The game is divided into teams, and each turn, one player (the "operator") receives a prompt with two opposite/related sides of a spectrum, and a secret pre-selected position within that spectrum (the "target"). The operator gives a clue (a single concept or idea) which aims to guide their team to the target position on the spectrum. The closer the team's guess to the target, the more points they score.

## Game Flow

```mermaid
flowchart TD
    A[Start] --> B[Join/Create Game Session]
    B --> C[Enter Game Lobby]
    C --> D[Gameplay Begins]
    D --> E{Player Role?}
    E -- Operator --> F(Receive Spectrum & Target)
    E -- Guesser --> G(Wait for Clue)
    F --> H(Submit Clue)
    G --> H
    H --> I(Make Guess)
    I --> J(Calculate & Update Score)
    J --> K{End of Round?}
    K -- No --> D
    K -- Yes --> L{End of Game?}
    L -- No --> M(Switch Roles)
    M --> D
    L -- Yes --> N[Display Scores and Winner]
    N --> O[Return to Lobby]
    O --> P[Leave application]
    P --> A
```

## Technical Overview

### Frontend

#### Technologies

- Next.js framework for out-of-the-box optimization features and React project bootstrapping.
- TypeScript for type safety and improved development experience.
- Tailwind CSS for rapid UI development and personal styling preference.
- Radix UI (w/ customized shadcn/ui templates) for accessible and customizable UI components.
- Socket.io-client for real-time, bidirectional communication with the server.

#### Components

- Game Lobby: For creating, joining games, and setting up teams.
- Spectrum Display: Visually represents the spectrum and the team's guess.
- Clue Submission: Input for the operator to submit their clue.
- Guess Mechanism: Interface for the team to submit their guess on the spectrum.

### Backend Architecture

This app utilizes Next.js's API routes with a Socket.io server for real-time game state updates. The server is responsible for managing game sessions, handling client connections, and broadcasting game state changes. TypeScript is used to ensure type safety and a unified development experience across the stack.

```mermaid
graph TD;
    A[Next.js Frontend] -->|WebSocket| B[Next.js API Route Handler];
    A -->|HTTP API| B;
    B --> D[Game Logic];
    D --> E[Real-time Communication via WebSocket];
    B -->|Database| F[Next.js API Routes];
    F -->|Stores| G[User, Game Session, and Gameplay Data];
```

#### Game Session Management

Handles creation, joining, and management of game sessions. Tracks players, teams, and game state.

```mermaid
graph TD
    A[Client] -->|Request to Join/Create Game| B[Game Session Manager]
    B -->|Create or Update Session| C[Game Session]
    A -->|Submit Clue/Guess| E[Game State Manager]
    E -->|Update Game State| C
    C -->|Broadcast State| A
```

#### Player Management

Tracks player states, roles (operator, guessers), and turns.

```mermaid
graph TD
    A[Client] -->|Join Game| B[Game Session]
    B -->|Add Player| C[Player]
    A -->|Submit Clue/Guess| C
    C -->|Update State| B
```

#### Game State Management

Manages the current spectrum, target, clues, guesses, and scoring.

#### Security Considerations

- Data Validation: Strictly validate all client inputs to prevent injection attacks and ensure game integrity.

#### Development Considerations

- Use modern React features (hooks, context) for efficient state management and component reusability.
- Employ WebSocket for real-time game updates, ensuring a lively and engaging player experience.
- Implement robust error handling and connection recovery mechanisms to handle disconnects or network issues gracefully.

## Data Model ERD

```mermaid
erDiagram
    GAME_SESSION {
        id string PK
        state string
        round number
        turn string
        phase string
        winner string
    }
    PLAYER {
        id string PK
        name string
        role string
        score number
        game_session_id string FK
    }
    TEAM {
        id string PK
        score number
        game_session_id string FK
    }
    SPECTRUM {
        id string PK
        left string
        right string
        position number
        game_session_id string FK
    }
    TARGET {
        position number
        game_session_id string FK
    }
    CLUE {
        id string PK
        text string
        game_session_id string FK
    }
    GUESS {
        id string PK
        position number
        game_session_id string FK
    }
    SCORE {
        id string PK
        points number
        game_session_id string FK
    }
    GAME_SESSION ||--|{ PLAYER : "has"
    GAME_SESSION ||--|{ TEAM : "has"
    GAME_SESSION ||--|{ SPECTRUM : "has"
    GAME_SESSION ||--|{ TARGET : "has"
    GAME_SESSION ||--|{ CLUE : "has"
    GAME_SESSION ||--|{ GUESS : "has"
    GAME_SESSION ||--|{ SCORE : "has"
```

## Class Diagram

```mermaid
classDiagram
    class GameSession {
        -id: string
        -players: Player[]
        -teams: Team[]
        -state: GameState
        -spectrum: Spectrum
        -target: Target
        -clues: Clue[]
        -guesses: Guess[]
        -scores: Score[]
        +addPlayer()
        +removePlayer()
        +startGame()
        +endGame()
        +updateState()
        +broadcastState()
    }
    class Player {
        -id: string
        -name: string
        -role: Role
        -score: number
        +submitClue()
        +submitGuess()
    }
    class Team {
        -id: string
        -players: Player[]
        -score: number
        +addPlayer()
        +removePlayer()
        +updateScore()
    }
    class GameState {
        -round: number
        -turn: Role
        -phase: Phase
        -winner: Team
        +nextTurn()
        +nextPhase()
        +endGame()
    }
    class Spectrum {
        -id: string
        -left: string
        -right: string
        -position: number
        +generate()
    }
    class Target {
        -position: number
        +generate()
    }
    class Clue {
        -id: string
        -text: string
        -player: Player
    }
    class Guess {
        -id: string
        -position: number
        -player: Player
    }
    class Score {
        -id: string
        -team: Team
        -points: number
    }
    class Role {
        -name: string
    }
    class Phase {
        -name: string
    }
    GameSession --> Player
    GameSession --> Team
    GameSession --> GameState
    GameSession --> Spectrum
    GameSession --> Target
    GameSession --> Clue
    GameSession --> Guess
    GameSession --> Score
    GameState --> Role
    GameState --> Phase
```

## Development Roadmap

### Phase 1: MVP

- [] WebSocket connection between clients and server.
- [] Game creation and joining (including game ID generation)
- [] Team setup
- [] Game start conditions
- [] Score tracking
- [] Random spectrum generation w/o repeats
- [] Random target generation
- [] Clue submission and broadcast
- [] Guess submission and scoring
- [] Round management
- [] Game end conditions
- [] Winner announcement

### Stretch Goals

- [] Re-roll generated spectrum if the operator doesn't like it
- [] Custom spectrum list option in game creation
- [] Spectator mode
