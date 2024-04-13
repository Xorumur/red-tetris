import React, { useState } from 'react';
import { AppDarkTheme } from '../../../themes/dark';
import { LinkButton } from '../../button/LinkButton';
import "./GameCard.css"
import { Board } from '../../game/Board';
import { SocketUtils } from '../../../sockets/socketUtils';

export interface GameCardProps {
  players: Player[];
  status: EGameStatus;
}

interface Player {
  name: string;
}

export enum EGameStatus {
  LOBBY = 'Lobby',
  STARTING = 'Starting',
  IN_GAME = 'In game',
  END_GAME = 'End Game',
}

const getColorFromStatus = (status: EGameStatus) => {
  switch (status) {
    case EGameStatus.LOBBY:
      return 'green';
    case EGameStatus.STARTING:
      return 'yellow';
    case EGameStatus.IN_GAME:
      return 'red';
    case EGameStatus.END_GAME:
      return 'orange';
  }
};

const theme = AppDarkTheme;

export const GameCard = ({ players, status }: GameCardProps) => {
  const isButtonDisabled = status !== EGameStatus.LOBBY;
  const playerShown = players;
  const [showTetris, setShowTetris] = useState<boolean>(true);
  return (
    <>
    <div
      style={{
        display: 'grid',
        backgroundColor: theme.colors.background,
        borderRadius: theme.borders.roundCard,
        alignItems: 'center',
        justifyContent: 'space-between',
        border: 'solid gray 2px',
        padding: 15,
        gridTemplateColumns: '1.5fr 4fr 1.5fr',
        gridTemplateRows: '1fr 2fr',
        maxHeight: 100,
      }}>
      <span className="column-title">Status</span>
      <span className="column-title">Players</span>
      <span className="column-title">Join</span>
      <div className="column-content">
        <b style={{ color: getColorFromStatus(status) }}>{status}</b>
      </div>
      <div className="column-content">
        <div>
          {playerShown.length > 0 ? (
            playerShown.map((player, idx) => (
              <div
                style={{ color: 'green', display: 'inline' }}
                key={idx}>
                {player.name}{' '}
              </div>
            ))
          ) : (
            <div style={{ color: 'white' }}>Empty</div>
          )}
        </div>
      </div>
      <div className="column-content join-button-container">
        <LinkButton
          link="/game"
          disabled={isButtonDisabled}>
          <p>Join Game</p>
        </LinkButton>
        <button onClick={() => {
          setShowTetris(!showTetris);
          console.log( "yoyoyoy")
          SocketUtils.createGame();
        }}>{showTetris ? "Despawn this board !" : "Spawn the board"}</button>
      </div>
    </div>
      {showTetris && <Board/>}
      </>
  );
};
