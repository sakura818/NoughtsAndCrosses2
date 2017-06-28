//ボードの駒とIDの連想配列。
export const PlayerChar = Object.freeze(['_', '○', '×']);

export const Ui = {
    /**
     * 現在のボードの状況を表示する。
     */
    printBoard: function (board) {
        for (let i = 0; i < board.oneSideLength * board.oneSideLength; i++) {
            document.getElementById(`${i}`).innerHTML = PlayerChar[board.gameBoardArray[Math.floor(i / board.oneSideLength)][i % board.oneSideLength]];
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