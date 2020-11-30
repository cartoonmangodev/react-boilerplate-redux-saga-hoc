/* eslint-disable indent */
/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
import { useState, useEffect, useRef, useCallback } from 'react';
import { bindActionCreators } from 'redux';
import { useStore, useDispatch, useSelector } from 'react-redux';
import isEqual from 'lodash.isequal';
import invariant from 'invariant';
import {
  ON_ERROR,
  ON_SUCCESS,
  ON_LOADING,
  ON_TOAST,
} from './commonReduxSagaConverter/commonConstants';
import { newObject, generateTimeStamp, typeOf } from './helpers';
import {
  filterArrayToastEmptyHandler,
  filterArrayloadingHandler,
  filterArrayToastHandler,
  resetHandler,
  filterArrayResetHandler,
} from './customHandlers';
import nullcheck from './nullCheck';
const cache = {};
const cacheActions = {};
const safe = nullcheck;

export const responseErrorParser = (data = {}) =>
  (Array.isArray(data) &&
    data.reduce((acc, curr) => {
      const [key, message] = Object.entries(curr)[0];
      const payloadKey = key.split(',')[1];
      return {
        ...acc,
        [payloadKey]: message,
      };
    }, {})) ||
  {};

export const commmonStateHandler = ({
  state,
  action,
  newState,
  method,
  constants,
  updateState,
}) => {
  /** This action for initial call  */
  const { payload: { filter, task = {} } = {} } = action;
  const {
    payload: {
      task: { clearDataOnStart: clearData } = {},
      initialCallData: initialData,
    } = {},
  } = action;
  /** This action for after api gets success or failure  */
  const {
    response: {
      type,
      statusCode,
      message,
      status,
      customTask,
      payload: {
        filter: responseFilter,
        loader: customLoader,
        toast: customToast,
      } = {},
    } = {},
  } = action;
  const loader = Object.keys(constants).includes(action.type);
  let State = newObject(state);
  if (
    ((method === ON_LOADING ||
      loader ||
      [ON_SUCCESS, ON_ERROR].includes(method)) &&
      !customTask) ||
    (customLoader !== undefined &&
      customTask &&
      (Array.isArray(method) ? method : [method]).includes(ON_LOADING))
  ) {
    if ((status || loader) && filter && filter.length > 0)
      State = newState(({ [type || action.type]: obj }) => ({
        [type || action.type]: newObject(
          obj,
          filterArrayToastEmptyHandler({
            isInfinite: task.name === 'Infinite-Handler',
            filter: (Array.isArray(filter) && filter) || [filter],
          })(obj),
        ),
      }));
    else if (status || loader)
      State = newState(({ [type || action.type]: obj }) => ({
        [type || action.type]: newObject(obj, ({ toast = {} }) => ({
          toast: newObject(toast, {
            message: '',
            status: '',
            isError: false,
            key: '',
          }),
        })),
      }));
    if (
      ((filter || responseFilter) && !customTask
        ? (filter || responseFilter).length > 0
        : false) ||
      (customTask && customLoader !== undefined)
    )
      State = newObject(State, ({ [type || action.type]: obj }) => ({
        [type || action.type]: newObject(
          obj,
          filterArrayloadingHandler({
            filter: (Array.isArray(filter || responseFilter) &&
              (filter || responseFilter)) || [filter || responseFilter],
            loader:
              customTask && customLoader !== undefined
                ? customLoader
                : initialData
                ? false
                : [ON_SUCCESS, ON_ERROR].includes(method)
                ? false
                : status || loader,
            clearData,
            initialData,
          })(obj),
        ),
      }));
    else
      State = newObject(State, ({ [type || action.type]: obj }) => ({
        [type || action.type]: newObject(obj, ({ data: _data }) => ({
          loading: {
            status:
              customTask && customLoader !== undefined
                ? customLoader
                : initialData
                ? false
                : [ON_SUCCESS, ON_ERROR].includes(method)
                ? false
                : status || loader,
            lastUpdated: generateTimeStamp(),
          },
          ...((clearData || initialData) &&
          ![ON_SUCCESS, ON_ERROR].includes(method)
            ? { data: initialData || (Array.isArray(_data) ? [] : {}) }
            : {}),
        })),
      }));
    if (method === ON_LOADING || loader) return State;
  }
  if (
    ([ON_SUCCESS, ON_ERROR].includes(method) &&
      // [200, 201, 400, 403, 404, 409, 500].includes(statusCode) &&
      Object.keys(constants).includes(type) &&
      !customTask) ||
    (customToast &&
      customTask &&
      (Array.isArray(method) ? method : [method]).includes(ON_TOAST))
  ) {
    if (responseFilter && responseFilter.length > 0)
      State = newObject(State, ({ [type]: obj }) => ({
        [type]: newObject(
          obj,
          filterArrayToastHandler({
            statusCode,
            filter: (Array.isArray(responseFilter) && responseFilter) || [
              responseFilter,
            ],
            message,
            type,
            ...(customToast &&
            customTask &&
            (Array.isArray(method) ? method : [method]).includes(ON_TOAST)
              ? customToast
              : {}),
          })(obj),
        ),
      }));
    else
      State = newObject(State, ({ [type]: obj }) => ({
        [type]: newObject(obj, {
          toast: {
            isError: ![200, 201].includes(statusCode),
            status: statusCode,
            message,
            key: type,
            lastUpdated: generateTimeStamp(),
            ...(customToast &&
            customTask &&
            (Array.isArray(method) ? method : [method]).includes(ON_TOAST)
              ? customToast
              : {}),
          },
        }),
      }));
  }
  const changeState = newObject.bind({}, State);
  const reset =
    responseFilter && responseFilter.length > 0
      ? filterArrayResetHandler.bind(
          {},
          state,
          newState,
          action,
          responseFilter,
        )
      : resetHandler.bind({}, state, newState, action);
  return updateState({
    state: State,
    newState: changeState,
    action,
    reset,
  });
};

