/**
 * index.htmlのボタンの処理をまとめる
 *
 * @author asada
 */

//TODO グローバル変数、関数になってしまっている(?)
const NOUGHTS = '○';
const CROSSES = '×';
const DEFAULT = '_';
let endFlag = false;

/**
 * ユーザーが選択した場合に呼び出される関数
 *
 * @param id 押したボタンのID
 */
function selectByUser(id) {
    if (endFlag === false) {
        changeButtonState(id, NOUGHTS);

        checkGameEnd(getGameBoard());
    }

    if (endFlag === false) {
        selectByCpu(getGameBoard());

        checkGameEnd(getGameBoard());
    }
}

/**
 * ユーザーがリセットボタンを押した場合に呼び出される関数
 */
function reset() {
    init();
    setResult(NOT_FINISH);
    endFlag = false;
}
