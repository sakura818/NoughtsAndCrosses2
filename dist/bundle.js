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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cpu", function() { return cpu; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Board__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Ui__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__HumanPlayer__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Cpu__ = __webpack_require__(2);





/**
 * index.htmlのボタンの処理をまとめる
 *
 * @author asada
 */

/**
 * 試合結果の定数オブジェクト
 */
const Result = Object.freeze({DRAW: Symbol(0), WIN: Symbol(1), LOSE: Symbol(2)});
/* harmony export (immutable) */ __webpack_exports__["Result"] = Result;


/**
 * CPUの強さの定数オブジェクト
 */
const CpuLevel = Object.freeze({EASY: 'Easy', NORMAL: 'Normal'});
/* harmony export (immutable) */ __webpack_exports__["CpuLevel"] = CpuLevel;


const board = new __WEBPACK_IMPORTED_MODULE_0__Board__["a" /* default */](3, 3);
/* harmony export (immutable) */ __webpack_exports__["board"] = board;


const ui = new __WEBPACK_IMPORTED_MODULE_1__Ui__["a" /* default */]();
/* harmony export (immutable) */ __webpack_exports__["ui"] = ui;

const humanPlayer = new __WEBPACK_IMPORTED_MODULE_2__HumanPlayer__["a" /* default */](1);
/* harmony export (immutable) */ __webpack_exports__["humanPlayer"] = humanPlayer;

let cpu = new __WEBPACK_IMPORTED_MODULE_3__Cpu__["a" /* EasyCpu */](2);

/**
 * CPUの強さを変更する関数
 *
 * @param cpuLevel
 */
const setCpu = (cpuLevel) => {
    switch (cpuLevel) {
        case CpuLevel.EASY:
            cpu = new __WEBPACK_IMPORTED_MODULE_3__Cpu__["a" /* EasyCpu */](2);
            break;

        case CpuLevel.NORMAL:
            cpu = new __WEBPACK_IMPORTED_MODULE_3__Cpu__["b" /* NormalCpu */](2);
            break;
    }
};
/* harmony export (immutable) */ __webpack_exports__["setCpu"] = setCpu;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app__ = __webpack_require__(0);


/**
 * Boardクラス
 *
 * @author asada
 */
class Board {
    constructor(oneSideLength = 3, terminationCondition = 3) {
        this.oneSideLength = oneSideLength;
        this.terminationCondition = terminationCondition;
        this.DEFAULT = 0;
        this.endFlag = false;

        this.init();
    }

    getOneSideLength() {
        return this.oneSideLength;
    }

    copyGameBoardArray() {
        let copyArray = new Array(this.oneSideLength);
        for (let i = 0; i < this.oneSideLength; i++) {
            copyArray[i] = this._gameBoardArray[i].slice();
        }
        return copyArray;
    }

    /**
     * HTML上のボードを初期化する関数
     */
    init() {
        this._gameBoardArray = new Array(this.oneSideLength);
        for (let i = 0; i < this.oneSideLength; i++) {
            this._gameBoardArray[i] = new Array(this.oneSideLength).fill(this.DEFAULT);
        }

        this.endFlag = false;
    }

    /**
     * ボード上で選択した場所が埋まっている確認する
     */
    isAlreadyPut(choice) {
        return this._gameBoardArray[Math.floor(choice / this.oneSideLength)][choice % this.oneSideLength] !== this.DEFAULT;
    }

    put(choice, playerID) {
        this._gameBoardArray[Math.floor(choice / this.oneSideLength)][choice % this.oneSideLength] = playerID;
    }

    /**
     * ゲームの終了条件を満たした確認する関数
     */
    checkGameEnd(playerId) {
        this.checkHorizontal(playerId);
        this.checkVertical(playerId);
        this.checkUpperLeftToLowerRight(playerId);
        this.checkUpperRightToLowerLeft(playerId);

        if (this.endFlag) {
            if (playerId === 1) {
                __WEBPACK_IMPORTED_MODULE_0__app__["ui"].printResultMessage(__WEBPACK_IMPORTED_MODULE_0__app__["Result"].WIN);

            } else if (playerId === 2) {
                __WEBPACK_IMPORTED_MODULE_0__app__["ui"].printResultMessage(__WEBPACK_IMPORTED_MODULE_0__app__["Result"].LOSE);
            }
            return;
        }
        this.checkDraw();
    }

    checkHorizontal(playerId) {
        for (let x = 0; x < this.oneSideLength; x++) {
            let score = 0;
            for (let y = 0; y < this.oneSideLength; y++) {
                if (this._gameBoardArray[x][y] !== playerId) {
                    score = 0;
                    continue;
                }
                score++;
                //スコアが終了条件と同じになると終了
                if (score === this.terminationCondition) {
                    this.endFlag = true;
                    return;
                }
            }
        }
    }

