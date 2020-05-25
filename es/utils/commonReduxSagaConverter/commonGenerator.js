"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _queryString = _interopRequireDefault(require("query-string"));

var _effects = require("redux-saga/effects");

var constants = _interopRequireWildcard(require("./commonConstants"));

var _index = require("../index");

var _axios = _interopRequireDefault(require("../../config/axios"));

var commonActions = _interopRequireWildcard(require("./commonActions"));

var _customError = _interopRequireDefault(require("../customError"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var _marked = /*#__PURE__*/regeneratorRuntime.mark(loaderGenerator);

var headers = '';

function loaderGenerator(_ref) {
  var type, commonData;
  return regeneratorRuntime.wrap(function loaderGenerator$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          type = _ref.type, commonData = _ref.commonData;
          _context.next = 3;
          return (0, _effects.put)(commonActions.apiLoadingStatus({
            type: type,
            payload: commonData,
            status: false
          }));

        case 3:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}

var delay = function delay(ms) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms);
  });
};

function _default(_ref2) {
  var _marked2 = /*#__PURE__*/regeneratorRuntime.mark(commonGenerator);

  var _ref2$actionType = _ref2.actionType,
      actionType = _ref2$actionType === void 0 ? {} : _ref2$actionType,
      requestResponseHandler = _ref2.requestResponseHandler,
      axiosInterceptors = _ref2.axiosInterceptors;

  function commonGenerator(_ref3) {
    var _ref3$payload, _ref3$payload$request, _ref3$payload$request2, payload, params, query, _ref3$payload$request3, paramsSerializer, _ref3$payload$request4, axiosConfig, _ref3$payload$request5, polling, _ref3$payload$request6, Delay, rest, _ref3$payload$callbac, successCallback, errorCallback, logoutCallback, finalCallback, pollingCallback, restCallback, restPayload, type, loop, count, _loop;

    return regeneratorRuntime.wrap(function commonGenerator$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _ref3$payload = _ref3.payload, _ref3$payload$request = _ref3$payload.request;
            _ref3$payload$request = _ref3$payload$request === void 0 ? {} : _ref3$payload$request;
            _ref3$payload$request2 = _ref3$payload$request.payload, payload = _ref3$payload$request2 === void 0 ? {} : _ref3$payload$request2, params = _ref3$payload$request.params, query = _ref3$payload$request.query, _ref3$payload$request3 = _ref3$payload$request.paramsSerializer, paramsSerializer = _ref3$payload$request3 === void 0 ? {
              arrayFormat: 'brackets'
            } : _ref3$payload$request3, _ref3$payload$request4 = _ref3$payload$request.axiosConfig, axiosConfig = _ref3$payload$request4 === void 0 ? {} : _ref3$payload$request4, _ref3$payload$request5 = _ref3$payload$request.polling, polling = _ref3$payload$request5 === void 0 ? false : _ref3$payload$request5, _ref3$payload$request6 = _ref3$payload$request.delay, Delay = _ref3$payload$request6 === void 0 ? 8000 : _ref3$payload$request6, rest = _objectWithoutProperties(_ref3$payload$request, ["payload", "params", "query", "paramsSerializer", "axiosConfig", "polling", "delay"]), _ref3$payload$callbac = _ref3$payload.callback;
            _ref3$payload$callbac = _ref3$payload$callbac === void 0 ? {} : _ref3$payload$callbac;
            successCallback = _ref3$payload$callbac.successCallback, errorCallback = _ref3$payload$callbac.errorCallback, logoutCallback = _ref3$payload$callbac.logoutCallback, finalCallback = _ref3$payload$callbac.finalCallback, pollingCallback = _ref3$payload$callbac.pollingCallback, restCallback = _objectWithoutProperties(_ref3$payload$callbac, ["successCallback", "errorCallback", "logoutCallback", "finalCallback", "pollingCallback"]), restPayload = _objectWithoutProperties(_ref3$payload, ["request", "callback"]), type = _ref3.type;
            loop = true;
            count = 1;
            _loop = /*#__PURE__*/regeneratorRuntime.mark(function _loop() {
              var pollingRequestConfig, axios, CancelToken, source, action, commonData, actionBind, request, requestData, _yield$race, postData, cancelTask, data, statusKey, _ref4, _ref4$data, _ref4$data$status, successStatus, _ref4$data$message, successMessage, loader, _ref5, customMethod, _ref6, _ref6$data, _ref6$data$status, _successStatus, _ref6$data$message, _successMessage, pollingRes, _ref7, _ref7$response, _ref7$response$data, _ref7$response$data2, errorData, errorStatus, _ref7$response$data$m, errorMessage, _loader, Cancelled, _yield$race2, CancelPolling;

              return regeneratorRuntime.wrap(function _loop$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      pollingRequestConfig = {};
                      axios = axiosInterceptors || _axios.default;
                      CancelToken = axios.CancelToken;
                      _context2.next = 5;
                      return CancelToken.source();

                    case 5:
                      source = _context2.sent;
                      _context2.next = 8;
                      return actionType[type];

                    case 8:
                      action = _context2.sent;
                      _context2.next = 11;
                      return action = _objectSpread({}, action, {
                        error: action.error || action.actions[constants.ERROR],
                        success: action.success || action.actions[constants.SUCCESS],
                        customTask: action.custom || action.actions[constants.CUSTOM]
                      });

                    case 11:
                      commonData = _objectSpread({
                        payload: payload,
                        params: params,
                        query: query
                      }, rest, {}, pollingRequestConfig, {
                        request: _objectSpread({
                          payload: payload,
                          params: params,
                          query: query
                        }, rest, {}, pollingRequestConfig),
                        callback: restCallback
                      }, restPayload);

                      actionBind = function actionBind(_action, _method) {
                        return _action.bind({}, type, _method, commonData);
                      };

                      if (!(typeof action.error === 'function')) {
                        _context2.next = 18;
                        break;
                      }

                      _context2.next = 16;
                      return actionBind(action.error, constants.ON_ERROR);

                    case 16:
                      _context2.next = 18;
                      return action.error = _context2.sent;

                    case 18:
                      if (!(typeof action.success === 'function')) {
                        _context2.next = 23;
                        break;
                      }

                      _context2.next = 21;
                      return actionBind(action.success, constants.ON_SUCCESS);

                    case 21:
                      _context2.next = 23;
                      return action.success = _context2.sent;

                    case 23:
                      _context2.next = 25;
                      return _objectSpread({}, action.api || {}, {
                        cancelToken: source.token,
                        url: action.api.url,
                        method: action.api.method || 'GET',
                        data: payload,
                        headers: headers
                      });

                    case 25:
                      request = _context2.sent;

                      if (!action.effect) {
                        _context2.next = 29;
                        break;
                      }

                      _context2.next = 29;
                      return delete action.effect;

                    case 29:
                      if (!action.actions) {
                        _context2.next = 32;
                        break;
                      }

                      _context2.next = 32;
                      return delete action.actions;

                    case 32:
                      if (!(params && typeof request.url === 'function')) {
                        _context2.next = 36;
                        break;
                      }

                      _context2.next = 35;
                      return request.url(params);

                    case 35:
                      request.url = _context2.sent;

                    case 36:
                      if (query) {
                        request.params = query;

                        request.paramsSerializer = function (param) {
                          return _queryString.default.stringify(param, paramsSerializer);
                        };
                      }

                      if (!(process.env.NODE_ENV !== 'test' || !action.test)) {
                        _context2.next = 40;
                        break;
                      }

                      _context2.next = 40;
                      return delete request.headers;

                    case 40:
                      _context2.next = 42;
                      return (0, _effects.call)(requestResponseHandler, {
                        type: type,
                        action: action,
                        request: request,
                        payload: commonData,
                        actionData: rest,
                        method: constants.ON_REQUEST
                      });

                    case 42:
                      requestData = _context2.sent;
                      _context2.next = 45;
                      return request = requestData || request;

                    case 45:
                      if (['POST', 'PATCH', 'PUT', 'DELETE'].includes(request.method)) {
                        _context2.next = 48;
                        break;
                      }

                      _context2.next = 48;
                      return delete request.data;

                    case 48:
                      if (request.effect) delete request.effect;
                      _context2.prev = 49;
                      _context2.next = 52;
                      return (0, _effects.race)({
                        posts: (0, _effects.call)(axios, _objectSpread({}, request, {}, axiosConfig)),
                        cancel: (0, _effects.take)(action.cancel)
                      });

                    case 52:
                      _yield$race = _context2.sent;
                      postData = _yield$race.posts;
                      cancelTask = _yield$race.cancel;
                      data = postData;

                      if (!(postData && postData.data)) {
                        _context2.next = 61;
                        break;
                      }

                      statusKey = action.api.responseStatusCodeKey || 'status';
                      data = {
                        data: {
                          status: ((action.api.responseStatusCode || []).includes((postData.data || {})[statusKey]) ? 200 : (postData.data || {})[statusKey]) || (postData.data || {}).status || postData.status,
                          message: (postData.data || {})[action.api.responseMessageKey || 'message'],
                          data: (postData.data || {})[action.api.responseDataKey] || postData.data
                        }
                      };

                      if (!(action.api.errorHandlerStatusCode && (action.api.errorHandlerStatusCode || []).includes(data.data.status))) {
                        _context2.next = 61;
                        break;
                      }

                      throw new _customError.default({
                        response: {
                          data: {
                            error: (postData.data || {})[action.api.errorDataKey || 'error'] || postData.data,
                            status: data.data.status,
                            message: data.data.message
                          }
                        }
                      });

                    case 61:
                      if (!data) {
                        _context2.next = 79;
                        break;
                      }

                      _ref4 = data || {}, _ref4$data = _ref4.data;
                      _ref4$data = _ref4$data === void 0 ? {} : _ref4$data;
                      _ref4$data$status = _ref4$data.status, successStatus = _ref4$data$status === void 0 ? postData.status : _ref4$data$status, _ref4$data$message = _ref4$data.message, successMessage = _ref4$data$message === void 0 ? '' : _ref4$data$message;
                      _context2.next = 67;
                      return action.success = action.success.bind({}, successStatus, successMessage);

                    case 67:
                      _context2.next = 69;
                      return (0, _effects.call)(requestResponseHandler, {
                        data: data,
                        type: type,
                        action: action,
                        payload: commonData,
                        actionData: rest,
                        method: constants.ON_SUCCESS
                      });

                    case 69:
                      loader = _context2.sent;

                      if (!loader) {
                        _context2.next = 73;
                        break;
                      }

                      _context2.next = 73;
                      return (0, _effects.call)(loaderGenerator, {
                        type: type,
                        commonData: commonData
                      });

                    case 73:
                      if (!(typeof successCallback === 'function')) {
                        _context2.next = 76;
                        break;
                      }

                      _context2.next = 76;
                      return successCallback({
                        res: data,
                        data: data.data,
                        message: successMessage,
                        status: successStatus
                      });

                    case 76:
                      if (typeof logoutCallback === 'function') setTimeout(function () {
                        return logoutCallback(data);
                      }, 500);
                      _context2.next = 97;
                      break;

                    case 79:
                      if (!(cancelTask && typeof source.cancel === 'function')) {
                        _context2.next = 90;
                        break;
                      }

                      _context2.next = 82;
                      return source.cancel();

                    case 82:
                      _ref5 = cancelTask || {}, customMethod = _ref5.response.method;

                      if (customMethod) {
                        _context2.next = 86;
                        break;
                      }

                      _context2.next = 86;
                      return (0, _effects.call)(requestResponseHandler, {
                        type: type,
                        action: action,
                        payload: commonData,
                        actionData: rest,
                        method: constants.ON_CANCEL,
                        axiosCancel: cancelTask
                      });

                    case 86:
                      _context2.next = 88;
                      return (0, _effects.call)(loaderGenerator, {
                        type: type,
                        commonData: commonData
                      });

                    case 88:
                      _context2.next = 97;
                      break;

                    case 90:
                      if (!(process.env.NODE_ENV === 'test' && action.success)) {
                        _context2.next = 95;
                        break;
                      }

                      _context2.next = 93;
                      return (0, _effects.put)(action.success({
                        data: data
                      }));

                    case 93:
                      _context2.next = 97;
                      break;

                    case 95:
                      _context2.next = 97;
                      return (0, _effects.call)(loaderGenerator, {
                        type: type,
                        commonData: commonData
                      });

                    case 97:
                      if (!(polling && typeof window !== 'undefined' && typeof pollingCallback === 'function')) {
                        _context2.next = 105;
                        break;
                      }

                      _ref6 = data || {}, _ref6$data = _ref6.data;
                      _ref6$data = _ref6$data === void 0 ? {} : _ref6$data;
                      _ref6$data$status = _ref6$data.status, _successStatus = _ref6$data$status === void 0 ? postData.status : _ref6$data$status, _ref6$data$message = _ref6$data.message, _successMessage = _ref6$data$message === void 0 ? '' : _ref6$data$message;
                      _context2.next = 103;
                      return (0, _effects.call)(pollingCallback, {
                        res: data,
                        data: data.data,
                        message: _successMessage,
                        status: _successStatus,
                        count: count
                      });

                    case 103:
                      pollingRes = _context2.sent;
                      if (typeof pollingRes === 'boolean') loop = pollingRes;else if (Object.prototype.toString.call(pollingRes) === '[object Object]') pollingRequestConfig = pollingRes;

                    case 105:
                      _context2.next = 134;
                      break;

                    case 107:
                      _context2.prev = 107;
                      _context2.t0 = _context2["catch"](49);
                      console.log(_context2.t0);
                      if (process.env.NODE_ENV === 'test') console.log(_context2.t0);
                      _ref7 = _context2.t0 || {}, _ref7$response = _ref7.response;
                      _ref7$response = _ref7$response === void 0 ? {} : _ref7$response;
                      _ref7$response$data = _ref7$response.data;
                      _ref7$response$data = _ref7$response$data === void 0 ? {} : _ref7$response$data;
                      _ref7$response$data2 = _ref7$response$data[action.api.errorDataKey || 'error'], errorData = _ref7$response$data2 === void 0 ? _context2.t0 && _context2.t0.response && _context2.t0.response.data || '' : _ref7$response$data2, errorStatus = _ref7$response$data.status, _ref7$response$data$m = _ref7$response$data.message, errorMessage = _ref7$response$data$m === void 0 ? _context2.t0.response && _context2.t0.response && _context2.t0.response[action.api.errorMessageKey] || [] : _ref7$response$data$m;

                      if (!(typeof errorCallback === 'function')) {
                        _context2.next = 119;
                        break;
                      }

                      _context2.next = 119;
                      return errorCallback({
                        error: _context2.t0,
                        errorData: (0, _index.responseErrorParser)(errorData),
                        message: errorMessage,
                        status: errorStatus,
                        errors: errorData
                      });

                    case 119:
                      _context2.next = 121;
                      return action.error = action.error.bind({}, errorStatus, errorMessage);

                    case 121:
                      if (!(axios.isCancel(_context2.t0) && action.cancel)) {
                        _context2.next = 128;
                        break;
                      }

                      _context2.next = 124;
                      return (0, _effects.call)(loaderGenerator, {
                        type: type,
                        commonData: commonData
                      });

                    case 124:
                      _context2.next = 126;
                      return (0, _effects.call)(requestResponseHandler, {
                        type: type,
                        action: action,
                        payload: commonData,
                        actionData: rest,
                        method: constants.ON_CANCEL_ERROR
                      });

                    case 126:
                      _context2.next = 134;
                      break;

                    case 128:
                      _context2.next = 130;
                      return (0, _effects.call)(requestResponseHandler, {
                        error: _context2.t0,
                        type: type,
                        action: action,
                        payload: commonData,
                        actionData: rest,
                        method: constants.ON_ERROR
                      });

                    case 130:
                      _loader = _context2.sent;

                      if (!_loader) {
                        _context2.next = 134;
                        break;
                      }

                      _context2.next = 134;
                      return (0, _effects.call)(loaderGenerator, {
                        type: type,
                        commonData: commonData
                      });

                    case 134:
                      _context2.prev = 134;
                      _context2.next = 137;
                      return (0, _effects.cancelled)();

                    case 137:
                      Cancelled = _context2.sent;

                      if (!(typeof finalCallback === 'function')) {
                        _context2.next = 141;
                        break;
                      }

                      _context2.next = 141;
                      return finalCallback({
                        type: type,
                        action: action,
                        payload: commonData,
                        Cancelled: Cancelled
                      });

                    case 141:
                      _context2.next = 143;
                      return (0, _effects.call)(requestResponseHandler, {
                        type: type,
                        action: action,
                        payload: commonData,
                        actionData: rest,
                        method: constants.ON_FINALLY,
                        cancelled: Cancelled
                      });

                    case 143:
                      if (!Cancelled) {
                        _context2.next = 148;
                        break;
                      }

                      if (!(typeof source.cancel === 'function')) {
                        _context2.next = 147;
                        break;
                      }

                      _context2.next = 147;
                      return source.cancel();

                    case 147:
                      loop = false;

                    case 148:
                      return _context2.finish(134);

                    case 149:
                      if (!(polling && typeof window !== 'undefined')) {
                        _context2.next = 158;
                        break;
                      }

                      count += 1;
                      _context2.next = 153;
                      return (0, _effects.race)({
                        posts: (0, _effects.call)(delay, Delay),
                        cancel: (0, _effects.take)(action.cancel)
                      });

                    case 153:
                      _yield$race2 = _context2.sent;
                      CancelPolling = _yield$race2.cancel;
                      if (CancelPolling) loop = false;
                      _context2.next = 159;
                      break;

                    case 158:
                      loop = false;

                    case 159:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _loop, null, [[49, 107, 134, 149]]);
            });

          case 8:
            return _context3.delegateYield(_loop(), "t0", 9);

          case 9:
            if (loop) {
              _context3.next = 8;
              break;
            }

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _marked2);
  }

  var generatorPattern = Object.keys(actionType).map(function (pattern) {
    return (actionType[pattern].effect || _effects.takeLatest)(pattern, commonGenerator);
  });
  return [generatorPattern, commonGenerator];
}