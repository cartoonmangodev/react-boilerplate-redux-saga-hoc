function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/* eslint-disable indent */

/* eslint-disable no-underscore-dangle */

/* eslint-disable no-nested-ternary */
// /* eslint-disable indent */
// import isFunction from 'lodash/isFunction';
import invariant from 'invariant';
import { newObject, typeOf } from '../helpers';
import { ON_ERROR, ON_SUCCESS, ON_UNMOUNT } from '../commonReduxSagaConverter/commonConstants';
import { commonFilterHandler, infiniteHandler, deleteHandler, dataHandler, spliceHandler, filterArrayErrorHandler, toggleKeyHandler, deleteKeyHandler, updateHandler, errorHandler, updateKeyHandler, dontUpdateDataHandler } from '../customHandlers';
var HANDLERS = [{
  name: 'Infinite-Handler',
  handler: infiniteHandler
}, {
  name: 'Data-Handler',
  handler: dataHandler
}, {
  name: 'Delete-Handler',
  handler: deleteHandler
}, {
  name: 'Update-Handler',
  handler: updateHandler
}, {
  name: 'Update-Key-Handler',
  handler: updateKeyHandler
}, {
  name: 'Delete-Key-Handler',
  handler: deleteKeyHandler
}, {
  name: 'Toggle-Key-Handler',
  handler: toggleKeyHandler
}, {
  name: 'Splice-Data-Handler',
  handler: spliceHandler
}, {
  name: "Don't-Update-Data-Handler",
  handler: dontUpdateDataHandler
}];

var checkKey = function checkKey(key, name, dataType) {
  invariant(typeOf(key) === dataType, "(react-boilerplate-redux-saga-hoc)  Expected `" + name + "` to be a " + dataType);
};

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
  function (_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$task = _ref.task,
        task = _ref$task === void 0 ? {} : _ref$task,
        filter = _ref.filter;

    var customTaskBindAction = null; // const isMultiTask = Array.isArray(payload.tasks);
    // if (isMultiTask)

    if (task.response) checkKey(task.response, 'task { response  : { data }}', 'object');

    customTaskBindAction = function customTaskBindAction(Action) {
      return Action(_extends({}, payload, {
        filter: _CheckFilter(filter || payload.filter),
        successData: (task.response || {}).data || payload.successData
      }));
    };

    var customHandler = CheckCustomHanderFormat(task.customHandler);

    var isFilter = _CheckFilter(filter);

    var BindHandler = function BindHandler(handler) {
      return newObject(DATA, customTaskBindAction(handler));
    };

    var _handler = HANDLERS.concat(Array.isArray(payload.handlers) ? payload.handlers : []).find(function (_ref2) {
      var name = _ref2.name;
      return name === task.name;
    });

    if (_handler) {
      checkKey(_handler.handler, _handler.name + " handler with key name handler", 'function');
      DATA = isFilter ? BindHandler(commonFilterHandler(_handler.handler)) : BindHandler(_handler.handler);
    } else if (customHandler && task.name === 'Custom-Handler') DATA = (isFilter ? BindHandler(commonFilterHandler(customHandler)) : BindHandler(customHandler)) || DATA;else if (task.name === "Don't-Update-Data-Handler") return DATA;else DATA = isFilter ? BindHandler(commonFilterHandler(dataHandler)) : BindHandler(dataHandler);
  });
  return DATA;
};

export var COMMON_REDUCER_HANDLER = function COMMON_REDUCER_HANDLER(action, handlers) {
  var _action$response = action.response;
  _action$response = _action$response === void 0 ? {} : _action$response;
  var customTask = _action$response.customTask,
      mutation = _action$response.mutation,
      _action$response$data = _action$response.data;
  _action$response$data = _action$response$data === void 0 ? {} : _action$response$data;

  var _action$response$data2 = _action$response$data.data,
      successData = _action$response$data2 === void 0 ? {} : _action$response$data2,
      rest = _objectWithoutPropertiesLoose(_action$response$data, ["data"]),
      _action$response$payl = _action$response.payload;

  _action$response$payl = _action$response$payl === void 0 ? {} : _action$response$payl;
  var _action$response$payl2 = _action$response$payl.request;
  _action$response$payl2 = _action$response$payl2 === void 0 ? {} : _action$response$payl2;
  var _action$response$payl3 = _action$response$payl2.query,
      query = _action$response$payl3 === void 0 ? {} : _action$response$payl3,
      _action$response$payl4 = _action$response$payl2.clearDataOnError,
      clearDataOnError = _action$response$payl4 === void 0 ? false : _action$response$payl4,
      Filter = _action$response$payl.filter,
      error = _action$response$payl.error,
      _action$response$erro = _action$response.error;
  _action$response$erro = _action$response$erro === void 0 ? {} : _action$response$erro;
  var _action$response$erro2 = _action$response$erro.data,
      errorData = _action$response$erro2 === void 0 ? {} : _action$response$erro2; // console.log(rest, 'common reducer handler');

  var filter = _CheckFilter(Filter);

  var commonHandler = COMMON_HANDLER.bind(null, _extends({
    handlers: handlers,
    successData: successData,
    errorData: errorData,
    successDataStatusCode: rest.statusCode,
    customTask: customTask,
    mutation: mutation
  }, action.response.payload));
  var ErrorHandler = filter && filterArrayErrorHandler || errorHandler;
  var commmonErrorHandler = ErrorHandler.bind(null, {
    errorData: customTask ? error : errorData,
    query: query,
    filter: filter,
    clearDataOnError: clearDataOnError
  });
  return [commonHandler, commmonErrorHandler];
};
export var DEFAULT_REDUCER_HANDLER = function DEFAULT_REDUCER_HANDLER(_ref3) {
  var method = _ref3.method,
      reset = _ref3.reset,
      state = _ref3.state,
      action = _ref3.action,
      handlers = _ref3.handlers,
      type = _ref3.type;

  var _COMMON_REDUCER_HANDL = COMMON_REDUCER_HANDLER(action, handlers),
      commonHandler = _COMMON_REDUCER_HANDL[0],
      commmonErrorHandler = _COMMON_REDUCER_HANDL[1];

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
    return [ON_SUCCESS, ON_ERROR, ON_UNMOUNT].includes(e);
  });

  for (var i = 0; i < _method.length; i += 1) {
    switch (_method[i]) {
      case ON_SUCCESS:
        {
          var updatedState = newObject(DATA, function (_ref4) {
            var _ref5;

            var Data = _ref4[type];
            return _ref5 = {}, _ref5[type] = commonHandler(Data, state, type), _ref5;
          });
          DATA = updateStateCallback ? updateStateCallback({
            state: updatedState,
            data: successData
          }) || updatedState : updatedState;
          break;
        }

      case ON_ERROR:
        {
          DATA = newObject(DATA, function (_ref6) {
            var _ref7;

            var Data = _ref6[type];
            return _ref7 = {}, _ref7[type] = newObject(Data, commmonErrorHandler()), _ref7;
          });
          break;
        }

      case ON_UNMOUNT:
        {
          DATA = reset();
          break;
        }

      default:
    }
  }

  return DATA;
};