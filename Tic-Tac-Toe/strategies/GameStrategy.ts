
import { Position } from '../models/position';

export interface GameStrategy {
    makeMove() : Promise<Position>;
}