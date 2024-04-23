import React from 'react';
import './Navbar.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Link, NavLink } from 'react-router-dom';

export const Navbar = () => {
  const username = useSelector((state: RootState) => state.userSlice.username);
  return (
    <nav>
      <ol className="crumb">
        <li className="crumb-item">
          <NavLink to={'/games'}>PLAY</NavLink>
        </li>

        <li className="game-title">
          <NavLink to={"/"}>RED-TETRIS</NavLink>
        </li>
        {username && (
          <li className="crumb-item">
            <div style={{ color: 'purple' }}>Logged as : {username}</div>
          </li>
        )}
      </ol>
    </nav>
  );
};
