import { game } from './app.js';
import Result from './result.js';

/**
 * BoardのgameBoardArrayの初期値
 */
export const GAME_BOARD_DEFAULT_VALUE = 0;

/**
 * Boardクラス
 *
 * @author asada
 */
export class SquareBoard {
    constructor(oneSideLength, terminationCondition) {
        this.oneSideLength = oneSideLength;
        this.terminationCondition = terminationCondition;
        this.endFlag = false;

        this.init();
    }

    getOneSideLength() {
        return this.oneSideLength;
    }

    /**
     * ボードを初期化する
     */
    init() {
        this.gameBoardArray = new Array(this.oneSideLength);
        for (let i = 0; i < this.oneSideLength; i++) {
            this.gameBoardArray[i] = new Array(this.oneSideLength).fill(GAME_BOARD_DEFAULT_VALUE);
        }

        this.endFlag = false;
    }

    /**
     * ボード上で選択した場所が埋まっている確認する
     * 
     * @return {boolean} 埋まっている場合はtrue、埋まっていない場合はfalse
     */
    isAlreadyPut(x, y) {
        return this.gameBoardArray[x][y] !== GAME_BOARD_DEFAULT_VALUE;
    }

    put(x, y, playerID) {
        this.gameBoardArray[x][y] = playerID;
    }

    /**
     * ゲームの終了条件を満たしたか確認する
     * 
     * @param playerId 最後にプレイしたプレイヤーのIDを渡す
     */
    checkGameEnd(playerId) {
        if (this._checkHorizontal(playerId) || this._checkVertical(playerId) || this._checkUpperLeftToLowerRight(playerId) || this._checkUpperRightToLowerLeft(playerId)) {
            this.endFlag = true;
        }

        if (this.endFlag) {
            if (playerId === 1) {
                game.ui.printResultMessage(Result.WIN);

            } else if (playerId === 2) {
                game.ui.printResultMessage(Result.LOSE);
            }
            return;
        }

        if (this._checkDraw()) {
            this.endFlag = true;
            game.ui.printResultMessage(Result.DRAW);
        }
    }

    _checkHorizontal(playerId) {
        for (let x = 0; x < this.oneSideLength; x++) {
            let score = 0;
            for (let y = 0; y < this.oneSideLength; y++) {
                if (this.gameBoardArray[x][y] !== playerId) {
                    score = 0;
                    continue;
                }
                score++;
                if (score === this.terminationCondition) {
                    return true;
                }
            }
        }
        return false;
    }

    _checkVertical(playerId) {
        for (let y = 0; y < this.oneSideLength; y++) {
            let score = 0;
            for (let x = 0; x < this.oneSideLength; x++) {
                if (this.gameBoardArray[x][y] !== playerId) {
                    score = 0;
                    continue;
                }
                score++;
                if (score === this.terminationCondition) {
                    return true;
                }
            }
        }
        return false;
    }

    _checkUpperLeftToLowerRight(playerId) {
        for (let i = 0; i < this.oneSideLength; i++) {
            if (this.gameBoardArray[i][i] !== playerId) {
                break;
            }
            if (i === this.terminationCondition - 1) {
                return true;
            }
        }
        return false;
    }

    _checkUpperRightToLowerLeft(playerId) {
        for (let i = 0; i < this.oneSideLength; i++) {
            if (this.gameBoardArray[i][this.oneSideLength - 1 - i] !== playerId) {
                break;
            }
            if (i === this.terminationCondition - 1) {
                return true;
            }
        }
        return false;
    }

    _checkDraw() {
        for (let x = 0; x < this.gameBoardArray.length; x++) {
            for (let y = 0; y < this.gameBoardArray[x].length; y++) {
                if (this.gameBoardArray[x][y] === GAME_BOARD_DEFAULT_VALUE) {
                    return false;
                }
            }
        }
        return true;
    }
}
