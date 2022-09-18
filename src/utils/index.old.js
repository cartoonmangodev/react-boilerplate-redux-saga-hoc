/* eslint-disable indent */
/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { useStore, useDispatch, useSelector } from 'react-redux';
import isEqual from 'fast-deep-equal';
import { createSelector } from 'reselect';
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
  const {
    payload: {
      filter,
      task = {},
      dontUpdateReducer,
      dontUpdateReducerOnCall,
    } = {},
  } = action;
  if (dontUpdateReducer || dontUpdateReducerOnCall) return state;
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
      (customTask &&
        customLoader !== undefined &&
        (filter || responseFilter || []).length > 0)
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
          initialState: false,
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
          initialState: false,
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
const initialRender = new Map();
const previousCallbackData = new Map();
const previousDependencyArrayData = new Map();
const isPreviousDependencyArrayCheckPassed = new Map();
export const useQuery = (
  _name = null,
  _array = [],
  __config = {},
  _callback,
  _callbackSuccess,
  { refreshKey: _refreshKey = undefined } = {},
) => {
  const {
    reducerName: name,
    key: array,
    config,
    callback,
    callbackSuccess,
    refreshKey,
  } =
    typeOf(_name) === 'object'
      ? _name
      : {
          reducerName: _name,
          key: _array,
          config: __config,
          callback: _callback,
          callbackSuccess: _callbackSuccess,
          refreshKey: _refreshKey,
        };
  if (name) checkKey(name, 'reducer name', 'string', 'valid string');
  // const store = useStore();
  const [_key] = useState({});

  const exeuteRequiredData = useCallback(
    (_data, e = {}) => {
      const initialData = (e.requiredKey || []).reduce(
        (acc, _reqKey) => ({
          ...acc,
          ...(_reqKey && typeOf(_reqKey.key || _reqKey) === 'string'
            ? typeOf(_reqKey) === 'string'
              ? { [_reqKey]: undefined }
              : { [_reqKey.key]: _reqKey.default }
            : {}),
        }),
        {},
      );

      return e &&
        e.requiredKey &&
        Array.isArray(e.requiredKey) &&
        e.requiredKey.length > 0 &&
        typeOf(_data) === 'object'
        ? e.requiredKey.reduce(
            (acc, _reqKey) => ({
              ...acc,
              ...(_reqKey && typeOf(_reqKey.key || _reqKey) === 'string'
                ? {
                    [_reqKey.key || _reqKey]:
                      typeOf(_data[_reqKey.key || _reqKey]) !== undefined
                        ? _data[_reqKey.key || _reqKey]
                        : _reqKey.default,
                  }
                : {}),
            }),
            { ...initialData },
          )
        : e && e.requiredKey
        ? _data || { ...initialData }
        : _data;
    },
    [refreshKey],
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
      const _getDataFunc = e =>
        (typeof e.defaultDataFormat === 'boolean' || !(isString ? array : e.key)
        ? !e.defaultDataFormat || !(isString ? array : e.key)
        : false)
          ? (isString
            ? array
            : e.key)
            ? safe(
                state,
                `[${isString ? array : e.key}]${e.query ? e.query : ''}`,
                e.default,
              )
            : // : name
              // ? safe(state, `${e.query ? e.query : ''}`, e.default)
              safe(state, `${e.query ? e.query : ''}`, e.default)
          : safe(
              getData(
                safe(state, `[${isString ? array : e.key}]`),
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
      return Array.isArray(ee.query)
        ? ee.query.reduce(
            (acc, _query) =>
              acc.concat([
                _getDataFunc({
                  ...ee,
                  query: _query.key || _query,
                  default: _query.default || undefined,
                }),
              ]),
            [],
          )
        : _getDataFunc(ee);
    },
    [refreshKey],
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
            if (typeOf(array) === 'object') return safe(state, `[${e.key}]`);
            const _arr = [...acc];
            _arr.push(safe(state, `[${e}]`));
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
      else if (name) _data = state;
      else _data = state || {};
      return _data;
    },
    [refreshKey],
  );

  const execute = useCallback(
    state => {
      let _queryData = previousData.get(_key);
      const isPassed = isPreviousDependencyArrayCheckPassed.get(_key);
      if (
        (name,
        config &&
          config.dependencyArray &&
          !Array.isArray(config.dependencyArray)) &&
        !isPassed
      ) {
        invariant(
          false,
          `dependencyArray expected an array but got ${typeOf(
            config.dependencyArray,
          )}`,
        );
      } else if (
        isPassed ||
        (config &&
          config.dependencyArray &&
          Array.isArray(config.dependencyArray))
      ) {
        if (
          !isPassed &&
          config.dependencyArray.filter(e => typeof e !== 'string')[0]
        )
          invariant(false, 'dependencyArray must be array of string');
        else {
          if (!isPassed) isPreviousDependencyArrayCheckPassed.set(_key, true);
          const _next = config.dependencyArray.map(_e => safe(state, _e));
          const _previous = previousDependencyArrayData.get(_key);
          previousDependencyArrayData.set(_key, _next);
          if (isEqual(_previous, _next)) {
            return {
              isEqualCheck: true,
              data: previousCallbackData.get(_key) || _queryData,
            };
          }
        }
      }
      // const state = safe(store, `.getState()`);
      // eslint-disable-next-line no-underscore-dangle
      const _data = _GetData(state);
      const _isEqual = isEqual(_data, _queryData);
      if (!_isEqual) {
        // previousData[`${key || name}_${_key}`] = _data;
        let callbackData;
        previousData.set(
          _key,
          _data,
          // _data && typeof _data === 'object'
          //   ? JSON.parse(JSON.stringify(_data))
          //   : _data,
        );
        if (callback && typeof callback === 'function')
          callbackData = callback(_data);
        if (callbackData) {
          _queryData = callbackData;
          previousCallbackData.set(_key, callbackData);
        } else {
          previousCallbackData.set(_key, null);
          _queryData = _data;
        }
      } else _queryData = previousCallbackData.get(_key) || _queryData;
      previousData.set(_key, _data);
      return {
        data: _queryData,
        // previousData: previousCallbackData.get(_key) || previousData.get(_key),
      };
    },
    [refreshKey],
  );
  // const [executedData, setData] = useState(() => execute(store.getState()));
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
    initialRender.set(_key, true);
    // const unSubscribe = store.subscribe(() => {
    //   const _data2 = execute(store.getState());
    //   if (
    //     (!_data2.isEqualCheck || initialRender.get(_key)) &&
    //     typeof callbackSuccess === 'function'
    //   ) {
    //     initialRender.set(_key, false);
    //     callbackSuccess(_data2.data, _data2.previousData);
    //   }
    //   if (!_data2.isEqualCheck) {
    //     setData(_data2);
    //   }
    // });
    return () => {
      // unSubscribe();
      previousData.delete(_key);
      previousCallbackData.delete(_key);
      initialRender.delete(_key);
      previousDependencyArrayData.delete(_key);
    };
  }, []);
  const equalityCheckFunction = useCallback((e, f) => {
    const _isEqual =
      typeof e.isEqualCheck === 'undefined'
        ? isEqual(e.data, f.data)
        : e.isEqualCheck;
    // const _isEqual = e.isEqualCheck ? true : isEqual(e.data, f.data);
    if (
      (!_isEqual || initialRender.get(_key)) &&
      typeof callbackSuccess === 'function'
    ) {
      initialRender.set(_key, false);
      callbackSuccess(e.data /* Updated Data */, f.data /* Previous Data */);
    }
    return _isEqual;
  }, []);
  const selectState = useCallback(state => (name ? state[name] : state), [
    name,
  ]);
  const createdSelector = useMemo(() => createSelector(selectState, execute), [
    execute,
    selectState,
  ]);
  const _selectorData = useSelector(createdSelector, equalityCheckFunction);
  return _selectorData.data;
};

