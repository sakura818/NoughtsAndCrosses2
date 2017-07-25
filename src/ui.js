import { GameState } from "./oxGame.js";

//ボードの駒とIDの連想配列。
export const PlayerChar = ["_", "○", "×", "△", "□"]; // constは定数宣言　letは変数宣言(定数のときはconstを使用)

/**
 * Uiオブジェクト
 * 
 * @author asada
 */
export const Ui = {
    /**
     * 現在のボードの状況を表示する。
     */
    printBoard: function (board) {
        for (let x = 0; x < board.verticalLength; x++) {
            for (let y = 0; y < board.horizontalLength; y++) {
                let oneSquare = board.gameBoardArray[x][y];
                document.getElementById(`${(x * board.horizontalLength) + y}`).innerHTML = PlayerChar[oneSquare];
            }
        }
    },
    /**
     * 結果を表示する。
     */
    printResultMessage: function (result, playerId) {
        switch (result) {
            case GameState.END:
                window.alert(`${PlayerChar[playerId]}の勝ちです。`) // バックティック文字列リテラル　変数と文字列の結合を便利にしたもの　ES6から取り入れられた window.alertはその名の通りアラートを出す
                break;

            case GameState.DRAW:
                window.alert("引き分けです。");
                break;

            default:
                throw new Error("printResultMessageの引数が予期されないものでした。");
        }
    },
    /**
     * プレイヤーに置けないことを説明する。
     */
    printIsAlreadyPutMessage: function () {
        window.alert("そこはすでに埋まっています。");
    }
};