import React from "react"
import "./Navbar.css"
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export const Navbar = () => {
	const username = useSelector(
		(state: RootState) => state.userSlice.username
	);
	console.log(" yop , ", username)
    return (
        <nav>
            <ol className="crumb">
                <li className="crumb-item"><a href="/games">PLAY</a></li>
                <li className="game-title"><a href="/">RED-TETRIS</a></li>
                {username && <li className="crumb-item"><div style={{color: "purple"}}>Logged as : {username}</div></li>}
            </ol>
        </nav>
    )
}