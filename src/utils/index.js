/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
import { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useStore, useDispatch } from 'react-redux';
import isEqual from 'lodash/isEqual';
// import { connect } from 'react-redux';
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
// import { componentActions as DashboardActions } from '../containers/Dashboard/actions';
// import { componentActions as AuthenticationActions } from '../containers/Authentication/actions';
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
    (customLoader &&
      customTask &&
      (Array.isArray(method) ? method : [method]).includes(ON_LOADING))
  ) {
    if ((status || loader) && filter)
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
    if (filter || responseFilter || (customTask && customLoader))
      State = newObject(State, ({ [type || action.type]: obj }) => ({
        [type || action.type]: newObject(
          obj,
          filterArrayloadingHandler({
            filter: (Array.isArray(filter || responseFilter) &&
              (filter || responseFilter)) || [filter || responseFilter],
            loader:
              customTask && customLoader
                ? customLoader
                : [ON_SUCCESS, ON_ERROR].includes(method)
                ? false
                : status || loader,
          })(obj),
        ),
      }));
    else
      State = newObject(State, ({ [type || action.type]: obj }) => ({
        [type || action.type]: newObject(obj, {
          loading:
            customTask && customLoader
              ? customLoader
              : {
                  status: [ON_SUCCESS, ON_ERROR].includes(method)
                    ? false
                    : status || loader,
                  lastUpdated: generateTimeStamp(),
                },
        }),
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
    if (responseFilter)
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
  const reset = responseFilter
    ? filterArrayResetHandler.bind({}, state, newState, action, responseFilter)
    : resetHandler.bind({}, state, newState, action);
  return updateState({
    state: State,
    newState: changeState,
    action,
    reset,
  });
};

export const getData = (data, def, loader = true, filter = []) => ({
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
    loader,
  ),
  lastUpdated: safe(
    data,
    `${filter.length ? '.data.' : ''}${filter.join('.')}.lastUpdated`,
    0,
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

// export const connectHoc = connect(
//   null,
//   mapDispatchToProps({ ...AuthenticationActions, ...DashboardActions }),
// );

const previousDataKey = [];
const previousData = {};
export const useHook = (name = null, array = [], config = {}) => {
  const store = useStore();
  const [data, setData] = useState({});
  const [_key] = useState({});
  const execute = () => {
    // const state = safe(store, `.getState()[${name}]`);
    // eslint-disable-next-line no-underscore-dangle
    let _data = {};
    if (name && Array.isArray(array) && array.length > 0) {
      // eslint-disable-next-line consistent-return
      // eslint-disable-next-line no-underscore-dangle
      _data = array.reduce(
        (acc, e) =>
          typeOf(e) === 'object'
            ? {
                ...acc,
                [e.name || e.key]: safe(
                  getData(
                    safe(store, `.getState()[${name}][${e.key}]`),
                    e.query ? undefined : e.default || undefined,
                    e.initialLoaderState || false,
                    Array.isArray(e.filter) ? e.filter : undefined,
                  ),
                  `${e.query && typeOf(e.query) === 'string' ? e.query : ''}`,
                  e.query ? e.default || undefined : undefined,
                ),
              }
            : {
                ...acc,
                [e]: safe(store, `.getState()[${name}][${e}]`),
              },
        {},
      );
    } else if (typeof array === 'string')
      _data = safe(
        getData(
          safe(store, `.getState()[${name}][${array}]`),
          config.query ? undefined : config.default || undefined,
          config.initialLoaderState || false,
          Array.isArray(config.filter) ? config.filter : undefined,
        ),
        `${
          config.query && typeOf(config.query) === 'string' ? config.query : ''
        }`,
        config.query ? config.default || undefined : undefined,
      );
    else if (name) _data = safe(store, `.getState()[${name}]`);
    else _data = safe(store, `.getState()`) || {};
    const index = previousDataKey.indexOf(_key);
    if (!isEqual(_data, previousData[index])) {
      // previousData[`${key || name}_${_key}`] = _data;
      previousData[index] = _data;
      setData(_data);
    }
  };
  useEffect(() => {
    const { length } = previousDataKey;
    previousDataKey.push(_key);
    previousData[length] = {};
    execute();
    const unSubscribe = store.subscribe(execute);
    return () => {
      delete previousData[length];
      unSubscribe();
    };
  }, []);
  return data;
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
