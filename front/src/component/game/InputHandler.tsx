import React, { useEffect, useState } from 'react';
import { socket } from '../../sockets/socket';

interface KeyBoardEvent {
  key: string;
}

//sends socket event to the server
const sendEventFromKey = (key: string) => {
  switch (key) {
    case 'ArrowUp': {
      socket.emit('up');
      return;
    }
    case 'ArrowDown': {
      socket.emit('down');
      return;
    }
    case 'ArrowLeft': {
      socket.emit('left');
      return;
    }
    case 'ArrowRight': {
      socket.emit('right');
      return;
    }
    case 'Spacebar': {
      socket.emit('spacebar');
      return;
    }
  }
};

export const InputHandler = () => {
  const [prevKeyPressed, setPrevKeyPressed] = useState<string | null>(null);
  useEffect(() => {
    const handleKeyDown = (event: KeyBoardEvent) => {
      if (event.key !== prevKeyPressed) {
        console.log('Key pressed:', event.key);
        // Add your logic here to handle the key press
        setPrevKeyPressed(event.key);
        sendEventFromKey(event.key);
      }
    };

    const handleKeyUp = () => {
      setPrevKeyPressed(null);
    };

    // Add event listeners when the component mounts
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    // Remove event listeners when the component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [prevKeyPressed]); // Dependency array includes prevKeyPressed to ensure effect runs when it changes

  return <div></div>;
};
