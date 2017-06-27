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
/* harmony export (immutable) */ __webpack_exports__["setCpu"] = setCpu;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Board__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Ui__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__HumanPlayer__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Cpu__ = __webpack_require__(2);





/**
 * 各クラスをインスタンス化する
 *
 * @author asada
 */

/**
 * 試合結果の定数オブジェクト
 */
const Result = Object.freeze({ DRAW: '引き分けです。', WIN: 'あなたの勝ちです。', LOSE: 'あなたの負けです。' });
/* harmony export (immutable) */ __webpack_exports__["Result"] = Result;


/**
 * CPUの強さの定数オブジェクト
 */
const CpuLevel = Object.freeze({ EASY: 'Easy' });
/* harmony export (immutable) */ __webpack_exports__["CpuLevel"] = CpuLevel;


const board = new __WEBPACK_IMPORTED_MODULE_0__Board__["a" /* SquareBoard */](3, 3);
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
function setCpu(cpuLevel) {
    switch (cpuLevel) {
        case CpuLevel.EASY:
            cpu = new __WEBPACK_IMPORTED_MODULE_3__Cpu__["a" /* EasyCpu */](2);
            break;

        default:
            window.alert('存在しないCPUが選択されました。');
    }
}

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
const DEFAULT_STATE = 0;

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
            this.gameBoardArray[i] = new Array(this.oneSideLength).fill(DEFAULT_STATE);
        }

        this.endFlag = false;
    }

    /**
     * ボード上で選択した場所が埋まっている確認する
     * @return {boolean} 埋まっている場合はtrue、埋まっていない場合はfalse
     */
    isAlreadyPut(x, y) {
        return this.gameBoardArray[x][y] !== DEFAULT_STATE;
    }

    put(x, y, playerID) {
        this.gameBoardArray[x][y] = playerID;
    }

    /**
     * ゲームの終了条件を満たしたか確認する
     */
    checkGameEnd(playerId) {
        if (this._checkHorizontal(playerId) || this._checkVertical(playerId) || this._checkUpperLeftToLowerRight(playerId) || this._checkUpperRightToLowerLeft(playerId)) {
            this.endFlag = true;
        }

        if (this.endFlag) {
            if (playerId === 1) {
                __WEBPACK_IMPORTED_MODULE_0__app__["ui"].printResultMessage(__WEBPACK_IMPORTED_MODULE_0__app__["Result"].WIN);

            } else if (playerId === 2) {
                __WEBPACK_IMPORTED_MODULE_0__app__["ui"].printResultMessage(__WEBPACK_IMPORTED_MODULE_0__app__["Result"].LOSE);
            }
            return;
        }

        if (this._checkDraw()) {
            this.endFlag = true;
            __WEBPACK_IMPORTED_MODULE_0__app__["ui"].printResultMessage(__WEBPACK_IMPORTED_MODULE_0__app__["Result"].DRAW);
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
                if (this.gameBoardArray[x][y] === DEFAULT_STATE) {
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
            let random = Math.floor(Math.random() * __WEBPACK_IMPORTED_MODULE_0__app__["board"].getOneSideLength() * __WEBPACK_IMPORTED_MODULE_0__app__["board"].getOneSideLength());
            x = Math.floor(random / __WEBPACK_IMPORTED_MODULE_0__app__["board"].oneSideLength);
            y = random % __WEBPACK_IMPORTED_MODULE_0__app__["board"].oneSideLength;
        } while (__WEBPACK_IMPORTED_MODULE_0__app__["board"].isAlreadyPut(x, y));
        __WEBPACK_IMPORTED_MODULE_0__app__["board"].put(x, y, this.playerId);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = EasyCpu;


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
     */
    selectByUser(x, y) {
        if (__WEBPACK_IMPORTED_MODULE_0__app__["board"].endFlag) {
            return;
        }

        if (__WEBPACK_IMPORTED_MODULE_0__app__["board"].isAlreadyPut(x, y)) {
            __WEBPACK_IMPORTED_MODULE_0__app__["ui"].printIsAlreadyPutMessage();
            return;
        }
        __WEBPACK_IMPORTED_MODULE_0__app__["board"].put(x, y, this.playerId);
        __WEBPACK_IMPORTED_MODULE_0__app__["board"].checkGameEnd(this.playerId);

        if (__WEBPACK_IMPORTED_MODULE_0__app__["board"].endFlag) {
            return;
        }
        try {
            __WEBPACK_IMPORTED_MODULE_0__app__["cpu"].selectByCpu();
        } catch (e) {
            console.log(e);
            window.alert('選択されたCPUは未実装です。');
        }
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

const State = Object.freeze({ 0: '_', 1: '○', 2: '×' });

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
                __WEBPACK_IMPORTED_MODULE_0__app_js__["board"].init();
                __WEBPACK_IMPORTED_MODULE_0__app_js__["ui"].printBoard();
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__app_js__["setCpu"])(document.getElementById('CpuLevel').value);
            });

            //オプションを作る
            for (let value of Object.keys(__WEBPACK_IMPORTED_MODULE_0__app_js__["CpuLevel"])) {
                let option = document.createElement('option');
                option.value = __WEBPACK_IMPORTED_MODULE_0__app_js__["CpuLevel"][value];
                option.innerHTML = __WEBPACK_IMPORTED_MODULE_0__app_js__["CpuLevel"][value];
                select.appendChild(option);
            }

            pTag.appendChild(select);
            return pTag;
        };

        const createGameBoard = () => {
            const fragment = document.createDocumentFragment();

            //pタグで段落をつける
            let pTag = document.createElement('p');
            for (let i = 0; i < __WEBPACK_IMPORTED_MODULE_0__app_js__["board"].oneSideLength * __WEBPACK_IMPORTED_MODULE_0__app_js__["board"].oneSideLength; i++) {
                if (i % __WEBPACK_IMPORTED_MODULE_0__app_js__["board"].oneSideLength === 0) {
                    pTag = document.createElement('p');
                }

                let button = document.createElement('button');
                //TODO ここでIDを消すと、'innerHTML' of nul　となる原因について調べる。
                button.id = `${i}`;
                button.innerHTML = State[0];
                button.addEventListener('click', () => {
                    __WEBPACK_IMPORTED_MODULE_0__app_js__["humanPlayer"].selectByUser(Math.floor(i / __WEBPACK_IMPORTED_MODULE_0__app_js__["board"].oneSideLength), i % __WEBPACK_IMPORTED_MODULE_0__app_js__["board"].oneSideLength);
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
        for (let i = 0; i < __WEBPACK_IMPORTED_MODULE_0__app_js__["board"].oneSideLength * __WEBPACK_IMPORTED_MODULE_0__app_js__["board"].oneSideLength; i++) {
            document.getElementById(`${i}`).innerHTML = State[__WEBPACK_IMPORTED_MODULE_0__app_js__["board"].gameBoardArray[Math.floor(i / __WEBPACK_IMPORTED_MODULE_0__app_js__["board"].oneSideLength)][i % __WEBPACK_IMPORTED_MODULE_0__app_js__["board"].oneSideLength]];
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


/***/ })
/******/ ]);