export const useActionsHook = (name = '', actions = {}) => {
  const dispatch = useDispatch();
  const [dispatchAction, setDispatchAction] = useState(
    !actions ? cacheActions[name] || {} : bindActionCreators(actions, dispatch),
  );
  useEffect(() => {
    if (!isEqual(cacheActions[name], actions)) {
      cacheActions[name] = actions;
      cache[name] = bindActionCreators(actions, dispatch);
      setDispatchAction(cache[name]);
    } else setDispatchAction(cache[name]);
  }, [isEqual(cacheActions[name], actions)]);
  return dispatchAction;
};
/** example
 * const mutateState = useMutation(reducerName);
 * mutateState({
 *   key: DEMP_API,
 *   value: {
 *     data: {}
 *   }
 *   filter: []
 * })
 */
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
  const _callback = useCallback(({ key: type, value, filter = [] }) => {
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
    if (
      type.includes('_CALL') &&
      type.slice(-5) === '_CALL' &&
      filter &&
      Array.isArray(filter)
    ) {
      // checkKey(value, 'value', 'object');
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
  }, []);
  return _callback;
};
/** example
 * async function() {
 *   const { data, status } = await toPromise(DEMP_API_CALL, { task: 'Data-Handler' });
 * }
 */
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
/** example
 * const asyncFunction = toPromiseFunction(DEMP_API_CALL);
 * async function() {
 *   const { data, status } = await asyncFunction({ task: 'Data-Handler' });
 * }
 */
