/**
 * TODO Boardに関するものを集める
 */

function init() {
    for (let i = 0; i < 3; i++) {
        for (let k = 0; k < 3; k++) {
            changeButtonState(`${i + 1}${k + 1}`, DEFAULT);
        }
    }
}

function checkGameEnd(gameBoardArray) {
    checkHorizontal(gameBoardArray);
    checkVertical(gameBoardArray);
    checkUpperLeftToLowerRight(gameBoardArray);
    checkUpperRightToLowerLeft(gameBoardArray);

    checkDraw(gameBoardArray);
}

function checkHorizontal(gameBoardArray) {
    for (let x = 0; x < 3; x++) {
        if (gameBoardArray[x][0] === NOUGHTS && gameBoardArray[x][1] === NOUGHTS && gameBoardArray[x][2] === NOUGHTS) {
            setResult('WIN');
            endFlag = true;
        }
        if (gameBoardArray[x][0] === CROSSES && gameBoardArray[x][1] === CROSSES && gameBoardArray[x][2] === CROSSES) {
            setResult('LOSE');
            endFlag = true;
        }
    }
}

function checkVertical(gameBoardArray) {
    for (let y = 0; y < 3; y++) {
        if (gameBoardArray[0][y] === NOUGHTS && gameBoardArray[1][y] === NOUGHTS && gameBoardArray[2][y] === NOUGHTS) {
            setResult('WIN');
            endFlag = true;
        }
        if (gameBoardArray[0][y] === CROSSES && gameBoardArray[1][y] === CROSSES && gameBoardArray[2][y] === CROSSES) {
            setResult('LOSE');
            endFlag = true;
        }
    }
}

function checkUpperLeftToLowerRight(gameBoardArray) {
    if (gameBoardArray[0][0] === NOUGHTS && gameBoardArray[1][1] === NOUGHTS && gameBoardArray[2][2] === NOUGHTS) {
        setResult('WIN');
        endFlag = true;
    }
    if (gameBoardArray[0][0] === CROSSES && gameBoardArray[1][1] === CROSSES && gameBoardArray[2][2] === CROSSES) {
        setResult('LOSE');
        endFlag = true;
    }
}

function checkUpperRightToLowerLeft(gameBoardArray) {
    if (gameBoardArray[0][2] === NOUGHTS && gameBoardArray[1][1] === NOUGHTS && gameBoardArray[2][0] === NOUGHTS) {
        setResult('WIN');
        endFlag = true;
    }
    if (gameBoardArray[0][2] === CROSSES && gameBoardArray[1][1] === CROSSES && gameBoardArray[2][0] === CROSSES) {
        setResult('LOSE');
        endFlag = true;
    }
}

function checkDraw(gameBoardArray) {
    for (let x = 0; x < gameBoardArray.length; x++) {
        for (let y = 0; y < gameBoardArray[x].length; y++) {
            if (gameBoardArray[x][y] === DEFAULT) {
                return;
            }
        }
    }
    endFlag = true;
    setResult('DRAW');
}

/**
 * ボード上で選択した場所が埋まっている確認する
 */
function isAlreadyPut(id) {
    return getGameBoardById(id) !== DEFAULT;
}