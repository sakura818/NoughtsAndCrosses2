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
/***/ (function(module, exports) {

function print() {
    // template literal
    return '\n        <table>\n        <tr>\n            <td><input type="button" value="" id="11" onclick="select(id)"></td>\n            <td><input type="button" value="" id="11" onclick="select(id)"></td>\n            <td><input type="button" value="" id="11" onclick="select(id)"></td>\n';
    return '<table>' + '<tr>' + '<td><input type="button" value="" id="11" onclick="select(id)"></td>' + '<td><input type="button" value="" id="12" onclick="select(12)"></td>' + '<td><input type="button" value="" id="13" onclick="select(13)"></td>' + '</tr>' + '<tr>' + '<td><input type="button" value="" id="21" onclick="select(21)"></td>' + '<td><input type="button" value="" id="22" onclick="select(22)"></td>' + '<td><input type="button" value="" id="23" onclick="select(23)"></td>' + '</tr>' + '<tr>' + '<td><input type="button" value="" id="31" onclick="select(31)"></td>' + '<td><input type="button" value="" id="32" onclick="select(32)"></td>' + '<td><input type="button" value="" id="33" onclick="select(33)"></td>' + '</tr>' + '</table>';
}
function select(id) {
    console.log(id + '\u306E\u30DC\u30BF\u30F3\u304C\u62BC\u3055\u308C\u307E\u3057\u305F\u3002');
}

function createDOM() {
    var el = document.createElement("input");
    el.type = "button";
    el.addEventListener("click", function () {
        select(11);
    });
    el.addEventListener("click", function () {
        select(12);
    });
    return el;
}

var root = document.getElementById('root');
console.log(print());
root.innerHTML = print();

var el = createDOM();
root.appendChild(el);

select(1);

/***/ })
/******/ ]);