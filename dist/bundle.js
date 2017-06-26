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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RESULT", function() { return RESULT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CPU_LEVEL", function() { return CPU_LEVEL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "board", function() { return board; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ui", function() { return ui; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "humanPlayer", function() { return humanPlayer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cpu", function() { return cpu; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCpu", function() { return setCpu; });
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
var RESULT = Object.freeze({ DRAW: 0, WIN: 1, LOSE: 2 });

/**
 * CPUの強さの定数オブジェクト
 */
var CPU_LEVEL = Object.freeze({ EASY: 'Easy', NORMAL: 'Normal' });

var board = new __WEBPACK_IMPORTED_MODULE_0__Board__["a" /* default */](3, 3);

var ui = new __WEBPACK_IMPORTED_MODULE_1__Ui__["a" /* default */]();
var humanPlayer = new __WEBPACK_IMPORTED_MODULE_2__HumanPlayer__["a" /* default */](1);
var cpu = new __WEBPACK_IMPORTED_MODULE_3__Cpu__["a" /* EasyCpu */](2);

/**
 * CPUの強さを変更する関数
 *
 * @param cpuLevel
 */
var setCpu = function setCpu(cpuLevel) {
  switch (cpuLevel) {
    case CPU_LEVEL.EASY:
      cpu = new __WEBPACK_IMPORTED_MODULE_3__Cpu__["a" /* EasyCpu */](2);
      break;

    case CPU_LEVEL.NORMAL:
      cpu = new __WEBPACK_IMPORTED_MODULE_3__Cpu__["b" /* NormalCpu */](2);
      break;
  }
};

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app__ = __webpack_require__(0);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



/**
 * Boardクラス
 *
 * @author asada
 */

var Board = function () {
    function Board(oneSideLength, terminationCondition) {
        _classCallCheck(this, Board);

        this.oneSideLength = oneSideLength;
        this.terminationCondition = terminationCondition;
        this.DEFAULT = 0;
        this.endFlag = false;

        this.init();
    }

    _createClass(Board, [{
        key: 'getOneSideLength',
        value: function getOneSideLength() {
            return this.oneSideLength;
        }
    }, {
        key: 'copyGameBoardArray',
        value: function copyGameBoardArray() {
            var copyArray = new Array(3);
            for (var i = 0; i < this.oneSideLength; i++) {
                copyArray[i] = this.gameBoardArray.slice();
            }
            return copyArray;
        }

        /**
         * HTML上のボードを初期化する関数
         */

    }, {
        key: 'init',
        value: function init() {
            this.gameBoardArray = new Array(this.oneSideLength);
            for (var i = 0; i < this.oneSideLength; i++) {
                this.gameBoardArray[i] = new Array(this.oneSideLength).fill(this.DEFAULT);
            }

            this.endFlag = false;
        }

        /**
         * ボード上で選択した場所が埋まっている確認する
         */

    }, {
        key: 'isAlreadyPut',
        value: function isAlreadyPut(choice) {
            return this.gameBoardArray[Math.floor(choice / this.oneSideLength)][choice % this.oneSideLength] !== this.DEFAULT;
        }
    }, {
        key: 'put',
        value: function put(choice, playerID) {
            this.gameBoardArray[Math.floor(choice / this.oneSideLength)][choice % this.oneSideLength] = playerID;
        }

        /**
         * ゲームの終了条件を満たした確認する関数
         */

    }, {
        key: 'checkGameEnd',
        value: function checkGameEnd(playerId) {
            this.checkHorizontal(playerId);
            this.checkVertical(playerId);
            this.checkUpperLeftToLowerRight(playerId);
            this.checkUpperRightToLowerLeft(playerId);

            if (this.endFlag) {
                if (playerId === 1) {
                    __WEBPACK_IMPORTED_MODULE_0__app__["ui"].printResultMessage(__WEBPACK_IMPORTED_MODULE_0__app__["RESULT"].WIN);
                } else if (playerId === 2) {
                    __WEBPACK_IMPORTED_MODULE_0__app__["ui"].printResultMessage(__WEBPACK_IMPORTED_MODULE_0__app__["RESULT"].LOSE);
                }
                return;
            }
            this.checkDraw();
        }
    }, {
        key: 'checkHorizontal',
        value: function checkHorizontal(playerId) {
            for (var x = 0; x < this.oneSideLength; x++) {
                var score = 0;
                for (var y = 0; y < this.oneSideLength; y++) {
                    if (this.gameBoardArray[x][y] !== playerId) {
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
    }, {
        key: 'checkVertical',
        value: function checkVertical(playerId) {
            for (var y = 0; y < this.oneSideLength; y++) {
                var score = 0;
                for (var x = 0; x < this.oneSideLength; x++) {
                    if (this.gameBoardArray[x][y] !== playerId) {
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
    }, {
        key: 'checkUpperLeftToLowerRight',
        value: function checkUpperLeftToLowerRight(playerId) {
            for (var i = 0; i < this.oneSideLength; i++) {
                if (this.gameBoardArray[i][i] !== playerId) {
                    break;
                }
                if (i === this.terminationCondition - 1) {
                    this.endFlag = true;
                    return;
                }
            }
        }
    }, {
        key: 'checkUpperRightToLowerLeft',
        value: function checkUpperRightToLowerLeft(playerId) {
            for (var i = 0; i < this.oneSideLength; i++) {
                if (this.gameBoardArray[i][this.oneSideLength - 1 - i] !== playerId) {
                    break;
                }
                if (i === this.terminationCondition - 1) {
                    this.endFlag = true;
                    return;
                }
            }
        }
    }, {
        key: 'checkDraw',
        value: function checkDraw() {
            for (var x = 0; x < this.gameBoardArray.length; x++) {
                for (var y = 0; y < this.gameBoardArray[x].length; y++) {
                    if (this.gameBoardArray[x][y] === this.DEFAULT) {
                        return;
                    }
                }
            }
            this.endFlag = true;
            __WEBPACK_IMPORTED_MODULE_0__app__["ui"].printResultMessage(__WEBPACK_IMPORTED_MODULE_0__app__["RESULT"].DRAW);
        }
    }]);

    return Board;
}();

/* harmony default export */ __webpack_exports__["a"] = (Board);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EasyCpu; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return NormalCpu; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app__ = __webpack_require__(0);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }


/**
 * コンピュータのプレイヤー
 *
 * @author asada
 */

var Cpu = function () {
    function Cpu(playerId) {
        _classCallCheck(this, Cpu);

        this.playerId = playerId;
    }

    _createClass(Cpu, [{
        key: 'selectByCpu',
        value: function selectByCpu() {
            throw new Error('You have to implement the method doSomething!');
        }
    }]);

    return Cpu;
}();

/**
 * 弱いCPU
 *
 * @author asada
 */


var EasyCpu = function (_Cpu) {
    _inherits(EasyCpu, _Cpu);

    function EasyCpu(playerId) {
        _classCallCheck(this, EasyCpu);

        var _this = _possibleConstructorReturn(this, (EasyCpu.__proto__ || Object.getPrototypeOf(EasyCpu)).call(this, playerId));

        console.log('イージーCPUが呼ばれました。');
        return _this;
    }

    _createClass(EasyCpu, [{
        key: 'selectByCpu',
        value: function selectByCpu() {
            var boardId = void 0;
            do {
                boardId = Math.floor(Math.random() * __WEBPACK_IMPORTED_MODULE_0__app__["board"].getOneSideLength() * __WEBPACK_IMPORTED_MODULE_0__app__["board"].getOneSideLength());
            } while (__WEBPACK_IMPORTED_MODULE_0__app__["board"].isAlreadyPut(boardId));
            __WEBPACK_IMPORTED_MODULE_0__app__["board"].put(boardId, this.playerId);
        }
    }]);

    return EasyCpu;
}(Cpu);

var NormalCpu = function (_Cpu2) {
    _inherits(NormalCpu, _Cpu2);

    function NormalCpu(playerId) {
        _classCallCheck(this, NormalCpu);

        var _this2 = _possibleConstructorReturn(this, (NormalCpu.__proto__ || Object.getPrototypeOf(NormalCpu)).call(this, playerId));

        console.log('ノーマルCPUが呼ばれました。');
        return _this2;
    }

    _createClass(NormalCpu, [{
        key: 'selectByCpu',
        value: function selectByCpu() {}
    }]);

    return NormalCpu;
}(Cpu);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app__ = __webpack_require__(0);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



/**
 * 人間のプレイヤー
 *
 * @author asada
 */

var HumanPlayer = function () {
    function HumanPlayer(playerId) {
        _classCallCheck(this, HumanPlayer);

        this.playerId = playerId;
    }

    /**
     * ユーザーが選択した場合に呼び出される関数
     *
     * @param boardId 押したボタンのID
     */


    _createClass(HumanPlayer, [{
        key: 'selectByUser',
        value: function selectByUser(boardId) {
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
    }]);

    return HumanPlayer;
}();

/* harmony default export */ __webpack_exports__["a"] = (HumanPlayer);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_js__ = __webpack_require__(0);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



/**
 * UIクラス
 *
 * @author asada
 */

var Ui = function () {
    /**
     * コンストラクタ
     * タイトル、ゲームボード、リセットボタンを作成して、表示する。
     */
    function Ui() {
        _classCallCheck(this, Ui);

        var createTitle = function createTitle() {
            var title = document.createElement('h1');
            title.innerHTML = '○×ゲーム';
            return title;
        };

        var createCpuLevelSelectBox = function createCpuLevelSelectBox() {
            var form = document.createElement('form');
            form.action = '#';

            var select = document.createElement('select');
            select.name = 'CpuLevel';
            select.addEventListener('change', function () {
                __WEBPACK_IMPORTED_MODULE_0__app_js__["board"].init();
                __WEBPACK_IMPORTED_MODULE_0__app_js__["ui"].printBoard();
            });

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = Object.keys(__WEBPACK_IMPORTED_MODULE_0__app_js__["CPU_LEVEL"])[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var value = _step.value;

                    var option = document.createElement('option');
                    option.value = __WEBPACK_IMPORTED_MODULE_0__app_js__["CPU_LEVEL"][value];
                    option.innerHTML = __WEBPACK_IMPORTED_MODULE_0__app_js__["CPU_LEVEL"][value];
                    select.appendChild(option);
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

            form.appendChild(select);
            return form;
        };

        var createGameBoard = function createGameBoard() {
            var fragment = document.createDocumentFragment();

            var pTag = document.createElement('p');

            var _loop = function _loop(i) {
                if (i % 3 === 0) {
                    pTag = document.createElement('p');
                }

                var button = document.createElement('button');
                //TODO ここでIDを消すと、'innerHTML' of nul　となる原因について調べる。
                button.id = '' + i;
                button.innerHTML = '_';
                button.addEventListener('click', function () {
                    __WEBPACK_IMPORTED_MODULE_0__app_js__["humanPlayer"].selectByUser(i);
                });

                pTag.appendChild(button);
                fragment.appendChild(pTag);
            };

            for (var i = 0; i < 9; i++) {
                _loop(i);
            }

            return fragment;
        };

        var createResetButton = function createResetButton() {
            var resetButton = document.createElement('button');
            //IDを付与しているが、
            resetButton.id = 'reset';
            resetButton.innerHTML = 'リセット';
            resetButton.addEventListener('click', function () {
                __WEBPACK_IMPORTED_MODULE_0__app_js__["board"].init();
                __WEBPACK_IMPORTED_MODULE_0__app_js__["ui"].printBoard();
            });
            return resetButton;
        };

        var createDOM = function createDOM() {
            //div class contentの中にタイトル、ゲームボード、リセットボタンを格納する。
            var divClassCenter = document.createElement('div');
            divClassCenter.className = 'content';

            divClassCenter.appendChild(createTitle());

            divClassCenter.appendChild(createCpuLevelSelectBox());

            divClassCenter.appendChild(createGameBoard());

            divClassCenter.appendChild(createResetButton());

            return divClassCenter;
        };

        var el = createDOM();
        document.getElementById('root').appendChild(el);
    }

    /**
     * 現在のボードの状況を表示する。
     */


    _createClass(Ui, [{
        key: 'printBoard',
        value: function printBoard() {
            for (var i = 0; i < 9; i++) {
                var el = void 0;
                switch (__WEBPACK_IMPORTED_MODULE_0__app_js__["board"].gameBoardArray[Math.floor(i / __WEBPACK_IMPORTED_MODULE_0__app_js__["board"].oneSideLength)][i % __WEBPACK_IMPORTED_MODULE_0__app_js__["board"].oneSideLength]) {
                    case __WEBPACK_IMPORTED_MODULE_0__app_js__["board"].DEFAULT:
                        el = '_';
                        break;

                    case 1:
                        el = '○';
                        break;

                    case 2:
                        el = '×';
                        break;

                    default:

                }
                document.getElementById('' + i).innerHTML = el;
            }
        }

        /**
         * 結果を表示する
         * TODO alertでいいのか疑問
         *
         * @param result DRAW,WIN,LOSE のいずれかを渡すこと。
         */

    }, {
        key: 'printResultMessage',
        value: function printResultMessage(result) {

            this.printBoard();

            switch (result) {
                case __WEBPACK_IMPORTED_MODULE_0__app_js__["RESULT"].DRAW:
                    window.alert('引き分けです。');
                    break;

                case __WEBPACK_IMPORTED_MODULE_0__app_js__["RESULT"].WIN:
                    window.alert('あなたの勝ちです。');
                    break;

                case __WEBPACK_IMPORTED_MODULE_0__app_js__["RESULT"].LOSE:
                    window.alert('あなたの負けです。');
                    break;

                default:
                    window.alert('アプリ内で予期しない動作がありました。');
            }
        }
    }, {
        key: 'printIsAlreadyPutMessage',
        value: function printIsAlreadyPutMessage() {
            window.alert('そこはすでに埋まっています。');
        }
    }]);

    return Ui;
}();

/* harmony default export */ __webpack_exports__["a"] = (Ui);

/***/ })
/******/ ]);