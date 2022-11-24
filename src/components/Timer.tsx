import React, {useEffect, useRef, useState} from "react";
import {Player} from "../models/Player";
import {Colors} from "../models/Colors";

const TIME_OF_GAME = 300;

interface TimerProps {
    currentPlayer: Player | null;
    restart: () => void;

}

const Timer: React.FC<TimerProps> = ({currentPlayer, restart}) => {
    const [blackTime, setBlackTime] = useState(TIME_OF_GAME);
    const [whiteTime, setWhiteTime] = useState(TIME_OF_GAME);
    const timer = useRef<null | ReturnType<typeof setInterval>>(null);


    useEffect(()=>{
        if (blackTime === 0){
            alert('Game over! White wins!');
            handleRestart();
        }
        if (whiteTime === 0){
            alert('Game over! Black wins!');
            handleRestart();
        }
    },[blackTime, whiteTime]);

    useEffect(()=>{
        startTimer();
    },[currentPlayer]);

    function startTimer() {
        if (timer.current){
            clearInterval(timer.current);
        }
        const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer;
        timer.current = setInterval(callback, 1000);
    }

    function decrementWhiteTimer() {
        setWhiteTime(prevState => prevState - 1);
    }

    function decrementBlackTimer() {
        setBlackTime(prevState => prevState - 1);
    }
    
    function handleRestart() {
        setBlackTime(TIME_OF_GAME);
        setWhiteTime(TIME_OF_GAME);
        restart();
    }

    return (
        <div>
            <div>
                <button onClick={handleRestart}>Перезапустить игру</button>
            </div>
            <h2>Черные - {blackTime}</h2>
            <h2>Белые - {whiteTime}</h2>
        </div>
    );
};

export default Timer;