//setAvailableRooms
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Room {
	socket: string;
	client: string;
}

export interface GameInitialState {
	availableRooms: Room[];
}

const initialState: GameInitialState = {
	availableRooms: [],
};

export const gameSlice = createSlice({
	name: "game",
	initialState,
	reducers: {
		setAvailableRooms: (state, action: PayloadAction<Room[]>) => {
			state.availableRooms = action.payload;
		},
	},
});

export const { setAvailableRooms } = gameSlice.actions;

export const gameReducer = gameSlice.reducer;