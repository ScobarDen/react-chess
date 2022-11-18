import {Figure, FigureNames} from "./Figure";
import blackLogo from '../../assets/b_pawn_png_shadow_128px.png';
import whiteLogo from '../../assets/w_pawn_png_shadow_128px.png';
import {Colors} from "../Colors";
import {Cell} from "../Cell";


export class Pawn extends Figure {
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.PAWN;
    }

    canMove(target: Cell): boolean {
        if (!super.canMove(target)) return false;

        return true;
    }
}