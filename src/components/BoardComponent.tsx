import React, {FC, useEffect, useState} from 'react';
import {Board} from "../models/Board";
import CellComponent from "./CellComponent";
import {Cell} from "../models/Cell";
import {Player} from '../models/Player';
import {Figure, FigureNames} from "../models/figures/Figure";
import {Colors} from "../models/Colors";

interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void;
    currentPlayer: Player | null;
    whitePlayer: Player | null;
    blackPlayer: Player | null;
    swapPlayer: () => void;
    win: String;
    setWin: (win: String) => void;
}


const BoardComponent: FC<BoardProps> = (
    {
        board,
        setBoard,
        currentPlayer,
        swapPlayer, whitePlayer,
        blackPlayer,
        win,
        setWin
    }) => {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
    const [message, setMessage] = useState<String>("");

    function click(cell: Cell) {
        if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
            selectedCell.moveFigure(cell);
            swapPlayer();
            setSelectedCell(null);
        } else {
            if (cell.figure?.color === currentPlayer?.color) {
                setSelectedCell(cell);
            }
        }
    }

    function kingIsUnderAttack(kingCell: Cell | null, currentPlayer: Player | null): boolean {
        let shah: boolean = false;
        board.cells.forEach(row =>
            row.forEach(cell => {
                if (cell.figure?.color !== currentPlayer?.color) {
                    if (kingCell && cell.figure?.canMove(kingCell)) {
                        shah = true;
                    }
                }
            }))
        return shah;
    }

    function isCheckmate(kingCell: Cell | null) {
        let checkmate: boolean = false;
        // const clearCells: Array<number> = new Array<number>(64);
        // clearCells.fill(0);
        // board.cells.forEach((row, i) =>
        //     row.forEach((cell, j) => {
        //         if (kingCell?.figure?.canMove(cell)) {
        //             clearCells[i * 8 + j] = 1;
        //         }
        //     }))
        // console.log(clearCells.reduce((prev, num) => prev + num, 0))
        // if (clearCells.reduce((prev, num) => prev + num, 0) === 0) checkmate = true;
        return checkmate;
    }


    useEffect(() => {
        setMessage("");
        let whiteKing: Cell | null = null;
        let blackKing: Cell | null = null;
        board.cells.forEach(row =>
            row.forEach(cell => {
                if (cell.figure?.color === Colors.WHITE && cell.figure?.name === FigureNames.KING) {
                    whiteKing = cell;
                }
                if (cell.figure?.color === Colors.BLACK && cell.figure?.name === FigureNames.KING) {
                    blackKing = cell;
                }
            }))
        if (kingIsUnderAttack(whiteKing, whitePlayer)) {
            if (isCheckmate(whiteKing)) {
                setMessage("Мат белым");
            } else {
                setMessage("Шах белым");
            }
        }
        if (kingIsUnderAttack(blackKing, blackPlayer)) {
            if (isCheckmate(blackKing)) {
                setMessage("Мат черным");
            } else {
                setMessage("Шах черным");
            }
        }
    });

    useEffect(() => {
        const lastLostWhite: Figure | undefined = board.lostWhiteFigures.at(-1);
        const lastLostBlack: Figure | undefined = board.lostBlackFigures.at(-1);
        if (lastLostWhite?.name === FigureNames.KING) setWin("черные");
        if (lastLostBlack?.name === FigureNames.KING) setWin("белые");
    }, [currentPlayer])


    useEffect(() => {
        highlightCell();
    }, [selectedCell]);

    function highlightCell() {
        board.highlightCell(selectedCell);
        updateBoard();
    }

    function updateBoard() {
        const newBoard = board.getCopyBoard();
        setBoard(newBoard);
    }

    return (
        <>
            {win === "game" ? <div>
                <h3 className="currentplayer">Текущий игрок {currentPlayer?.color}</h3>
                <div
                    className='board'
                >
                    {board.cells.map((row, index) => (
                        <React.Fragment key={index}>
                            {row.map(cell => (
                                <CellComponent
                                    click={click}
                                    cell={cell}
                                    key={cell.id}
                                    selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                                />
                            ))}
                        </React.Fragment>
                    ))}
                </div>
                <h3 className="currentplayer">{message}</h3>
            </div> : <div className="win">Победили {win}</div>}
        </>
    );
}

export default BoardComponent;