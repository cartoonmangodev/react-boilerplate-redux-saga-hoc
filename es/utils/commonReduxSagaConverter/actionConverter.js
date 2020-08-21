"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _commonConstants = require("./commonConstants");

var _helpers = require("../helpers");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ignore = {
  component: [_commonConstants.SUCCESS, _commonConstants.ERROR],
  saga: [_commonConstants.CALL, _commonConstants.CANCEL, _commonConstants.CUSTOM],
  cancel: [_commonConstants.SUCCESS, _commonConstants.ERROR, _commonConstants.CALL, _commonConstants.CUSTOM]
};
var bindKey = [_commonConstants.CANCEL, _commonConstants.CUSTOM];

var actionConverter = function actionConverter(action, actionName, ignoreStatus, type) {
  return Object.entries(action).reduce(function (acc, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    return ignoreStatus && ignore[type].includes(key) && acc || (0, _helpers.cloneObject)(acc, _defineProperty({}, "".concat(actionName, "_").concat(key), bindKey.includes(key) && value.bind({}, action[_commonConstants.CALL]().type) || value));
  }, {});
};

var _default = function _default(action) {
  return Object.entries(action).reduce(function (acc, _ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        key = _ref4[0],
        value = _ref4[1];

    return {
      actions: (0, _helpers.cloneObject)(acc.actions, actionConverter(value, key)),
      sagaActions: (0, _helpers.cloneObject)(acc.sagaActions, actionConverter(value, key, true, 'saga')),
      componentActions: (0, _helpers.cloneObject)(acc.componentActions, actionConverter(value, key, true, 'component')),
      cancelActions: (0, _helpers.cloneObject)(acc.cancelActions, actionConverter(value, key, true, 'cancel'))
    };
  }, {});
};

exports.default = _default;