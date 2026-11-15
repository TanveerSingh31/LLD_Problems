import { Color } from '../enums/color.js';
import { Position } from './position.js';
import { Piece } from './piece.js';
import { Board } from '../models/board.js';

export class Player {
    name: string;
    color: Color;
    pieces: Piece[];

    constructor(name: string, color: Color, pieces: Piece[]) {
        this.name = name;
        this.color = color;
        this.pieces = pieces;
    }

    makeMove(board: Board): { 
        position: Position,
        piece: Piece | undefined
    } {

        // iterate on it's pieces
        // choose valid position from board
        for(let piece of this.pieces) {
            const { position, isOpponentPresent } = piece.getMove(board);

            // if opponent is present on this target position - we will make the move
            if(isOpponentPresent) {
                return { position, piece };
            }
        }

        // if opponent not present , choose random piece
        return {
            position: new Position(1,1),
            piece: this.pieces[0]
        }
    }
}