export const getData = (data, def, loader = true, filter = []) => ({
  ...safe(data, `${filter.length ? '.data.' : ''}${filter.join('.')}`, {}),
  data: safe(
    data,
    `.data${filter.length ? '.' : ''}${filter.join('.')}${
      filter.length ? '.data' : ''
    }`,
    def,
  ),
  loader: safe(
    data,
    `${filter.length ? '.data.' : ''}${filter.join('.')}.loading.status`,
    typeof loader !== 'boolean' ? false : loader,
  ),
  lastUpdated: safe(
    data,
    `${filter.length ? '.data.' : ''}${filter.join('.')}.lastUpdated`,
  ),
  isInfinite: safe(
    data,
    `${filter.length ? '.data.' : ''}${filter.join('.')}.isInfinite`,
    false,
  ),
  infiniteEnd: safe(
    data,
    `${filter.length ? '.data.' : ''}${filter.join('.')}.infiniteEnd`,
    false,
  ),
  isError: safe(
    data,
    `${filter.length ? '.data.' : ''}${filter.join('.')}.isError`,
    false,
  ),
  toast: safe(
    data,
    `${filter.length ? '.data.' : ''}${filter.join('.')}.toast`,
    {},
  ),
  error: safe(
    data,
    `${filter.length ? '.data.' : ''}${filter.join('.')}.error`,
    {},
  ),
});

export const mapDispatchToProps = (
  actions,
  componentData,
  reducerName,
) => dispatch => ({
  dispatch,
  ...(actions && Object.keys(actions).length
    ? newObject(componentData, ({ [`${reducerName}_hoc`]: data }) => ({
        [`${reducerName}_hoc`]: newObject(data, {
          actions: bindActionCreators(actions, dispatch),
        }),
      }))
    : {}),
});

