import {board, ui, cpu} from './app';

/**
 * 人間のプレイヤー
 *
 * @author asada
 */
export default class HumanPlayer {
    constructor() {
        this.playerId = 1;
    }

    getPlayerId() {
        return this.playerId;
    }

    /**
     * ユーザーが選択した場合に呼び出される関数
     *
     * @param boardId 押したボタンのID
     */
    selectByUser(boardId) {
        if (board.endFlag) {
            return;
        }
        if (board.isAlreadyPut(boardId)) {
            ui.printIsAlreadyPutMessage();
            return;
        }
        board.put(boardId, this.playerId);
        board.checkGameEnd(this.playerId);

        //CPUに決めさせる。
        if (board.endFlag) {
            return;
        }
        cpu.selectByCpu();
        board.checkGameEnd(cpu.playerId);

        //表示する
        ui.printBoard();
    }
}