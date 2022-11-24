import {Figure, FigureNames} from "./Figure";
import blackLogo from '../../assets/b_king_png_shadow_128px.png';
import whiteLogo from '../../assets/w_king_png_shadow_128px.png';
import {Colors} from "../Colors";
import {Cell} from "../Cell";

export class King extends Figure {

    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.KING;
    }

    canMove(target: Cell): boolean {
        if (!super.canMove(target)) return false;

        const dx = Math.abs(this.cell.x - target.x);
        const dy = Math.abs(this.cell.y - target.y);
        if (dx === 1 && dy === 1) {
            return true;
        }
        if (this.cell.y === target.y + 1 && this.cell.x === target.x) {
            return true;
        }

        if (this.cell.y === target.y - 1 && this.cell.x === target.x) {
            return true;
        }

        if (this.cell.x === target.x + 1 && this.cell.y === target.y) {
            return true;
        }

        if (this.cell.x === target.x - 1 && this.cell.y === target.y) {
            return true;
        }

        return false;
    }
}