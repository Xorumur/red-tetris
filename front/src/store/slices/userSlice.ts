import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface UserInitialState {
    username: string | null,
    currentRoom: string | null,
}

const initialState: UserInitialState = {
    username: null,
    currentRoom: null,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
        setUsername: (state, action: PayloadAction<string | null>) => {
			state.username = action.payload;
		},
        setCurrentRoom: (state, action: PayloadAction<string>) => {
			state.username = action.payload;
		}
	},
});

export const selectName = (state: RootState) => state.userSlice.username;
export const selectCurrentRoom = (state: RootState) => state.userSlice.currentRoom;

export const {
    setUsername,
    setCurrentRoom
} = userSlice.actions;

export const userReducer = userSlice.reducer;