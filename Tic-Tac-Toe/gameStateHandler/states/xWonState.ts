import { GameState } from "./gameState";
import { GameContext } from "../gameContext";

export class XWon implements GameState {

    private gameContext: GameContext;

    constructor(ctx: GameContext) {
        this.gameContext = ctx; 
    }

    next(isWon?: boolean) {
        // do nothing
    }
}