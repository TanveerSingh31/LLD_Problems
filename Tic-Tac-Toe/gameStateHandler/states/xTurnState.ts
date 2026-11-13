import { GameState } from "./gameState";
import { GameContext } from "../gameContext";
import { XWon } from './xWonState';
import { YTurn } from './yTurnState';

export class XTurn implements GameState {

    next(gameContext: GameContext, isWon: boolean) {
        if(isWon) {
            gameContext.setContext(new XWon());
        }
        else {
            gameContext.setContext(new YTurn());
        }
    }

    isGameOver(): boolean {
        return false;
    }
}