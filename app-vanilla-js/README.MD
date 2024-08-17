# Tic-Tac-Toe Game Documentation

## Overview

This document provides an overview of the Tic-Tac-Toe game application, developed using the Model-View-Controller (MVC) architecture. The following sections describe the overall code structure, key components, and their interactions.

## Tech Stack

- Vanilla JS with no external library or framework used.
- Vite to run JS modules via http localhost.

## Project Structure

The Tic-Tac-Toe game is organized into three main components according to the MVC architecture:

1. **Model**
2. **View**
3. **Controller**

### Model

#### Game Object
- **Properties**:
  - `gameBoard`: Represents the game board's state (usually a 2D array or similar structure).
  - `player1`: Represents the first player, including attributes like `name` and `symbol`.
  - `player2`: Represents the second player, including attributes like `name` and `symbol`.
  - `currentPlayer`: Tracks the player currently taking their turn.
  - `gameState`: Indicates the current state of the game (e.g., ready, ongoing, or finished).
  - `config`: Configuration data such as size of board, winning line length etc.

- **Methods**:
  - `readyGame()`: Initializes the game state. reset necessary vars.
  - `resetGame()`: Reset everthing for a fresh start.
  - `makeMove(position)`: Processes a move at the given position.
  - `checkWinner()`: Checks the game board for a winning condition.
  - `checkDraw()`: Checks if the game has ended in a draw.
  - `switchPlayer()`: Switches the active player.
  - `resetGame()`: Resets the game to its initial state.

### View

#### Gameboard View Component
- **Responsibilities**:
  - Renders the game board based on the current state of `gameBoard`.
  - Updates the display when the game state changes.

- **Methods**:
  - `render()`: Draws the game board.
  - `updateCell(position, symbol)`: Updates a specific cell in the view.
  - `inputEvent(e)`: Signals input events to GameController to process. 

#### Game Configuration View Component
- **Responsibilities**:
  - Manages the game configuration and settings.
  - Provides user controls for starting a new game and configuring players.

- **Methods**:
  - `render()`: Displays the configuration options.
  - `updateSettings(settings)`: Updates game settings based on user input.
  - `inputEvent(e)`: Signals input events to GameController to process. 

### Controller

#### Game Controller
- **Responsibilities**:
  - Receives events from view components (e.g., user interactions).
  - Updates the `Game` object based on user actions.
  - Coordinates updates between the model and view components.

- **Methods**:
  - `handleMove(position)`: Processes a move request from the view.
  - `updateGameStatus()`: Updates the game status and triggers necessary updates.
  - `handleConfigurationChange(settings)`: Updates the game configuration based on user input.
  - `handleViewUpdates()`: Communicate view componets to update view according to the data updates.

## Interaction Flow

1. **Initialization**: 
   - The game starts with the `Game` object being initialized.
   - The `Gameboard View` and `Game Configuration View` components are rendered based on the initial game state.

2. **User Interaction**:
   - User interacts with the `Gameboard View`, triggering events that are handled by the `Game Controller`.
   - The `Game Controller` updates the `Game` object and determines the next steps.

3. **Updating the View**:
   - Once the `Game` object is updated, the `Game Controller` informs the view components.
   - The `Gameboard View` and `Game Configuration View` are updated to reflect the new state of the game.

4. **Game End**:
   - The game status is checked to determine if the game has been won or ended in a draw.
   - The `Game Controller` updates the views with the final game state.

## Collaboration Guidelines

- **Updating Documentation**: 
  - Ensure that any changes to the codebase are reflected in this documentation.
  - Use clear and concise descriptions when updating sections.

- **Code Contributions**:
  - Follow the project's coding standards and document any new features or changes thoroughly.
  - Use descriptive commit messages to help track changes.

## License

This project is licensed under the [MIT License](LICENSE).
