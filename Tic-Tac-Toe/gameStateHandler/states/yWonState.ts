import { GameState } from "./gameState";
import { GameContext } from "../gameContext";

export class YWon implements GameState {

    next(gameContext: GameContext, isWon?: boolean) {
        // do nothing
    }

    isGameOver(): boolean {
        return true;
    }
}