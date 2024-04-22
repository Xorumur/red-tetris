import React, { useState } from "react"
import { useParams } from "react-router-dom";
import { Board } from "../../../game/Board";
import { GameInputHandler } from "../../utils/GameInputHandler";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { setGameStatus } from "../../../../store/slices/gameSlice";
import { EGameStatus } from "../../../cards/GameCard/GameCard";
import { useCountdown } from "../../../../utils/hooks/useCountdown";

export const Game = () => {
    const { room, player } = useParams();
    const gameStatus = useSelector((state: RootState) => state.gameSlice.gameStatus);
    const countDown = useCountdown(new Date().getTime() + 5000)
    const onStartGame = () => {
        setGameStatus(EGameStatus.STARTING);
        
    }

    return (
      <div>
        {gameStatus}
        <div>
            {room} of {player}
            <GameInputHandler/>
            <Board/>
        </div>
        <button onClick={onStartGame}>Start game</button>
      </div>
    );
}