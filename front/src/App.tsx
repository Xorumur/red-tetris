import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Navbar } from './component/navbar/Navbar';
import './App.css';
import { Home } from './component/pages/Home';
import {
  BrowserRouter,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes,
  useParams,
} from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { GamesList } from './component/pages/games/GamesList';
import { Game } from './component/pages/room/game/Game';
import { StateHandler } from './component/pages/utils/StateHandler';

function App() {
  return (
    <>
      <Navbar />
      <StateHandler />
      <Routes>
        <Route
          path="*"
          element={<div>nothing to see here</div>}
        />
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/games"
          element={<GamesList />}
        />
        <Route
          path="/:room/:player"
          element={<Game />}
        />
      </Routes>
    </>
  );
}

export default App;