export const toPromiseFunction = action => (config, isReject) => {
  if (typeOf(config) !== 'null' || typeOf(config) !== 'undefined')
    checkKeyWithMessage(
      config,
      'object',
      `toPromise() : Expected a config (first parameter) to be object`,
    );
  return new Promise((resolve, reject) =>
    action({ ...config, resolve, reject, isReject }),
  );
};

/**
 *  const execute = toPromiseAllFunction([DEMO_URL_CALL, DEMO_API_URL_CALL]);
 *  const asyncfunc = async () => {
      try {
        const data = await execute([],{ isReject: false });
        console.log(data, '=============');
      } catch (err) {
        console.log(err);
      }
    };
    asyncfunc();
*/
export const toPromiseAllFunction = (actions = []) => (
  config = [],
  defaultConfig = {},
) => {
  if (
    typeOf(config) !== 'null' &&
    typeOf(config) !== 'undefined' &&
    typeOf(config) !== 'array'
  )
    checkKeyWithMessage(
      config,
      'object',
      `toPromise() : Expected a (first parameter) to be an Array or Object`,
    );
  return Promise.all(
    actions.map(
      (action, i) =>
        new Promise((resolve, reject) =>
          action({
            ...((typeOf(config) === 'object'
              ? config
              : config[i] && config[i].config) ||
              defaultConfig.config ||
              {}),
            resolve,
            reject,
            isReject: !!(typeOf(config) === 'object'
              ? config.isReject || defaultConfig.isReject
              : (config[i] && config[i].isReject) || defaultConfig.isReject),
          }),
        ),
    ),
  );
};

const CACHE = {};

function stringify(val) {
  return typeof val === 'object' ? JSON.stringify(val) : String(val);
}

function hashArgs(...args) {
  return args.reduce((acc, arg) => `${stringify(arg)}:${acc}`, '');
}
/* Example => used for background refresh it won't trigger the loader everytime api starts
  const pollingConfig = {
    request: {
      polling: true,
      delay: 8000,
    },
  };
  const [refresh, isUpdating] = useStaleRefresh(
    VENDORS_GET_DASBOARD_API_CALL,
    VENDORS_GET_DASBOARD_API,
    pollingConfig,
  );
  const [refreshOrders, isUpdating] = useStaleRefresh(
    VENDORS_GET_ORDERS_BY_DAY_API_CALL,
    VENDORS_GET_ORDERS_BY_DAY_API,
    pollingConfig,
  );
  useEffect(() => {
    function pollingStart() {
      /// refresh({loader, clearData, config}); optional parameters
      refreshOrders();
    }
    function pollingEnd() {
      VENDORS_GET_DASBOARD_API_CANCEL();
      VENDORS_GET_ORDERS_BY_DAY_API_CANCEL();
    }
    pollingStart();
    window.addEventListener('online', pollingStart);
    window.addEventListener('offline', pollingEnd);
    return () => {
      window.removeEventListener('online', pollingStart);
      window.removeEventListener('offline', pollingEnd);
      VENDORS_GET_DASBOARD_API_CANCEL();
      VENDORS_GET_ORDERS_BY_DAY_API_CANCEL();
    };
  }, []);
 */
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
/** example
 * const mutateReducer = useMutateReducer(reducerName);
 * mutateReducer(state => state)
 */
export const useMutateReducer = reducerName => {
  const store = useStore();
  const dispatch = useDispatch();
  const _callback = useCallback(callback => {
    const state = reducerName
      ? store.getState()[reducerName]
      : store.getState();
    const newState = callback(state);
    if (newState)
      dispatch({
        type: reducerName ? `${reducerName}_MUTATE_STATE` : 'MUTATE_STATE',
        payload: newState || {},
      });
  }, []);
  return _callback;
};
/** example
 * const resetState = useResetState(reducerName);
 * const dontResetKeys = ['isLoggedIn'];
 * resetState(dontResetKeys); it will reset state to initial state except some dontResetKeys
 */
export const useResetState = reducerName => {
  const dispatch = useDispatch();
  const _callback = useCallback((dontResetKeys = []) => {
    dispatch({
      type: reducerName ? `${reducerName}_RESET_STATE` : 'RESET_STATE',
      payload: dontResetKeys,
    });
  }, []);
  return _callback;
};
/** example
 * const resetState = useResetOnlyApiEndPointsState(reducerName);
 * const dontResetKeys = ['isLoggedIn'];
 * resetState(dontResetKeys); it will reset only endpoints to initial state except some dontResetKeys
 */
export const useResetOnlyApiEndPointsState = reducerName => {
  const dispatch = useDispatch();
  const _callback = useCallback((dontResetKeys = []) => {
    dispatch({
      type: reducerName ? `${reducerName}_RESET_API` : 'RESET_API',
      payload: dontResetKeys,
    });
  }, []);
  return _callback;
};
