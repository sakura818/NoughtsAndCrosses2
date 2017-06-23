/**
 * Boardに関するものを集める
 *
 * @author asada
 */

/**
 * HTML上のボードを初期化する関数
 */
function init() {
    for (let i = 0; i < 3; i++) {
        for (let k = 0; k < 3; k++) {
            put(`${i + 1}${k + 1}`, DEFAULT);
        }
    }
}

/**
 * ゲームの終了条件を満たした確認する関数
 *
 * @param gameBoardArray
 */
function checkGameEnd(gameBoardArray) {
    (function checkHorizontal() {
        for (let x = 0; x < gameBoardArray.length; x++) {
            if (gameBoardArray[x][0] === NOUGHTS && gameBoardArray[x][1] === NOUGHTS && gameBoardArray[x][2] === NOUGHTS) {
                setResult(WIN);
                endFlag = true;
            }
            if (gameBoardArray[x][0] === CROSSES && gameBoardArray[x][1] === CROSSES && gameBoardArray[x][2] === CROSSES) {
                setResult(LOSE);
                endFlag = true;
            }
        }
    })();

    (function checkVertical() {
        for (let y = 0; y < gameBoardArray.length; y++) {
            if (gameBoardArray[0][y] === NOUGHTS && gameBoardArray[1][y] === NOUGHTS && gameBoardArray[2][y] === NOUGHTS) {
                setResult(WIN);
                endFlag = true;
            }
            if (gameBoardArray[0][y] === CROSSES && gameBoardArray[1][y] === CROSSES && gameBoardArray[2][y] === CROSSES) {
                setResult(LOSE);
                endFlag = true;
            }
        }
    })();

    (function checkUpperLeftToLowerRight() {
        if (gameBoardArray[0][0] === NOUGHTS && gameBoardArray[1][1] === NOUGHTS && gameBoardArray[2][2] === NOUGHTS) {
            setResult(WIN);
            endFlag = true;
        }
        if (gameBoardArray[0][0] === CROSSES && gameBoardArray[1][1] === CROSSES && gameBoardArray[2][2] === CROSSES) {
            setResult(LOSE);
            endFlag = true;
        }
    })();

    (function checkUpperRightToLowerLeft() {
        if (gameBoardArray[0][2] === NOUGHTS && gameBoardArray[1][1] === NOUGHTS && gameBoardArray[2][0] === NOUGHTS) {
            setResult(WIN);
            endFlag = true;
        }
        if (gameBoardArray[0][2] === CROSSES && gameBoardArray[1][1] === CROSSES && gameBoardArray[2][0] === CROSSES) {
            setResult(LOSE);
            endFlag = true;
        }
    })();

    if (endFlag) {
        return;
    }

    const checkDraw = function () {
        for (let x = 0; x < gameBoardArray.length; x++) {
            for (let y = 0; y < gameBoardArray[x].length; y++) {
                if (gameBoardArray[x][y] === DEFAULT) {
                    return;
                }
            }
        }
        endFlag = true;
        setResult(DRAW);
    };
    checkDraw();
}

/**
 * ボード上で選択した場所が埋まっている確認する
 */
function isAlreadyPut(id) {
    return getGameBoardById(id) !== DEFAULT;
}