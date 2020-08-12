"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_REDUCER_HANDLER = exports.COMMON_REDUCER_HANDLER = void 0;

var _helpers = require("../helpers");

var _commonConstants = require("../commonReduxSagaConverter/commonConstants");

var _customHandlers = require("../customHandlers");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var HANDLERS = [{
  name: 'Infinite-Handler',
  handler: _customHandlers.infiniteHandler
}, {
  name: 'Data-Handler',
  handler: _customHandlers.dataHandler
}, {
  name: 'Delete-Handler',
  handler: _customHandlers.deleteHandler
}, {
  name: 'Update-Handler',
  handler: _customHandlers.updateHandler
}, {
  name: 'Update-Key-Handler',
  handler: _customHandlers.updateKeyHandler
}, {
  name: 'Delete-Key-Handler',
  handler: _customHandlers.deleteKeyHandler
}, {
  name: 'Toggle-Key-Handler',
  handler: _customHandlers.toggleKeyHandler
}, {
  name: 'Splice-Data-Handler',
  handler: _customHandlers.spliceHandler
}];

var CheckCustomHanderFormat = function CheckCustomHanderFormat(_handler) {
  return _handler ? typeof _handler === 'function' ? // ? typeof _handler() === 'function'
  // ? typeof _handler()() !== 'function'
  _handler : // : null
  null : // : null
  null;
};

var _CheckFilter = function _CheckFilter(Filter) {
  return Array.isArray(Filter) && Filter.length > 0 ? Filter : Filter && typeof Filter === 'string' ? Filter.split('.') : null;
};

var COMMON_HANDLER = function COMMON_HANDLER(payload, data) {
  var DATA = data; // const bindAction = Action => Action(payload);

  (payload.tasks || Array(1).fill(payload)).forEach( // eslint-disable-next-line consistent-return
  function () {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$task = _ref.task,
        task = _ref$task === void 0 ? {} : _ref$task,
        filter = _ref.filter;

    var customTaskBindAction = null; // const isMultiTask = Array.isArray(payload.tasks);
    // if (isMultiTask)

    customTaskBindAction = function customTaskBindAction(Action) {
      return Action(_objectSpread({}, payload, {
        filter: _CheckFilter(filter || payload.filter),
        successData: (task.response || {}).data || payload.successData
      }));
    };

    var customHandler = CheckCustomHanderFormat(task.customHandler);

    var isFilter = _CheckFilter(filter);

    var BindHandler = function BindHandler(handler) {
      return (0, _helpers.newObject)(DATA, customTaskBindAction(handler));
    };

    var _handler = HANDLERS.concat(Array.isArray(payload.handlers) ? payload.handlers : []).find(function (_ref2) {
      var name = _ref2.name;
      return name === task.name;
    });

    if (_handler) DATA = isFilter ? BindHandler((0, _customHandlers.commonFilterHandler)(_handler.handler)) : BindHandler(_handler.handler);else if (customHandler && task.name === 'Custom-Handler') DATA = (isFilter ? BindHandler((0, _customHandlers.commonFilterHandler)(customHandler)) : BindHandler(customHandler)) || DATA;else if (task.name === 'Dont-Update') return DATA;else DATA = isFilter ? BindHandler((0, _customHandlers.commonFilterHandler)(_customHandlers.dataHandler)) : BindHandler(_customHandlers.dataHandler);
  });
  return DATA;
};

