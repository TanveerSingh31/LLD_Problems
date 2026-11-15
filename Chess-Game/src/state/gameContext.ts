
import { Player } from '../models/player.js';

export class GameContext {
    isGameOver: boolean;
    winner: Player | null;

    constructor() {
        this.isGameOver = false;
        this.winner = null;
    }

    checkIfGameOver(): boolean {
        return this.isGameOver;
    }
    
}