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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "game", function() { return game; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__board_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ui_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__humanPlayer_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__cpu__ = __webpack_require__(2);





let game = new Game3by3HumanVsCpu();

/**
 * 各クラスをインスタンス化する
 *
 * @author asada
 */
class Game3by3HumanVsCpu {
    constructor() {
        this.board = new __WEBPACK_IMPORTED_MODULE_0__board_js__["a" /* SquareBoard */](3, 3);
        this.ui = new __WEBPACK_IMPORTED_MODULE_1__ui_js__["a" /* default */]();
        this.humanPlayer = new __WEBPACK_IMPORTED_MODULE_2__humanPlayer_js__["a" /* default */](1);
        this.cpu = new __WEBPACK_IMPORTED_MODULE_3__cpu__["a" /* EasyCpu */](2);
    }
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__result_js__ = __webpack_require__(5);



/**
 * BoardのgameBoardArrayの初期値
 */
const GAME_BOARD_DEFAULT_VALUE = 0;
/* unused harmony export GAME_BOARD_DEFAULT_VALUE */


/**
 * Boardクラス
 *
 * @author asada
 */
class SquareBoard {
    constructor(oneSideLength, terminationCondition) {
        this.oneSideLength = oneSideLength;
        this.terminationCondition = terminationCondition;
        this.endFlag = false;

        this.init();
    }

    getOneSideLength() {
        return this.oneSideLength;
    }

    /**
     * ボードを初期化する
     */
    init() {
        this.gameBoardArray = new Array(this.oneSideLength);
        for (let i = 0; i < this.oneSideLength; i++) {
            this.gameBoardArray[i] = new Array(this.oneSideLength).fill(GAME_BOARD_DEFAULT_VALUE);
        }

        this.endFlag = false;
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
                __WEBPACK_IMPORTED_MODULE_0__app_js__["game"].ui.printResultMessage(__WEBPACK_IMPORTED_MODULE_1__result_js__["a" /* default */].WIN);

            } else if (playerId === 2) {
                __WEBPACK_IMPORTED_MODULE_0__app_js__["game"].ui.printResultMessage(__WEBPACK_IMPORTED_MODULE_1__result_js__["a" /* default */].LOSE);
            }
            return;
        }

        if (this._checkDraw()) {
            this.endFlag = true;
            __WEBPACK_IMPORTED_MODULE_0__app_js__["game"].ui.printResultMessage(__WEBPACK_IMPORTED_MODULE_1__result_js__["a" /* default */].DRAW);
        }
    }

    _checkHorizontal(playerId) {
        for (let x = 0; x < this.oneSideLength; x++) {
            let score = 0;
            for (let y = 0; y < this.oneSideLength; y++) {
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
        for (let y = 0; y < this.oneSideLength; y++) {
            let score = 0;
            for (let x = 0; x < this.oneSideLength; x++) {
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
/* harmony export (immutable) */ __webpack_exports__["a"] = SquareBoard;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app__ = __webpack_require__(0);


/**
 * コンピュータのプレイヤー
 *
 * @author asada
 */

const DEFAULT_SCORE = -1;

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

    selectByCpu() {
        let x, y;
        do {
            let random = Math.floor(Math.random() * __WEBPACK_IMPORTED_MODULE_0__app__["game"].board.getOneSideLength() * __WEBPACK_IMPORTED_MODULE_0__app__["game"].board.getOneSideLength());
            x = Math.floor(random / board.oneSideLength);
            y = random % __WEBPACK_IMPORTED_MODULE_0__app__["game"].board.oneSideLength;
        } while (__WEBPACK_IMPORTED_MODULE_0__app__["game"].board.isAlreadyPut(x, y));
        __WEBPACK_IMPORTED_MODULE_0__app__["game"].board.put(x, y, this.playerId);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = EasyCpu;


/***/ }),
/* 3 */
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
    selectByUser(x, y) {
        if (__WEBPACK_IMPORTED_MODULE_0__app_js__["game"].board.endFlag) {
            return;
        }

        if (__WEBPACK_IMPORTED_MODULE_0__app_js__["game"].board.isAlreadyPut(x, y)) {
            __WEBPACK_IMPORTED_MODULE_0__app_js__["game"].ui.printIsAlreadyPutMessage();
            return;
        }
        __WEBPACK_IMPORTED_MODULE_0__app_js__["game"].board.put(x, y, this.playerId);
        __WEBPACK_IMPORTED_MODULE_0__app_js__["game"].board.checkGameEnd(this.playerId);

        if (__WEBPACK_IMPORTED_MODULE_0__app_js__["game"].board.endFlag) {
            return;
        }
        try {
            cpu.selectByCpu();
        } catch (e) {
            console.log(e);
            window.alert('選択されたCPUは未実装です。');
        }
        __WEBPACK_IMPORTED_MODULE_0__app_js__["game"].board.checkGameEnd(cpu.playerId);

        __WEBPACK_IMPORTED_MODULE_0__app_js__["game"].ui.printBoard();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = HumanPlayer;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_js__ = __webpack_require__(0);
throw new Error("Cannot find module \"./game.board.js\"");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__cpuLevel_js__ = __webpack_require__(6);




const State = Object.freeze({ 0: '_', 1: '○', 2: '×' });

/**
 * UIクラス
 * TODO game.boardをthis.boardとかにした方がわかりやすいかもしれない。
 * @author asada
 */
class Ui {
    /**
     * コンストラクタ
     * タイトル、CPUのセレクトボックス、ゲームボード、リセットボタンを作成し、表示する。
     */
    constructor() {
        const createTitle = () => {
            const title = document.createElement('h1');
            title.innerHTML = '○×ゲーム';
            return title;
        };

        const createCpuLevelSelectBox = () => {
            const pTag = document.createElement('p');
            pTag.innerHTML = 'CPUの難易度:';

            //セレクトボックスを作る
            const select = document.createElement('select');
            select.id = 'CpuLevel';
            select.addEventListener('change', () => {
                __WEBPACK_IMPORTED_MODULE_0__app_js__["game"].board.init();
                __WEBPACK_IMPORTED_MODULE_0__app_js__["game"].ui.printBoard();
                setCpu(document.getElementById('CpuLevel').value);
            });

            //オプションを作る
            for (let value of Object.keys(__WEBPACK_IMPORTED_MODULE_2__cpuLevel_js__["a" /* default */])) {
                let option = document.createElement('option');
                option.value = __WEBPACK_IMPORTED_MODULE_2__cpuLevel_js__["a" /* default */][value];
                option.innerHTML = __WEBPACK_IMPORTED_MODULE_2__cpuLevel_js__["a" /* default */][value];
                select.appendChild(option);
            }

            pTag.appendChild(select);
            return pTag;
        };

        /**
         * CPUの強さを変更する
         *
         * @param cpuLevel
         */
        const setCpu = function (cpuLevel) {
            switch (cpuLevel) {
                case __WEBPACK_IMPORTED_MODULE_2__cpuLevel_js__["a" /* default */].EASY:
                    cpu = new EasyCpu(2);
                    break;

                default:
                    window.alert('存在しないCPUが選択されました。');
            }
        }

        const createGameBoard = () => {
            const fragment = document.createDocumentFragment();

            //pタグで段落をつける
            let pTag = document.createElement('p');
            for (let i = 0; i < __WEBPACK_IMPORTED_MODULE_0__app_js__["game"].board.oneSideLength * __WEBPACK_IMPORTED_MODULE_0__app_js__["game"].board.oneSideLength; i++) {
                if (i % __WEBPACK_IMPORTED_MODULE_0__app_js__["game"].board.oneSideLength === 0) {
                    pTag = document.createElement('p');
                }

                let button = document.createElement('button');
                //TODO ここでIDを消すと、'innerHTML' of nul　となる原因について調べる。
                button.id = `${i}`;
                button.innerHTML = State[__WEBPACK_IMPORTED_MODULE_1__game_board_js__["GAME_BOARD_DEFAULT_VALUE"]];
                button.addEventListener('click', () => {
                    humanPlayer.selectByUser(Math.floor(i / __WEBPACK_IMPORTED_MODULE_0__app_js__["game"].board.oneSideLength), i % __WEBPACK_IMPORTED_MODULE_0__app_js__["game"].board.oneSideLength);
                });

                pTag.appendChild(button);
                fragment.appendChild(pTag);
            }
            return fragment;
        };

        const createResetButton = () => {
            const resetButton = document.createElement('button');
            resetButton.innerHTML = 'リセット';
            resetButton.addEventListener('click', () => {
                __WEBPACK_IMPORTED_MODULE_0__app_js__["game"].board.init();
                __WEBPACK_IMPORTED_MODULE_0__app_js__["game"].ui.printBoard();
            });
            return resetButton;
        };

        const createDOM = () => {
            const divClassContent = document.createElement('div');
            divClassContent.className = 'content';

            divClassContent.appendChild(createTitle());

            divClassContent.appendChild(createCpuLevelSelectBox());

            divClassContent.appendChild(createGameBoard());

            divClassContent.appendChild(createResetButton());

            return divClassContent;
        };

        const el = createDOM();
        document.getElementById('root').appendChild(el);
    }

    /**
     * 現在のボードの状況を表示する。
     */
    printBoard() {
        for (let i = 0; i < __WEBPACK_IMPORTED_MODULE_0__app_js__["game"].board.oneSideLength * __WEBPACK_IMPORTED_MODULE_0__app_js__["game"].board.oneSideLength; i++) {
            document.getElementById(`${i}`).innerHTML = State[__WEBPACK_IMPORTED_MODULE_0__app_js__["game"].board.gameBoardArray[Math.floor(i / __WEBPACK_IMPORTED_MODULE_0__app_js__["game"].board.oneSideLength)][i % __WEBPACK_IMPORTED_MODULE_0__app_js__["game"].board.oneSideLength]];
        }
    }

    /**
     * 結果を表示する
     *
     * @param result Resultオブジェクトの項目を渡すこと。
     */
    printResultMessage(result) {
        this.printBoard();
        window.alert(result);
    }

    printIsAlreadyPutMessage() {
        window.alert('そこはすでに埋まっています。');
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Ui;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * 試合結果の定数オブジェクト
 */
/* harmony default export */ __webpack_exports__["a"] = (Result = Object.freeze({ DRAW: '引き分けです。', WIN: 'あなたの勝ちです。', LOSE: 'あなたの負けです。' }));


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * CPUの強さの定数オブジェクト
 */
/* harmony default export */ __webpack_exports__["a"] = (CpuLevel = Object.freeze({ EASY: 'Easy' }));


/***/ })
/******/ ]);