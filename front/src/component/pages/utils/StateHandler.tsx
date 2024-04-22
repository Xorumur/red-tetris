import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { useNavigate } from 'react-router-dom';

export const StateHandler = () => {
  const username = useSelector((state: RootState) => state.userSlice.username);
  const navigate = useNavigate();

  useEffect(() => {
    //make sure one cannot go anywhere without setting name
    if (username === null) {
      navigate('/');
    }
  }, [username]);
  return <></>;
};
