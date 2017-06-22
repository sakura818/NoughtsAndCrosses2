/**
 * TODO UIに関するものを集める
 *
 * @author asada
 */

/**
 * 試合結果を表示する関数
 *
 * @param result
 */
function setResult(result) {
    let message;
    if (result === 'WIN') {
        message = 'あなたの勝ちです';

    } else if (result === 'LOSE') {
        message = 'あなたの負けです';

    } else if (result === 'DRAW') {
        message = '引き分けです';
        
    } else {
        message = '';
    }
    document.getElementById('result').innerHTML = message;
}

/**
 * ボードの状態を変える関数
 *
 * @param id 変えたいID
 * @param state どう変えたいかを渡す
 */
function changeButtonState(id, state) {
    document.getElementById(id).innerHTML = state;
}

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

function getGameBoardById(id) {
    return document.getElementById(id).innerHTML;
}