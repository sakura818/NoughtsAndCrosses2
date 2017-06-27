import { board, ui, cpu } from './app';

/**
 * 人間のプレイヤー
 *
 * @author asada
 */

export default class HumanPlayer {
    constructor(playerId) {
        this.playerId = playerId;
    }

    /**
     * ユーザーが選択した場合に呼び出される関数
     */
    selectByUser(x, y) {
        if (board.endFlag) {
            return;
        }

        if (board.isAlreadyPut(x, y)) {
            ui.printIsAlreadyPutMessage();
            return;
        }
        board.put(x, y, this.playerId);
        board.checkGameEnd(this.playerId);

        if (board.endFlag) {
            return;
        }
        try {
            cpu.selectByCpu();
        } catch (e) {
            console.log(e);
            window.alert('選択されたCPUは未実装です。');
        }
        board.checkGameEnd(cpu.playerId);

        ui.printBoard();
    }
}