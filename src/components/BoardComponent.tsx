import React, {FC, useEffect, useState} from 'react';
import {Board} from "../models/Board";
import CellComponent from "./CellComponent";
import {Cell} from "../models/Cell";
import {Player} from '../models/Player';
import {FigureNames} from "../models/figures/Figure";

interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void;
    currentPlayer: Player | null;
    swapPlayer: () => void;
}


const BoardComponent: FC<BoardProps> = ({board, setBoard, currentPlayer, swapPlayer}) => {
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

    function kingIsUnderAttack(currentPlayer: Player | null): boolean {
        let kingCell: Cell | null = null;
        let shah : boolean = false;
        board.cells.forEach(row =>
            row.forEach(cell => {
                if (cell.figure?.color === currentPlayer?.color && cell.figure?.name === FigureNames.KING){
                    kingCell = cell;
                }
                if (cell.figure?.color !== currentPlayer?.color){
                    if (kingCell && cell.figure?.canMove(kingCell)){
                        shah = true;
                        return true;
                    }
                }
            }))
        return shah;
    }

    useEffect(() => {
        if (kingIsUnderAttack(currentPlayer)) {
            alert("Шах")
        }
    }, [currentPlayer]);


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