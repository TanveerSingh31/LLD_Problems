import type { MoveStrategy } from "./moveStrategy.js";
import { Board } from '../models/board.js';
import { Position } from '../models/position.js';

export class KnightStrategy implements MoveStrategy {

    getMove(board: Board, currentPosition: Position): { position: Position, isOpponentPresent: boolean } {
        
        // iterate over board from current position, check if any opponent is being killed ?
        // return the position, and isOpponentPresent on that position ?
        
        return {
            position: new Position(1,1),
            isOpponentPresent: true
        };
    }
}