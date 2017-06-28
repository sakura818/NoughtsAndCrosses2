import { SquareBoard } from './board.js';
import Ui from './ui.js';
import HumanPlayer from './humanPlayer.js';
import { EasyCpu } from './cpu.js';

/**
 * 各クラスをインスタンス化する
 *
 * @author asada
 */
class Game3by3HumanVsCpu {
    constructor() {
        const x = 3;
        const y = 3;

        this.ui = new Ui(x, y);
        this.board = new SquareBoard(x, y);
        this.humanPlayer = new HumanPlayer(1);
        this.cpu = new EasyCpu(2);
    }
    judge() {
        this.board.checkGameEnd(this.playerId);

        if (this.board.endFlag) {
            return;
        }
        try {
            cpu.selectByCpu();
        } catch (e) {
            console.log(e);
            window.alert('選択されたCPUは未実装です。');
        }
        this.board.checkGameEnd(cpu.playerId);

        this.ui.printBoard();
    }
}

let gameMatch = new Game3by3HumanVsCpu(board, ui, humanPlayer, cpu);

const el = createDOM();
document.getElementById('root').appendChild(el);

function createDOM() {
    const divClassContent = document.createElement('div');
    divClassContent.className = 'content';

    divClassContent.appendChild(createTitle());

    divClassContent.appendChild(createCpuLevelSelectBox());

    divClassContent.appendChild(createGameBoard());

    divClassContent.appendChild(createResetButton());

    return divClassContent;
}

function createTitle() {
    const title = document.createElement('h1');
    title.innerHTML = '○×ゲーム';
    return title;
}

function createCpuLevelSelectBox() {
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
}

/**
 * CPUの強さを変更する
 *
 * @param cpuLevel
 */
function setCpu(cpuLevel) {
    switch (cpuLevel) {
        case CpuLevel.EASY:
            cpu = new EasyCpu(2);
            break;

        default:
            window.alert('存在しないCPUが選択されました。');
    }
}

function createGameBoard() {
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
}

function createResetButton() {
    const resetButton = document.createElement('button');
    resetButton.innerHTML = 'リセット';
    resetButton.addEventListener('click', () => {
        gameMatch.board.init();
        gameMatch.ui.printBoard();
    });
    return resetButton;
}