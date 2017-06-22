/**
 * Created by yusuke-pc on 2017/06/22.
 */
function checkGameEnd() {
    let gameBoard = new Array(3);
    for (let x = 0; x < 3; x++) {
        gameBoard[x] = new Array(3);
        for (let y = 0; y < 3; y++) {
            gameBoard[x][y] = document.getElementById(`${x + 1}${y + 1}`).innerHTML;
        }
    }

    // gameBoard.forEach((value) => {
    //     console.log(value);
    // });
    // let gameBoard = {
    //     1: {
    //         1: document.getElementById('11').innerHTML,
    //         2: document.getElementById('12').innerHTML,
    //         3: document.getElementById('13').innerHTML
    //     },
    //     2: {
    //         1: document.getElementById('21').innerHTML,
    //         2: document.getElementById('22').innerHTML,
    //         3: document.getElementById('23').innerHTML
    //     },
    //     3: {
    //         1: document.getElementById('31').innerHTML,
    //         2: document.getElementById('32').innerHTML,
    //         3: document.getElementById('33').innerHTML
    //     }
    // };
    // for (let x = 0; x > gameBoard.length; x++) {
    //     for (let y = 0; y > gameBoard[x].length; y++) {
    //         console.log(gameBoard[x + 1][y + 1]);
    //     }
    // }
    checkHorizontal(gameBoard);
    checkVertical(gameBoard);
}

function checkHorizontal(gameBoard) {
    for (let x = 0; x < 3; x++) {
        if (gameBoard[x][0] === NOUGHTS && gameBoard[x][1] === NOUGHTS && gameBoard[x][2] === NOUGHTS) {
            setTimes('あなたの勝ちです');
        }
        if (gameBoard[x][0] === CROSSES && gameBoard[x][1] === CROSSES && gameBoard[x][2] === CROSSES) {
            document.getElementById('times').innerHTML = 'あなたの負けです';
            setTimes('あなたの負けです');
        }
    }
}

/**
 *
 * @param gameBoard
 */
function checkVertical(gameBoard) {
    for (let y = 0; y < 3; y++) {
        if (gameBoard[0][y] === NOUGHTS && gameBoard[1][y] === NOUGHTS && gameBoard[2][y] === NOUGHTS) {
            setTimes('あなたの勝ちです');
        }
        if (gameBoard[0][y] === CROSSES && gameBoard[1][y] === CROSSES && gameBoard[2][y] === CROSSES) {
            setTimes('あなたの負けです');
        }
    }
}