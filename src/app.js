import {SquareBoard} from './board.js';
import {PlayerChar, Ui} from './ui.js';
import HumanPlayer from './humanPlayer.js';
import {EasyCpu} from './cpu.js';
import {CpuLevel} from './cpuLevel.js';

class OXGame {
    constructor() {
        this.ui = Ui;
        this.board = new SquareBoard(this.ui, 3);
        this.humanPlayer = new HumanPlayer(1);
        this.cpu = new EasyCpu(2);

        const el = createDOM(this.board, this.ui, this.setCpu, this.humanPlayer);
        document.getElementById('root').appendChild(el);
    }

    /**
     * CPUの強さを変更する
     * @param cpuLevel
     */
    setCpu(cpuLevel) {
        switch (cpuLevel) {
            case CpuLevel.EASY:
                this.cpu = new EasyCpu(2);
                break;

            default:
                window.alert('存在しないCPUが選択されました。');
        }
    }

    judge() {
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

//ゲームクラスを作成してゲームを開始する。
export let gameMatch = new OXGame();

function createDOM(board, ui, setCpu, humanPlayer) {
    const divClassContent = document.createElement('div');
    divClassContent.className = 'content';
    divClassContent.appendChild(createTitle());
    divClassContent.appendChild(createCpuLevelSelectBox(board, ui, setCpu));
    divClassContent.appendChild(createGameBoard(board, humanPlayer, ui));
    divClassContent.appendChild(createResetButton(board, ui));
    return divClassContent;

    function createTitle() {
        const title = document.createElement('h1');
        title.innerHTML = '○×ゲーム';
        return title;
    }

    function createCpuLevelSelectBox(board, ui, setCpu) {
        const pTag = document.createElement('p');
        pTag.innerHTML = 'CPUの難易度:';

        //セレクトボックスを作る
        const select = document.createElement('select');
        select.id = 'CpuLevel';
        select.addEventListener('change', () => {
            board.init();
            ui.printBoard(board);
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
    }

    function createGameBoard(board, humanPlayer, ui) {
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
            button.innerHTML = PlayerChar[0];
            button.addEventListener('click', () => {
                humanPlayer.selectByUser(board, ui, Math.floor(i / board.oneSideLength), i % board.oneSideLength);
            });

            pTag.appendChild(button);
            fragment.appendChild(pTag);
        }
        return fragment;
    }

    function createResetButton(board, ui) {
        const resetButton = document.createElement('button');
        resetButton.innerHTML = 'リセット';
        resetButton.addEventListener('click', () => {
            board.init();
            ui.printBoard(board);
        });
        return resetButton;
    }
}