var COMMON_REDUCER_HANDLER = function COMMON_REDUCER_HANDLER(action, handlers) {
  var _action$response = action.response;
  _action$response = _action$response === void 0 ? {} : _action$response;
  var customTask = _action$response.customTask,
      _action$response$data = _action$response.data;
  _action$response$data = _action$response$data === void 0 ? {} : _action$response$data;

  var _action$response$data2 = _action$response$data.data,
      successData = _action$response$data2 === void 0 ? {} : _action$response$data2,
      rest = _objectWithoutProperties(_action$response$data, ["data"]),
      _action$response$payl = _action$response.payload;

  _action$response$payl = _action$response$payl === void 0 ? {} : _action$response$payl;
  var _action$response$payl2 = _action$response$payl.request;
  _action$response$payl2 = _action$response$payl2 === void 0 ? {} : _action$response$payl2;
  var _action$response$payl3 = _action$response$payl2.query,
      query = _action$response$payl3 === void 0 ? {} : _action$response$payl3,
      Filter = _action$response$payl.filter,
      error = _action$response$payl.error,
      _action$response$erro = _action$response.error;
  _action$response$erro = _action$response$erro === void 0 ? {} : _action$response$erro;
  var _action$response$erro2 = _action$response$erro.data,
      errorData = _action$response$erro2 === void 0 ? {} : _action$response$erro2; // console.log(rest, 'common reducer handler');

  var filter = _CheckFilter(Filter);

  var commonHandler = COMMON_HANDLER.bind(null, _objectSpread({
    handlers: handlers,
    successData: successData,
    errorData: errorData,
    successDataStatusCode: rest.statusCode
  }, action.response.payload));
  var ErrorHandler = filter && _customHandlers.filterArrayErrorHandler || _customHandlers.errorHandler;
  var commmonErrorHandler = ErrorHandler.bind(null, {
    errorData: customTask ? error : errorData,
    query: query,
    filter: filter
  });
  return [commonHandler, commmonErrorHandler];
};

exports.COMMON_REDUCER_HANDLER = COMMON_REDUCER_HANDLER;

var DEFAULT_REDUCER_HANDLER = function DEFAULT_REDUCER_HANDLER(_ref3) {
  var method = _ref3.method,
      reset = _ref3.reset,
      state = _ref3.state,
      action = _ref3.action,
      handlers = _ref3.handlers,
      type = _ref3.type;

  var _COMMON_REDUCER_HANDL = COMMON_REDUCER_HANDLER(action, handlers),
      _COMMON_REDUCER_HANDL2 = _slicedToArray(_COMMON_REDUCER_HANDL, 2),
      commonHandler = _COMMON_REDUCER_HANDL2[0],
      commmonErrorHandler = _COMMON_REDUCER_HANDL2[1];

  var _action$response2 = action.response;
  _action$response2 = _action$response2 === void 0 ? {} : _action$response2;
  var _action$response2$dat = _action$response2.data;
  _action$response2$dat = _action$response2$dat === void 0 ? {} : _action$response2$dat;
  var _action$response2$dat2 = _action$response2$dat.data,
      successData = _action$response2$dat2 === void 0 ? {} : _action$response2$dat2,
      _action$response2$pay = _action$response2.payload;
  _action$response2$pay = _action$response2$pay === void 0 ? {} : _action$response2$pay;
  var _action$response2$pay2 = _action$response2$pay.callback;
  _action$response2$pay2 = _action$response2$pay2 === void 0 ? {} : _action$response2$pay2;
  var updateStateCallback = _action$response2$pay2.updateStateCallback;
  var DATA = state;

  var _method = (Array.isArray(method) ? method : [method]).filter(function (e) {
    return [_commonConstants.ON_SUCCESS, _commonConstants.ON_ERROR, _commonConstants.ON_UNMOUNT].includes(e);
  });

  for (var i = 0; i < _method.length; i += 1) {
    switch (_method[i]) {
      case _commonConstants.ON_SUCCESS:
        {
          var updatedState = (0, _helpers.newObject)(DATA, function (_ref4) {
            var Data = _ref4[type];
            return _defineProperty({}, type, commonHandler(Data, state, type));
          });
          DATA = updateStateCallback ? updateStateCallback({
            state: updatedState,
            data: successData
          }) || updatedState : updatedState;
          break;
        }

      case _commonConstants.ON_ERROR:
        {
          DATA = (0, _helpers.newObject)(DATA, function (_ref6) {
            var Data = _ref6[type];
            return _defineProperty({}, type, (0, _helpers.newObject)(Data, commmonErrorHandler()));
          });
          break;
        }

      case _commonConstants.ON_UNMOUNT:
        {
          DATA = reset();
          break;
        }

      default:
    }
  }

  return DATA;
};

exports.DEFAULT_REDUCER_HANDLER = DEFAULT_REDUCER_HANDLER;