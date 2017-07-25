import { OXGame } from "./oxGame.js";
import { SquareBoard } from "./board.js";
import { HumanPlayer } from "./humanPlayer.js";
import { EasyCpu } from "./cpu.js";

OXGame3by3HumanVsCpu(); // 関数呼び出し

/**
 * マルバツゲーム 3*3マス
 * 先行:Human
 * 後攻:Cpu
 */
function OXGame3by3HumanVsCpu() { // 関数定義 引数なし 関数名はOXGame3by3HumanVsCpu
    const board = new SquareBoard(3); // board.jsのSquareBoardをよびだしかつ引数に3を与える
    const players = [new HumanPlayer(1), new EasyCpu(2)]; // humanPlayer.jsのHumanPlayerをよびだしかつ引数に1を与える EasyCpuもほぼ同じこと　分割代入
    return new OXGame(board, players);
}

// constに関して　https://www.ibm.com/developerworks/jp/web/library/wa-ecmascript6-neward-p1/

/**
 * マルバツゲーム 3*3マス
 * 先行:Cpu
 * 後攻:Human
 */
function OXGame3by3CpuVsHuman() {
    const board = new SquareBoard(3);
    const players = [new EasyCpu(1), new HumanPlayer(2)];
    return new OXGame(board, players);
}