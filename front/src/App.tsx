import React from 'react';
import { Provider } from 'react-redux';
import {store } from './store/store';
import { Navbar } from './component/navbar/Navbar';
import "./App.css"
import { MainPage } from './component/pages/MainPage';

function App() {
  return (
    <Provider store={store}>
      <div>
        <header />
        <Navbar />
		<MainPage/>
      </div>
    </Provider>
  );
}

export default App;
