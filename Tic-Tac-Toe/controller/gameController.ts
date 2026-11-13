import { Symbol } from '../enums/symbol';
import { GameContext } from '../gameStateHandler/gameContext';
import { Board } from '../models/board';
import { Player } from '../models/player';
import { Position } from '../models/position';

export class GameController {

    private readonly board: Board;
    private readonly playerX: Player;
    private readonly playerO: Player;
    private currentPlayer: Player;
    readonly gameContext: GameContext;

    constructor(rows: number, cols: number, playerA: Player, playerB: Player, gameContext: GameContext) {
        this.board = new Board(rows, cols);
        this.playerX = playerA;
        this.playerO = playerB;

        this.currentPlayer = this.playerX;

        this.gameContext = gameContext;
    }

    async play() {
        do {
            const position: Position = await this.currentPlayer.makeMove(); 
            this.board.addMove(position, this.currentPlayer.symbol);
            this.board.checkGameState(this.gameContext, this.currentPlayer);
            this.switchPlayer();
        } while(!this.gameContext.isGameOver());
    }

    switchPlayer() {
        if(this.currentPlayer.symbol == Symbol.X) {
            this.currentPlayer = this.playerO;
        }
        else {
            this.currentPlayer = this.playerX;
        }
    }
}