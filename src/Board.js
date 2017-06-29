const GAME_BOARD_SQUARE_DEFAULT_VALUE = 0;

export const Result = Object.freeze({ END: 'End', NOT_END: 'Not End', DRAW: 'Draw' });

/**
 * ボードの抽象クラス
 * TODO 
 *
 * @author asada
 */
class Board {
    constructor(verticalLength, horizontalLength, terminationCondition) {
        this.verticalLength = verticalLength;
        this.horizontalLength = horizontalLength;
        this.terminationCondition = terminationCondition;

        this.init();
    }

    /**
     * ボード上で選択した場所が埋まっている確認する
     *
     * @return {boolean} 埋まっている場合はtrue、埋まっていない場合はfalse
     */
    isAlreadyPut(x, y) {
        return this.gameBoardArray[x][y] !== GAME_BOARD_SQUARE_DEFAULT_VALUE;
    }

    put(x, y, playerID) {
        this.gameBoardArray[x][y] = playerID;
        this.times++;
    }

    /**
     * ボードを初期化する
     */
    init() {
        this.gameBoardArray = new Array(this.verticalLength);
        for (let i = 0; i < this.verticalLength; i++) {
            this.gameBoardArray[i] = new Array(this.horizontalLength).fill(GAME_BOARD_SQUARE_DEFAULT_VALUE);
        }

        //プレイヤーが駒を置いた回数。
        this.times = 0;
    }

    _checkHorizontal(playerId) {
        for (let x = 0; x < this.verticalLength; x++) {
            let score = 0;
            for (let y = 0; y < this.horizontalLength; y++) {
                if (this.gameBoardArray[x][y] !== playerId) {
                    score = 0;
                    continue;
                }
                score++;
                if (score === this.terminationCondition) {
                    return Result.END;
                }
            }
        }
        return Result.NOT_END;
    }

    _checkVertical(playerId) {
        for (let y = 0; y < this.verticalLength; y++) {
            let score = 0;
            for (let x = 0; x < this.horizontalLength; x++) {
                if (this.gameBoardArray[x][y] !== playerId) {
                    score = 0;
                    continue;
                }
                score++;
                if (score === this.terminationCondition) {
                    return Result.END;
                }
            }
        }
        return Result.NOT_END;
    }

    _checkDraw() {
        for (let x = 0; x < this.gameBoardArray.length; x++) {
            for (let y = 0; y < this.gameBoardArray[x].length; y++) {
                if (this.gameBoardArray[x][y] === GAME_BOARD_SQUARE_DEFAULT_VALUE) {
                    return Result.NOT_END;
                }
            }
        }
        return Result.DRAW;
    }
}

/**
 * 正方形のボードで、一辺の長さ = 終了条件のクラス
 *
 * @author asada
 */
export class SquareBoard extends Board {
    constructor(oneSideLength) {
        super(oneSideLength, oneSideLength, oneSideLength);
        this.oneSideLength = oneSideLength;
    }

    /**
     * ゲームの終了条件を満たしたか確認する
     *
     * @param playerId 最後にプレイしたプレイヤーのIDを渡す
     */
    checkGameEnd(playerId) {
        if (this._checkHorizontal() === Result.END) {
            return Result.END;
        }
        if (this._checkVertical() === Result.END) {
            return Result.END;
        }
        if (this._checkUpperLeftToLowerRight() === Result.END) {
            return Result.END;
        }
        if (this._checkUpperRightToLowerLeft() === Result.END) {
            return Result.END;
        }
        return this._checkDraw();
    }

    _checkUpperLeftToLowerRight(playerId) {
        for (let i = 0; i < this.oneSideLength; i++) {
            if (this.gameBoardArray[i][i] !== playerId) {
                break;
            }
            if (i === this.terminationCondition - 1) {
                return Result.END;
            }
        }
        return Result.NOT_END;
    }

    _checkUpperRightToLowerLeft(playerId) {
        for (let i = 0; i < this.oneSideLength; i++) {
            if (this.gameBoardArray[i][this.oneSideLength - 1 - i] !== playerId) {
                break;
            }
            if (i === this.terminationCondition - 1) {
                return Result.END;
            }
        }
        return Result.NOT_END;
    }
}
