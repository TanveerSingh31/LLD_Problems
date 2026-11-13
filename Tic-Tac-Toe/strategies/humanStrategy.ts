import * as readline from 'readline/promises';
import { Position } from "../models/position";
import { GameStrategy } from "./GameStrategy";

export class HumanStrategy implements GameStrategy {

    async makeMove(): Promise<Position> {
        const x = await this.promptUser();
        const y = await this.promptUser();
        
        //todo: check if coordinates valid ?
        return new Position(x, y);
    }


    private async promptUser(): Promise<number> {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        const coordinate: string = await rl.question('Enter your co-ordinate');
        return Number(coordinate);
    }
}