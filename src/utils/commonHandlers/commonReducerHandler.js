/* eslint-disable no-loop-func */
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
  callbackHandler,
  updateKeyHandler,
  dontUpdateDataHandler,
  resetReducerHandler,
  reducerErrorHandler,
  reducerLoadingHandler,
  reducerToastHandler,
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
    name: 'Callback-Handler',
    handler: callbackHandler,
  },
  {
    name: 'Reset-Handler',
    handler: resetReducerHandler,
  },
  {
    name: 'Toast-Handler',
    handler: reducerToastHandler,
  },
  {
    name: 'Error-Handler',
    handler: reducerErrorHandler,
  },
  {
    name: 'Loading-Handler',
    handler: reducerLoadingHandler,
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
    : Filter && typeof Filter === 'string' && Filter.length > 0
    ? Filter.split('.')
    : null;
const COMMON_HANDLER = (payload, data) => {
  let DATA = data;
  // const bindAction = Action => Action(payload);
  const _tasks =
    typeOf(payload.tasks) === 'array'
      ? payload.tasks.filter(e => e.task || e.filter)
      : [];
  (_tasks.length > 0 ? _tasks : Array(1).fill(payload)).forEach(
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
      ).find(({ name }) => name === task.name || name === task);

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
      else if (
        task.name === "Don't-Update-Handler" ||
        task === "Don't-Update-Handler"
      )
        return DATA;
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
      customTask,
      mutation,
      data: { data: successData = {}, ...rest } = {},
      payload: {
        callback: { updateStateCallback } = {},
        excuteUpdateStateCallbackOnError,
        updateStateCallbackOnError,
        tasks,
        updateDataReducerKey,
        _errortask,
      } = {},
      error: { data: errorData = {} } = {},
    } = {},
  } = action;
  let DATA = state;
  const _method = (Array.isArray(method)
    ? method
    : [method, _errortask ? ON_SUCCESS : null]
  ).filter(e => [ON_SUCCESS, ON_ERROR, ON_UNMOUNT].includes(e));
  for (let i = 0; i < _method.length; i += 1) {
    switch (_method[i]) {
      case ON_SUCCESS: {
        let updatedState;
        const _tasks = tasks
          ? Array.isArray(tasks) && tasks.filter(e => typeOf(e) === 'object')
          : null;
        if (_tasks && Array.isArray(_tasks) && _tasks.length > 0) {
          for (let k = 0; k < _tasks.length; k += 1) {
            const _commonHandler = COMMON_HANDLER.bind(null, {
              handlers,
              successData,
              errorData,
              successDataStatusCode: rest.statusCode,
              customTask,
              mutation,
              ...action.response.payload,
              ..._tasks[k],
              tasks: undefined,
            });
            const _updateDataReducerKey =
              (_tasks[k] && _tasks[k].updateDataReducerKey) ||
              updateDataReducerKey;
            if (
              Array.isArray(_updateDataReducerKey) &&
              _updateDataReducerKey.length > 0
            ) {
              for (let l = 0; l < _updateDataReducerKey.length; l += 1) {
                DATA = newObject(
                  DATA,
                  ({ [_updateDataReducerKey[l] || type]: Data }) => ({
                    [_updateDataReducerKey[l] || type]: _commonHandler(
                      Data,
                      state,
                      type,
                    ),
                  }),
                );
              }
            } else {
              DATA = newObject(
                DATA,
                ({ [_updateDataReducerKey || type]: Data }) => ({
                  [_updateDataReducerKey || type]: _commonHandler(
                    Data,
                    state,
                    type,
                  ),
                }),
              );
            }
          }
          updatedState = DATA;
        } else if (
          Array.isArray(updateDataReducerKey) &&
          updateDataReducerKey.length > 0
        ) {
          for (let j = 0; j < updateDataReducerKey.length; j += 1) {
            DATA = newObject(
              DATA,
              ({ [updateDataReducerKey[j] || type]: Data }) => ({
                [updateDataReducerKey[j] || type]: commonHandler(
                  Data,
                  state,
                  type,
                ),
              }),
            );
          }
          updatedState = DATA;
        } else {
          updatedState = newObject(
            DATA,
            ({ [updateDataReducerKey || type]: Data }) => ({
              [updateDataReducerKey || type]: commonHandler(Data, state, type),
            }),
          );
        }
        DATA =
          updateStateCallback &&
          (!_errortask || excuteUpdateStateCallbackOnError)
            ? updateStateCallback({
                state: updatedState,
                data: successData,
                type: 'SUCCESS',
              }) || updatedState
            : updatedState;
        break;
      }
      case ON_ERROR: {
        const updatedState = newObject(DATA, ({ [type]: Data }) => ({
          [type]: newObject(Data, commmonErrorHandler()),
        }));
        DATA =
          updateStateCallback &&
          (excuteUpdateStateCallbackOnError || updateStateCallbackOnError)
            ? updateStateCallback({
                state: updatedState,
                data: successData,
                type: 'ERROR',
              }) || updatedState
            : updatedState;
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
