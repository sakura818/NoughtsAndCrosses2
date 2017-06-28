import {SquareBoard} from './board.js';
import {PlayerChar, Ui} from './ui.js';
import HumanPlayer from './humanPlayer.js';
import {EasyCpu} from './cpu.js';
import {CpuLevel} from './cpuLevel.js';

//ゲームクラスを作成してゲームを開始する。
new OXGame();

function OXGame() {
    this.ui = Ui;
    this.board = new SquareBoard(this.ui, 3);
    this.humanPlayer = new HumanPlayer(1);
    this.cpu = new EasyCpu(2);

    const el = createDOM(this);
    document.getElementById('root').appendChild(el);

    /**
     * ゲームの初期化を行う。
     */
    this.init = function () {
        this.board.init();
        this.ui.printBoard(this.board);
    };

    /**
     * 試合の判定を行う。
     */
    this.judge = function () {
        this.board.checkGameEnd(this.humanPlayer.playerId);

        if (this.board.endFlag) {
            return;
        }
        try {
            this.cpu.selectByCpu(this.board);
        } catch (e) {
            console.log(e);
            window.alert('選択されたCPUは未実装です。');
        }
        this.board.checkGameEnd(this.cpu.playerId);

        this.ui.printBoard(this.board);
    }
}

/**
 * index.htmlを作る。
 *
 * @param oxGame OXGameのオブジェクトを渡す。
 * @returns {Element} index.htmlの要素を返す。
 */
function createDOM(oxGame) {
    const divClassContent = document.createElement('div');

    divClassContent.className = 'content';
    divClassContent.appendChild(createTitle());
    divClassContent.appendChild(createCpuLevelSelectBox(oxGame));
    divClassContent.appendChild(createGameBoard(oxGame));
    divClassContent.appendChild(createResetButton(oxGame));

    return divClassContent;

    function createTitle() {
        const title = document.createElement('h1');
        title.innerHTML = '○×ゲーム';
        return title;
    }

    function createCpuLevelSelectBox(oxGame) {
        const pTag = document.createElement('p');
        pTag.innerHTML = 'CPUの難易度:';

        //セレクトボックスを作る
        const select = document.createElement('select');
        select.id = 'CpuLevel';
        select.addEventListener('change', () => {
            switch (document.getElementById('CpuLevel').value) {
                case CpuLevel.EASY:
                    oxGame.cpu = new EasyCpu(2);
                    break;

                default:
                    window.alert('存在しないCPUが選択されました。');
            }
            oxGame.init();
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
    }

    function createGameBoard(oxGame) {
        const fragment = document.createDocumentFragment();

        //pタグで段落をつける
        let pTag = document.createElement('p');
        for (let i = 0; i < oxGame.board.verticalLength * oxGame.board.horizontalLength; i++) {
            if (i % oxGame.board.horizontalLength === 0) {
                pTag = document.createElement('p');
            }

            let button = document.createElement('button');
            button.id = `${i}`;
            button.innerHTML = PlayerChar[0];
            button.addEventListener('click', () => {
                oxGame.humanPlayer.selectByUser(oxGame.board, oxGame.ui, Math.floor(i / oxGame.board.verticalLength), i % oxGame.board.verticalLength);
            });

            pTag.appendChild(button);
            fragment.appendChild(pTag);
        }
        return fragment;
    }

    function createResetButton(oxGame) {
        const resetButton = document.createElement('button');
        resetButton.innerHTML = 'リセット';
        resetButton.addEventListener('click', () => {
            oxGame.init();
        });
        return resetButton;
    }
}