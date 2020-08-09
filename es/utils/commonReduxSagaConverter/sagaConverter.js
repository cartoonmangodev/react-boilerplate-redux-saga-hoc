"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertData = void 0;

var _effects = require("redux-saga/effects");

var _commonConstants = require("./commonConstants");

var _commonActions = require("./commonActions");

var _helpers = require("../helpers");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var convertData = function convertData(apiEndPoints) {
  return Object.keys(apiEndPoints).reduce(function (prev, curr) {
    var constants = Object.keys(apiEndPoints[curr]).reduce(function (acc, key) {
      var _key;

      return (0, _helpers.newObject)(acc, _defineProperty({}, key, (_key = {}, _defineProperty(_key, _commonConstants.CALL, "app/conatainers/".concat(curr, "/").concat(key, "_").concat(_commonConstants.CALL)), _defineProperty(_key, _commonConstants.SUCCESS, "app/conatainers/".concat(curr, "/").concat(key, "_").concat(_commonConstants.SUCCESS)), _defineProperty(_key, _commonConstants.CUSTOM, "app/conatainers/".concat(curr, "/").concat(key, "_").concat(_commonConstants.CUSTOM)), _defineProperty(_key, _commonConstants.ERROR, "app/conatainers/".concat(curr, "/").concat(key, "_").concat(_commonConstants.ERROR)), _defineProperty(_key, _commonConstants.CANCEL, "app/conatainers/".concat(curr, "/").concat(key, "_").concat(_commonConstants.CANCEL)), _key)));
    }, {});
    var actions = Object.keys(apiEndPoints[curr]).reduce(function (acc, key) {
      var _key2;

      return (0, _helpers.newObject)(acc, _defineProperty({}, key, (_key2 = {}, _defineProperty(_key2, _commonConstants.CALL, _commonActions.actionsHandler.call(constants[key][_commonConstants.CALL])), _defineProperty(_key2, _commonConstants.SUCCESS, _commonActions.actionsHandler.success(constants[key][_commonConstants.SUCCESS])), _defineProperty(_key2, _commonConstants.CUSTOM, _commonActions.actionsHandler.custom(constants[key][_commonConstants.CUSTOM])), _defineProperty(_key2, _commonConstants.ERROR, _commonActions.actionsHandler.error(constants[key][_commonConstants.ERROR])), _defineProperty(_key2, _commonConstants.CANCEL, _commonActions.actionsHandler.cancel(constants[key][_commonConstants.CANCEL])), _key2)));
    }, {});
    var sagaConfig = Object.entries(apiEndPoints[curr]).reduce(function (acc, _ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          key = _ref2[0],
          value = _ref2[1];

      return (0, _helpers.newObject)(acc, _defineProperty({}, constants[key][_commonConstants.CALL], {
        api: value,
        cancel: constants[key][_commonConstants.CANCEL],
        actions: actions[key],
        effect: value.effect === 'every' && _effects.takeEvery
      }));
    }, {});
    return (0, _helpers.newObject)(prev, _defineProperty({}, curr, {
      actions: actions,
      constants: constants,
      sagaConfig: sagaConfig
    }));
  }, {});
};

exports.convertData = convertData;