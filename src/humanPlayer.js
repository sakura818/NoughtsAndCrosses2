import { game } from './app.js';

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
        if (game.board.endFlag) {
            return;
        }

        if (game.board.isAlreadyPut(x, y)) {
            game.ui.printIsAlreadyPutMessage();
            return;
        }
        game.board.put(x, y, this.playerId);
        game.board.checkGameEnd(this.playerId);

        if (game.board.endFlag) {
            return;
        }
        try {
            cpu.selectByCpu();
        } catch (e) {
            console.log(e);
            window.alert('選択されたCPUは未実装です。');
        }
        game.board.checkGameEnd(cpu.playerId);

        game.ui.printBoard();
    }
}