//https://socket.io/docs/v4/typescript/
export interface ServerToClientEvents {
  boardUpdate: (board: string[][]) => void;
}

export interface ClientToServerEvents {
  connect: () => void; //when joining the website, not when joining a game
  disconnect: () => void; //when leaving the website, not when leaving a game
  register: () => void; //gives his name to the server for it to register it
  joinGame: () => void; //join a game, giving the room id to the server
  createGame: () => void; //create a game, a room socket-wise, for other to see and join
  leaveGame: () => void; //when leaving a game, a socket room
  startGame: () => void; //when a game owner press to start the game

  //in game
  moveLeft: () => void; //move piece to left
  moveRight: () => void; //move peice to right
  moveUp: () => void; //rotate piece in clock wise rotation
  moveDown: () => void; //make piece fall faster to bottom
  moveSpacebar: () => void; //place piece directly at the bottom
}

export interface InterServerEvents {
  ping: () => void; //should be used to check if player are still in the room ?
  gameEvent: () => void; //return a game type either START / WIN / LOSS / (pause ?) and a reason : player disconnected, maximum point reached, other player lost
  //you can split gameEvent into gameWin gameLost gamePause if you want if it's easier
  playerLeft: () => void;
  playerJoin: () => void;
  boardUpdate: () => void; //contains the game board, maybe the score too and some additionnal info ?
}

export {}