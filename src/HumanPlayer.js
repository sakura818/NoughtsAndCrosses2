import {endFlag} from 'index';
/**
 * Created by yusuke-pc on 2017/06/26.
 */
export default class HumanPlayer {
    /**
     * ユーザーが選択した場合に呼び出される関数
     *
     * @param id 押したボタンのID
     */
    selectByUser(id) {
        if (endFlag) {
            return;
        }

        if (!board.isAlreadyPut(id)) {
            put(id, NOUGHTS);
            printError(NO_ERROR);

        } else {
            printError(ALREADY_PUT);
            return;
        }
        checkGameEnd(getGameBoard());

        if (endFlag) {
            return;
        }

        selectByCpu(getGameBoard());
        checkGameEnd(getGameBoard());
    }
}