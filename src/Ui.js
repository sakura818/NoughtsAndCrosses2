//ボードの駒とIDの連想配列。
//画像を使用する場合も考えて、freezeの中止     _ _
export const PlayerChar = ['_', '○', '×', '△', '□'];

export const Ui = {
    /**
     * 現在のボードの状況を表示する。
     */
    printBoard: function (board) {
        for (let i = 0; i < board.verticalLength * board.horizontalLength; i++) {
            let oneSquare = board.gameBoardArray[Math.floor(i / board.verticalLength)][i % board.verticalLength];
            document.getElementById(`${i}`).innerHTML = PlayerChar[oneSquare];
        }
    },
    /**
     * 結果を表示する。
     * 引数に数字が渡された場合は
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