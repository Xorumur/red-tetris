//setAvailableRooms
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EGameStatus } from '../../component/cards/GameCard/GameCard';

export interface Player {
  client: string
}

export interface Room {
  id: string;
  players: Player[];
}

export interface GameInitialState {
  availableRooms: Room[];
  gameStatus: EGameStatus;
}

const initialState: GameInitialState = {
  availableRooms: [],
  gameStatus: EGameStatus.LOBBY,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setAvailableRooms: (state, action: PayloadAction<Room[]>) => {
      state.availableRooms = action.payload;
    },
	setGameStatus: (state, action: PayloadAction<EGameStatus>) => {
		state.gameStatus = action.payload;
	},
  },
});

export const { setAvailableRooms, setGameStatus } = gameSlice.actions;

export const gameReducer = gameSlice.reducer;
