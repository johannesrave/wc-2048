// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"ts/gameScore.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameScore = void 0;

var GameScore = /*#__PURE__*/function (_HTMLElement) {
  _inherits(GameScore, _HTMLElement);

  var _super = _createSuper(GameScore);

  function GameScore() {
    var _this;

    _classCallCheck(this, GameScore);

    _this = _super.call(this);
    _this._score = 0;
    _this.score = 0;
    return _this;
  }

  _createClass(GameScore, [{
    key: "score",
    get: function get() {
      return this._score;
    },
    set: function set(value) {
      this._score = value;
      this.innerHTML = "\n      <style>\n        game-score {\n          contain: content;\n          display: grid;\n          place-content: center;\n        }\n      </style>\n      <p>Score: ".concat(this._score, "</p>\n    ");
    }
  }]);

  return GameScore;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

exports.GameScore = GameScore;
},{}],"ts/gameTile.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameTile = void 0;

var GameTile = /*#__PURE__*/function (_HTMLElement) {
  _inherits(GameTile, _HTMLElement);

  var _super = _createSuper(GameTile);

  function GameTile() {
    _classCallCheck(this, GameTile);

    return _super.apply(this, arguments);
  }

  _createClass(GameTile, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      var _a, _b;

      this.innerHTML = "\n    <style>\n    game-tile {\n      display: grid;\n      contain: layout size style;\n      grid-auto-flow: row;\n      place-content: center;\n    }\n    </style>\n    ";
      var xString = (_a = this.getAttribute('x')) !== null && _a !== void 0 ? _a : '';
      this.x = parseInt(xString);
      var yString = (_b = this.getAttribute('y')) !== null && _b !== void 0 ? _b : '';
      this.y = parseInt(yString);
    }
  }]);

  return GameTile;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

exports.GameTile = GameTile;
},{}],"ts/gameBoard.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameBoard = void 0;

var GameBoard = /*#__PURE__*/function (_HTMLElement) {
  _inherits(GameBoard, _HTMLElement);

  var _super = _createSuper(GameBoard);

  function GameBoard() {
    var _this;

    _classCallCheck(this, GameBoard);

    var _a, _b;

    _this = _super.call(this);
    _this.board = [];
    var rowsAttribute = (_a = _this.getAttribute('rows')) !== null && _a !== void 0 ? _a : '4';
    _this.rows = parseInt(rowsAttribute);
    var columnsAttribute = (_b = _this.getAttribute('columns')) !== null && _b !== void 0 ? _b : '4';
    _this.columns = parseInt(columnsAttribute);
    return _this;
  }

  _createClass(GameBoard, [{
    key: "createBoard",
    value: function createBoard() {
      var template = document.createElement('template');
      template.innerHTML = "\n      <style>\n        game-board {\n          display: grid;\n          grid-template-columns: repeat(".concat(this.columns, ", 1fr);\n          contain: content;\n        }\n      </style>");
      this.replaceChildren(template.content);

      for (var y = 0; y < this.rows; y++) {
        for (var x = 0; x < this.columns; x++) {
          var gameTile = document.createElement('game-tile');
          gameTile.setAttribute('x', x.toString());
          gameTile.setAttribute('y', y.toString());
          this.appendChild(gameTile);
          this.board.push(gameTile);
        }
      }
    }
  }, {
    key: "connectedCallback",
    value: function connectedCallback() {// console.log("game-board connected")
    }
  }, {
    key: "attributeChangedCallback",
    value: function attributeChangedCallback() {
      var _a, _b;

      var rowsAttribute = (_a = this.getAttribute('rows')) !== null && _a !== void 0 ? _a : '4';
      this.rows = parseInt(rowsAttribute);
      var columnsAttribute = (_b = this.getAttribute('columns')) !== null && _b !== void 0 ? _b : '4';
      this.columns = parseInt(columnsAttribute); // console.log('attributes changed')

      this.createBoard();
    }
  }], [{
    key: "observedAttributes",
    get: function get() {
      return ['rows', 'columns'];
    }
  }]);

  return GameBoard;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

exports.GameBoard = GameBoard;
},{}],"ts/gameToken.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameToken = void 0;

