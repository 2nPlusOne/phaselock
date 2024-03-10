[//]: # "docs/readme.template.md is only used by the `npm run docs command` to generate the README.md file. Do not edit README.md directly."
[//]: # "All changes should be made to docs/readme.template.md; the README.md file is regenerated each commit."

# Phaselock Design Documentation

> A web adaptation of [Wavelength](https://www.wavelength.zone/) by Wolfgang Warsch, Alex Hague, and Justin Vickers.

## Game Overview

Phaselock is an online multiplayer party game where players try to read each other's minds. The game is divided into teams, and each turn, one player (the "psychic") receives a prompt with two opposite/related sides of a spectrum, and a secret pre-selected position within that spectrum (the "target"). The psychic gives a clue (a single concept or idea) which aims to guide their team to the target position on the spectrum. The closer the team's guess to the target, the more points they score.

## Game Flow

```mermaid
flowchart TD
    A[Start] --> B[Join/Create Game Session]
    B --> C[Enter Game Lobby]
    C --> D[Gameplay Begins]
    D --> E{Player Role?}
    E -- Psychic --> F(Receive Spectrum & Target)
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
- Clue Submission: Input for the psychic to submit their clue.
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

Tracks player states, roles (psychic, guessers), and turns.

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
        +String sessionId
        +List players
        +Map teams
        +GameState gameState
        +void startGame()
        +void endGame()
        +void broadcastState()
    }
    class Player {
        +String playerId
        +String name
        +Team team
        +Role role
        +void sendClue(String clue)
        +void makeGuess(int guess)
    }
    class Team {
        +String teamId
        +List players
        +int score
        +void addPlayer(Player player)
        +void removePlayer(String playerId)
    }
    class GameState {
        +Spectrum spectrum
        +Target target
        +List clues
        +List guesses
        +List scores
        +void generateSpectrum()
        +void defineTarget()
        +void submitClue(String clue)
        +void makeGuess(int guess)
        +void calculateScore()
    }
    class Turn {
        +Spectrum spectrum
        +Target target
        +String clue
        +int guess
        +void calculateScore()
    }
    class Spectrum {
        +String spectrumId
        +String description
        +String leftEndpoint
        +String rightEndpoint
        +int rangeStart
        +int rangeEnd
    }
    class Clue {
        +String clueId
        +String text
        +Player player
    }
    class Guess {
        +int guessId
        +int position
        +Team team
    }
    class Score {
        +int scoreId
        +int points
        +Team team
    }
    GameSession o-- "*" Player : contains
    GameSession o-- "*" Team : groups
    Team o-- "*" Player : includes
    GameSession --> GameState : tracks
    GameState --> Spectrum : generates
    GameState --> Target : defines
    Player --> Clue : submits
    Player --> Guess : makes
    Player --> Score : earns
```

## Development Roadmap

### Phase 1: MVP

- [x] WebSocket connection between clients and server.
- [ ] Game creation and joining (including game ID generation)
- [ ] Team setup
- [ ] Game start conditions
- [ ] Score tracking
- [ ] Random spectrum generation w/o repeats
- [ ] Random target generation
- [ ] Clue submission and broadcast
- [ ] Guess submission and scoring
- [ ] Round management
- [ ] Game end conditions
- [ ] Winner announcement

### Phase 2: Polish

- [ ] Refine visual design (retro/neubrutalism aesthetic)
- [ ] Add sound effects and background music
- [ ] Add animations and transitions with Framer Motion

### Phase 3: Advanced Features

- [ ] Re-roll generated spectrum if the psychic doesn't like it
- [ ] Custom spectrum list option in game creation
- [ ] Spectator mode
