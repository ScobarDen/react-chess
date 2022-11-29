import React, {FC, useEffect, useState} from 'react';
import {Board} from "../models/Board";
import CellComponent from "./CellComponent";
import {Cell} from "../models/Cell";
import {Player} from '../models/Player';
import {FigureNames} from "../models/figures/Figure";
import {Colors} from "../models/Colors";

interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void;
    currentPlayer: Player | null;
    whitePlayer: Player | null;
    blackPlayer: Player | null;
    swapPlayer: () => void;
}


const BoardComponent: FC<BoardProps> = ({board, setBoard, currentPlayer, swapPlayer, whitePlayer, blackPlayer}) => {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

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
        let shah : boolean = false;
        board.cells.forEach(row =>
            row.forEach(cell => {
                if (cell.figure?.color !== currentPlayer?.color){
                    if (kingCell && cell.figure?.canMove(kingCell)){
                        shah = true;
                    }
                }
            }))
        return shah;
    }



    useEffect(() => {
        let whiteKing: Cell | null = null;
        let blackKing: Cell | null = null;
        board.cells.forEach(row =>
            row.forEach(cell => {
                if (cell.figure?.color === Colors.WHITE && cell.figure?.name === FigureNames.KING){
                    whiteKing = cell;
                }
                if (cell.figure?.color === Colors.BLACK && cell.figure?.name === FigureNames.KING){
                    blackKing = cell;
                }
            }))
        if (kingIsUnderAttack(whiteKing,whitePlayer)) alert("Шах белым");
        if (kingIsUnderAttack(blackKing,blackPlayer)) alert("Шах черным");
    });


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
        <div>
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
        </div>
    );
}

export default BoardComponent;