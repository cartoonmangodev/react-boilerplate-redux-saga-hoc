"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_SAGA_HANDLER = DEFAULT_SAGA_HANDLER;

var _effects = require("redux-saga/effects");

var _commonConstants = require("../commonReduxSagaConverter/commonConstants");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function* DEFAULT_SAGA_HANDLER(_ref) {
  var {
    method,
    action,
    successData,
    requestData,
    successStatus,
    restSuccessData,
    errorStatus,
    errorData
  } = _ref;

  switch (method) {
    case _commonConstants.ON_REQUEST:
      return requestData;

    case _commonConstants.ON_CANCEL:
      return true;

    case _commonConstants.ON_SUCCESS:
      if ([200, 201].includes(successStatus)) {
        yield (0, _effects.put)(action.success(_objectSpread({
          data: successData
        }, restSuccessData)));
      } else return true;

      break;

    case _commonConstants.ON_ERROR:
      {
        if (errorStatus) yield (0, _effects.put)(action.error({
          data: errorData
        }));else yield (0, _effects.put)(action.error({
          data: {}
        }));
        break;
      }

    default:
  }
}