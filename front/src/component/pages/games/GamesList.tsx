import React, { useEffect, useState } from 'react';
import { RootState, useAppDispatch } from '../../../store/store';
import { useSelector } from 'react-redux';
import { EGameStatus, GameCard } from '../../cards/GameCard/GameCard';
import { socket } from '../../../sockets/socket';
import { Room, setAvailableRooms } from '../../../store/slices/gameSlice';
import { CreateGameButton } from '../../button/CreateGameButton';
import { useNavigate } from 'react-router-dom';

export const GamesList = () => {
  const [availableRooms, setAvailableRooms] = useState<Room[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on('roomUpdate', data => {
      console.log('room update', data);
      setAvailableRooms(data);
    });
    socket.on('JoinOK', (data) => {
      console.log(data);
      navigate(`/${data.id}/${data.players[0]}`);
    });
    socket.on('JoinKO', () => {
      //put message so the frontend see the error
    });
    socket.on('CreateKO', (data) => {
      console.log("coudlnt create room: ", data.error)
    });
    socket.on('CreateOK', (data) => {
      navigate(`/${data.id}/${data.players.map((p) => p.client)}`)
    });
    socket.emit('askRoom');
    return () => {
      socket.off('roomUpdate');
      socket.off('JoinOK');
      socket.off('JoinKO');
      socket.off('CreateKO')
      socket.off('CreateOK')
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
