import {ui, Result} from './app';

/**
 * Boardクラス
 *
 * @author asada
 */

'use strict';

export class SquareBoard {
    constructor(oneSideLength, terminationCondition) {
        this.oneSideLength = oneSideLength;
        this.terminationCondition = terminationCondition;
        this.DEFAULT = 0;
        this.endFlag = false;

        this.init();
    }

    getOneSideLength() {
        return this.oneSideLength;
    }

    copyGameBoardArray() {
        let copyArray = new Array(this.oneSideLength);
        for (let i = 0; i < this.oneSideLength; i++) {
            copyArray[i] = this._gameBoardArray[i].slice();
        }
        return copyArray;
    }

    /**
     * ボードを初期化する
     */
    init() {
        this._gameBoardArray = new Array(this.oneSideLength);
        for (let i = 0; i < this.oneSideLength; i++) {
            this._gameBoardArray[i] = new Array(this.oneSideLength).fill(this.DEFAULT);
        }

        this.endFlag = false;
    }

    /**
     * ボード上で選択した場所が埋まっている確認する
     * @return {boolean} 埋まっている場合はtrue、埋まっていない場合はfalse
     */
    isAlreadyPut(choice) {
        return this._gameBoardArray[Math.floor(choice / this.oneSideLength)][choice % this.oneSideLength] !== this.DEFAULT;
    }

    put(choice, playerID) {
        this._gameBoardArray[Math.floor(choice / this.oneSideLength)][choice % this.oneSideLength] = playerID;
    }

    /**
     * ゲームの終了条件を満たしたか確認する
     */
    checkGameEnd(playerId) {
        if (this._checkHorizontal(playerId) || this._checkVertical(playerId) || this._checkUpperLeftToLowerRight(playerId) || this._checkUpperRightToLowerLeft(playerId)) {
            this.endFlag = true;
        }

        if (this.endFlag) {
            if (playerId === 1) {
                ui.printResultMessage(Result.WIN);

            } else if (playerId === 2) {
                ui.printResultMessage(Result.LOSE);
            }
            return;
        }

        if (this._checkDraw()) {
            this.endFlag = true;
            ui.printResultMessage(Result.DRAW);
        }
    }

    _checkHorizontal(playerId) {
        for (let x = 0; x < this.oneSideLength; x++) {
            let score = 0;
            for (let y = 0; y < this.oneSideLength; y++) {
                if (this._gameBoardArray[x][y] !== playerId) {
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
                if (this._gameBoardArray[x][y] !== playerId) {
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
            if (this._gameBoardArray[i][i] !== playerId) {
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
            if (this._gameBoardArray[i][this.oneSideLength - 1 - i] !== playerId) {
                break;
            }
            if (i === this.terminationCondition - 1) {
                return true;
            }
        }
        return false;
    }

    _checkDraw() {
        for (let x = 0; x < this._gameBoardArray.length; x++) {
            for (let y = 0; y < this._gameBoardArray[x].length; y++) {
                if (this._gameBoardArray[x][y] === this.DEFAULT) {
                    return false;
                }
            }
        }
        return true;
    }
}
