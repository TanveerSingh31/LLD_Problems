import { Piece } from './piece.js';
import { Position } from './position.js';
import { InvalidMove } from '../exceptions/invalidMove.js';
import type { GameContext } from '../state/gameContext.js';
import { PieceType } from '../enums/pieceType.js';

export class Board {
    rows: number;
    cols: number;
    cells: (Piece | null)[][] = [[]];

    private static readonly boardInstance: Board | null = null;

    // 3. Singleton pattern
    private constructor(rows: number, cols: number) {
        this.rows = rows;
        this.cols = cols;

        this.cells = [];

        for(let i=0; i<rows; i++) {
            this.cells.push(Array(cols).fill(null));
        }
    }


    // 3. Singleton pattern
    public static getBoardInstance(rows: number, cols: number) {
        if(this.boardInstance === null) {
            return new Board(rows, cols);
        } 
        else {
            return this.boardInstance;
        }
    }



    isValidMove(piece: Piece, position: Position): boolean {
        
        // check if position in bound
        if(!position.isValid(this)) {
            throw new InvalidMove();
        }

        // check if target position contains it's own color piece 
        if(piece.color == this.cells[position.row][position.col]?.color) {
            throw new InvalidMove();
        }

        return true;
    }


    addMove(piece: Piece | undefined, position: Position, gameContext: GameContext): void {

        if(!piece) {
            return;
        }

        //1. make the original position - null
        this.cells[piece.position.row][piece.position.col] = null;

        //2. check if the target position - non-empty
        if(this.cells[position.row][position.col] != null) {
            const piece: Piece | null = this.cells[position.row][position.col];
            
            if(piece) {
                // if opponent piece present - is it king ? -> game over -> update state
                if(piece.type == PieceType.KING) {
                    gameContext.isGameOver = true;
                }

                // if opponent piece there, mark isKilled : true
                piece.isKilled = true;
            }
        }
            
        //3. move the piece to new position - call change position fn. on piece
        this.cells[position.row][position.col] = piece;
    }

}