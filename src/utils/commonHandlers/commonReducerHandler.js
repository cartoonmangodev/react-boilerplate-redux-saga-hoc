/* eslint-disable indent */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
// /* eslint-disable indent */
// import isFunction from 'lodash/isFunction';
import invariant from 'invariant';

import { newObject, typeOf } from '../helpers';
import {
  ON_ERROR,
  ON_SUCCESS,
  ON_UNMOUNT,
} from '../commonReduxSagaConverter/commonConstants';
import {
  commonFilterHandler,
  infiniteHandler,
  deleteHandler,
  dataHandler,
  spliceHandler,
  filterArrayErrorHandler,
  toggleKeyHandler,
  deleteKeyHandler,
  updateHandler,
  errorHandler,
  updateKeyHandler,
  dontUpdateDataHandler,
} from '../customHandlers';

const HANDLERS = [
  {
    name: 'Infinite-Handler',
    handler: infiniteHandler,
  },
  {
    name: 'Data-Handler',
    handler: dataHandler,
  },
  {
    name: 'Delete-Handler',
    handler: deleteHandler,
  },
  {
    name: 'Update-Handler',
    handler: updateHandler,
  },
  {
    name: 'Update-Key-Handler',
    handler: updateKeyHandler,
  },
  {
    name: 'Delete-Key-Handler',
    handler: deleteKeyHandler,
  },
  {
    name: 'Toggle-Key-Handler',
    handler: toggleKeyHandler,
  },
  {
    name: 'Splice-Data-Handler',
    handler: spliceHandler,
  },
  {
    name: "Don't-Update-Data-Handler",
    handler: dontUpdateDataHandler,
  },
];
const checkKey = (key, name, dataType) => {
  invariant(
    typeOf(key) === dataType,
    `(react-boilerplate-redux-saga-hoc)  Expected \`${name}\` to be a ${dataType}`,
  );
};

const CheckCustomHanderFormat = _handler =>
  _handler
    ? typeof _handler === 'function'
      ? // ? typeof _handler() === 'function'
        // ? typeof _handler()() !== 'function'
        _handler
      : // : null
        null
    : // : null
      null;
const _CheckFilter = Filter =>
  Array.isArray(Filter) && Filter.length > 0
    ? Filter
    : Filter && typeof Filter === 'string'
    ? Filter.split('.')
    : null;
const COMMON_HANDLER = (payload, data) => {
  let DATA = data;
  // const bindAction = Action => Action(payload);
  (payload.tasks || Array(1).fill(payload)).forEach(
    // eslint-disable-next-line consistent-return
    ({ task = {}, filter } = {}) => {
      let customTaskBindAction = null;
      // const isMultiTask = Array.isArray(payload.tasks);
      // if (isMultiTask)
      if (task.response)
        checkKey(task.response, 'task { response  : { data }}', 'object');
      customTaskBindAction = Action =>
        Action({
          ...payload,
          filter: _CheckFilter(filter || payload.filter),
          successData: (task.response || {}).data || payload.successData,
        });

      const customHandler = CheckCustomHanderFormat(task.customHandler);

      const isFilter = _CheckFilter(filter);

      const BindHandler = handler =>
        newObject(DATA, customTaskBindAction(handler));
      const _handler = HANDLERS.concat(
        Array.isArray(payload.handlers) ? payload.handlers : [],
      ).find(({ name }) => name === task.name);

      if (_handler) {
        checkKey(
          _handler.handler,
          `${_handler.name} handler with key name handler`,
          'function',
        );
        DATA = isFilter
          ? BindHandler(commonFilterHandler(_handler.handler))
          : BindHandler(_handler.handler);
      } else if (customHandler && task.name === 'Custom-Handler')
        DATA =
          (isFilter
            ? BindHandler(commonFilterHandler(customHandler))
            : BindHandler(customHandler)) || DATA;
      else if (task.name === "Don't-Update-Data-Handler") return DATA;
      else
        DATA = isFilter
          ? BindHandler(commonFilterHandler(dataHandler))
          : BindHandler(dataHandler);
    },
  );

  return DATA;
};

export const COMMON_REDUCER_HANDLER = (action, handlers) => {
  const {
    response: {
      customTask,
      mutation,
      update: updatedData,
      data: { data: successData = {}, ...rest } = {},
      payload: {
        request: { query = {}, clearDataOnError = false } = {},
        filter: Filter,
        error,
      } = {},
      error: { data: errorData = {} } = {},
    } = {},
  } = action;
  // console.log(rest, 'common reducer handler');
  const filter = _CheckFilter(Filter);
  const commonHandler = COMMON_HANDLER.bind(null, {
    handlers,
    successData,
    errorData,
    successDataStatusCode: rest.statusCode,
    customTask,
    mutation,
    updatedData,
    ...action.response.payload,
  });
  const ErrorHandler = (filter && filterArrayErrorHandler) || errorHandler;
  const commmonErrorHandler = ErrorHandler.bind(null, {
    errorData: customTask ? error : errorData,
    query,
    filter,
    clearDataOnError,
  });

  return [commonHandler, commmonErrorHandler];
};

export const DEFAULT_REDUCER_HANDLER = ({
  method,
  reset,
  state,
  action,
  handlers,
  type,
}) => {
  const [commonHandler, commmonErrorHandler] = COMMON_REDUCER_HANDLER(
    action,
    handlers,
  );
  const {
    response: {
      data: { data: successData = {} } = {},
      payload: { callback: { updateStateCallback } = {} } = {},
    } = {},
  } = action;
  let DATA = state;
  const _method = (Array.isArray(method) ? method : [method]).filter(e =>
    [ON_SUCCESS, ON_ERROR, ON_UNMOUNT].includes(e),
  );
  for (let i = 0; i < _method.length; i += 1) {
    switch (_method[i]) {
      case ON_SUCCESS: {
        const updatedState = newObject(DATA, ({ [type]: Data }) => ({
          [type]: commonHandler(Data, state, type),
        }));
        DATA = updateStateCallback
          ? updateStateCallback({
              state: updatedState,
              data: successData,
            }) || updatedState
          : updatedState;
        break;
      }
      case ON_ERROR: {
        DATA = newObject(DATA, ({ [type]: Data }) => ({
          [type]: newObject(Data, commmonErrorHandler()),
        }));
        break;
      }
      case ON_UNMOUNT: {
        DATA = reset();
        break;
      }
      default:
    }
  }
  return DATA;
};
