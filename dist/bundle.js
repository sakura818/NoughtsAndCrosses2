/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__board_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ui_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__humanPlayer_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__cpu_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__cpuLevel_js__ = __webpack_require__(4);






/**
 * OXゲームのクラス
 * TODO 引数が具象であるために、人間VS人間ができなくなっている。引数は配列で取れば問題が解消できる。
 */
class OXGame {
    constructor(board, humanPlayer, cpu) {
        this.ui = __WEBPACK_IMPORTED_MODULE_1__ui_js__["a" /* Ui */];
        this.board = board;
        this.humanPlayer = humanPlayer;
        this.cpu = cpu;

        const el = createDOM(this);
        document.getElementById('root').appendChild(el);
    }

    /**
     * ゲームの初期化を行う。
     */
    init() {
        this.board.init();
        this.ui.printBoard(this.board);
    }

    /**
     * 試合の判定を行う。
     * BoardのendFlagがtrueになると試合終了。
     */
    judge() {
        if (this.board.endFlag) {
            return;
        }

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
 * 三目並べ。
 * 人間先行。
 * CPU後攻。
 */
class OXGame3by3HumanVsCpu extends OXGame {
    constructor() {
        super(new __WEBPACK_IMPORTED_MODULE_0__board_js__["a" /* SquareBoard */](__WEBPACK_IMPORTED_MODULE_1__ui_js__["a" /* Ui */], 3), new __WEBPACK_IMPORTED_MODULE_2__humanPlayer_js__["a" /* default */](1), new __WEBPACK_IMPORTED_MODULE_3__cpu_js__["a" /* EasyCpu */](2));
    }
}
/* unused harmony export OXGame3by3HumanVsCpu */


/**
 * 三目並べ。
 * CPU先行。
 * 人間後攻。
 */
class OXGame3by3CpuVsHuman extends OXGame {
    constructor() {
        super(new __WEBPACK_IMPORTED_MODULE_0__board_js__["a" /* SquareBoard */](__WEBPACK_IMPORTED_MODULE_1__ui_js__["a" /* Ui */], 3), new __WEBPACK_IMPORTED_MODULE_2__humanPlayer_js__["a" /* default */](2), new __WEBPACK_IMPORTED_MODULE_3__cpu_js__["a" /* EasyCpu */](1));
        try {
            this.cpu.selectByCpu(this.board);
        } catch (e) {
            console.log(e);
            window.alert('選択されたCPUは未実装です。');
        }
        this.board.checkGameEnd(this.cpu.playerId);

        this.ui.printBoard(this.board);
    }

    /**
     * ゲームの初期化を行う。
     */
    init() {
        this.board.init();

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
/* unused harmony export OXGame3by3CpuVsHuman */


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
            case __WEBPACK_IMPORTED_MODULE_4__cpuLevel_js__["a" /* CpuLevel */].EASY:
                oxGame.cpu = new __WEBPACK_IMPORTED_MODULE_3__cpu_js__["a" /* EasyCpu */](2);
                break;

            default:
                window.alert('存在しないCPUが選択されました。');
        }
        oxGame.init();
    });