var GameToken = /*#__PURE__*/function (_HTMLElement) {
  _inherits(GameToken, _HTMLElement);

  var _super = _createSuper(GameToken);

  function GameToken() {
    var _this;

    _classCallCheck(this, GameToken);

    _this = _super.apply(this, arguments);
    _this.value = 2;
    _this.init = true;
    return _this;
  }

  _createClass(GameToken, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      var _a, _b;

      if (this.init) {
        this.id = "id" + Math.random().toString(16).slice(2, 10);
        this.setAttribute('id', this.id);
        this.init = false;
        this.style.contain = 'content';
        this.style.display = 'grid';
        this.style.placeContent = 'center';
        this.style.placeItems = 'center';
        this.style.position = 'relative';
        this.style.animation = "slide".concat(this.id, " 250ms ease-in-out");
      }

      this.oldOffsetLeft = (_a = this.oldOffsetLeft) !== null && _a !== void 0 ? _a : this.offsetLeft;
      this.oldOffsetTop = (_b = this.oldOffsetTop) !== null && _b !== void 0 ? _b : this.offsetTop;
      this.innerHTML = "\n    <style>\n      @keyframes slide".concat(this.id, " {\n        from{\n          transform: translate(").concat(this.oldOffsetLeft - this.offsetLeft, "px, ").concat(this.oldOffsetTop - this.offsetTop, "px);\n        }\n        to {\n          transform: translate(0, 0);\n        }\n      }\n    </style>\n    <p>").concat(this.value, "</p>\n    "); // console.info(`Token was at ${this.oldOffsetLeft}px / ${this.oldOffsetTop}px`)
      // console.info(`Connecting Token at ${this.offsetLeft}px / ${this.offsetTop}px`)

      this.oldOffsetTop = this.offsetTop;
      this.oldOffsetLeft = this.offsetLeft;
    }
  }]);

  return GameToken;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

