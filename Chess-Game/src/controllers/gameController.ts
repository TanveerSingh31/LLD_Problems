import { Board } from '../models/board.js';
import { Player } from '../models/player.js';
import { Piece } from '../models/piece.js';
import { GameContext } from '../state/gameContext.js';
import { Color } from '../enums/color.js';


export class GameController {
    
    board: Board;
    player1: Player;
    player2: Player;
    currentPlayer: Player;
    gameContext: GameContext;


    constructor(board: Board, player1: Player, player2: Player) {
        this.board = board; // todo: use singleton - to fetch board !!! - improvement
        this.player1 = player1;
        this.player2 = player2;

        this.currentPlayer = player1;

        this.gameContext = new GameContext();
    }


    play() {
        do {
            //1. ask player for move
            const { position, piece } = this.currentPlayer.makeMove(this.board);

            //2. add move on board
            this.board.addMove(piece, position, this.gameContext);

            //3. check if game is won by anyone ? - using game context
            if(this.gameContext.isGameOver) {
                return;
            }

            //4. switch player
            this.switchPlayer();

        } while(!this.gameContext.isGameOver);
    }


    switchPlayer(): void {
        if(this.currentPlayer.color == Color.WHITE) {
            this.currentPlayer = this.player2;
        }
        else {
            this.currentPlayer = this.player1;
        }
    }

}