const checkKey = (key, name, dataType, message) => {
  invariant(
    typeOf(key) === dataType,
    `(react-boilerplate-redux-saga-hoc)  Expected \`${name}\` to be  ${message ||
      dataType}`,
  );
};
const checkKeyWithMessage = (key, dataType, message) => {
  invariant(typeOf(key) === dataType, message);
};
const previousData = new Map();
export const useQuery = (name = null, array = [], config = {}, callback) => {
  if (name) checkKey(name, 'reducer name', 'string', 'valid string');
  // const store = useStore();
  const [_key] = useState({});

  const exeuteRequiredData = useCallback(
    (_data, e = {}) =>
      e &&
      e.requiredKey &&
      Array.isArray(e.requiredKey) &&
      e.requiredKey.length > 0 &&
      typeOf(_data) === 'object'
        ? Object.entries(_data).reduce(
            (acc, [_DataKey, _DataValue]) => ({
              ...acc,
              ...(e.requiredKey.includes(_DataKey)
                ? {
                    [_DataKey]: _DataValue,
                  }
                : {}),
            }),
            {},
          )
        : e && e.requiredKey
        ? _data || {}
        : _data,
    [],
  );

  const _checkFilter = useCallback(
    e =>
      e && e.filter
        ? Array.isArray(e.filter)
          ? e.filter
          : typeof e.filter === 'string'
          ? [e.filter]
          : undefined
        : undefined,
    [],
  );

  const _getData = useCallback(
    (ee = {}, isString, _state) => {
      const state = _state || {};
      const e = ee || {};
      return (typeof e.defaultDataFormat === 'boolean' ||
      !(isString ? array : e.key)
      ? !e.defaultDataFormat || !(isString ? array : e.key)
      : false)
        ? (isString
          ? array
          : e.key)
          ? safe(
              state,
              `[${name}][${isString ? array : e.key}]${e.query ? e.query : ''}`,
              e.default,
            )
          : name
          ? safe(state, `[${name}]${e.query ? e.query : ''}`, e.default)
          : safe(state, `${e.query ? e.query : ''}`, e.default)
        : safe(
            getData(
              safe(state, `[${name}][${isString ? array : e.key}]`),
              e.query ? undefined : e.default || undefined,
              e.initialLoaderState || false,
              _checkFilter(e),
              e.dataQuery,
            ),
            `${e.query && typeOf(e.query) === 'string' ? e.query : ''}`,
            e.query
              ? e.default !== undefined
                ? e.default
                : undefined
              : undefined,
          );
    },
    [array],
  );

  const _GetData = useCallback(
    _state => {
      const state = _state || {};
      let _data = {};
      if (
        name &&
        ((Array.isArray(array) && array.length > 0) ||
          (typeOf(array) === 'object' && Object.keys(array).length > 0))
      ) {
        // eslint-disable-next-line consistent-return
        // eslint-disable-next-line no-underscore-dangle
        _data = (typeOf(array) === 'object' ? [array] : array).reduce(
          (acc, e) => {
            if (typeOf(e) === 'object') {
              if (typeOf(array) === 'object')
                return exeuteRequiredData(_getData(e, undefined, state), e);
              const _arr = [...acc];
              _arr.push(exeuteRequiredData(_getData(e, undefined, state), e));
              return _arr;
            }
            // Below condition ( one config for all the keys )
            if (typeOf(e) === 'string' && typeOf(config) === 'object') {
              const _config = { key: e, ...config };
              if (typeOf(array) === 'object')
                return exeuteRequiredData(
                  _getData(_config, undefined, state),
                  _config,
                );
              const _arr = [...acc];
              _arr.push(
                exeuteRequiredData(
                  _getData(_config, undefined, state),
                  _config,
                ),
              );
              return _arr;
            }
            if (typeOf(array) === 'object')
              return safe(state, `[${name}][${e.key}]`);
            const _arr = [...acc];
            _arr.push(safe(state, `[${name}][${e}]`));
            return _arr;
          },
          typeOf(array) === 'object' ? {} : [],
        );
        // if()
      } else if (
        typeof array === 'string' &&
        config &&
        typeOf(config) === 'array'
      )
        _data = config.reduce(
          (acc, _config) => [
            ...acc,
            exeuteRequiredData(_getData(_config, true, state), _config),
          ],
          [],
        );
      else if (typeof array === 'string')
        _data = exeuteRequiredData(_getData(config, true, state), config);
      else if (name) _data = safe(state, `[${name}]`);
      else _data = state || {};
      return _data;
    },
    [config, array],
  );
  // const [data, setData] = useState(_GetData());
  const execute = useCallback(
    state => {
      // const state = safe(store, `.getState()[${name}]`);
      // eslint-disable-next-line no-underscore-dangle
      const _data = _GetData(state);
      let _queryData = previousData.get(_key);
      if (!isEqual(_data, _queryData)) {
        // previousData[`${key || name}_${_key}`] = _data;
        let callbackData;
        if (callback && typeof callback === 'function')
          callbackData = callback(_data);
        previousData.set(
          _key,
          _data && typeof _data === 'object'
            ? JSON.parse(JSON.stringify(_data))
            : _data,
        );
        if (callbackData) _queryData = callbackData;
        else _queryData = _data;
      }
      return _queryData;
    },
    [config, array],
  );

  // useEffect(() => {
  //   const unSubscribe = store.subscribe(execute);
  //   return () => {
  //     delete previousData.delete(_key);
  //     unSubscribe();
  //   };
  // }, []);
  // useEffect(() => {
  //   previousData.set(_key, {});
  //   if (
  //     !isEqual(previousConfig.get(_key), {
  //       array,
  //       config,
  //     })
  //   ) {
  //     previousConfig.set(_key, {
  //       array,
  //       config,
  //     });
  //     execute();
  //   }
  // }, [config, array]);
  useEffect(() => {
    previousData.set(_key, {});
  }, []);
  const _selectorData = useSelector(execute, (e, f) => isEqual(e, f));
  return _selectorData;
};

