import React, { useEffect, useState } from 'react';
import { SocketUtils } from '../../../sockets/socketUtils';
import { socket } from '../../../sockets/socket';
import { RootState, useAppDispatch } from '../../../store/store';
import { setUsername } from '../../../store/slices/userSlice';
import { useSelector } from 'react-redux';

interface ModalProps {
  isOpen: boolean;
}

const UsernameModal: React.FC<ModalProps> = ({ isOpen }) => {
  const [value, setValue] = useState('');
  const dispatch = useAppDispatch();
  const username = useSelector((root: RootState) => root.userSlice.username);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onSubmit = (submittedUsername: string) => {
    SocketUtils.setUsername(submittedUsername);
  }

  const onClose = () => {
    console.log("closed modal");
  }

  useEffect(() => {
    socket.on("UsernameOK", () => {
        console.log("setting username")
        dispatch(setUsername(value));
    });
    socket.on("UsernameKO", () => {
        console.log("bad uername")
        dispatch(setUsername(null));
    });
  }, []);

  const handleSubmit = () => {
    onSubmit(value);
    onClose();
  };
  return (
    <>
      {isOpen && (
        
        <div className="modal">
          <div className="modal-content">
          <div>
                {username}
            </div>
            <span className="close" onClick={onClose}>&times;</span>
            <h2>Enter Your Username</h2>
            <input
              type="text"
              placeholder="Username"
              value={value}
              onChange={handleInputChange}
            />
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      )}
    </>
  );
};

export default UsernameModal;
