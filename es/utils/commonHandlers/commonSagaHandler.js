"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_SAGA_HANDLER = DEFAULT_SAGA_HANDLER;

var _effects = require("redux-saga/effects");

var _commonConstants = require("../commonReduxSagaConverter/commonConstants");

var _marked = /*#__PURE__*/regeneratorRuntime.mark(DEFAULT_SAGA_HANDLER);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function DEFAULT_SAGA_HANDLER(_ref) {
  var method, action, successData, requestData, successStatus, restSuccessData, errorStatus, errorData;
  return regeneratorRuntime.wrap(function DEFAULT_SAGA_HANDLER$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          method = _ref.method, action = _ref.action, successData = _ref.successData, requestData = _ref.requestData, successStatus = _ref.successStatus, restSuccessData = _ref.restSuccessData, errorStatus = _ref.errorStatus, errorData = _ref.errorData;
          _context.t0 = method;
          _context.next = _context.t0 === _commonConstants.ON_REQUEST ? 4 : _context.t0 === _commonConstants.ON_CANCEL ? 5 : _context.t0 === _commonConstants.ON_SUCCESS ? 6 : _context.t0 === _commonConstants.ON_ERROR ? 13 : 21;
          break;

        case 4:
          return _context.abrupt("return", requestData);

        case 5:
          return _context.abrupt("return", true);

        case 6:
          if (![200, 201].includes(successStatus)) {
            _context.next = 11;
            break;
          }

          _context.next = 9;
          return (0, _effects.put)(action.success(_objectSpread({
            data: successData
          }, restSuccessData)));

        case 9:
          _context.next = 12;
          break;

        case 11:
          return _context.abrupt("return", true);

        case 12:
          return _context.abrupt("break", 21);

        case 13:
          if (!errorStatus) {
            _context.next = 18;
            break;
          }

          _context.next = 16;
          return (0, _effects.put)(action.error({
            data: errorData
          }));

        case 16:
          _context.next = 20;
          break;

        case 18:
          _context.next = 20;
          return (0, _effects.put)(action.error({
            data: {}
          }));

        case 20:
          return _context.abrupt("break", 21);

        case 21:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}