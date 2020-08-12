"use strict";

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

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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
    var _ref3$payload, _ref3$payload$request, _ref3$payload$request2, asyncFunction, _ref3$payload$request3, asyncFunctionParams, _ref3$payload$request4, payload, params, query, _ref3$payload$request5, paramsSerializer, _ref3$payload$request6, axiosConfig, _ref3$payload$request7, polling, _ref3$payload$request8, isResponseErrorParser, _ref3$payload$request9, Delay, _ref3$payload$request10, retry, _ref3$payload$request11, pollingCount, rest, _ref3$payload$callbac, successCallback, errorCallback, logoutCallback, finalCallback, pollingCallback, restCallback, restPayload, type, loop, count, pollingRequestConfig, _loop;

    return regeneratorRuntime.wrap(function commonGenerator$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _ref3$payload = _ref3.payload, _ref3$payload$request = _ref3$payload.request;
            _ref3$payload$request = _ref3$payload$request === void 0 ? {} : _ref3$payload$request;
            _ref3$payload$request2 = _ref3$payload$request.asyncFunction, asyncFunction = _ref3$payload$request2 === void 0 ? null : _ref3$payload$request2, _ref3$payload$request3 = _ref3$payload$request.asyncFunctionParams, asyncFunctionParams = _ref3$payload$request3 === void 0 ? null : _ref3$payload$request3, _ref3$payload$request4 = _ref3$payload$request.payload, payload = _ref3$payload$request4 === void 0 ? {} : _ref3$payload$request4, params = _ref3$payload$request.params, query = _ref3$payload$request.query, _ref3$payload$request5 = _ref3$payload$request.paramsSerializer, paramsSerializer = _ref3$payload$request5 === void 0 ? {
              arrayFormat: 'brackets'
            } : _ref3$payload$request5, _ref3$payload$request6 = _ref3$payload$request.axiosConfig, axiosConfig = _ref3$payload$request6 === void 0 ? {} : _ref3$payload$request6, _ref3$payload$request7 = _ref3$payload$request.polling, polling = _ref3$payload$request7 === void 0 ? false : _ref3$payload$request7, _ref3$payload$request8 = _ref3$payload$request.responseErrorParser, isResponseErrorParser = _ref3$payload$request8 === void 0 ? false : _ref3$payload$request8, _ref3$payload$request9 = _ref3$payload$request.delay, Delay = _ref3$payload$request9 === void 0 ? 8000 : _ref3$payload$request9, _ref3$payload$request10 = _ref3$payload$request.retry, retry = _ref3$payload$request10 === void 0 ? 0 : _ref3$payload$request10, _ref3$payload$request11 = _ref3$payload$request.pollingCount, pollingCount = _ref3$payload$request11 === void 0 ? 'unlimited' : _ref3$payload$request11, rest = _objectWithoutProperties(_ref3$payload$request, ["asyncFunction", "asyncFunctionParams", "payload", "params", "query", "paramsSerializer", "axiosConfig", "polling", "responseErrorParser", "delay", "retry", "pollingCount"]), _ref3$payload$callbac = _ref3$payload.callback;
            _ref3$payload$callbac = _ref3$payload$callbac === void 0 ? {} : _ref3$payload$callbac;
            successCallback = _ref3$payload$callbac.successCallback, errorCallback = _ref3$payload$callbac.errorCallback, logoutCallback = _ref3$payload$callbac.logoutCallback, finalCallback = _ref3$payload$callbac.finalCallback, pollingCallback = _ref3$payload$callbac.pollingCallback, restCallback = _objectWithoutProperties(_ref3$payload$callbac, ["successCallback", "errorCallback", "logoutCallback", "finalCallback", "pollingCallback"]), restPayload = _objectWithoutProperties(_ref3$payload, ["request", "callback"]), type = _ref3.type;
            loop = true;
            count = 1;
            pollingRequestConfig = {};
            _loop = /*#__PURE__*/regeneratorRuntime.mark(function _loop() {
              var axios, CancelToken, source, action, commonData, actionBind, request, requestData, _yield$race, postData, cancelTask, data, statusKey, _ref4, _ref4$data, _ref4$data$status, successStatus, _ref4$data$message, successMessage, loader, _ref5, customMethod, _ref6, _ref6$data, _ref6$data$status, _successStatus, _ref6$data$message, _successMessage, pollingRes, _ref7, _ref7$response, _ref7$response$data, _ref7$response$data2, errorData, _ref7$response$data$s, errorStatus, _ref7$response$data$m, errorMessage, _loader, Cancelled, _yield$race2, CancelPolling;

              return regeneratorRuntime.wrap(function _loop$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      axios = axiosInterceptors || _axios.default;
                      CancelToken = axios.CancelToken;
                      _context2.next = 4;
                      return CancelToken.source();

                    case 4:
                      source = _context2.sent;
                      _context2.next = 7;
                      return actionType[type];

                    case 7:
                      action = _context2.sent;
                      _context2.next = 10;
                      return action = _objectSpread({}, action, {
                        error: action.error || action.actions[constants.ERROR],
                        success: action.success || action.actions[constants.SUCCESS],
                        customTask: action.custom || action.actions[constants.CUSTOM]
                      });

                    case 10:
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
                        _context2.next = 17;
                        break;
                      }

                      _context2.next = 15;
                      return actionBind(action.error, constants.ON_ERROR);

                    case 15:
                      _context2.next = 17;
                      return action.error = _context2.sent;

                    case 17:
                      if (!(typeof action.success === 'function')) {
                        _context2.next = 22;
                        break;
                      }

                      _context2.next = 20;
                      return actionBind(action.success, constants.ON_SUCCESS);

                    case 20:
                      _context2.next = 22;
                      return action.success = _context2.sent;

                    case 22:
                      _context2.next = 24;
                      return _objectSpread({}, action.api || {}, {
                        cancelToken: source.token,
                        url: action.api.url,
                        method: action.api.method || 'GET',
                        data: payload,
                        headers: headers
                      });

                    case 24:
                      request = _context2.sent;

                      if (!action.effect) {
                        _context2.next = 28;
                        break;
                      }

                      _context2.next = 28;
                      return delete action.effect;

                    case 28:
                      if (!action.actions) {
                        _context2.next = 31;
                        break;
                      }

                      _context2.next = 31;
                      return delete action.actions;

                    case 31:
                      if (!((pollingRequestConfig && pollingRequestConfig.params || params) && typeof request.url === 'function')) {
                        _context2.next = 35;
                        break;
                      }

                      _context2.next = 34;
                      return request.url(pollingRequestConfig && pollingRequestConfig.params || params);

                    case 34:
                      request.url = _context2.sent;

                    case 35:
                      if (query || pollingRequestConfig && pollingRequestConfig.query) {
                        request.params = pollingRequestConfig && pollingRequestConfig.query || query; // eslint-disable-next-line no-loop-func

                        request.paramsSerializer = function (param) {
                          return _queryString.default.stringify(param, pollingRequestConfig && pollingRequestConfig.paramsSerializer || paramsSerializer);
                        };
                      }

                      if (!(process.env.NODE_ENV !== 'test' || !action.test)) {
                        _context2.next = 39;
                        break;
                      }

                      _context2.next = 39;
                      return delete request.headers;

                    case 39:
                      _context2.next = 41;
                      return (0, _effects.call)(requestResponseHandler, {
                        type: type,
                        action: action,
                        request: request,
                        payload: commonData,
                        actionData: rest,
                        method: constants.ON_REQUEST
                      });

                    case 41:
                      requestData = _context2.sent;
                      _context2.next = 44;
                      return request = requestData || request;

                    case 44:
                      if (['POST', 'PATCH', 'PUT', 'DELETE'].includes(request.method)) {
                        _context2.next = 47;
                        break;
                      }

                      _context2.next = 47;
                      return delete request.data;

                    case 47:
                      if (request.effect) delete request.effect;
                      _context2.prev = 48;
                      _context2.next = 51;
                      return (0, _effects.race)({
                        posts: typeof asyncFunction === 'function' ? _effects.call.apply(void 0, [asyncFunction].concat(_toConsumableArray(Array.isArray(pollingRequestConfig && pollingRequestConfig.asyncFunctionParams || asyncFunctionParams) ? pollingRequestConfig && pollingRequestConfig.asyncFunctionParams || asyncFunctionParams : []))) : (0, _effects.call)(axios, _objectSpread({}, request, {}, pollingRequestConfig && pollingRequestConfig.axiosConfig || axiosConfig)),
                        cancel: (0, _effects.take)(action.cancel)
                      });

                    case 51:
                      _yield$race = _context2.sent;
                      postData = _yield$race.posts;
                      cancelTask = _yield$race.cancel;
                      data = postData;

                      if (!(postData && postData.data)) {
                        _context2.next = 60;
                        break;
                      }

                      statusKey = action.api.responseStatusCodeKey || '';
                      data = {
                        data: {
                          status: ((action.api.responseStatusCode || []).includes((postData.data || {})[statusKey]) ? 200 : (postData.data || {})[statusKey]) || postData.status,
                          statusCode: (postData.data || {})[statusKey] || postData.status,
                          message: (postData.data || {})[action.api.responseMessageKey || 'message'],
                          data: (postData.data || {})[action.api.responseDataKey] || postData.data || postData
                        }
                      };

                      if (!(action.api.errorHandlerStatusCode && (action.api.errorHandlerStatusCode || []).includes(data.data.status))) {
                        _context2.next = 60;
                        break;
                      }

                      throw new _customError.default({
                        response: {
                          data: {
                            error: (postData.data || {})[action.api.errorDataKey || 'error'] || postData.data || postData,
                            status: data.data.status,
                            statusCode: (postData.data || {})[statusKey] || postData.status,
                            message: data.data.message
                          }
                        }
                      });

                    case 60:
                      if (!data) {
                        _context2.next = 78;
                        break;
                      }

                      _ref4 = data || {}, _ref4$data = _ref4.data;
                      _ref4$data = _ref4$data === void 0 ? {} : _ref4$data;
                      _ref4$data$status = _ref4$data.status, successStatus = _ref4$data$status === void 0 ? postData.status : _ref4$data$status, _ref4$data$message = _ref4$data.message, successMessage = _ref4$data$message === void 0 ? '' : _ref4$data$message;
                      _context2.next = 66;
                      return action.success = action.success.bind({}, successStatus, successMessage);

                    case 66:
                      _context2.next = 68;
                      return (0, _effects.call)(requestResponseHandler, {
                        data: data,
                        type: type,
                        action: action,
                        payload: commonData,
                        actionData: rest,
                        method: constants.ON_SUCCESS
                      });

                    case 68:
                      loader = _context2.sent;

                      if (!loader) {
                        _context2.next = 72;
                        break;
                      }

                      _context2.next = 72;
                      return (0, _effects.call)(loaderGenerator, {
                        type: type,
                        commonData: commonData
                      });

                    case 72:
                      if (!(typeof successCallback === 'function')) {
                        _context2.next = 75;
                        break;
                      }

                      _context2.next = 75;
                      return successCallback({
                        res: data,
                        data: data.data,
                        message: successMessage,
                        status: successStatus
                      });

                    case 75:
                      if (typeof logoutCallback === 'function') setTimeout(function () {
                        return logoutCallback(data);
                      }, 500);
                      _context2.next = 96;
                      break;

                    case 78:
                      if (!(cancelTask && typeof source.cancel === 'function')) {
                        _context2.next = 89;
                        break;
                      }

                      _context2.next = 81;
                      return source.cancel();

                    case 81:
                      _ref5 = cancelTask || {}, customMethod = _ref5.response.method;

                      if (customMethod) {
                        _context2.next = 85;
                        break;
                      }

                      _context2.next = 85;
                      return (0, _effects.call)(requestResponseHandler, {
                        type: type,
                        action: action,
                        payload: commonData,
                        actionData: rest,
                        method: constants.ON_CANCEL,
                        axiosCancel: cancelTask
                      });

                    case 85:
                      _context2.next = 87;
                      return (0, _effects.call)(loaderGenerator, {
                        type: type,
                        commonData: commonData
                      });

                    case 87:
                      _context2.next = 96;
                      break;

                    case 89:
                      if (!(process.env.NODE_ENV === 'test' && action.success)) {
                        _context2.next = 94;
                        break;
                      }

                      _context2.next = 92;
                      return (0, _effects.put)(action.success({
                        data: data
                      }));

                    case 92:
                      _context2.next = 96;
                      break;

                    case 94:
                      _context2.next = 96;
                      return (0, _effects.call)(loaderGenerator, {
                        type: type,
                        commonData: commonData
                      });

                    case 96:
                      if (!(polling && typeof window !== 'undefined' && typeof pollingCallback === 'function')) {
                        _context2.next = 104;
                        break;
                      }

                      _ref6 = data || {}, _ref6$data = _ref6.data;
                      _ref6$data = _ref6$data === void 0 ? {} : _ref6$data;
                      _ref6$data$status = _ref6$data.status, _successStatus = _ref6$data$status === void 0 ? postData.status : _ref6$data$status, _ref6$data$message = _ref6$data.message, _successMessage = _ref6$data$message === void 0 ? '' : _ref6$data$message;
                      _context2.next = 102;
                      return (0, _effects.call)(pollingCallback, {
                        res: data,
                        data: data.data,
                        message: _successMessage,
                        status: _successStatus,
                        count: count
                      });

                    case 102:
                      pollingRes = _context2.sent;
                      if (typeof pollingRes === 'boolean') loop = pollingRes;else if (Object.prototype.toString.call(pollingRes) === '[object Object]') pollingRequestConfig = pollingRes;

                    case 104:
                      if (!polling && retry) loop = false;
                      _context2.next = 137;
                      break;

                    case 107:
                      _context2.prev = 107;
                      _context2.t0 = _context2["catch"](48);
                      console.error(_context2.t0);

                      if (!(!polling && retry && retry - 1 >= count)) {
                        _context2.next = 113;
                        break;
                      }

                      _context2.next = 137;
                      break;

                    case 113:
                      if (process.env.NODE_ENV === 'test') console.log(_context2.t0);
                      _ref7 = _context2.t0 || {}, _ref7$response = _ref7.response;
                      _ref7$response = _ref7$response === void 0 ? {} : _ref7$response;
                      _ref7$response$data = _ref7$response.data;
                      _ref7$response$data = _ref7$response$data === void 0 ? {} : _ref7$response$data;
                      _ref7$response$data2 = _ref7$response$data[action.api.errorDataKey || 'error'], errorData = _ref7$response$data2 === void 0 ? _context2.t0 && _context2.t0.response && _context2.t0.response.data || _context2.t0 && _context2.t0.response || '' : _ref7$response$data2, _ref7$response$data$s = _ref7$response$data.status, errorStatus = _ref7$response$data$s === void 0 ? _context2.t0.response && _context2.t0.response.data && (_context2.t0.response.data[action.api.errorStatusKey] || _context2.t0.response.status) : _ref7$response$data$s, _ref7$response$data$m = _ref7$response$data.message, errorMessage = _ref7$response$data$m === void 0 ? _context2.t0.response && _context2.t0.response.data && _context2.t0.response.data[action.api.errorMessageKey] || _context2.t0.response && _context2.t0.response.statusText || '' : _ref7$response$data$m;

                      if (!(typeof errorCallback === 'function')) {
                        _context2.next = 122;
                        break;
                      }

                      _context2.next = 122;
                      return errorCallback({
                        error: _context2.t0,
                        errorData: isResponseErrorParser ? errorData && _typeof((0, _index.responseErrorParser)(errorData)) === 'object' && Object.keys((0, _index.responseErrorParser)(errorData) || {}).length > 0 ? (0, _index.responseErrorParser)(errorData) : errorData : errorData,
                        message: errorMessage,
                        status: errorStatus,
                        response: _context2.t0 && _context2.t0.response,
                        errors: errorData
                      });

                    case 122:
                      _context2.next = 124;
                      return action.error = action.error.bind({}, errorStatus, errorMessage);

                    case 124:
                      if (!(axios.isCancel(_context2.t0) && action.cancel)) {
                        _context2.next = 131;
                        break;
                      }

                      _context2.next = 127;
                      return (0, _effects.call)(loaderGenerator, {
                        type: type,
                        commonData: commonData
                      });

                    case 127:
                      _context2.next = 129;
                      return (0, _effects.call)(requestResponseHandler, {
                        type: type,
                        action: action,
                        payload: commonData,
                        actionData: rest,
                        method: constants.ON_CANCEL_ERROR
                      });

                    case 129:
                      _context2.next = 137;
                      break;

                    case 131:
                      _context2.next = 133;
                      return (0, _effects.call)(requestResponseHandler, {
                        error: {
                          response: {
                            data: {
                              status: errorStatus,
                              data: errorData,
                              message: errorMessage
                            }
                          }
                        },
                        type: type,
                        action: action,
                        payload: commonData,
                        actionData: rest,
                        method: constants.ON_ERROR
                      });

                    case 133:
                      _loader = _context2.sent;

                      if (!_loader) {
                        _context2.next = 137;
                        break;
                      }

                      _context2.next = 137;
                      return (0, _effects.call)(loaderGenerator, {
                        type: type,
                        commonData: commonData
                      });

                    case 137:
                      _context2.prev = 137;
                      _context2.next = 140;
                      return (0, _effects.cancelled)();

                    case 140:
                      Cancelled = _context2.sent;

                      if (!(typeof finalCallback === 'function')) {
                        _context2.next = 144;
                        break;
                      }

                      _context2.next = 144;
                      return finalCallback({
                        type: type,
                        action: action,
                        payload: commonData,
                        Cancelled: Cancelled
                      });

                    case 144:
                      _context2.next = 146;
                      return (0, _effects.call)(requestResponseHandler, {
                        type: type,
                        action: action,
                        payload: commonData,
                        actionData: rest,
                        method: constants.ON_FINALLY,
                        cancelled: Cancelled
                      });

                    case 146:
                      if (!Cancelled) {
                        _context2.next = 151;
                        break;
                      }

                      if (!(typeof source.cancel === 'function')) {
                        _context2.next = 150;
                        break;
                      }

                      _context2.next = 150;
                      return source.cancel();

                    case 150:
                      loop = false;

                    case 151:
                      return _context2.finish(137);

                    case 152:
                      if (!(polling && typeof window !== 'undefined' && loop)) {
                        _context2.next = 165;
                        break;
                      }

                      if (!(pollingCount === 'unlimited' || pollingCount - 1 >= count)) {
                        _context2.next = 162;
                        break;
                      }

                      count += 1;
                      _context2.next = 157;
                      return (0, _effects.race)({
                        posts: (0, _effects.call)(delay, Delay),
                        cancel: (0, _effects.take)(action.cancel)
                      });

                    case 157:
                      _yield$race2 = _context2.sent;
                      CancelPolling = _yield$race2.cancel;
                      if (CancelPolling) loop = false;
                      _context2.next = 163;
                      break;

                    case 162:
                      loop = false;

                    case 163:
                      _context2.next = 166;
                      break;

                    case 165:
                      if (!polling && retry && loop) {
                        if (retry - 1 >= count) {
                          loop = true;
                          count += 1;
                        } else loop = false;
                      } else loop = false;

                    case 166:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _loop, null, [[48, 107, 137, 152]]);
            });

          case 9:
            return _context3.delegateYield(_loop(), "t0", 10);

          case 10:
            if (loop) {
              _context3.next = 9;
              break;
            }

          case 11:
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