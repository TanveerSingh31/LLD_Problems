import { Symbol } from '../enums/symbol';
import { Position } from './position';
import { PositionOccupied } from '../exceptions/positionOccupied'; 
import { Player } from './player';
import { GameContext } from '../gameStateHandler/gameContext';

export class Board {

    private readonly rows: number;
    private readonly cols: number;

    private grid: Symbol[][];

    constructor(rows: number, cols: number) {
        this.rows = rows;
        this.cols = cols;

        this.grid = [];

        for(let i=0; i<rows; i++) {
            this.grid.push(new Array(cols).fill(Symbol.EMPTY));
        }
    }


    addMove(positionObj: Position, symbol: Symbol) {
        // check if position not already occupied ?
        if(this.grid[positionObj.X][positionObj.Y] == Symbol.EMPTY) {
            this.grid[positionObj.X][positionObj.Y] = symbol;
        }
        else {
            throw new PositionOccupied();
        }
    }


    checkGameState(gameContext: GameContext, currentPlayer: Player): void {
        // iterate over all rows, cols, diagonals - check if any symbol other than EMPTY present in a row.

        // find the first symbol of current player in the grid
        // map if any row, col , diagonal matches the symbol

        const match = true;

        if(match) {
            gameContext.next(true);
        }
        else {
            gameContext.next(false);
        }
    }




}