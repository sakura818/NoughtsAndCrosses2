const State = Object.freeze({ 0: '_', 1: '○', 2: '×' });

export default Ui = {
    /**
     * 現在のボードの状況を表示する。
     */
    printBoard: function (board) {
        for (let i = 0; i < board.oneSideLength * board.oneSideLength; i++) {
            document.getElementById(`${i}`).innerHTML = State[board.gameBoardArray[Math.floor(i / board.oneSideLength)][i % board.oneSideLength]];
        }
    },
    /**
     * 結果を表示する。
     */
    printResultMessage(board, result) {
        this.printBoard(board);
        window.alert(result);
    },
    printIsAlreadyPutMessage() {
        window.alert('そこはすでに埋まっています。');
    }
}