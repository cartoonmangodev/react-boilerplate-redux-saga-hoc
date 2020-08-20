"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.requestResponseHandler = void 0;

var _effects = require("redux-saga/effects");

var _commonSagaHandler = require("../../utils/commonHandlers/commonSagaHandler");

var _helpers = require("../../utils/helpers");

var _commonConstants = require("../../utils/commonReduxSagaConverter/commonConstants");

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var requestResponseHandler = function requestResponseHandler(_ref) {
  var constants = _ref.constants,
      sagaFunction = _ref.sagaFunction;
  return (
    /*#__PURE__*/
    // eslint-disable-next-line func-names
    regeneratorRuntime.mark(function _callee(_ref2) {
      var _ref2$data, _ref2$data$data, successStatus, _ref2$data$data$data, successData, successMessage, restSuccessData, request, action, type, _ref2$payload, _ref2$payload$payload, payload, _ref2$payload$query, query, _ref2$payload$params, params, restPayload, method, actionData, axiosCancel, _ref2$error, _ref2$error$response, _ref2$error$response$, errorStatus, _ref2$error$response$2, errorData, errorMessage, restErrorData, cancelled, requestData, requestParams, DEFAULT_SAGA_HANDLER;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _ref2$data = _ref2.data;
              _ref2$data = _ref2$data === void 0 ? {} : _ref2$data;
              _ref2$data$data = _ref2$data.data;
              _ref2$data$data = _ref2$data$data === void 0 ? {} : _ref2$data$data;
              successStatus = _ref2$data$data.status, _ref2$data$data$data = _ref2$data$data.data, successData = _ref2$data$data$data === void 0 ? {} : _ref2$data$data$data, successMessage = _ref2$data$data.message, restSuccessData = _objectWithoutProperties(_ref2$data$data, ["status", "data", "message"]), request = _ref2.request, action = _ref2.action, type = _ref2.type, _ref2$payload = _ref2.payload;
              _ref2$payload = _ref2$payload === void 0 ? {} : _ref2$payload;
              _ref2$payload$payload = _ref2$payload.payload, payload = _ref2$payload$payload === void 0 ? {} : _ref2$payload$payload, _ref2$payload$query = _ref2$payload.query, query = _ref2$payload$query === void 0 ? {} : _ref2$payload$query, _ref2$payload$params = _ref2$payload.params, params = _ref2$payload$params === void 0 ? {} : _ref2$payload$params, restPayload = _objectWithoutProperties(_ref2$payload, ["payload", "query", "params"]), method = _ref2.method, actionData = _ref2.actionData, axiosCancel = _ref2.axiosCancel, _ref2$error = _ref2.error;
              _ref2$error = _ref2$error === void 0 ? {} : _ref2$error;
              _ref2$error$response = _ref2$error.response;
              _ref2$error$response = _ref2$error$response === void 0 ? {} : _ref2$error$response;
              _ref2$error$response$ = _ref2$error$response.data;
              _ref2$error$response$ = _ref2$error$response$ === void 0 ? {} : _ref2$error$response$;
              errorStatus = _ref2$error$response$.status, _ref2$error$response$2 = _ref2$error$response$.data, errorData = _ref2$error$response$2 === void 0 ? [] : _ref2$error$response$2, errorMessage = _ref2$error$response$.message, restErrorData = _objectWithoutProperties(_ref2$error$response$, ["status", "data", "message"]), cancelled = _ref2.cancelled;
              requestData = {};
              if (method === _commonConstants.ON_REQUEST) requestData = (0, _helpers.newObject)(request);
              requestParams = {
                method: method,
                action: action,
                successData: successData,
                requestData: requestData,
                successStatus: successStatus,
                restSuccessData: restSuccessData,
                errorStatus: errorStatus,
                errorData: errorData,
                restPayload: restPayload,
                restErrorData: restErrorData
              };
              DEFAULT_SAGA_HANDLER = _commonSagaHandler.DEFAULT_SAGA_HANDLER.bind(null, requestParams);

              if (!sagaFunction) {
                _context.next = 21;
                break;
              }

              _context.next = 20;
              return (0, _effects.call)(sagaFunction, (0, _helpers.newObject)({
                type: type,
                constants: constants,
                DEFAULT_SAGA_HANDLER: DEFAULT_SAGA_HANDLER
              }, requestParams));

            case 20:
              return _context.abrupt("return", _context.sent);

            case 21:
              _context.t0 = method;
              _context.next = _context.t0 === _commonConstants.ON_REQUEST ? 24 : 25;
              break;

            case 24:
              return _context.abrupt("return", requestData);

            case 25:
              _context.next = 27;
              return (0, _effects.call)(DEFAULT_SAGA_HANDLER);

            case 27:
              return _context.abrupt("return", _context.sent);

            case 28:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })
  );
};

exports.requestResponseHandler = requestResponseHandler;
var _default = [];
exports.default = _default;