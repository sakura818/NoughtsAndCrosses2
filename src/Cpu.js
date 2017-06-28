/**
 * コンピュータのプレイヤー
 *
 * @author asada
 */
class Cpu {
    constructor(playerId) {
        this.playerId = playerId;
    }

    /**
     * CPUがボードに何を置くか決めるメソッド
     *
     * @throws {Error} CPUを継承してselectByCpuメソッドを実装しない場合にスローする
     */
    selectByCpu(board, ui) {
        throw Error('不正なCPUが呼ばれました。');
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
    }

    selectByCpu(board) {
        let x, y;
        do {
            let random = Math.floor(Math.random() * board.verticalLength * board.horizontalLength);
            x = Math.floor(random / board.verticalLength);
            y = random % board.horizontalLength;
        } while (board.isAlreadyPut(x, y));
        board.put(x, y, this.playerId);
    }
}