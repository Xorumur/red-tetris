import React from "react";
import { SocketUtils } from "../../sockets/socketUtils";
import { EGameStatus, GameCard } from "../cards/GameCard/GameCard";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { UsernameModal } from "../modal/UsernameModal";

export const MainPage = () => {
	const username = useSelector(
		(state: RootState) => state.userSlice.username
	);


	return (
		<div>
			{username === null ? (
				<div><UsernameModal/></div>
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

					<GameCard
						players={[
							{
								name: "Thomas",
							},
							{
								name: "Asma",
							},
							{
								name: "Pedro",
							},
							{
								name: "Yooiuhuihui",
							},
							{
								name: "Coucou",
							},
						]}
						status={EGameStatus.LOBBY}
					/>
					<GameCard
						players={[
							{
								name: "Thomas",
							},
							{
								name: "Asma",
							},
							{
								name: "Pedro",
							},
							{
								name: "Yooo",
							},
							{
								name: "Coucou",
							},
						]}
						status={EGameStatus.LOBBY}
					/>
					<GameCard
						players={[
							{
								name: "Thomas",
							},
							{
								name: "Asma",
							},
							{
								name: "Pedro",
							},
							{
								name: "Yooo",
							},
							{
								name: "Coucou",
							},
						]}
						status={EGameStatus.LOBBY}
					/>
					<GameCard
						players={[
							{
								name: "Thomas",
							},
							{
								name: "Asma",
							},
							{
								name: "Pedro",
							},
							{
								name: "Yooo",
							},
							{
								name: "Coucou",
							},
						]}
						status={EGameStatus.LOBBY}
					/>
					<GameCard
						players={[
							{
								name: "Thomas",
							},
							{
								name: "Asma",
							},
							{
								name: "Pedro",
							},
							{
								name: "Yooo",
							},
							{
								name: "Coucou",
							},
						]}
						status={EGameStatus.LOBBY}
					/>
				</div>
			)}
		</div>
	);
};
