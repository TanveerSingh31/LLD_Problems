import * as readline from 'readline/promises';
import { Position } from "../models/position";
import { GameStrategy } from "./GameStrategy";

export class HumanStrategy implements GameStrategy {

    async makeMove(): Promise<Position> {
        const x = Math.floor(Math.random() * 3);
        const y = Math.floor(Math.random() * 3);
        
        //todo: check if coordinates valid ?
        return new Position(x, y);
    }

}