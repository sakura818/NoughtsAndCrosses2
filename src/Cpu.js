import {board} from './app';

/**
 * コンピュータのプレイヤー
 *
 * @author asada
 */
export default class Cpu {
    constructor(playerId) {
        this.playerId = playerId;
    }

    selectByCpu() {
        let boardId;
        do {
            boardId = Math.floor(Math.random() * board.getOneSideLength() * board.getOneSideLength());
        } while (board.isAlreadyPut(boardId));
        board.put(boardId, this.playerId);
    }
}