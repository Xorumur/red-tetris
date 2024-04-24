import { socket } from "./socket"
import { JoinGame } from "./types/socketInterfaces";

export namespace SocketUtils {
    export const createGame = () => {
        console.log("Emitting game creation");
        socket.emit("Create", {client: "NotJustJoe"}); //temporary
    }

    export const joinGame = (data: JoinGame) => {
        socket.emit('Join', data);
    }

    export const setUsername = (username: string) => {
        console.log("sending username");
        socket.emit("Username", {client: username});
    }
}
