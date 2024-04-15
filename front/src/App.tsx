import React from "react";
import { Provider, useSelector } from "react-redux";
import { RootState, store } from "./store/store";
import { Navbar } from "./component/navbar/Navbar";
import "./App.css";
import { MainPage } from "./component/pages/MainPage";
import { AppPage } from "./store/slices/appSlice";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const AppWrapper = () => {
	const currentPage = useSelector(
		(state: RootState) => state.appSlice.currentPage
	);

	return (
		<div>
			<header />
			<Navbar />
			{currentPage === AppPage.MAIN && <MainPage />}
		</div>
	);
};

function App() {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <MainPage />,
		},
		{
			path: "/games",
			element: <div>hello xd</div>,
		},
	]);
	return (
		<Provider store={store}>
			<RouterProvider router={router} />
			<AppWrapper />
		</Provider>
	);
}

export default App;
