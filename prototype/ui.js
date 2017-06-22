/**
 * UIに関するものを集める
 *
 * @author asada
 */

/**
 * 試合結果を表示する関数
 *
 * @param result
 */
const WIN = 'あなたの勝ちです';
const LOSE = 'あなたの負けです';
const DRAW = '引き分けです';
const NOT_FINISH = '';

function setResult(result) {
    document.getElementById('result').innerHTML = result;
}

/**
 * ボードの状態を変える関数
 *
 * @param boardId 変えたいボードのID
 * @param state どう変えたいかを渡す
 */
function changeButtonState(boardId, state) {
    document.getElementById(boardId).innerHTML = state;
}

/**
 * HTML上のボードの状態を取得する
 *
 * @returns {Array}
 */
function getGameBoard() {
    let gameBoard = new Array(3);
    for (let x = 0; x < 3; x++) {
        gameBoard[x] = new Array(3);
        for (let y = 0; y < 3; y++) {
            gameBoard[x][y] = document.getElementById(`${x + 1}${y + 1}`).innerHTML;
        }
    }
    return gameBoard;
}

/**
 * HTML上のボードの状態を取得する
 *
 * @param boardId 取得したいボードのID
 * @returns {string}
 */
function getGameBoardById(boardId) {
    return document.getElementById(boardId).innerHTML;
}