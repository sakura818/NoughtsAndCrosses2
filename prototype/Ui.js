import {board, humanPlayer} from 'index.js';
/**
 * UIに関するものを集める
 *
 * @author asada
 */
export class Ui {
    constructor() {

    }

    createDom() {
        function createDOM() {
            //DocumentFragmentを利用して再描画を一回にする
            let fragment = document.createDocumentFragment();

            //ゲームボード作成
            let p = document.createElement('p');
            for (let i = 1; i < 10; i++) {
                if (i % 3 === 1) {
                    p = document.createElement('p');
                }

                let el = document.createElement('button');
                el.id = 'i';
                el.addEventListener('click', () => {
                    humanPlayer.selectByUser(i);
                });

                p.appendChild(el);
                fragment.appendChild(p);
            }

            //リセットボタン作成
            let resetButton = document.createElement('button');
            resetButton.addEventListener('click', () => {
                board.init();
            });
            fragment.appendChild(resetButton);

            return fragment;
        }

        const el = createDOM();
        document.getElementById('board').appendChild(el);
    }
}