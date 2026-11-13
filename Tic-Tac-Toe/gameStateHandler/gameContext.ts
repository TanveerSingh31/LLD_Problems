import { GameState } from './states/gameState';
import { XTurn } from './states/xTurnState';

export class GameContext {
    private currentState : GameState;
    
    constructor() {
        this.currentState = new XTurn(); // first turn if of PlayerX
    }

    next(isWon: boolean) {
        // tranfers the call to the state object

        // game context object , will be send itself in each next method
        this.currentState.next(this, isWon);
    }

    // states classes can change the currentContext state on their own , using this
    setContext(state: GameState) {
        this.currentState = state;
    }

    // tells whether the game is over or not , looking at current state
    isGameOver(): boolean {
        return this.currentState.isGameOver();
    }
}