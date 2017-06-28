import { SquareBoard } from './board.js';
import Ui from './ui.js';
import HumanPlayer from './humanPlayer.js';
import { EasyCpu } from './cpu.js';

/**
 * 各クラスをインスタンス化する
 *
 * @author asada
 */
class Game3by3HumanVsCpu {
    constructor() {
        this.ui = new Ui();
        this.board = new SquareBoard(this.ui, 3, 3);
        this.humanPlayer = new HumanPlayer(1);
        this.cpu = new EasyCpu(2);
    }
    judge() {
        this.board.checkGameEnd(this.playerId);

        if (this.board.endFlag) {
            return;
        }
        try {
            cpu.selectByCpu();
        } catch (e) {
            console.log(e);
            window.alert('選択されたCPUは未実装です。');
        }
        this.board.checkGameEnd(cpu.playerId);

        this.ui.printBoard();
    }
}

let gameMatch = new Game3by3HumanVsCpu(board, ui, humanPlayer, cpu);
