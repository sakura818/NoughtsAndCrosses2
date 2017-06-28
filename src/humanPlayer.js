import {gameMatch} from './app.js';

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
    selectByUser(board, ui, x, y) {
        if (board.endFlag) {
            return;
        }

        if (board.isAlreadyPut(x, y)) {
            ui.printIsAlreadyPutMessage();
            return;
        }

        board.put(x, y, this.playerId);

        gameMatch.judge();
    }
}