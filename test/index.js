let times = 1;
const NOUGHTS = '○';
const CROSSES = '×';
const DEFAULT = '_';

//グローバルスコープ


function select(id) {
    console.log(`${id}のボタンが押されました。`);

    if (times % 2 !== 0) {
        document.getElementById(id).innerHTML = NOUGHTS;
    } else {
        document.getElementById(id).innerHTML = CROSSES;
    }
    times++;

    printTurn();
    checkGameEnd();
}

function selectByRandom() {

}

function setTimes(message) {
    document.getElementById('times').innerHTML = message;
}

function printTurn() {
    if (times % 2 !== 0) {
        setTimes(`${NOUGHTS}の番です`);
    } else {
        setTimes(`${CROSSES}の番です`);
    }
}

function reset() {
    times = 1;
    printTurn();
    for (let i = 0; i < 3; i++) {
        for (let k = 0; k < 3; k++) {
            document.getElementById(`${i + 1}${k + 1}`).innerHTML = DEFAULT;
        }
    }
}