export const useActionsHook = (name, actions) => {
  const [dispatchAction, setDispatchAction] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isEqual(cacheActions[name], actions)) {
      cacheActions[name] = actions;
      cache[name] = bindActionCreators(actions, dispatch);
      setDispatchAction(cache[name]);
    } else setDispatchAction(cache[name]);
  }, [isEqual(cacheActions[name], actions)]);
  return dispatchAction;
};

export const useMutation = reducerName => {
  if (!reducerName)
    checkKeyWithMessage(
      reducerName,
      'string',
      'useMutation(`reducerkey`) : Expected a valid reducer key',
    );
  const store = useStore();

  useEffect(() => {
    if (reducerName)
      checkKeyWithMessage(
        reducerName,
        'string',
        'useMutation(`reducerkey`) : Expected a reducer key to be string',
      );
    if (!store.getState()[reducerName])
      checkKeyWithMessage(
        null,
        'string',
        ` reducerName '${reducerName}' not a valid reducer key.`,
      );
  }, []);

  const dispatch = useDispatch();
  return ({ key: type, value, filter = [] }) => {
    if (!type) checkKey(null, 'key', 'string', 'valid string');
    const _reducer_keys = Object.keys(store.getState()[reducerName]);
    if (type)
      invariant(
        _reducer_keys.includes(type),
        // type.includes('_CALL') && type.slice(-5) === '_CALL',
        `'key' is invalid.${type} not found in ${reducerName} reducer`,
      );
    checkKey(filter, 'filter', 'array');
    checkKey(type, 'key', 'string');
    if (type.includes('_CALL') && type.slice(-5) === '_CALL') {
      checkKey(value, 'value', 'object');
      dispatch({
        type: type.slice(0, -4).concat('CUSTOM_TASK'),
        response: {
          type,
          method: ON_SUCCESS,
          statusCode: 200,
          mutation: true,
          customTask: true,
          data: {
            data:
              typeof value === 'function'
                ? value(store.getState()[reducerName][type])
                : value,
          },
          payload: {
            filter,
          },
        },
      });
    } else
      dispatch({
        type: `${reducerName}_MUTATE_STATE`,
        payload: {
          [type]:
            typeof value === 'function'
              ? value(store.getState()[reducerName][type])
              : value,
        },
      });
  };
};

