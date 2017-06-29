import { OXGame } from './oxGame.js';
import { SquareBoard } from './board.js';
import HumanPlayer from './humanPlayer.js';
import { EasyCpu } from './cpu.js';

OXGame3by3HumanVsCpu();

/**
 * 三目並べ
 * 先行:Human
 * 後攻:Cpu
 */
function OXGame3by3HumanVsCpu() {
    const board = new SquareBoard(3);
    const players = [new HumanPlayer(1), new EasyCpu(2)];
    return new OXGame(board, players);
}

/**
 * 三目並べ
 * 先行:Cpu
 * 後攻:Human
 */
function OXGame3by3CpuVsHuman() {
    const board = new SquareBoard(3);
    const players = [new EasyCpu(1), new HumanPlayer(2)];
    return new OXGame(board, players);
}