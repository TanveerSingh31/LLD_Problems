import { GameContext} from '../gameContext';

// state pattern
// common interface followed by all state classes

export interface GameState {
    next(gameContext: GameContext, isWon: boolean): void;
    isGameOver(): boolean;
} 