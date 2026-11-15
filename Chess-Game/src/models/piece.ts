import { Color } from '../enums/color.js';
import { Position } from './position.js';
import { PieceType } from '../enums/pieceType.js';
import type { MoveStrategy } from '../strategies/moveStrategy.js';
import { Board } from './board.js';

export class Piece {
    color: Color;
    type: PieceType;
    isKilled: boolean;
    position: Position;
    moveStrategy: MoveStrategy;

    constructor(color: Color, type: PieceType, isKilled: boolean, position: Position, moveStrategy: MoveStrategy) {
        this.color = color;
        this.type = type;
        this.isKilled = isKilled;
        this.position = position;
        this.moveStrategy = moveStrategy;
    }

    // change position of a piece
    changePosition(newPosition: Position): void {
        this.position = newPosition;
    }

    // get move with a particular piece
    getMove(board: Board): { position: Position, isOpponentPresent: boolean }  {
        return this.moveStrategy.getMove(board, this.position);
    }
}