    //オプションを作る
    for (let value of Object.keys(__WEBPACK_IMPORTED_MODULE_4__cpuLevel_js__["a" /* CpuLevel */])) {
        let option = document.createElement('option');
        option.value = __WEBPACK_IMPORTED_MODULE_4__cpuLevel_js__["a" /* CpuLevel */][value];
        option.innerHTML = __WEBPACK_IMPORTED_MODULE_4__cpuLevel_js__["a" /* CpuLevel */][value];
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
        button.innerHTML = __WEBPACK_IMPORTED_MODULE_1__ui_js__["b" /* PlayerChar */][0];
        button.addEventListener('click', () => {
            oxGame.humanPlayer.selectByUser(oxGame.board, oxGame.ui, Math.floor(i / oxGame.board.verticalLength), i % oxGame.board.verticalLength);
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

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__OXGame_js__ = __webpack_require__(0);


//ゲームクラスを作成してゲームを開始する。
//new OXGame3by3HumanVsCpu();
//new OXGame3by3CpuVsHuman();
new __WEBPACK_IMPORTED_MODULE_0__OXGame_js__["OXGame3by3HumanVsHuman"]();

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const GAME_BOARD_SQUARE_DEFAULT_VALUE = 0;

/**
 * ボードの抽象クラス
 *
 * @author asada
 */
class Board {
    constructor(ui, verticalLength, horizontalLength, terminationCondition) {
        /**
         * ゲームが終了条件を満たしている場合はtrue、まだ終了しない場合はfalse
         */
        this.endFlag = false;

        this.ui = ui;
        this.verticalLength = verticalLength;
        this.horizontalLength = horizontalLength;
        this.terminationCondition = terminationCondition;

        this.init();
    }

    /**
     * ボード上で選択した場所が埋まっている確認する
     *
     * @return {boolean} 埋まっている場合はtrue、埋まっていない場合はfalse
     */
    isAlreadyPut(x, y) {
        return this.gameBoardArray[x][y] !== GAME_BOARD_SQUARE_DEFAULT_VALUE;
    }

    put(x, y, playerID) {
        this.gameBoardArray[x][y] = playerID;
    }

    /**
     * ボードを初期化する
     */
    init() {
        this.gameBoardArray = new Array(this.verticalLength);
        for (let i = 0; i < this.verticalLength; i++) {
            this.gameBoardArray[i] = new Array(this.horizontalLength).fill(GAME_BOARD_SQUARE_DEFAULT_VALUE);
        }

        this.endFlag = false;
    }

    _checkHorizontal(playerId) {
        for (let x = 0; x < this.verticalLength; x++) {
            let score = 0;
            for (let y = 0; y < this.horizontalLength; y++) {
                if (this.gameBoardArray[x][y] !== playerId) {
                    score = 0;
                    continue;
                }
                score++;
                if (score === this.terminationCondition) {
                    return true;
                }
            }
        }
        return false;
    }

    _checkVertical(playerId) {
        for (let y = 0; y < this.verticalLength; y++) {
            let score = 0;
            for (let x = 0; x < this.horizontalLength; x++) {
                if (this.gameBoardArray[x][y] !== playerId) {
                    score = 0;
                    continue;
                }
                score++;
                if (score === this.terminationCondition) {
                    return true;
                }
            }
        }
        return false;
    }

    _checkDraw() {
        for (let x = 0; x < this.gameBoardArray.length; x++) {
            for (let y = 0; y < this.gameBoardArray[x].length; y++) {
                if (this.gameBoardArray[x][y] === GAME_BOARD_SQUARE_DEFAULT_VALUE) {
                    return false;
                }
            }
        }
        return true;
    }
}

/**
 * 正方形のボードで、一辺の長さ = 終了条件のクラス
 *
 * @author asada
 */
class SquareBoard extends Board {
    constructor(ui, oneSideLength) {
        super(ui, oneSideLength, oneSideLength, oneSideLength);
        this.oneSideLength = oneSideLength;
    }

    /**
     * ゲームの終了条件を満たしたか確認する
     *
     * @param playerId 最後にプレイしたプレイヤーのIDを渡す
     */
    checkGameEnd(playerId) {
        if (this._checkHorizontal(playerId) || this._checkVertical(playerId) || this._checkUpperLeftToLowerRight(playerId) || this._checkUpperRightToLowerLeft(playerId)) {
            this.endFlag = true;
        }

        if (this.endFlag) {
            this.ui.printBoard(this);
            this.ui.printResultMessage(playerId);
            return;
        }

        if (this._checkDraw()) {
            this.endFlag = true;
            this.ui.printBoard(this);
            this.ui.printResultMessage();
        }
    }

    _checkUpperLeftToLowerRight(playerId) {
        for (let i = 0; i < this.oneSideLength; i++) {
            if (this.gameBoardArray[i][i] !== playerId) {
                break;
            }
            if (i === this.terminationCondition - 1) {
                return true;
            }
        }
        return false;
    }

    _checkUpperRightToLowerLeft(playerId) {
        for (let i = 0; i < this.oneSideLength; i++) {
            if (this.gameBoardArray[i][this.oneSideLength - 1 - i] !== playerId) {
                break;
            }
            if (i === this.terminationCondition - 1) {
                return true;
            }
        }
        return false;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SquareBoard;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * コンピュータのプレイヤー
 *
 * @author asada
 */
class Cpu {
    constructor(playerId) {
        this.playerId = playerId;
    }

    /**
     * CPUがボードに何を置くか決めるメソッド
     *
     * @throws {Error} CPUを継承してselectByCpuメソッドを実装しない場合にスローする
     */
    selectByCpu() {
        throw Error('不正なCPUが呼ばれました。');
    }
}

/**
 * 弱いCPU
 *
 * @author asada
 */
class EasyCpu extends Cpu {
    constructor(playerId) {
        super(playerId);
    }

    selectByCpu(board) {
        let x, y;
        do {
            x = Math.floor(Math.random() * board.verticalLength);
            y = Math.floor(Math.random() * board.horizontalLength);
        } while (board.isAlreadyPut(x, y));
        board.put(x, y, this.playerId);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = EasyCpu;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * CPUの強さの定数オブジェクト
 */
const CpuLevel = Object.freeze({ EASY: 'Easy' });
/* harmony export (immutable) */ __webpack_exports__["a"] = CpuLevel;



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * 人間のプレイヤー
 *
 * @author asada
 */
class HumanPlayer {
    constructor(playerId) {
        this.playerId = playerId;
    }

    /**
     * ユーザーが選択した場合に呼び出される関数
     */
    selectByUser(board, ui, x, y) {
        if (board.endFlag) {
            return;
        }

        if (board.isAlreadyPut(x, y)) {
            ui.printIsAlreadyPutMessage();
            return;
        }

        board.put(x, y, this.playerId);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = HumanPlayer;


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//ボードの駒とIDの連想配列。
//画像を使用する場合も考えて、freezeの中止     _ _
const PlayerChar = ['_', '○', '×', '△', '□'];
/* harmony export (immutable) */ __webpack_exports__["b"] = PlayerChar;


const Ui = {
    /**
     * 現在のボードの状況を表示する。
     */
    printBoard: function (board) {
        for (let i = 0; i < board.verticalLength * board.horizontalLength; i++) {
            let oneSquare = board.gameBoardArray[Math.floor(i / board.verticalLength)][i % board.verticalLength];
            document.getElementById(`${i}`).innerHTML = PlayerChar[oneSquare];
        }
    },
    /**
     * 結果を表示する。
     * 引数に数字が渡された場合は
     */
    printResultMessage: function (result) {
        if (result === undefined) {
            window.alert('引き分けです。');
        } else {
            window.alert(`${PlayerChar[result]}の勝ちです。`)
        }
    },
    /**
     * プレイヤーに置けないことを説明する。
     */
    printIsAlreadyPutMessage: function () {
        window.alert('そこはすでに埋まっています。');
    }
};
/* harmony export (immutable) */ __webpack_exports__["a"] = Ui;


/***/ })
/******/ ]);