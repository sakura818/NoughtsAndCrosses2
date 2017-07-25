import { GameState } from "./oxGame.js";

const GAME_BOARD_SQUARE_DEFAULT_VALUE = 0;

/**
 * ボードの抽象クラス
 *
 * @author asada
 */
class Board {
    constructor(verticalLength, horizontalLength, terminationCondition) { // constructor定義
        this.verticalLength = verticalLength;
        this.horizontalLength = horizontalLength;
        this.terminationCondition = terminationCondition;

        this.init(); // 関数initをよびだす
    }

    /**
     * ボード上で選択した場所が埋まっている確認する
     *
     * @return {boolean} 埋まっている場合はtrue、埋まっていない場合はfalse
     */
    isAlreadyPut(x, y) {
        return this.gameBoardArray[x][y] !== GAME_BOARD_SQUARE_DEFAULT_VALUE; // boardのますが0じゃなかったら既に誰かが駒を置いている
    }

    put(x, y, playerID) {
        this.gameBoardArray[x][y] = playerID; // 誰が置いたのかを判断するためにplayerIDを駒を置いたx,y座標に代入する
        this.times++; // 駒をおいた回数を+1する
    }

    /**
     * ボードを初期化する
     */
    init() {
        this.gameBoardArray = new Array(this.verticalLength); // 配列を作る http://blog.codebook-10000.com/entry/20130724/1374673350
        for (let i = 0; i < this.verticalLength; i++) {
            this.gameBoardArray[i] = new Array(this.horizontalLength).fill(GAME_BOARD_SQUARE_DEFAULT_VALUE); // boardの2次元座標を2重for文のようなもの(ここではfillという少し便利だが難しいものを使用している)で定義　すべてのますに初期値として0を代入している  http://qiita.com/butchi_y/items/db3078dced4592872a9c
        }

        //プレイヤーが駒を置いた回数。
        this.times = 0;
    }

    _checkHorizontal(playerId) { // 横の列で勝利条件判定
        for (let x = 0; x < this.verticalLength; x++) {
            let score = 0;
            for (let y = 0; y < this.horizontalLength; y++) {
                if (this.gameBoardArray[x][y] !== playerId) {
                    score = 0;
                    continue;
                }
                score++;
                if (score === this.terminationCondition) {
                    return GameState.END; // ゲーム終了
                }
            }
        }
        return GameState.NOT_END;
    }

    _checkVertical(playerId) { // 縦の列で勝利条件判定
        for (let y = 0; y < this.verticalLength; y++) {
            let score = 0;
            for (let x = 0; x < this.horizontalLength; x++) {
                if (this.gameBoardArray[x][y] !== playerId) {
                    score = 0;
                    continue;
                }
                score++;
                if (score === this.terminationCondition) {
                    return GameState.END; // ゲーム終了
                }
            }
        }
        return GameState.NOT_END; // ゲーム続行
    }

    _checkDraw() {　// ひきわけの判定
        for (let x = 0; x < this.gameBoardArray.length; x++) {
            for (let y = 0; y < this.gameBoardArray[x].length; y++) {
                if (this.gameBoardArray[x][y] === GAME_BOARD_SQUARE_DEFAULT_VALUE) {
                    return GameState.NOT_END; // ゲーム続行
                }
            }
        }
        return GameState.DRAW; // ひきわけと判定
    }
}

/**
 * 正方形のボードで一辺の長さをoneSideLengthとする。
 *
 * @author asada
 */
export class SquareBoard extends Board { // Boardを継承　
    constructor(oneSideLength) {
        super(oneSideLength, oneSideLength, oneSideLength); //superはスーパークラスのメソッドを呼び出す
        this.oneSideLength = oneSideLength;
    }

    /**
     * ゲームの終了条件を満たしたか確認する
     *
     * @param playerId 最後にプレイしたプレイヤーのIDを渡す
     */
    checkGameEnd(playerId) {
        if (this._checkHorizontal(playerId) === GameState.END) {
            return GameState.END; // ゲーム終了
        }
        if (this._checkVertical(playerId) === GameState.END) {
            return GameState.END; // ゲーム終了
        }
        if (this._checkUpperLeftToLowerRight(playerId) === GameState.END) {
            return GameState.END; // ゲーム終了
        }
        if (this._checkUpperRightToLowerLeft(playerId) === GameState.END) {
            return GameState.END; // ゲーム終了
        }
        return this._checkDraw();
    }

    _checkUpperLeftToLowerRight(playerId) { // 右斜したのななめのラインで勝利条件判定
        for (let i = 0; i < this.oneSideLength; i++) {
            if (this.gameBoardArray[i][i] !== playerId) {
                break;
            }
            if (i === this.terminationCondition - 1) {
                return GameState.END; // ゲーム終了
            }
        }
        return GameState.NOT_END; // ゲーム続行
    }

    _checkUpperRightToLowerLeft(playerId) { // 右斜上のななめのラインで勝利条件判定
        for (let i = 0; i < this.oneSideLength; i++) {
            if (this.gameBoardArray[i][this.oneSideLength - 1 - i] !== playerId) {
                break;
            }
            if (i === this.terminationCondition - 1) {
                return GameState.END; // ゲーム終了
            }
        }
        return GameState.NOT_END; // ゲーム続行
    }
}
