import React from "react";
import { socket } from "../../sockets/socket";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export const CreateGameButton = () => {
    const username = useSelector((state: RootState) => state.userSlice.username)!;

    const createGame = () => {
        socket.emit("Create", ({client: username}));
    }

    return (
        <div>
            <button onClick={createGame}>
                Create Game
            </button>
        </div>
    )
}