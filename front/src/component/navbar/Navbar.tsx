import React from "react"
import "./Navbar.css"

export const Navbar = () => {
    return (
        <nav>
            <ol className="crumb">
                <li className="crumb-item"><a href="/games">PLAY</a></li>
                <li className="game-title"><a href="/">RED-TETRIS</a></li>
                <li className="crumb-item"><a href="/about">ABOUT</a></li>
            </ol>
        </nav>
    )
}