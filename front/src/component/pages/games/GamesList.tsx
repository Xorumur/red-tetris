import React, { useEffect } from 'react';
import { RootState, useAppDispatch } from '../../../store/store';
import { useSelector } from 'react-redux';
import { EGameStatus, GameCard } from '../../cards/GameCard/GameCard';
import { socket } from '../../../sockets/socket';
import { setAvailableRooms } from '../../../store/slices/gameSlice';
import { CreateGameButton } from '../../button/CreateGameButton';
import { useNavigate } from 'react-router-dom';

export const GamesList = () => {
  const availableRooms = useSelector((state: RootState) => state.gameSlice.availableRooms);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    socket.on('roomUpdate', data => {
      console.log('room update', data);
      dispatch(setAvailableRooms(data));
    });
    socket.on('JoinOK', (data) => {
      navigate(`/${data.id}/${data.players[0]}`);
    });
    socket.on('JoinKO', () => {
      //put message so the frontend see the error
    });
    socket.emit('askRoom');
    return () => {
      socket.off('roomUpdate');
      socket.off('JoinOK');
      socket.off('JoinKO');
    };
  }, []);

  console.log(availableRooms);
  return (
    <>
    <CreateGameButton/>
    <div className="game-info-container">
      {availableRooms && availableRooms.map((room, idx) => {console.log("toto ", room); return (
        <GameCard
          key={idx}
          roomId={room.id}
          players={room.players}
          status={EGameStatus.LOBBY}
        />
       )})}
    </div>
    </>
  );
};
