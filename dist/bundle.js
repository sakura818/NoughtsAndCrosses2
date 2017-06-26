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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Board; });
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Boardに関するものを集める
 *
 * @author asada
 */
var Board = function () {
    function Board() {
        _classCallCheck(this, Board);
    }

    /**
     * HTML上のボードを初期化する関数
     */


    _createClass(Board, [{
        key: "init",
        value: function init() {
            for (var i = 1; i < 4; i++) {
                for (var k = 1; k < 4; k++) {
                    put("" + i + k, DEFAULT);
                }
            }
        }

        /**
         * ゲームの終了条件を満たした確認する関数
         *
         * @param gameBoardArray
         */

    }, {
        key: "checkGameEnd",
        value: function checkGameEnd(gameBoardArray) {
            (function checkHorizontal() {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = gameBoardArray[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var val = _step.value;

                        if (val[0] === NOUGHTS && val[1] === NOUGHTS && val[2] === NOUGHTS) {
                            printResult(WIN);
                            endFlag = true;
                        }
                        if (val[0] === CROSSES && val[1] === CROSSES && val[2] === CROSSES) {
                            printResult(LOSE);
                            endFlag = true;
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            })();

            if (endFlag) {
                return;
            }

            (function checkVertical() {
                for (var y = 0; y < gameBoardArray.length; y++) {
                    if (gameBoardArray[0][y] === NOUGHTS && gameBoardArray[1][y] === NOUGHTS && gameBoardArray[2][y] === NOUGHTS) {
                        printResult(WIN);
                        endFlag = true;
                    }
                    if (gameBoardArray[0][y] === CROSSES && gameBoardArray[1][y] === CROSSES && gameBoardArray[2][y] === CROSSES) {
                        printResult(LOSE);
                        endFlag = true;
                    }
                }
            })();

            if (endFlag) {
                return;
            }

            (function checkUpperLeftToLowerRight() {
                if (gameBoardArray[0][0] === NOUGHTS && gameBoardArray[1][1] === NOUGHTS && gameBoardArray[2][2] === NOUGHTS) {
                    printResult(WIN);
                    endFlag = true;
                }
                if (gameBoardArray[0][0] === CROSSES && gameBoardArray[1][1] === CROSSES && gameBoardArray[2][2] === CROSSES) {
                    printResult(LOSE);
                    endFlag = true;
                }
            })();

            if (endFlag) {
                return;
            }

            (function checkUpperRightToLowerLeft() {
                if (gameBoardArray[0][2] === NOUGHTS && gameBoardArray[1][1] === NOUGHTS && gameBoardArray[2][0] === NOUGHTS) {
                    printResult(WIN);
                    endFlag = true;
                }
                if (gameBoardArray[0][2] === CROSSES && gameBoardArray[1][1] === CROSSES && gameBoardArray[2][0] === CROSSES) {
                    printResult(LOSE);
                    endFlag = true;
                }
            })();

            if (endFlag) {
                return;
            }

            var checkDraw = function checkDraw() {
                for (var x = 0; x < gameBoardArray.length; x++) {
                    for (var y = 0; y < gameBoardArray[x].length; y++) {
                        if (gameBoardArray[x][y] === DEFAULT) {
                            return;
                        }
                    }
                }
                endFlag = true;
                printResult(DRAW);
            };
            checkDraw();
        }

        /**
         * ボード上で選択した場所が埋まっている確認する
         */

    }, {
        key: "isAlreadyPut",
        value: function isAlreadyPut(id) {
            return getGameBoardById(id) !== DEFAULT;
        }
    }]);

    return Board;
}();

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Cpu; });
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * CPUに関するものを集める
 *
 * @author asada
 */
var Cpu = function () {
    function Cpu() {
        _classCallCheck(this, Cpu);
    }

    _createClass(Cpu, [{
        key: "select",
        value: function select() {
            var boardId = void 0;
            do {
                var boardIdArray = [11, 12, 13, 21, 22, 23, 31, 32, 33];
                boardId = boardIdArray[Math.floor(Math.random() * 9)];
            } while (isAlreadyPut(boardId));
            put(boardId, CROSSES);
        }
    }]);

    return Cpu;
}();

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Ui; });
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * UIに関するものを集める
 *
 * @author asada
 */
var Ui = function () {
    function Ui() {
        _classCallCheck(this, Ui);

        this.WIN = 'あなたの勝ちです';
        this.LOSE = 'あなたの負けです';
        this.DRAW = '引き分けです';
        this.NOT_FINISH = '';

        this.ALREADY_PUT = 'そこはすでに埋まっています';
        this.NO_ERROR = '';
    }

    /**
     * 試合結果を表示する
     *
     * @param result 表示したいものを渡す
     */


    _createClass(Ui, [{
        key: 'printResult',
        value: function printResult(result) {
            document.getElementById('result').innerHTML = result;
        }

        /**
         * ボードに駒を置く
         *
         * @param boardId 変えたいボードのID
         * @param state どう変えたいかを渡す
         */

    }, {
        key: 'put',
        value: function put(boardId, state) {
            document.getElementById(boardId).innerHTML = state;
        }

        /**
         * HTML上のボードの状態を取得する
         */

    }, {
        key: 'getGameBoard',
        value: function getGameBoard() {
            var gameBoard = new Array(3);
            for (var x = 0; x < 3; x++) {
                gameBoard[x] = new Array(3);
                for (var y = 0; y < 3; y++) {
                    gameBoard[x][y] = document.getElementById('' + (x + 1) + (y + 1)).innerHTML;
                }
            }
            return gameBoard;
        }

        /**
         * HTML上のボードの状態を取得する
         *
         * @param boardId 取得したいボードのID
         */

    }, {
        key: 'getGameBoardById',
        value: function getGameBoardById(boardId) {
            return document.getElementById(boardId).innerHTML;
        }

        /**
         * エラーを表示する。
         * または表示したエラーを削除する。
         *
         * @param message
         */

    }, {
        key: 'printError',
        value: function printError(message) {
            document.getElementById('error').innerHTML = message;
        }
    }]);

    return Ui;
}();

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Board__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Cpu__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Ui__ = __webpack_require__(2);




var NOUGHTS = '○';
var CROSSES = '×';
var DEFAULT = '_';
var endFlag = false;

function createDOM() {
    //DocumentFragmentを利用して再描画を一回にする
    var fragment = document.createDocumentFragment();

    var p = document.createElement('p');

    var _loop = function _loop(i) {
        if (i % 3 === 1) {
            p = document.createElement('p');
        }

        var el = document.createElement('button');
        el.addEventListener('click', function () {
            selectByUser(i);
        });

        p.appendChild(el);
        fragment.appendChild(p);
    };

    for (var i = 1; i < 10; i++) {
        _loop(i);
    }

    var resetButton = document.createElement('button');
    resetButton.addEventListener('click', function () {
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

var el = createDOM();
document.getElementById('root').appendChild(el);

var selectByUser = function selectByUser(id) {
    var board = new __WEBPACK_IMPORTED_MODULE_0__Board__["a" /* Board */]();
    var ui = new __WEBPACK_IMPORTED_MODULE_2__Ui__["a" /* Ui */]();
    var cpu = new __WEBPACK_IMPORTED_MODULE_1__Cpu__["a" /* Cpu */]();

    console.log(id + '\u306E\u30DC\u30BF\u30F3\u304C\u62BC\u3055\u308C\u307E\u3057\u305F\u3002');
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

/***/ })
/******/ ]);