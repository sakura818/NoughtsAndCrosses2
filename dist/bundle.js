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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gameMatch", function() { return gameMatch; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__board_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ui_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__humanPlayer_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__cpu_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__cpuLevel_js__ = __webpack_require__(3);






class OXGame {
    constructor() {
        this.ui = __WEBPACK_IMPORTED_MODULE_1__ui_js__["a" /* Ui */];
        this.board = new __WEBPACK_IMPORTED_MODULE_0__board_js__["a" /* SquareBoard */](this.ui, 3);
        this.humanPlayer = new __WEBPACK_IMPORTED_MODULE_2__humanPlayer_js__["a" /* default */](1);
        this.cpu = new __WEBPACK_IMPORTED_MODULE_3__cpu_js__["a" /* EasyCpu */](2);

        const el = createDOM(this.board, this.ui, this.setCpu, this.humanPlayer);
        document.getElementById('root').appendChild(el);
    }

    /**
     * CPUの強さを変更する
     * @param cpuLevel
     */
    setCpu(cpuLevel) {
        switch (cpuLevel) {
            case __WEBPACK_IMPORTED_MODULE_4__cpuLevel_js__["a" /* CpuLevel */].EASY:
                this.cpu = new __WEBPACK_IMPORTED_MODULE_3__cpu_js__["a" /* EasyCpu */](2);
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
let gameMatch = new OXGame();

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
        for (let value of Object.keys(__WEBPACK_IMPORTED_MODULE_4__cpuLevel_js__["a" /* CpuLevel */])) {
            let option = document.createElement('option');
            option.value = __WEBPACK_IMPORTED_MODULE_4__cpuLevel_js__["a" /* CpuLevel */][value];
            option.innerHTML = __WEBPACK_IMPORTED_MODULE_4__cpuLevel_js__["a" /* CpuLevel */][value];
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
            button.innerHTML = __WEBPACK_IMPORTED_MODULE_1__ui_js__["b" /* PlayerChar */][0];
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

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * BoardのgameBoardArrayの初期値
 */
const GAME_BOARD_DEFAULT_VALUE = 0;
/* unused harmony export GAME_BOARD_DEFAULT_VALUE */


/**
 * 試合結果の定数オブジェクト
 */
const Result = Object.freeze({DRAW: '引き分けです。', WIN: 'あなたの勝ちです。', LOSE: 'あなたの負けです。'});
/* unused harmony export Result */


class Board {
    constructor(ui, verticalLength, horizontalLength, terminationCondition) {
        this.ui = ui;
        this.verticalLength = verticalLength;
        this.horizontalLength = horizontalLength;
        this.terminationCondition = terminationCondition;
        this.endFlag = false;

        this.init();
    }

    /**
     * ボード上で選択した場所が埋まっている確認する
     *
     * @return {boolean} 埋まっている場合はtrue、埋まっていない場合はfalse
     */
    isAlreadyPut(x, y) {
        return this.gameBoardArray[x][y] !== GAME_BOARD_DEFAULT_VALUE;
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
            this.gameBoardArray[i] = new Array(this.horizontalLength).fill(GAME_BOARD_DEFAULT_VALUE);
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
                if (this.gameBoardArray[x][y] === GAME_BOARD_DEFAULT_VALUE) {
                    return false;
                }
            }
        }
        return true;
    }
}

/**
 * Boardクラス
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
            if (playerId === 1) {
                this.ui.printResultMessage(this, Result.WIN);

            } else if (playerId === 2) {
                this.ui.printResultMessage(this, Result.LOSE);
            }
            return;
        }

        if (this._checkDraw()) {
            this.endFlag = true;
            this.ui.printResultMessage(this, Result.DRAW);
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
/* 2 */
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
    selectByCpu(board, ui) {
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
            let random = Math.floor(Math.random() * board.verticalLength * board.horizontalLength);
            x = Math.floor(random / board.verticalLength);
            y = random % board.horizontalLength;
        } while (board.isAlreadyPut(x, y));
        board.put(x, y, this.playerId);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = EasyCpu;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * CPUの強さの定数オブジェクト
 */
const CpuLevel = Object.freeze({ EASY: 'Easy' });
/* harmony export (immutable) */ __webpack_exports__["a"] = CpuLevel;



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_js__ = __webpack_require__(0);


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

        __WEBPACK_IMPORTED_MODULE_0__app_js__["gameMatch"].judge();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = HumanPlayer;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//ボードの駒とIDの連想配列。
const PlayerChar = Object.freeze(['_', '○', '×']);
/* harmony export (immutable) */ __webpack_exports__["b"] = PlayerChar;


const Ui = {
    /**
     * 現在のボードの状況を表示する。
     */
    printBoard: function (board) {
        for (let i = 0; i < board.oneSideLength * board.oneSideLength; i++) {
            document.getElementById(`${i}`).innerHTML = PlayerChar[board.gameBoardArray[Math.floor(i / board.oneSideLength)][i % board.oneSideLength]];
        }
    },
    /**
     * 結果を表示する。
     */
    printResultMessage: function (board, result) {
        this.printBoard(board);
        window.alert(result);
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