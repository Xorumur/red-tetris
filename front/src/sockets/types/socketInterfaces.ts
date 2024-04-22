import { Room } from "../../store/slices/gameSlice";

//https://socket.io/docs/v4/typescript/
export interface ServerToClientEvents {
  boardUpdate: (board: string[][]) => void;
  roomUpdate: (data: Room[]) => void; //all rooms updated  
  UsernameOK: (data: {username: string}) => void; //if the username is accepted
  UsernameKO: () => void; //if the username is refused
  JoinOK: (data: Room) => void;
  JoinKO: () => void;
}

interface Create {
  client: string; //client username
}

interface JoinGame {
  client: string,
  username: string
}

export interface ClientToServerEvents {
  Join: (data: JoinGame) => void; //join a game, giving the room id to the server
  Create: (data: Create) => void; //create a game, a room socket-wise, for other to see and join
  Username: (data: Create) => void; //send the selected username to backend
  askRoom: () => void; //ask available rooms
  //in game
  left: () => void; //move piece to left
  right: () => void; //move peice to right
  up: () => void; //rotate piece in clock wise rotation
  down: () => void; //make piece fall faster to bottom
  spacebar: () => void; //place piece directly at the bottom
}

export interface InterServerEvents {

}

export {}