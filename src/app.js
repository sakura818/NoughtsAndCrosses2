import {Board} from './Board';
import {Cpu} from './Cpu';
import {Ui} from './Ui';


const NOUGHTS = '○';
const CROSSES = '×';
const DEFAULT = '_';
let endFlag = false;

function createDOM() {
    //DocumentFragmentを利用して再描画を一回にする
    let fragment = document.createDocumentFragment();

    let p = document.createElement('p');

    for (let i = 1; i < 10; i++) {
        if (i % 3 === 1) {
            p = document.createElement('p');
        }

        let el = document.createElement('button');
        el.addEventListener('click', () => {
            selectByUser(i);
        });

        p.appendChild(el);
        fragment.appendChild(p);
    }

    let resetButton = document.createElement('button');
    resetButton.addEventListener('click', () => {
        init();
        printResult(NOT_FINISH);
        endFlag = false;
    });
    fragment.appendChild(resetButton);

    return fragment;

    // for (let i = 0; i < 3; i++) {
    //     for (let k = 0; k < 3; k++) {
    //         let el = document.createElement('input');
    //         el.type = 'button';
    //         el.addEventListener('click', () => {
    //             selectByUser(i);
    //         });
    //         fragment.appendChild(el);
    //     }
    // }
}

const el = createDOM();
document.getElementById('root').appendChild(el);

const selectByUser = id => {
    let board = new Board();
    let ui = new Ui();
    let cpu = new Cpu();

    console.log(`${id}のボタンが押されました。`);
    if (endFlag) {
        return;
    }

    if (!isAlreadyPut(id)) {
        ui.put(id, NOUGHTS);
        ui.printError(NO_ERROR);

    } else {
        ui.printError(ALREADY_PUT);
        return;
    }
    board.checkGameEnd(ui.getGameBoard());

    if (endFlag) {
        return;
    }

    cpu.select(ui.getGameBoard());
    board.checkGameEnd(ui.getGameBoard());
};