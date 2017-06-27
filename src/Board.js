import {ui, Result} from './app';

/**
 * Boardクラス
 *
 * @author asada
 */
export default class Board {
    constructor(oneSideLength = 3, terminationCondition = 3) {
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
     * HTML上のボードを初期化する関数
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
     */
    isAlreadyPut(choice) {
        return this._gameBoardArray[Math.floor(choice / this.oneSideLength)][choice % this.oneSideLength] !== this.DEFAULT;
    }

    put(choice, playerID) {
        this._gameBoardArray[Math.floor(choice / this.oneSideLength)][choice % this.oneSideLength] = playerID;
    }

    /**
     * ゲームの終了条件を満たした確認する関数
     */
    checkGameEnd(playerId) {
        this.checkHorizontal(playerId);
        this.checkVertical(playerId);
        this.checkUpperLeftToLowerRight(playerId);
        this.checkUpperRightToLowerLeft(playerId);

        if (this.endFlag) {
            if (playerId === 1) {
                ui.printResultMessage(Result.WIN);

            } else if (playerId === 2) {
                ui.printResultMessage(Result.LOSE);
            }
            return;
        }
        this.checkDraw();
    }

    checkHorizontal(playerId) {
        for (let x = 0; x < this.oneSideLength; x++) {
            let score = 0;
            for (let y = 0; y < this.oneSideLength; y++) {
                if (this._gameBoardArray[x][y] !== playerId) {
                    score = 0;
                    continue;
                }
                score++;
                //スコアが終了条件と同じになると終了
                if (score === this.terminationCondition) {
                    this.endFlag = true;
                    return;
                }
            }
        }
    }

    checkVertical(playerId) {
        for (let y = 0; y < this.oneSideLength; y++) {
            let score = 0;
            for (let x = 0; x < this.oneSideLength; x++) {
                if (this._gameBoardArray[x][y] !== playerId) {
                    score = 0;
                    continue;
                }
                score++;
                //スコアが終了条件と同じになると終了
                if (score === this.terminationCondition) {
                    this.endFlag = true;
                    return;
                }
            }
        }
    }

    checkUpperLeftToLowerRight(playerId) {
        for (let i = 0; i < this.oneSideLength; i++) {
            if (this._gameBoardArray[i][i] !== playerId) {
                break;
            }
            if (i === this.terminationCondition - 1) {
                this.endFlag = true;
                return;
            }
        }
    }

    checkUpperRightToLowerLeft(playerId) {
        for (let i = 0; i < this.oneSideLength; i++) {
            if (this._gameBoardArray[i][this.oneSideLength - 1 - i] !== playerId) {
                break;
            }
            if (i === this.terminationCondition - 1) {
                this.endFlag = true;
                return;
            }
        }
    }

    checkDraw() {
        for (let x = 0; x < this._gameBoardArray.length; x++) {
            for (let y = 0; y < this._gameBoardArray[x].length; y++) {
                if (this._gameBoardArray[x][y] === this.DEFAULT) {
                    return;
                }
            }
        }
        this.endFlag = true;
        ui.printResultMessage(Result.DRAW);
    }
}
