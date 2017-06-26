import {Board} from 'prototype/Board';
import {Ui} from 'prototype/Ui';
import HumanPlayer from 'HumanPlayer';
import Cpu from 'prototype/Cpu';

/**
 * index.htmlのボタンの処理をまとめる
 *
 * @author asada
 */
export const NOUGHTS = '○';
export const CROSSES = '×';
export const DEFAULT = '_';
export let endFlag = false;

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
window.onloard = function () {
    board = new Board();
    ui = new Ui();
    humanPlayer = new HumanPlayer();
    cpu = new Cpu();
    ui.createDom();
};