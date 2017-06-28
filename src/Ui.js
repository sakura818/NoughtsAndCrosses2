import { CpuLevel } from './cpuLevel.js';

const State = Object.freeze({ 0: '_', 1: '○', 2: '×' });

/**
 * UIクラス
 * TODO gameMatch.boardをthis.boardとかにした方がわかりやすいかもしれない。
 * @author asada
 */
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
                gameMatch.board.init();
                gameMatch.ui.printBoard();
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

        /**
         * CPUの強さを変更する
         *
         * @param cpuLevel
         */
        const setCpu = function (cpuLevel) {
            switch (cpuLevel) {
                case CpuLevel.EASY:
                    cpu = new EasyCpu(2);
                    break;

                default:
                    window.alert('存在しないCPUが選択されました。');
            }
        }

        const createGameBoard = () => {
            const fragment = document.createDocumentFragment();

            //pタグで段落をつける
            let pTag = document.createElement('p');
            for (let i = 0; i < gameMatch.board.oneSideLength * gameMatch.board.oneSideLength; i++) {
                if (i % gameMatch.board.oneSideLength === 0) {
                    pTag = document.createElement('p');
                }

                let button = document.createElement('button');
                //TODO ここでIDを消すと、'innerHTML' of nul　となる原因について調べる。
                button.id = `${i}`;
                button.innerHTML = State[gameMatch.board.GAME_BOARD_DEFAULT_VALUE];
                button.addEventListener('click', () => {
                    humanPlayer.selectByUser(Math.floor(i / gameMatch.board.oneSideLength), i % gameMatch.board.oneSideLength);
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
                gameMatch.board.init();
                gameMatch.ui.printBoard();
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
        for (let i = 0; i < gameMatch.board.oneSideLength * gameMatch.board.oneSideLength; i++) {
            document.getElementById(`${i}`).innerHTML = State[gameMatch.board.gameBoardArray[Math.floor(i / gameMatch.board.oneSideLength)][i % gameMatch.board.oneSideLength]];
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