import { Symbol } from "../enums/symbol";
import { GameStrategy } from "../strategies/GameStrategy";
import { Position } from './position';

export class Player {
    public readonly symbol: Symbol;
    strategy: GameStrategy
    
    constructor(symbol: Symbol, strategy: GameStrategy) {
        this.symbol = symbol;
        this.strategy = strategy;
    }

    // calls player strategy to make move
    async makeMove(): Promise<Position> {
        return await this.strategy.makeMove();
    }
}