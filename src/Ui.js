import {board, ui, humanPlayer, RESULT} from './app.js';

/**
 * UIに関するものを集める
 *
 * @author asada
 */
export default class Ui {
    constructor() {
        function createDOM() {
            //DocumentFragmentを利用して再描画の回数を減らす
            let fragment = document.createDocumentFragment();

            //タイトル
            let h1Tag = document.createElement('h1');
            h1Tag.innerHTML = '○×ゲーム';
            fragment.appendChild(h1Tag);

            //ゲームボード
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

            //リセットボタン
            let resetButton = document.createElement('button');
            //IDを付与しているが、
            resetButton.id = 'reset';
            resetButton.innerHTML = 'リセット';
            resetButton.addEventListener('click', () => {
                board.init();
                ui.printBoard();
            });
            fragment.appendChild(resetButton);

            return fragment;
        }

        const el = createDOM();
        document.getElementById('root').appendChild(el);
    }

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
                window.alert('あたなの負けです。');
                break;

            default:
                window.alert('アプリ内で予期しない動作がありました。');
        }
    }

    printIsAlreadyPutMessage() {
        window.alert('そこはすでに埋まっています。');
    }
}