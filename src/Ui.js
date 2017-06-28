//ボードの駒とIDの連想配列。
//画像を使用する場合も考えて、freezeの中止
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
     */
    printResultMessage: function (board, result) {
        this.printBoard(board);
        window.alert(result);
    },
    /**
     * プレイヤーに置けないことを説明する。
     */
    printIsAlreadyPutMessage: function () {
        window.alert('そこはすでに埋まっています。');
    }
};