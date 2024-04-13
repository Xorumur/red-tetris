import React from 'react';
import { Provider } from 'react-redux';
import {store } from './store/store';
import { Navbar } from './component/navbar/Navbar';
import { EGameStatus, GameCard } from './component/cards/GameCard/GameCard';
import "./App.css"
import { SocketUtils } from './sockets/socketUtils';
import UsernameModal from './component/cards/ModalUsername/UsernameModal';

function App() {
  return (
    <Provider store={store}>
      <div>
        <header />
        <Navbar />
        <UsernameModal isOpen={true}/>
        <div className='game-info-container'>
          <div style={{
            backgroundColor: "purple"
          }}>
            <button onClick={() => {
              SocketUtils.createGame();
            }}>
              CREATE A GAME
            </button>
          </div>

          <GameCard
            players={[
              {
                name: 'Thomas',
              },
              {
                name: 'Asma',
              },
              {
                name: 'Pedro',
              },
              {
                name: 'Yooiuhuihui',
              },
              {
                name: 'Coucou',
              },
            ]}
            status={EGameStatus.LOBBY}
          />
                    <GameCard
            players={[
              {
                name: 'Thomas',
              },
              {
                name: 'Asma',
              },
              {
                name: 'Pedro',
              },
              {
                name: 'Yooo',
              },
              {
                name: 'Coucou',
              },
            ]}
            status={EGameStatus.LOBBY}
          />
                    <GameCard
            players={[
              {
                name: 'Thomas',
              },
              {
                name: 'Asma',
              },
              {
                name: 'Pedro',
              },
              {
                name: 'Yooo',
              },
              {
                name: 'Coucou',
              },
            ]}
            status={EGameStatus.LOBBY}
          />
                    <GameCard
            players={[
              {
                name: 'Thomas',
              },
              {
                name: 'Asma',
              },
              {
                name: 'Pedro',
              },
              {
                name: 'Yooo',
              },
              {
                name: 'Coucou',
              },
            ]}
            status={EGameStatus.LOBBY}
          />
                    <GameCard
            players={[
              {
                name: 'Thomas',
              },
              {
                name: 'Asma',
              },
              {
                name: 'Pedro',
              },
              {
                name: 'Yooo',
              },
              {
                name: 'Coucou',
              },
            ]}
            status={EGameStatus.LOBBY}
          />
        </div>
      </div>
    </Provider>
  );
}

export default App;
