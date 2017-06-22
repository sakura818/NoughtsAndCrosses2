/**
 * TODO index.htmlのボタンの処理をまとめる
 *
 * @author asada
 */
const NOUGHTS = '○';
const CROSSES = '×';
const DEFAULT = '_';
let endFlag = false;

/**
 * ユーザーが選択した場合に呼び出される関数
 *
 * @param id 押したボタンのID
 */
function select(id) {
    if (endFlag === true) {
        return;
    }
    changeButtonState(id, NOUGHTS);

    checkGameEnd(getGameBoard());

    if (endFlag === true) {
        return;
    }
    //ここからCPUの処理を追加する
    selectByRandom(getGameBoard());

    checkGameEnd(getGameBoard());
}

/**
 * ユーザーがリセットボタンを押した場合に呼び出される関数
 */
function reset() {
    init();
    setResult();
    endFlag = false;
}