export const toPromise = (action, config = {}, isReject) => {
  if (typeOf(config) !== 'null' || typeOf(config) !== 'undefined')
    checkKeyWithMessage(
      config,
      'object',
      `toPromise() : Expected a config (second parameter) to be object`,
    );
  return new Promise((resolve, reject) =>
    action({ ...config, resolve, reject, isReject }),
  );
};

export const toPromiseFunction = (action, isReject) => config => {
  if (typeOf(config) !== 'null' || typeOf(config) !== 'undefined')
    checkKeyWithMessage(
      config,
      'object',
      `toPromise() : Expected a config (second parameter) to be object`,
    );
  return new Promise((resolve, reject) =>
    action({ ...config, resolve, reject, isReject }),
  );
};

const CACHE = {};

function stringify(val) {
  return typeof val === 'object' ? JSON.stringify(val) : String(val);
}

function hashArgs(...args) {
  return args.reduce((acc, arg) => `${stringify(arg)}:${acc}`, '');
}

export function useStaleRefresh(
  fn,
  name, // reducer constants
  arg = {},
  initial,
  // initialLoadingstate = true,
) {
  const prevArgs = useRef(null);
  const [isUpdating, setIsUpdating] = useState(null);
  const refresh = useCallback(
    ({ loader, clearData, config } = {}) => {
      const args = config || arg;
      const cacheID = hashArgs(name, args);
      // look in cache and set response if present
      // fetch new data
      if (CACHE[cacheID]) setIsUpdating(true);
      toPromise(
        fn,
        Object.assign(
          {},
          args,
          CACHE[cacheID] && !loader ? { initialCallData: CACHE[cacheID] } : {},
          clearData
            ? {
                task: args.task
                  ? { ...args.task, clearDataOnStart: true }
                  : { clearDataOnStart: true },
              }
            : {},
        ),
      ).then(newData => {
        if (CACHE[cacheID]) setIsUpdating(false);
        if (newData && newData.status === 'SUCCESS') {
          CACHE[cacheID] = newData.data;
          // setData(newData);
        }
        // setLoading(false);
      });
    },
    [arg, initial],
  );

  useEffect(() => {
    // args is an object so deep compare to rule out false changes
    if (isEqual(arg, prevArgs.current)) {
      return;
    }
    if (initial) refresh();
    // cacheID is how a cache is identified against a unique request
  }, [arg, fn, name, initial]);

  useEffect(() => {
    prevArgs.current = arg;
  });

  return [refresh, isUpdating];
}

export const useMutateReducer = reducerName => {
  const store = useStore();
  const dispatch = useDispatch();
  return callback => {
    const state = reducerName
      ? store.getState()[reducerName]
      : store.getState();
    dispatch({
      type: reducerName ? `${reducerName}_MUTATE_STATE` : 'MUTATE_STATE',
      payload: callback(state) || {},
    });
  };
};

export const useResetState = reducerName => {
  const dispatch = useDispatch();
  return (dontResetKeys = []) => {
    dispatch({
      type: reducerName ? `${reducerName}_RESET_STATE` : 'RESET_STATE',
      payload: dontResetKeys,
    });
  };
};

export const useResetOnlyApiEndPointsState = reducerName => {
  const dispatch = useDispatch();
  return (dontResetKeys = []) => {
    dispatch({
      type: reducerName ? `${reducerName}_RESET_API` : 'RESET_API',
      payload: dontResetKeys,
    });
  };
};

