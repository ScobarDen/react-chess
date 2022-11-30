import React, {useEffect, useState} from 'react';
import './App.css';
import BoardComponent from "./components/BoardComponent";
import {Board} from "./models/Board";
import {Player} from "./models/Player";
import {Colors} from "./models/Colors";
import LostFigures from "./components/LostFigures";
import Timer from "./components/Timer";

function App() {
    const [board, setBoard] = useState(new Board());
    const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
    const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
    const [win, setWin] = useState<String>("game");
    useEffect(() => {
        restart();
    }, []);

    function restart() {
        const newBoard = new Board();
        newBoard.initCells();
        newBoard.addFigures();
        setBoard(newBoard);
        setCurrentPlayer(whitePlayer);
        setWin("game");
    }

    function swapPlayer() {
        setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer);
    }

    return (
        <div className='app'>
            <Timer currentPlayer={currentPlayer} restart={restart} win={win}/>
            <BoardComponent
                whitePlayer={whitePlayer}
                blackPlayer={blackPlayer}
                board={board}
                setBoard={setBoard}
                currentPlayer={currentPlayer}
                swapPlayer={swapPlayer}
                win={win}
                setWin={setWin}
            />
            <div>
                <LostFigures title="Черные" figures={board.lostBlackFigures}/>
                <LostFigures title="Белые" figures={board.lostWhiteFigures}/>
            </div>

        </div>
    );
}

export default App;
