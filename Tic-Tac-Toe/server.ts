
import { GameController } from './controller/gameController';
import { Symbol } from './enums/symbol';
import { Player } from './models/player';
import { HumanStrategy } from './strategies/humanStrategy';
import { AIStrategy } from './strategies/aiStrategy';
import { GameContext } from './gameStateHandler/gameContext';

function main() {

    const rows = 3;
    const cols = 3;

    const playerX = new Player(Symbol.X, new HumanStrategy());  // player with human strategy
    const playerO = new Player(Symbol.O, new AIStrategy());  // player with AI strategy

    const gameContext = new GameContext();

    const gameController = new GameController(
        rows,
        cols,
        playerX,
        playerO,
        gameContext
    );

    gameController.play();
}


main();