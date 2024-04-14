import React, { useEffect } from "react";
import { SocketUtils } from "../../sockets/socketUtils";
import { EGameStatus, GameCard } from "../cards/GameCard/GameCard";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store/store";
import { UsernameModal } from "../modal/UsernameModal";
import { socket } from "../../sockets/socket";
import { setAvailableRooms } from "../../store/slices/gameSlice";

export const MainPage = () => {
	const dispatch = useAppDispatch();
	const username = useSelector(
		(state: RootState) => state.userSlice.username
	);
	const availableRooms = useSelector(
		(state: RootState) => state.gameSlice.availableRooms
	);

	useEffect(() => {
		socket.on("roomUpdate", (data) => {
			console.log("room update", data);
			dispatch(setAvailableRooms(data));
		});
		return () => {
			socket.off("roomUpdate");
		};
	}, []);

	return (
		<div>
			{username === null ? (
				<div>
					<UsernameModal show={true}/>
				</div>
			) : (
				<div className="game-info-container">
					<div
						style={{
							backgroundColor: "purple",
						}}
					>
						<button
							onClick={() => {
								SocketUtils.createGame();
							}}
						>
							CREATE A GAME
						</button>
					</div>
					{availableRooms.map((room, idx) => (
						<GameCard
							key={idx}
							players={[{name: room.client}]}
							status={EGameStatus.LOBBY}
						/>
					))}
				</div>
			)}
		</div>
	);
};
