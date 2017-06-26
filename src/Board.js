/**
 * Boardに関するものを集める
 *
 * @author asada
 */
export class Board {
    constructor() {
        
    }

    /**
     * HTML上のボードを初期化する関数
     */
    init() {
        for (let i = 1; i < 4; i++) {
            for (let k = 1; k < 4; k++) {
                put(`${i}${k}`, DEFAULT);
            }
        }
    }

    /**
     * ゲームの終了条件を満たした確認する関数
     *
     * @param gameBoardArray
     */
    checkGameEnd(gameBoardArray) {
        (function checkHorizontal() {
            for (let val of gameBoardArray) {
                if (val[0] === NOUGHTS && val[1] === NOUGHTS && val[2] === NOUGHTS) {
                    printResult(WIN);
                    endFlag = true;
                }
                if (val[0] === CROSSES && val[1] === CROSSES && val[2] === CROSSES) {
                    printResult(LOSE);
                    endFlag = true;
                }
            }
        })();

        if (endFlag) {
            return;
        }

        (function checkVertical() {
            for (let y = 0; y < gameBoardArray.length; y++) {
                if (gameBoardArray[0][y] === NOUGHTS && gameBoardArray[1][y] === NOUGHTS && gameBoardArray[2][y] === NOUGHTS) {
                    printResult(WIN);
                    endFlag = true;
                }
                if (gameBoardArray[0][y] === CROSSES && gameBoardArray[1][y] === CROSSES && gameBoardArray[2][y] === CROSSES) {
                    printResult(LOSE);
                    endFlag = true;
                }
            }
        })();

        if (endFlag) {
            return;
        }

        (function checkUpperLeftToLowerRight() {
            if (gameBoardArray[0][0] === NOUGHTS && gameBoardArray[1][1] === NOUGHTS && gameBoardArray[2][2] === NOUGHTS) {
                printResult(WIN);
                endFlag = true;
            }
            if (gameBoardArray[0][0] === CROSSES && gameBoardArray[1][1] === CROSSES && gameBoardArray[2][2] === CROSSES) {
                printResult(LOSE);
                endFlag = true;
            }
        })();

        if (endFlag) {
            return;
        }

        (function checkUpperRightToLowerLeft() {
            if (gameBoardArray[0][2] === NOUGHTS && gameBoardArray[1][1] === NOUGHTS && gameBoardArray[2][0] === NOUGHTS) {
                printResult(WIN);
                endFlag = true;
            }
            if (gameBoardArray[0][2] === CROSSES && gameBoardArray[1][1] === CROSSES && gameBoardArray[2][0] === CROSSES) {
                printResult(LOSE);
                endFlag = true;
            }
        })();

        if (endFlag) {
            return;
        }

        const checkDraw = () => {
            for (let x = 0; x < gameBoardArray.length; x++) {
                for (let y = 0; y < gameBoardArray[x].length; y++) {
                    if (gameBoardArray[x][y] === DEFAULT) {
                        return;
                    }
                }
            }
            endFlag = true;
            printResult(DRAW);
        };
        checkDraw();
    }

    /**
     * ボード上で選択した場所が埋まっている確認する
     */
    isAlreadyPut(id) {
        return getGameBoardById(id) !== DEFAULT
    }
}