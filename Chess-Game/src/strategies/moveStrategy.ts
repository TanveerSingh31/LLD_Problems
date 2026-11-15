import { Board } from '../models/board.js';
import { Position } from '../models/position.js';

//1. Strategy design pattern - to dynamically inject player strategy.

export interface MoveStrategy {
    getMove(board: Board, currentPosition: Position): { position: Position, isOpponentPresent: boolean };
}