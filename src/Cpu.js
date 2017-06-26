import {board} from './app';
/**
 * コンピュータのプレイヤー
 *
 * @author asada
 */
class Cpu {
    constructor(playerId) {
        this.playerId = playerId;
    }

    selectByCpu() {
        throw new Error('You have to implement the method doSomething!');
    }
}

/**
 * 弱いCPU
 *
 * @author asada
 */
export class EasyCpu extends Cpu {
    constructor(playerId) {
        super(playerId);

        console.log('イージーCPUが呼ばれました。');
    }

    selectByCpu() {
        let boardId;
        do {
            boardId = Math.floor(Math.random() * board.getOneSideLength() * board.getOneSideLength());
        } while (board.isAlreadyPut(boardId));
        board.put(boardId, this.playerId);
    }
}

export class NormalCpu extends Cpu {
    constructor(playerId) {
        super(playerId);

        console.log('ノーマルCPUが呼ばれました。');
    }

    selectByCpu() {

    }
}