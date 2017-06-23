/**
 * index.htmlのボタンの処理をまとめる
 *
 * @author asada
 */

//TODO use strictすると死ぬ
const NOUGHTS = '○';
const CROSSES = '×';
const DEFAULT = '_';
let endFlag = false;

/**
 * ユーザーが選択した場合に呼び出される関数
 * TODO 先行、後攻が変わると困る。
 *
 * @param id 押したボタンのID
 */
const selectByUser = id => {
    if (endFlag === true) {
        return;
    }

    if (!isAlreadyPut(id)) {
        put(id, NOUGHTS);
        printError(NO_ERROR);

    } else {
        printError(ALREADY_PUT);
        return;
    }
    checkGameEnd(getGameBoard());

    if (endFlag === true) {
        return;
    }

    selectByCpu(getGameBoard());
    checkGameEnd(getGameBoard());
};

/**
 * ユーザーがリセットボタンを押した場合に呼び出される関数
 */
const reset = () => {
    init();
    setResult(NOT_FINISH);
    endFlag = false;
};
