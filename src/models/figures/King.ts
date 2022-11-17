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
}