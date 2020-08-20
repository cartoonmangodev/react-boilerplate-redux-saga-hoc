"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _effects = require("redux-saga/effects");

var _commonGenerator = _interopRequireDefault(require("../../utils/commonReduxSagaConverter/commonGenerator"));

var _saga = require("./saga");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import queryString from 'query-string';
var _default = (_ref) => {
  var {
    sagaConfig,
    constants,
    sagaFunction,
    axiosInterceptors,
    constantSaga: OtherGenerator = []
  } = _ref;
  var [generatorPattern, sagaGenerator] = (0, _commonGenerator.default)({
    requestResponseHandler: (0, _saga.requestResponseHandler)({
      constants,
      sagaFunction
    }),
    actionType: sagaConfig,
    axiosInterceptors
  }); // For Test Purpose

  var Generator = sagaGenerator; // eslint-disable-next-line func-names

  var saga = function* saga() {
    yield (0, _effects.all)(generatorPattern.concat(OtherGenerator || []));
  };

  return {
    saga,
    Generator
  };
};

exports.default = _default;