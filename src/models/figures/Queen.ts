import {Figure, FigureNames} from "./Figure";
import blackLogo from '../../assets/b_queen_png_shadow_128px.png';
import whiteLogo from '../../assets/w_queen_png_shadow_128px.png';
import {Colors} from "../Colors";
import {Cell} from "../Cell";

export class Queen extends Figure {
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.QUEEN;
    }

    canMove(target: Cell): boolean {
        if (!super.canMove(target)) return false;
        if (this.cell.isEmptyVertical(target)) return true;
        if (this.cell.isEmptyHorizontal(target)) return true;
        if (this.cell.isEmptyDiagonal(target)) return true;
        return false;
    }
}