exports.GameToken = GameToken;
},{}],"ts/main.ts":[function(require,module,exports) {
"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var gameScore_1 = require("./gameScore");

var gameTile_1 = require("./gameTile");

var gameBoard_1 = require("./gameBoard");

var gameToken_1 = require("./gameToken");

var customGameElements = {
  'game-board': gameBoard_1.GameBoard,
  'game-token': gameToken_1.GameToken,
  'game-tile': gameTile_1.GameTile,
  'game-score': gameScore_1.GameScore
};
var axes = {
  up: {
    main: 'x',
    cross: 'y',
    reversed: false,
    length: 'columns'
  },
  down: {
    main: 'x',
    cross: 'y',
    reversed: true,
    length: 'columns'
  },
  left: {
    main: 'y',
    cross: 'x',
    reversed: false,
    length: 'rows'
  },
  right: {
    main: 'y',
    cross: 'x',
    reversed: true,
    length: 'rows'
  }
};
var keyDirection = {
  "ArrowLeft": "left",
  "ArrowRight": "right",
  "ArrowDown": "down",
  "ArrowUp": "up"
};
Object.entries(customGameElements).forEach(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      element = _ref2[0],
      className = _ref2[1];

  console.info("Registering <".concat(element, ">"));
  customElements.define(element, className);
});
var board = document.getElementsByTagName('game-board')[0];
var score = document.getElementsByTagName('game-score')[0];
var tiles = Array.from(board.querySelectorAll('game-tile'));
console.log("Starting game.");
window.addEventListener('keydown', handleKey);
placeRandomToken();

function handleKey(event) {
  if (!Object.keys(keyDirection).includes(event.key)) return;
  var boardBeforeMove = stringify(board);
  var direction = keyDirection[event.key];
  slideTokens(direction);
  var boardAfterMove = stringify(board);

  if (boardAfterMove === boardBeforeMove) {
    console.log("BOARD HASN'T CHANGED");
    return;
  }

  setTimeout(placeRandomToken, 250);

  if (!isMovePossible()) {
    console.log("YOU LOST.");
    window.removeEventListener('keydown', handleKey);
  }
}

function sortTilesIntoLanes(tiles, axisInfo) {
  var laneAxis = axisInfo.main;
  return tiles.reduce(function (lanes, tile) {
    var lane = tile[laneAxis];

    if (lanes.hasOwnProperty(lane) && axisInfo.reversed) {
      lanes[lane].unshift(tile);
    } else if (lanes.hasOwnProperty(lane)) {
      lanes[lane].push(tile);
    } else {
      lanes[lane] = [tile];
    }

    return lanes;
  }, []);
}

function slideTokens(direction) {
  var axisInfo = axes[direction];
  var lanes = sortTilesIntoLanes(tiles, axisInfo);
  lanes.forEach(function (lane) {
    var tokenMerged = false;
    lane.forEach(function (tile, index) {
      var token = tile.querySelector('game-token');
      if (!token) return;
      slideSingleToken(index, lane, token, tokenMerged);
    });
  });
}

function slideSingleToken(index, lane, token, tokenMerged) {
  while (index > 0) {
    index--;
    var tileToCheck = lane[index];
    var otherToken = tileToCheck.querySelector('game-token');

    if (token.value === (otherToken === null || otherToken === void 0 ? void 0 : otherToken.value) && !tokenMerged) {
      mergeOnNextTile(token, otherToken);
      tokenMerged = true;
      return;
    } else if (otherToken) {
      leaveOnCurrentTile(lane, index, token);
      tokenMerged = false;
      return;
    }
  }

  leaveOnLastTile(lane, token);
}

function isMovePossible() {
  var emptyTiles = getEmptyTiles(tiles);
  if (emptyTiles) return true;
  var vertAxisInfo = axes['down'];
  var horAxisInfo = axes['right'];
  var lanes = [].concat(_toConsumableArray(sortTilesIntoLanes(tiles, vertAxisInfo)), _toConsumableArray(sortTilesIntoLanes(tiles, horAxisInfo)));
  return lanes.some(function (lane) {
    return lane.some(function (tile, index) {
      if (index + 1 === lane.length) return false;
      var token = tile.querySelector('game-token');
      var nextToken = lane[index + 1].querySelector('game-token');
      if (!(token && nextToken)) return false;else if (token.value === nextToken.value) {
        return true;
      }
    });
  });
}

function mergeOnNextTile(token, otherToken) {
  token.value *= 2;
  score.score = score.score + token.value;
  otherToken.replaceWith(token);
}

function leaveOnCurrentTile(lane, searchIndex, token) {
  var previousTile = lane[searchIndex + 1];
  previousTile.appendChild(token);
}

function leaveOnLastTile(lane, token) {
  lane[0].appendChild(token);
}

function getEmptyTiles(tiles) {
  return tiles.filter(function (tile) {
    return Array.from(tile.children).every(function (child) {
      return !(child instanceof gameToken_1.GameToken);
    });
  });
}

function placeRandomToken() {
  var emptyTiles = getEmptyTiles(tiles);
  var randomIndex = Math.floor(Math.random() * emptyTiles.length);
  var token = document.createElement('game-token');
  emptyTiles[randomIndex].appendChild(token);
} // stolen and modified from https://stackoverflow.com/questions/46880822/how-to-json-stringify-a-dom-element


function stringify(element) {
  var obj = {
    name: element.localName,
    attributes: [],
    children: []
  };
  Array.from(element.attributes).forEach(function (a) {
    obj.attributes.push({
      name: a.name,
      value: a.value
    });
  });
  Array.from(element.children).forEach(function (child) {
    obj.children.push(stringify(child));
  });
  return JSON.stringify(obj);
}
},{"./gameScore":"ts/gameScore.ts","./gameTile":"ts/gameTile.ts","./gameBoard":"ts/gameBoard.ts","./gameToken":"ts/gameToken.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57643" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","ts/main.ts"], null)
//# sourceMappingURL=/main.0e24b174.js.map