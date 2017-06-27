import {board, ui, humanPlayer, Result, CpuLevel, setCpu} from './app.js';

/**
 * UIクラス
 *
 * @author asada
 */

'use strict';

const State = Object.freeze({0: '_', 1: '○', 2: '×'});

export default class Ui {
    /**
     * コンストラクタ
     * タイトル、CPUのセレクトボックス、ゲームボード、リセットボタンを作成し、表示する。
     */
    constructor() {
        const createTitle = () => {
            const title = document.createElement('h1');
            title.innerHTML = '○×ゲーム';
            return title;
        };

        const createCpuLevelSelectBox = () => {
            const pTag = document.createElement('p');
            pTag.innerHTML = 'CPUの難易度:';

            //セレクトボックスを作る
            const select = document.createElement('select');
            select.id = 'CpuLevel';
            select.addEventListener('change', () => {
                board.init();
                ui.printBoard();
                setCpu(document.getElementById('CpuLevel').value);
            });

            //オプションを作る
            for (let value of Object.keys(CpuLevel)) {
                let option = document.createElement('option');
                option.value = CpuLevel[value];
                option.innerHTML = CpuLevel[value];
                select.appendChild(option);
            }

            pTag.appendChild(select);
            return pTag;
        };

        const createGameBoard = () => {
            const fragment = document.createDocumentFragment();

            //pタグで段落をつける
            let pTag = document.createElement('p');
            for (let i = 0; i < board.oneSideLength * board.oneSideLength; i++) {
                if (i % board.oneSideLength === 0) {
                    pTag = document.createElement('p');
                }

                let button = document.createElement('button');
                //TODO ここでIDを消すと、'innerHTML' of nul　となる原因について調べる。
                button.id = `${i}`;
                button.innerHTML = State[board.DEFAULT];
                button.addEventListener('click', () => {
                    humanPlayer.selectByUser(i);
                });

                pTag.appendChild(button);
                fragment.appendChild(pTag);
            }
            return fragment;
        };

        const createResetButton = () => {
            const resetButton = document.createElement('button');
            resetButton.innerHTML = 'リセット';
            resetButton.addEventListener('click', () => {
                board.init();
                ui.printBoard();
            });
            return resetButton;
        };

        const createDOM = () => {
            const divClassContent = document.createElement('div');
            divClassContent.className = 'content';

            divClassContent.appendChild(createTitle());

            divClassContent.appendChild(createCpuLevelSelectBox());

            divClassContent.appendChild(createGameBoard());

            divClassContent.appendChild(createResetButton());

            return divClassContent;
        };

        const el = createDOM();
        document.getElementById('root').appendChild(el);
    }

    /**
     * 現在のボードの状況を表示する。
     */
    printBoard() {
        for (let i = 0; i < board.oneSideLength * board.oneSideLength; i++) {
            document.getElementById(`${i}`).innerHTML = State[board.copyGameBoardArray()[Math.floor(i / board.oneSideLength)][i % board.oneSideLength]];
        }
    }

    /**
     * 結果を表示する
     *
     * @param result Resultオブジェクトの項目を渡すこと。
     */
    printResultMessage(result) {
        this.printBoard();
        window.alert(result);
    }

    printIsAlreadyPutMessage() {
        window.alert('そこはすでに埋まっています。');
    }
}