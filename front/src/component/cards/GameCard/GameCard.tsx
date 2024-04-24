import React, { useState } from 'react';
import { AppDarkTheme } from '../../../themes/dark';
import { LinkButton } from '../../button/LinkButton';
import './GameCard.css';
import { Board } from '../../game/Board';
import { SocketUtils } from '../../../sockets/socketUtils';
import { Link } from 'react-router-dom';
import { socket } from '../../../sockets/socket';
import { Player } from '../../../store/slices/gameSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

export interface GameCardProps {
  players: Player[];
  roomId: string;
  status: EGameStatus;
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

export const GameCard = ({ players, roomId, status }: GameCardProps) => {
  const isButtonDisabled = status !== EGameStatus.LOBBY;
  const username = useSelector((state: RootState) => state.userSlice.username)!;
  const playerShown = players;
  return (
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
                {player.client}{' '}
              </div>
            ))
          ) : (
            <div style={{ color: 'white' }}>Empty</div>
          )}
        </div>
      </div>
      <div className="column-content join-button-container">
        <button onClick={() => SocketUtils.joinGame({client: username, roomId: roomId})}>
          Join Game
        </button>
      </div>
    </div>
  );
};
