import { Color } from './enums/color.js';   
import { PieceFactory } from './factories/pieceFactory.js';
import { PieceType } from './enums/pieceType.js';
import { Position } from './models/position.js';
import { Piece } from './models/piece.js';
import { Player } from './models/player.js';
import { Board } from './models/board.js';
import { GameController } from './controllers/gameController.js';

// return default piece list of given color 
function createPiecesForPlayer(color: Color) {

    // utilise "factory" for creating pieces;
    const pieceFactory = new PieceFactory();

    const king = pieceFactory.getPiece(PieceType.KING, color, new Position(1,1));
    const queen = pieceFactory.getPiece(PieceType.QUEEN, color, new Position(1,1));
    
    const knight1 = pieceFactory.getPiece(PieceType.KNIGHT, color, new Position(1,1));
    const knight2 = pieceFactory.getPiece(PieceType.KNIGHT, color, new Position(1,1));

    const bishop = pieceFactory.getPiece(PieceType.BISHOP, color, new Position(1,1));
    const bishop2 = pieceFactory.getPiece(PieceType.BISHOP, color, new Position(1,1));

    const rook = pieceFactory.getPiece(PieceType.ROOK, color, new Position(1,1));
    const rook2 = pieceFactory.getPiece(PieceType.ROOK, color, new Position(1,1));

    const pawn = pieceFactory.getPiece(PieceType.PAWN, color, new Position(1,1));
    const pawn2 = pieceFactory.getPiece(PieceType.PAWN, color, new Position(1,1));
    const pawn3 = pieceFactory.getPiece(PieceType.PAWN, color, new Position(1,1));
    // ... 8 pawns


    return [king, queen, knight1, knight2, bishop, bishop2, rook, rook2, pawn, pawn2, pawn3,]; // ...]
    
}



function main() {

    const blackPieces: Piece[] = createPiecesForPlayer(Color.BLACK);
    const whitePieces: Piece[] = createPiecesForPlayer(Color.WHITE);

    const player1 = new Player("ABC", Color.BLACK, blackPieces);
    const player2 = new Player("XYZ", Color.WHITE, whitePieces);

    // singleton - to get board instance
    const board = Board.getBoardInstance(8, 8);

    const gameController = new GameController(board, player1, player2);

    gameController.play();
}



main();