    checkVertical(playerId) {
        for (let y = 0; y < this.oneSideLength; y++) {
            let score = 0;
            for (let x = 0; x < this.oneSideLength; x++) {
                if (this._gameBoardArray[x][y] !== playerId) {
                    score = 0;
                    continue;
                }
                score++;
                //スコアが終了条件と同じになると終了
                if (score === this.terminationCondition) {
                    this.endFlag = true;
                    return;
                }
            }
        }
    }

    checkUpperLeftToLowerRight(playerId) {
        for (let i = 0; i < this.oneSideLength; i++) {
            if (this._gameBoardArray[i][i] !== playerId) {
                break;
            }
            if (i === this.terminationCondition - 1) {
                this.endFlag = true;
                return;
            }
        }
    }

    checkUpperRightToLowerLeft(playerId) {
        for (let i = 0; i < this.oneSideLength; i++) {
            if (this._gameBoardArray[i][this.oneSideLength - 1 - i] !== playerId) {
                break;
            }
            if (i === this.terminationCondition - 1) {
                this.endFlag = true;
                return;
            }
        }
    }

    checkDraw() {
        for (let x = 0; x < this._gameBoardArray.length; x++) {
            for (let y = 0; y < this._gameBoardArray[x].length; y++) {
                if (this._gameBoardArray[x][y] === this.DEFAULT) {
                    return;
                }
            }
        }
        this.endFlag = true;
        __WEBPACK_IMPORTED_MODULE_0__app__["ui"].printResultMessage(__WEBPACK_IMPORTED_MODULE_0__app__["Result"].DRAW);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Board;



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
const defaultScore = -1;

class Cpu {
    constructor(playerId) {
        this.playerId = playerId;
    }

    selectByCpu() {
        throw new Error('You have to implement the method doSomething!');
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
        let boardId;
        do {
            boardId = Math.floor(Math.random() * __WEBPACK_IMPORTED_MODULE_0__app__["board"].getOneSideLength() * __WEBPACK_IMPORTED_MODULE_0__app__["board"].getOneSideLength());
        } while (__WEBPACK_IMPORTED_MODULE_0__app__["board"].isAlreadyPut(boardId));
        __WEBPACK_IMPORTED_MODULE_0__app__["board"].put(boardId, this.playerId);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = EasyCpu;


/**
 * 普通の強さのCPU
 *
 * @author asada
 */
class NormalCpu extends Cpu {
    constructor(playerId) {
        super(playerId);
    }

    selectByCpu() {
        const gameBoardArray = __WEBPACK_IMPORTED_MODULE_0__app__["board"].copyGameBoardArray();

        const checkHorizontal = () => {
            let choice = defaultScore;

            for (let x = 0; x < gameBoardArray.length; x++) {

                let mine = 0;
                let notMine = 0;

                for (let y = 0; y < gameBoardArray[x].length; y++) {
                    if (gameBoardArray[x][y] === this.playerId) {
                        mine++;
                    } else if (gameBoardArray[x][y] !== __WEBPACK_IMPORTED_MODULE_0__app__["board"].DEFAULT) {
                        notMine++;
                    }

                    //自分がリーチ
                    if (mine === __WEBPACK_IMPORTED_MODULE_0__app__["board"].terminationCondition - 1) {
                        for (let i = 0; i < gameBoardArray[x].length; i++) {
                            if (gameBoardArray[x][i] === __WEBPACK_IMPORTED_MODULE_0__app__["board"].DEFAULT) {
                                return (x * gameBoardArray.length) + i;
                            }
                        }
                    }

                    //自分以外がリーチ
                    if (notMine === __WEBPACK_IMPORTED_MODULE_0__app__["board"].terminationCondition - 1) {
                        for (let i = 0; i < gameBoardArray[x].length; i++) {
                            if (gameBoardArray[x][i] === __WEBPACK_IMPORTED_MODULE_0__app__["board"].DEFAULT) {
                                choice = (x * gameBoardArray.length) + i;
                            }
                        }
                    }
                }
            }
            return choice;
        };

        const checkVertical = () => {
            let choice = defaultScore;

            for (let y = 0; y < 3; y++) {

                let mine = 0;
                let notMine = 0;

                for (let x = 0; x < 3; x++) {
                    if (gameBoardArray[x][y] === this.playerId) {
                        mine++;
                    } else if (gameBoardArray[x][y] !== __WEBPACK_IMPORTED_MODULE_0__app__["board"].DEFAULT) {
                        notMine++;
                    }

                    //自分がリーチ
                    if (mine === __WEBPACK_IMPORTED_MODULE_0__app__["board"].terminationCondition - 1) {
                        for (let i = 0; i < 3; i++) {
                            if (gameBoardArray[i][y] === __WEBPACK_IMPORTED_MODULE_0__app__["board"].DEFAULT) {
                                return (i * 3) + y;
                            }
                        }
                    }

                    //自分以外がリーチ
                    if (notMine === __WEBPACK_IMPORTED_MODULE_0__app__["board"].terminationCondition - 1) {
                        for (let i = 0; i < 3; i++) {
                            if (gameBoardArray[i][y] === __WEBPACK_IMPORTED_MODULE_0__app__["board"].DEFAULT) {
                                choice = (i * 3) + y;
                            }
                        }
                    }
                }
            }
            return choice;
        };

        const checkSlanting = () => {
            if (isDefault(1, 1)) {
                return 4;

            } else if (gameBoardArray[1][1] === this.playerId) {
                //中央を自分が取っている場合は積極的に隅をとる
                if (isDefault(0, 0)) {
                    return 0;

                } else if (isDefault(2, 2)) {
                    return 8;

                } else if (isDefault(0, 2)) {
                    return 2;

                } else if (isDefault(2, 0)) {
                    return 6;
                }

            } else {
                //自分以外が中央を取っている場合は邪魔をする

                //相手のリーチを確認
                if (isNotMineAndNotDefault(this.playerId, 0, 0)) {
                    if (isDefault(2, 2)) {
                        return 8;
                    }
                }
                if (isNotMineAndNotDefault(this.playerId, 2, 2)) {
                    if (isDefault(0, 0)) {
                        return 0;
                    }
                }
                if (isNotMineAndNotDefault(this.playerId, 0, 2)) {
                    if (isDefault(2, 0)) {
                        return 6;
                    }
                }
                if (isNotMineAndNotDefault(this.playerId, 2, 0)) {
                    if (isDefault(0, 2)) {
                        return 2;
                    }
                }
                //隅をとる
                if (isDefault(0, 0)) {
                    return 0;

                } else if (isDefault(0, 2)) {
                    return 2;

                } else if (isDefault(2, 0)) {
                    return 6;

                } else if (isDefault(2, 2)) {
                    return 8;
                }
            }
            return defaultScore;

            function isDefault(x, y) {
                return gameBoardArray[x][y] === __WEBPACK_IMPORTED_MODULE_0__app__["board"].DEFAULT;
            }


            function isNotMineAndNotDefault(playerId, x, y) {
                return gameBoardArray[x][y] !== __WEBPACK_IMPORTED_MODULE_0__app__["board"].DEFAULT && gameBoardArray[x][y] !== playerId;
            }
        };

        let choice = checkHorizontal();
        if (choice !== defaultScore) {
            __WEBPACK_IMPORTED_MODULE_0__app__["board"].put(choice, this.playerId);
            return;
        }
        choice = checkVertical();
        if (choice !== defaultScore) {
            __WEBPACK_IMPORTED_MODULE_0__app__["board"].put(choice, this.playerId);
            return;
        }
        choice = checkSlanting();
        if (choice !== defaultScore) {
            __WEBPACK_IMPORTED_MODULE_0__app__["board"].put(choice, this.playerId);
            return;
        }
        
        let boardId;
        do {
            boardId = Math.floor(Math.random() * __WEBPACK_IMPORTED_MODULE_0__app__["board"].getOneSideLength() * __WEBPACK_IMPORTED_MODULE_0__app__["board"].getOneSideLength());
        } while (__WEBPACK_IMPORTED_MODULE_0__app__["board"].isAlreadyPut(boardId));
        __WEBPACK_IMPORTED_MODULE_0__app__["board"].put(boardId, this.playerId);
    }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = NormalCpu;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app__ = __webpack_require__(0);


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
     *
     * @param boardId 押したボタンのID
     */
    selectByUser(boardId) {
        if (__WEBPACK_IMPORTED_MODULE_0__app__["board"].endFlag) {
            return;
        }
        if (__WEBPACK_IMPORTED_MODULE_0__app__["board"].isAlreadyPut(boardId)) {
            __WEBPACK_IMPORTED_MODULE_0__app__["ui"].printIsAlreadyPutMessage();
            return;
        }
        __WEBPACK_IMPORTED_MODULE_0__app__["board"].put(boardId, this.playerId);
        __WEBPACK_IMPORTED_MODULE_0__app__["board"].checkGameEnd(this.playerId);

        //CPUの手番。
        if (__WEBPACK_IMPORTED_MODULE_0__app__["board"].endFlag) {
            return;
        }
        __WEBPACK_IMPORTED_MODULE_0__app__["cpu"].selectByCpu();
        __WEBPACK_IMPORTED_MODULE_0__app__["board"].checkGameEnd(__WEBPACK_IMPORTED_MODULE_0__app__["cpu"].playerId);

        __WEBPACK_IMPORTED_MODULE_0__app__["ui"].printBoard();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = HumanPlayer;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_js__ = __webpack_require__(0);


/**
 * UIクラス
 *
 * @author asada
 */
const State = {0: '_', 1: '○', 2: '×'};

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
            const form = document.createElement('form');

            let pTag = document.createElement('p');
            pTag.innerHTML = 'CPUの難易度:';

            const select = document.createElement('select');
            select.id = 'CpuLevel';
            select.addEventListener('change', () => {
                __WEBPACK_IMPORTED_MODULE_0__app_js__["board"].init();
                __WEBPACK_IMPORTED_MODULE_0__app_js__["ui"].printBoard();
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__app_js__["setCpu"])(document.getElementById('CpuLevel').value);
            });

            for (let value of Object.keys(__WEBPACK_IMPORTED_MODULE_0__app_js__["CpuLevel"])) {
                let option = document.createElement('option');
                option.value = __WEBPACK_IMPORTED_MODULE_0__app_js__["CpuLevel"][value];
                option.innerHTML = __WEBPACK_IMPORTED_MODULE_0__app_js__["CpuLevel"][value];
                select.appendChild(option);
            }

            pTag.appendChild(select);

            form.appendChild(pTag);
            return form;
        };

        const createGameBoard = () => {
            const fragment = document.createDocumentFragment();

            let pTag = document.createElement('p');
            for (let i = 0; i < __WEBPACK_IMPORTED_MODULE_0__app_js__["board"].oneSideLength * __WEBPACK_IMPORTED_MODULE_0__app_js__["board"].oneSideLength; i++) {
                if (i % __WEBPACK_IMPORTED_MODULE_0__app_js__["board"].oneSideLength === 0) {
                    pTag = document.createElement('p');
                }

                let button = document.createElement('button');
                //TODO ここでIDを消すと、'innerHTML' of nul　となる原因について調べる。
                button.id = `${i}`;
                button.innerHTML = State[__WEBPACK_IMPORTED_MODULE_0__app_js__["board"].DEFAULT];
                button.addEventListener('click', () => {
                    __WEBPACK_IMPORTED_MODULE_0__app_js__["humanPlayer"].selectByUser(i);
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
                __WEBPACK_IMPORTED_MODULE_0__app_js__["board"].init();
                __WEBPACK_IMPORTED_MODULE_0__app_js__["ui"].printBoard();
            });
            return resetButton;
        };

        const createDOM = () => {
            //div class contentの中にタイトル、ゲームボード、リセットボタンを格納する。
            const divClassCenter = document.createElement('div');
            divClassCenter.className = 'content';

            divClassCenter.appendChild(createTitle());

            divClassCenter.appendChild(createCpuLevelSelectBox());

            divClassCenter.appendChild(createGameBoard());

            divClassCenter.appendChild(createResetButton());

            return divClassCenter;
        };

        const el = createDOM();
        document.getElementById('root').appendChild(el);
    }

    /**
     * 現在のボードの状況を表示する。
     */
    printBoard() {
        for (let i = 0; i < __WEBPACK_IMPORTED_MODULE_0__app_js__["board"].oneSideLength * __WEBPACK_IMPORTED_MODULE_0__app_js__["board"].oneSideLength; i++) {
            document.getElementById(`${i}`).innerHTML = State[__WEBPACK_IMPORTED_MODULE_0__app_js__["board"].copyGameBoardArray()[Math.floor(i / __WEBPACK_IMPORTED_MODULE_0__app_js__["board"].oneSideLength)][i % __WEBPACK_IMPORTED_MODULE_0__app_js__["board"].oneSideLength]];
        }
    }

    /**
     * 結果を表示する
     *
     * @param result Resultオブジェクトの項目を渡すこと。
     */
    printResultMessage(result) {

        this.printBoard();

        switch (result) {
            case __WEBPACK_IMPORTED_MODULE_0__app_js__["Result"].DRAW:
                window.alert('引き分けです。');
                break;

            case __WEBPACK_IMPORTED_MODULE_0__app_js__["Result"].WIN:
                window.alert('あなたの勝ちです。');
                break;

            case __WEBPACK_IMPORTED_MODULE_0__app_js__["Result"].LOSE:
                window.alert('あなたの負けです。');
                break;

            default:
                window.alert('アプリ内で予期しない動作がありました。');
        }
    }

    printIsAlreadyPutMessage() {
        window.alert('そこはすでに埋まっています。');
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Ui;


/***/ })
/******/ ]);