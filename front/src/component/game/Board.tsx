//array of array of colors (ex values)
import React, { useState } from 'react';
import './Board.css';
import { socket } from '../../sockets/socket';

export const Board = () => {
  const defaultData = [
    ['#000000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF'],
    ['#00FFFF', '#FF4500', '#8A2BE2', '#320000', '#FFD700'],
    ['#ADFF2F', '#FF69B4', '#1E90FF', '#FFA500', '#FF6347'],
    ['#008080', '#FF8C00', '#7B68EE', '#00FA9A', '#FF1493'],
    ['#20B2AA', '#800080', '#7FFFD4', '#B22222', '#000000'],
  ];
  const [board, setBoard] = useState<string[][]>(defaultData);

  socket.on("boardUpdate", (newBoard) => {
    console.log("Board updated !")
    setBoard(newBoard);
  })

  return (
    <div className="board-container">
      {board.map((rows, idr) => (
        <div
          className="board-row"
          key={idr}>
          {rows.map((cell, idc) => (
            <div
              key={idr * rows.length + idc}
              className="board-cell"
              style={{ backgroundColor: cell }}></div>
          ))}
        </div>
      ))}
    </div>
  );
};
