import React, { useEffect } from 'react';
import { SocketUtils } from '../../../sockets/socketUtils';
import { RootState, useAppDispatch } from '../../../store/store';
import { useSelector } from 'react-redux';
import { EGameStatus, GameCard } from '../../cards/GameCard/GameCard';
import { socket } from '../../../sockets/socket';
import { setAvailableRooms } from '../../../store/slices/gameSlice';
import { CreateGameButton } from '../../button/CreateGameButton';

export const GamesList = () => {
  const availableRooms = useSelector((state: RootState) => state.gameSlice.availableRooms);
  const dispatch = useAppDispatch();

  useEffect(() => {
    socket.on('roomUpdate', data => {
      console.log('room update', data);
      dispatch(setAvailableRooms(data));
    });
    return () => {
      socket.off('roomUpdate');
    };
  }, []);

  return (
    <>
    <CreateGameButton/>
    <div className="game-info-container">
        <GameCard
          key={45}
          roomName={"TestoRoom"}
          players={[ "Testeur"]}
          status={EGameStatus.LOBBY}
        />
      {availableRooms.map((room, idx) => {console.log("toto ", room); return (
        <GameCard
          key={idx}
          roomName={"testRoom"}
          players={[room.client]}
          status={EGameStatus.LOBBY}
        />
       )})}
    </div>
    </>
  );
};
