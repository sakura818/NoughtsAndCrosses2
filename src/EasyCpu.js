import Cpu from 'Cpu';

/**
 * 弱いCPU
 *
 * @author asada
 */
export default class EasyCpu extends Cpu {
    constructor(playerId) {
        super(playerId);
    }

    selectByCpu() {
        let boardId;
        do {
            boardId = Math.floor(Math.random() * board.getOneSideLength() * board.getOneSideLength());
        } while (board.isAlreadyPut(boardId));
        board.put(boardId, this.playerId);
    }
}