export const useOptimizedQuery = (
  name = null,
  array = [],
  config = {},
  callback,
) => {
  if (name) checkKey(name, 'reducer name', 'string', 'valid string');
  const store = useStore();
  const [_key] = useState({});

  const exeuteRequiredData = useCallback(
    (_data, e = {}) =>
      e.requiredKey &&
      Array.isArray(e.requiredKey) &&
      e.requiredKey.length > 0 &&
      typeOf(_data) === 'object'
        ? Object.entries(_data).reduce(
            (acc, [_DataKey, _DataValue]) => ({
              ...acc,
              ...(e.requiredKey.includes(_DataKey)
                ? {
                    [_DataKey]: _DataValue,
                  }
                : {}),
            }),
            {},
          )
        : e.requiredKey
        ? _data || {}
        : _data,
    [],
  );

  const _checkFilter = useCallback(
    e =>
      e.filter
        ? Array.isArray(e.filter)
          ? e.filter
          : typeof e.filter === 'string'
          ? [e.filter]
          : undefined
        : undefined,
    [],
  );

  const _getData = useCallback(
    (e = {}, isString) =>
      ((typeof e.defaultDataFormat === 'boolean'
        ? e.defaultDataFormat
        : true) || !(isString ? array : e.key)
      ? !(typeof e.defaultDataFormat === 'boolean'
          ? e.defaultDataFormat
          : true) || !(isString ? array : e.key)
      : false)
        ? (isString
          ? array
          : e.key)
          ? safe(
              store,
              `.getState()[${name}][${isString ? array : e.key}]${
                e.query ? e.query : ''
              }`,
              e.default,
            )
          : name
          ? safe(
              store,
              `.getState()[${name}]${e.query ? e.query : ''}`,
              e.default,
            )
          : safe(store, `.getState()${e.query ? e.query : ''}`, e.default)
        : safe(
            getData(
              safe(store, `.getState()[${name}][${isString ? array : e.key}]`),
              e.query ? undefined : e.default || undefined,
              e.initialLoaderState || false,
              _checkFilter(e),
              e.dataQuery,
            ),
            `${e.query && typeOf(e.query) === 'string' ? e.query : ''}`,
            e.query
              ? e.default !== undefined
                ? e.default
                : undefined
              : undefined,
          ),
    [],
  );

  const _GetData = useCallback(() => {
    let _data = {};
    if (
      name &&
      ((Array.isArray(array) && array.length > 0) ||
        (typeOf(array) === 'object' && Object.keys(array).length > 0))
    ) {
      // eslint-disable-next-line consistent-return
      // eslint-disable-next-line no-underscore-dangle
      _data = (typeOf(array) === 'object' ? [array] : array).reduce(
        (acc, e) => {
          if (typeOf(e) === 'object') {
            if (typeOf(array) === 'object')
              return exeuteRequiredData(_getData(e), e);
            const _arr = [...acc];
            _arr.push(exeuteRequiredData(_getData(e), e));
            return _arr;
          }
          if (typeOf(array) === 'object')
            return safe(store, `.getState()[${name}][${e}]`);
          const _arr = [...acc];
          _arr.push(safe(store, `.getState()[${name}][${e}]`));
          return _arr;
        },
        typeOf(array) === 'object' ? {} : [],
      );
      // if()
    } else if (
      typeof array === 'string' &&
      config &&
      typeOf(config) === 'array'
    )
      _data = config.reduce(
        (acc, _config) => [
          ...acc,
          exeuteRequiredData(_getData(_config, true), _config),
        ],
        [],
      );
    else if (typeof array === 'string')
      _data = exeuteRequiredData(_getData(config, true), config);
    else if (name) _data = safe(store, `.getState()[${name}]`);
    else _data = safe(store, `.getState()`) || {};
    return _data;
  }, []);

  const [data, setData] = useState(_GetData());
  const execute = useCallback(() => {
    // const state = safe(store, `.getState()[${name}]`);
    // eslint-disable-next-line no-underscore-dangle
    const _data = _GetData();
    if (!isEqual(_data, previousData.get(_key))) {
      // previousData[`${key || name}_${_key}`] = _data;
      let callbackData;
      if (callback && typeof callback === 'function')
        callbackData = callback(_data);
      previousData.set(_key, _data);
      if (callbackData) setData(callbackData);
      else setData(_data);
    }
  }, []);

  useEffect(() => {
    previousData.set(_key, {});
    execute();
    const unSubscribe = store.subscribe(execute);
    return () => {
      delete previousData.delete(_key);
      unSubscribe();
    };
  }, []);
  return data;
};
