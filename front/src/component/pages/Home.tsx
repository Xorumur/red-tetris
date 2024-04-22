import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { UsernameModal } from '../modal/UsernameModal';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const username = useSelector((state: RootState) => state.userSlice.username);
  const navigate = useNavigate();

  useEffect(() => {
    if (username != null) {
      navigate('/games');
    }
  }, [username]);

  return (username == null && <UsernameModal show={true} />) || <></>;
};
