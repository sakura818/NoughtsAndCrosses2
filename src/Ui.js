import { Result } from './board.js';

//ボードの駒とIDの連想配列。
//画像を使用する場合も考えて、freezeの中止     _ _
export const PlayerChar = ['_', '○', '×', '△', '□'];

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
     * TODO Resultをオブジェクトにして、WINとDRAWにしたい。
     */
    printResultMessage: function (result, playerId) {
        switch (result) {
            case Result.END:
                window.alert(`${PlayerChar[playerId]}の勝ちです。`)
                break;

            case Result.DRAW:
                window.alert('引き分けです。');
                break;

            default:
                throw new Error('printResultMessageの引数が予期されないものでした。');
        }
    },
    /**
     * プレイヤーに置けないことを説明する。
     */
    printIsAlreadyPutMessage: function () {
        window.alert('そこはすでに埋まっています。');
    }
};