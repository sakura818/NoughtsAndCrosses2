import Board from './Board';
import Ui from './Ui';
import HumanPlayer from './HumanPlayer';
import Cpu from './Cpu';

/**
 * index.htmlのボタンの処理をまとめる
 *
 * @author asada
 */
export const RESULT = Object.freeze({DRAW: 0, WIN: 1, LOSE: 2});

export let board;
export let ui;
export let humanPlayer;
export let cpu;

/**
 * 初回に一度だけ、呼び出される。
 * Board
 * Ui
 * HumanPlayer
 * Cpu
 * のオブジェクトを作成する。
 */
window.addEventListener("load", function (eve) {
    board = new Board(3, 3);
    ui = new Ui();
    humanPlayer = new HumanPlayer();
    cpu = new Cpu();
}, false);