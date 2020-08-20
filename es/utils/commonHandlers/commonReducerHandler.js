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

/* eslint-disable indent */

/* eslint-disable no-underscore-dangle */

/* eslint-disable no-nested-ternary */
// /* eslint-disable indent */
// import isFunction from 'lodash/isFunction';
const HANDLERS = [{
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

const checkKey = (key, name, dataType) => {
  (0, _invariant.default)((0, _helpers.typeOf)(key) === dataType, `(react-boilerplate-redux-saga-hoc)  Expected \`${name}\` to be a ${dataType}`);
};

const CheckCustomHanderFormat = _handler => _handler ? typeof _handler === 'function' ? // ? typeof _handler() === 'function'
// ? typeof _handler()() !== 'function'
_handler : // : null
null : // : null
null;

const _CheckFilter = Filter => Array.isArray(Filter) && Filter.length > 0 ? Filter : Filter && typeof Filter === 'string' ? Filter.split('.') : null;

const COMMON_HANDLER = (payload, data) => {
  let DATA = data; // const bindAction = Action => Action(payload);

  (payload.tasks || Array(1).fill(payload)).forEach( // eslint-disable-next-line consistent-return
  ({
    task = {},
    filter
  } = {}) => {
    let customTaskBindAction = null; // const isMultiTask = Array.isArray(payload.tasks);
    // if (isMultiTask)

    if (task.response) checkKey(task.response, 'task { response  : { data }}', 'object');

    customTaskBindAction = Action => Action({ ...payload,
      filter: _CheckFilter(filter || payload.filter),
      successData: (task.response || {}).data || payload.successData
    });

    const customHandler = CheckCustomHanderFormat(task.customHandler);

    const isFilter = _CheckFilter(filter);

    const BindHandler = handler => (0, _helpers.newObject)(DATA, customTaskBindAction(handler));

    const _handler = HANDLERS.concat(Array.isArray(payload.handlers) ? payload.handlers : []).find(({
      name
    }) => name === task.name);

    if (_handler) {
      checkKey(_handler.handler, `${_handler.name} handler with key name handler`, 'function');
      DATA = isFilter ? BindHandler((0, _customHandlers.commonFilterHandler)(_handler.handler)) : BindHandler(_handler.handler);
    } else if (customHandler && task.name === 'Custom-Handler') DATA = (isFilter ? BindHandler((0, _customHandlers.commonFilterHandler)(customHandler)) : BindHandler(customHandler)) || DATA;else if (task.name === "Don't-Update-Data-Handler") return DATA;else DATA = isFilter ? BindHandler((0, _customHandlers.commonFilterHandler)(_customHandlers.dataHandler)) : BindHandler(_customHandlers.dataHandler);
  });
  return DATA;
};

const COMMON_REDUCER_HANDLER = (action, handlers) => {
  const {
    response: {
      customTask,
      mutation,
      data: {
        data: successData = {},
        ...rest
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
  } = action; // console.log(rest, 'common reducer handler');

  const filter = _CheckFilter(Filter);

  const commonHandler = COMMON_HANDLER.bind(null, {
    handlers,
    successData,
    errorData,
    successDataStatusCode: rest.statusCode,
    customTask,
    mutation,
    ...action.response.payload
  });
  const ErrorHandler = filter && _customHandlers.filterArrayErrorHandler || _customHandlers.errorHandler;
  const commmonErrorHandler = ErrorHandler.bind(null, {
    errorData: customTask ? error : errorData,
    query,
    filter,
    clearDataOnError
  });
  return [commonHandler, commmonErrorHandler];
};

exports.COMMON_REDUCER_HANDLER = COMMON_REDUCER_HANDLER;

const DEFAULT_REDUCER_HANDLER = ({
  method,
  reset,
  state,
  action,
  handlers,
  type
}) => {
  const [commonHandler, commmonErrorHandler] = COMMON_REDUCER_HANDLER(action, handlers);
  const {
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
  let DATA = state;

  const _method = (Array.isArray(method) ? method : [method]).filter(e => [_commonConstants.ON_SUCCESS, _commonConstants.ON_ERROR, _commonConstants.ON_UNMOUNT].includes(e));

  for (let i = 0; i < _method.length; i += 1) {
    switch (_method[i]) {
      case _commonConstants.ON_SUCCESS:
        {
          const updatedState = (0, _helpers.newObject)(DATA, ({
            [type]: Data
          }) => ({
            [type]: commonHandler(Data, state, type)
          }));
          DATA = updateStateCallback ? updateStateCallback({
            state: updatedState,
            data: successData
          }) || updatedState : updatedState;
          break;
        }

      case _commonConstants.ON_ERROR:
        {
          DATA = (0, _helpers.newObject)(DATA, ({
            [type]: Data
          }) => ({
            [type]: (0, _helpers.newObject)(Data, commmonErrorHandler())
          }));
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