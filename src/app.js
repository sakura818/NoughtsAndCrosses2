import { SquareBoard } from './board.js';
import Ui from './ui.js';
import HumanPlayer from './humanPlayer.js';
import { EasyCpu } from './cpu';

export let game = new Game3by3HumanVsCpu();

/**
 * 各クラスをインスタンス化する
 *
 * @author asada
 */
class Game3by3HumanVsCpu {
    constructor() {
        this.board = new SquareBoard(3, 3);
        this.ui = new Ui();
        this.humanPlayer = new HumanPlayer(1);
        this.cpu = new EasyCpu(2);
    }
}
