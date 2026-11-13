import { GameState } from "./gameState";
import { XTurn } from './xTurnState';
import { YWon } from './yWonState';
import { GameContext } from "../gameContext";

export class YTurn implements GameState {

    next(gameContext: GameContext, isWon: boolean) {
        if(isWon) {
            gameContext.setContext(new YWon());
        }
        else {
            gameContext.setContext(new XTurn());
        }
    }

    isGameOver(): boolean {
        return false;
    }
}