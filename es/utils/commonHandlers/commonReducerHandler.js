"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_REDUCER_HANDLER = exports.COMMON_REDUCER_HANDLER = void 0;

var _invariant = _interopRequireDefault(require("invariant"));

var _helpers = require("../helpers");

var _commonConstants = require("../commonReduxSagaConverter/commonConstants");

var _customHandlers = require("../customHandlers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
}, {
  name: "Don't-Update-Data-Handler",
  handler: _customHandlers.dontUpdateDataHandler
}];

var checkKey = (key, name, dataType) => {
  (0, _invariant.default)((0, _helpers.typeOf)(key) === dataType, "(react-boilerplate-redux-saga-hoc)  Expected `".concat(name, "` to be a ").concat(dataType));
};

var CheckCustomHanderFormat = _handler => _handler ? typeof _handler === 'function' ? // ? typeof _handler() === 'function'
// ? typeof _handler()() !== 'function'
_handler : // : null
null : // : null
null;

var _CheckFilter = Filter => Array.isArray(Filter) && Filter.length > 0 ? Filter : Filter && typeof Filter === 'string' ? Filter.split('.') : null;

var COMMON_HANDLER = (payload, data) => {
  var DATA = data; // const bindAction = Action => Action(payload);

  (payload.tasks || Array(1).fill(payload)).forEach( // eslint-disable-next-line consistent-return
  function () {
    var {
      task = {},
      filter
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var customTaskBindAction = null; // const isMultiTask = Array.isArray(payload.tasks);
    // if (isMultiTask)

    if (task.response) checkKey(task.response, 'task { response  : { data }}', 'object');

    customTaskBindAction = Action => Action(_objectSpread({}, payload, {
      filter: _CheckFilter(filter || payload.filter),
      successData: (task.response || {}).data || payload.successData
    }));

    var customHandler = CheckCustomHanderFormat(task.customHandler);

    var isFilter = _CheckFilter(filter);

    var BindHandler = handler => (0, _helpers.newObject)(DATA, customTaskBindAction(handler));

    var _handler = HANDLERS.concat(Array.isArray(payload.handlers) ? payload.handlers : []).find((_ref) => {
      var {
        name
      } = _ref;
      return name === task.name;
    });

    if (_handler) {
      checkKey(_handler.handler, "".concat(_handler.name, " handler with key name handler"), 'function');
      DATA = isFilter ? BindHandler((0, _customHandlers.commonFilterHandler)(_handler.handler)) : BindHandler(_handler.handler);
    } else if (customHandler && task.name === 'Custom-Handler') DATA = (isFilter ? BindHandler((0, _customHandlers.commonFilterHandler)(customHandler)) : BindHandler(customHandler)) || DATA;else if (task.name === "Don't-Update-Data-Handler") return DATA;else DATA = isFilter ? BindHandler((0, _customHandlers.commonFilterHandler)(_customHandlers.dataHandler)) : BindHandler(_customHandlers.dataHandler);
  });
  return DATA;
};

var COMMON_REDUCER_HANDLER = (action, handlers) => {
  var {
    response: {
      customTask,
      mutation,
      data: {
        data: successData = {}
      } = {},
      payload: {
        request: {
          query = {},
          clearDataOnError = false
        } = {},
        filter: Filter,
        error
      } = {},
      error: {
        data: errorData = {}
      } = {}
    } = {}
  } = action,
      rest = _objectWithoutProperties(action.response.data, ["data"]); // console.log(rest, 'common reducer handler');


  var filter = _CheckFilter(Filter);

  var commonHandler = COMMON_HANDLER.bind(null, _objectSpread({
    handlers,
    successData,
    errorData,
    successDataStatusCode: rest.statusCode,
    customTask,
    mutation
  }, action.response.payload));
  var ErrorHandler = filter && _customHandlers.filterArrayErrorHandler || _customHandlers.errorHandler;
  var commmonErrorHandler = ErrorHandler.bind(null, {
    errorData: customTask ? error : errorData,
    query,
    filter,
    clearDataOnError
  });
  return [commonHandler, commmonErrorHandler];
};

exports.COMMON_REDUCER_HANDLER = COMMON_REDUCER_HANDLER;

var DEFAULT_REDUCER_HANDLER = (_ref2) => {
  var {
    method,
    reset,
    state,
    action,
    handlers,
    type
  } = _ref2;
  var [commonHandler, commmonErrorHandler] = COMMON_REDUCER_HANDLER(action, handlers);
  var {
    response: {
      data: {
        data: successData = {}
      } = {},
      payload: {
        callback: {
          updateStateCallback
        } = {}
      } = {}
    } = {}
  } = action;
  var DATA = state;

  var _method = (Array.isArray(method) ? method : [method]).filter(e => [_commonConstants.ON_SUCCESS, _commonConstants.ON_ERROR, _commonConstants.ON_UNMOUNT].includes(e));

  for (var i = 0; i < _method.length; i += 1) {
    switch (_method[i]) {
      case _commonConstants.ON_SUCCESS:
        {
          var updatedState = (0, _helpers.newObject)(DATA, (_ref3) => {
            var {
              [type]: Data
            } = _ref3;
            return {
              [type]: commonHandler(Data, state, type)
            };
          });
          DATA = updateStateCallback ? updateStateCallback({
            state: updatedState,
            data: successData
          }) || updatedState : updatedState;
          break;
        }

      case _commonConstants.ON_ERROR:
        {
          DATA = (0, _helpers.newObject)(DATA, (_ref4) => {
            var {
              [type]: Data
            } = _ref4;
            return {
              [type]: (0, _helpers.newObject)(Data, commmonErrorHandler())
            };
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