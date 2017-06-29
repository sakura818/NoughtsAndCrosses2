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
    printResultMessage: function (result) {
        if (result === undefined) {
            window.alert('引き分けです。');
        } else {
            window.alert(`${PlayerChar[result]}の勝ちです。`)
        }
    },
    /**
     * プレイヤーに置けないことを説明する。
     */
    printIsAlreadyPutMessage: function () {
        window.alert('そこはすでに埋まっています。');
    }
};