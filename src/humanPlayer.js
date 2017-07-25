/**
 * 人間のプレイヤー
 *
 * @author asada
 */
export default class HumanPlayer { // exportは外部クラスで使用するため　defaultは値を1つだけ返すことを意味する
    constructor(playerId) {
        this.playerId = playerId;
    }

    /**
     * ユーザーが選択した場合に呼び出される関数
     */
    select(board, Ui, x, y) {
        if (board.isAlreadyPut(x, y)) {
            Ui.printIsAlreadyPutMessage(); // もし選択したマスに既にコマが置かれていたらそのような旨のアラートをだす
            return;
        }
        board.put(x, y, this.playerId);
    }
}