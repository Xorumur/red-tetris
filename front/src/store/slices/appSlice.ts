import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum AppPage {
	MAIN,
	PRE_GAME,
	GAME,
}

export interface AppInitialState {
	currentPage: AppPage;
}

const initialState: AppInitialState = {
	currentPage: AppPage.MAIN,
};

export const appSlice = createSlice({
	name: "app",
	initialState,
	reducers: {
		setCurrentPage: (state, action: PayloadAction<AppPage>) => {
			state.currentPage = action.payload;
		},
	},
});

export const { setCurrentPage } = appSlice.actions;

export const appReducer = appSlice.reducer;
