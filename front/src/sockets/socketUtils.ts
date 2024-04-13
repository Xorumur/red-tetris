import { socket } from "./socket"

export namespace SocketUtils {
    export const createGame = () => {
        console.log("Emitting game creation");
        socket.emit("Create", {client: "NotJustJoe"}); //temporary
    }

    export const joinGame = () => {
    }

    export const setUsername = (username: string) => {
        console.log("sending username");
        socket.emit("Username", {client: username});
    }
}
