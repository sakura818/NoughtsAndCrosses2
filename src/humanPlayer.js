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
        if (gameMatch.board.endFlag) {
            return;
        }

        if (gameMatch.board.isAlreadyPut(x, y)) {
            gameMatch.ui.printIsAlreadyPutMessage();
            return;
        }
        gameMatch.board.put(x, y, this.playerId);

        gameMatch.judge();
    }
}