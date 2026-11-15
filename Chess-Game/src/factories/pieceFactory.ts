import { Piece } from '../models/piece.js';
import { PieceType } from '../enums/pieceType.js';
import { Color } from '../enums/color.js';
import { KingStrategy } from '../strategies/kingStrategy.js';
import { Position } from '../models/position.js';
import { QueenStrategy } from '../strategies/queenStrategy.js';
import { KnightStrategy } from '../strategies/knightStrategy.js';
import { BishopStrategy } from '../strategies/bishopStrategy.js';
import { RookStrategy } from '../strategies/rookStrategy.js';
import { PawnStrategy } from '../strategies/pawnStrategy.js';

// 2. Factory Design Pattern - to construct pieces

export class PieceFactory {

    getPiece(type: PieceType, color: Color, position: Position) {
        switch(type) {
            case PieceType.KING : {
                return new Piece(color, type, false, position, new KingStrategy());
            }
            case PieceType.QUEEN : {
                return new Piece(color, type, false, position, new QueenStrategy());
            }
            case PieceType.KNIGHT : {
                return new Piece(color, type, false, position, new KnightStrategy());
            }
            case PieceType.BISHOP : {
                return new Piece(color, type, false, position, new BishopStrategy());
            }
            case PieceType.ROOK : {
                return new Piece(color, type, false, position, new RookStrategy());
            }
            case PieceType.PAWN : {
                return new Piece(color, type, false, position, new PawnStrategy());
            }
            default: {
                throw new Error("Unsupported piece type");
            }
        }
    }

}