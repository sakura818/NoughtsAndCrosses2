import {board, ui, humanPlayer, RESULT} from './app.js';

/**
 * UIクラス
 *
 * @author asada
 */
export default class Ui {
    /**
     * コンストラクタ
     * タイトル、ゲームボード、リセットボタンを作成して、表示する。
     */
    constructor() {
        const createTitle = () => {
            const title = document.createElement('h1');
            title.innerHTML = '○×ゲーム';
            return title;
        };

        const createGameBoard = () => {
            const fragment = document.createDocumentFragment();

            let pTag = document.createElement('p');
            for (let i = 0; i < 9; i++) {
                if (i % 3 === 0) {
                    pTag = document.createElement('p');
                }

                let button = document.createElement('button');
                //TODO ここでIDを消すと、'innerHTML' of nul　となる原因について調べる。
                button.id = `${i}`;
                button.innerHTML = '_';
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
            //IDを付与しているが、
            resetButton.id = 'reset';
            resetButton.innerHTML = 'リセット';
            resetButton.addEventListener('click', () => {
                board.init();
                ui.printBoard();
            });
            return resetButton;
        };

        const createDOM = () => {
            //div class contentの中にタイトル、ゲームボード、リセットボタンを格納する。
            const divClassCenter = document.createElement('div');
            divClassCenter.className = 'content';

            divClassCenter.appendChild(createTitle());

            divClassCenter.appendChild(createGameBoard());

            divClassCenter.appendChild(createResetButton());

            return divClassCenter;
        };

        const el = createDOM();
        document.getElementById('root').appendChild(el);
    }

    /**
     * 現在のボードの状況を表示する。
     */
    printBoard() {
        for (let i = 0; i < 9; i++) {
            let el;
            switch (board.gameBoardArray[Math.floor(i / board.oneSideLength)][i % board.oneSideLength]) {
                case board.DEFAULT:
                    el = '_';
                    break;

                case 1:
                    el = '○';
                    break;

                case 2:
                    el = '×';
                    break;

                default:

            }
            document.getElementById(`${i}`).innerHTML = el;
        }
    }

    /**
     * 結果を表示する
     * TODO alertでいいのか疑問
     *
     * @param result DRAW,WIN,LOSE のいずれかを渡すこと。
     */
    printResultMessage(result) {

        this.printBoard();

        switch (result) {
            case RESULT.DRAW:
                window.alert('引き分けです。');
                break;

            case RESULT.WIN:
                window.alert('あなたの勝ちです。');
                break;

            case RESULT.LOSE:
                window.alert('あなたの負けです。');
                break;

            default:
                window.alert('アプリ内で予期しない動作がありました。');
        }
    }

    printIsAlreadyPutMessage() {
        window.alert('そこはすでに埋まっています。');
    }
}