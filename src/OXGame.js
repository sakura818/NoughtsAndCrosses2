import { SquareBoard } from './board.js';
import { PlayerChar, Ui } from './ui.js';
import HumanPlayer from './humanPlayer.js';
import { EasyCpu } from './cpu.js';
import { CpuLevel } from './cpuLevel.js';

/**
 * OXGameクラス
 * 
 * @author asada
 */
class OXGame {
    constructor(board, players) {
        this.ui = Ui;
        this.board = board;
        this.players = players;

        const el = createDOM(this);
        document.getElementById('root').appendChild(el);

        this.init();
    }

    init() {
        this.board.init();
        this.ui.printBoard(this.board);

        this.nowPlayer = this.players[0];

        if (!(this.nowPlayer instanceof HumanPlayer)) {
            //CPUが先行の場合。
            this.nowPlayer.select(this.board);
            this.board.checkGameEnd(this.nowPlayer.playerId);
            this.ui.printBoard(this.board);

            this.nowPlayer = this.getNextPlayer();
        }
    }

    judge() {
        if (this.board.endFlag) {
            return;
        }

        this.board.checkGameEnd(this.nowPlayer.playerId);

        this.nowPlayer = this.getNextPlayer();

        if (this.board.endFlag) {
            return;
        }

        if (!(this.nowPlayer instanceof HumanPlayer)) {
            this.nowPlayer.select(this.board);
            this.board.checkGameEnd(this.nowPlayer.playerId);
            this.ui.printBoard(this.board);
        }

        this.board.checkGameEnd(this.players.playerId);

        this.nowPlayer = this.getNextPlayer();

        this.ui.printBoard(this.board);
    }

    getNextPlayer() {
        return this.players[this.board.times % this.players.length];
    }
}

export class OXGame3by3HumanVsCpu extends OXGame {
    constructor() {
        const board = new SquareBoard(Ui, 3);
        const players = [new HumanPlayer(1), new EasyCpu(2)];
        super(board, players);
    }
}

export class OXGame3by3CpuVsHuman extends OXGame {
    constructor() {
        const board = new SquareBoard(Ui, 3);
        const players = [new EasyCpu(1), new HumanPlayer(2)];
        super(new SquareBoard(Ui, 3), players);
    }
}

/**
 * index.htmlのコンテンツを作る。
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
}

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
        //buttonの表示でプレイヤーキャラを使うので注意。
        button.innerHTML = PlayerChar[0];
        button.addEventListener('click', () => {
            oxGame.nowPlayer.select(oxGame.board, oxGame.ui, Math.floor(i / oxGame.board.verticalLength), i % oxGame.board.verticalLength);
            oxGame.judge();
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