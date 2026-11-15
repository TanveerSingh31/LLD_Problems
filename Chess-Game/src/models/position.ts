import { Board } from '../models/board.js';

export class Position {
    row: number;
    col: number;

    constructor(row: number, col: number) {
        this.row = row;
        this.col = col;
    }

    isValid(board: Board): boolean {
        // check if the coordinate is valid or not - should not go out of bound off the board

        if(this.row < 0 || this.row > board.rows || this.col<0 || this.col > board.cols) return false;

        return true;
    }
}