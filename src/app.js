import Board from './Board';
import Ui from './Ui';
import HumanPlayer from './HumanPlayer';
import {EasyCpu, NormalCpu} from './Cpu';

/**
 * index.htmlのボタンの処理をまとめる
 *
 * @author asada
 */

/**
 * 試合結果の定数オブジェクト
 */
export const RESULT = Object.freeze({DRAW: 0, WIN: 1, LOSE: 2});

/**
 * CPUの強さの定数オブジェクト
 */
export const CPU_LEVEL = Object.freeze({EASY: 'Easy', NORMAL: 'Normal'});

export const board = new Board(3, 3);

export const ui = new Ui();
export const humanPlayer = new HumanPlayer(1);
export let cpu = new EasyCpu(2);

/**
 * CPUの強さを変更する関数
 *
 * @param cpuLevel
 */
export const setCpu = (cpuLevel) => {
    switch (cpuLevel) {
        case CPU_LEVEL.EASY:
            cpu = new EasyCpu(2);
            break;

        case CPU_LEVEL.NORMAL:
            cpu = new NormalCpu(2);
            break;
    }
};