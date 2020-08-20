"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useMutation = exports.useActionsHook = exports.useHook = exports.mapDispatchToProps = exports.getData = exports.commmonStateHandler = exports.responseErrorParser = void 0;

var _react = require("react");

var _redux = require("redux");

var _reactRedux = require("react-redux");

var _isEqual = _interopRequireDefault(require("lodash/isEqual"));

var _invariant = _interopRequireDefault(require("invariant"));

var _commonConstants = require("./commonReduxSagaConverter/commonConstants");

var _helpers = require("./helpers");

var _customHandlers = require("./customHandlers");

var _nullCheck = _interopRequireDefault(require("./nullCheck"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable camelcase */

/* eslint-disable no-underscore-dangle */

/* eslint-disable no-nested-ternary */

/* eslint-disable indent */
// import { connect } from 'react-redux';
// import { componentActions as DashboardActions } from '../containers/Dashboard/actions';
// import { componentActions as AuthenticationActions } from '../containers/Authentication/actions';
const cache = {};
const cacheActions = {};
const safe = _nullCheck.default;

const responseErrorParser = (data = {}) => Array.isArray(data) && data.reduce((acc, curr) => {
  const [key, message] = Object.entries(curr)[0];
  const payloadKey = key.split(',')[1];
  return { ...acc,
    [payloadKey]: message
  };
}, {}) || {};

exports.responseErrorParser = responseErrorParser;

const commmonStateHandler = ({
  state,
  action,
  newState,
  method,
  constants,
  updateState
}) => {
  /** This action for initial call  */
  const {
    payload: {
      filter,
      task = {}
    } = {}
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
        toast: customToast
      } = {}
    } = {}
  } = action;
  const loader = Object.keys(constants).includes(action.type);
  let State = (0, _helpers.newObject)(state);

  if ((method === _commonConstants.ON_LOADING || loader || [_commonConstants.ON_SUCCESS, _commonConstants.ON_ERROR].includes(method)) && !customTask || customLoader && customTask && (Array.isArray(method) ? method : [method]).includes(_commonConstants.ON_LOADING)) {
    if ((status || loader) && filter) State = newState(({
      [type || action.type]: obj
    }) => ({
      [type || action.type]: (0, _helpers.newObject)(obj, (0, _customHandlers.filterArrayToastEmptyHandler)({
        isInfinite: task.name === 'Infinite-Handler',
        filter: Array.isArray(filter) && filter || [filter]
      })(obj))
    }));else if (status || loader) State = newState(({
      [type || action.type]: obj
    }) => ({
      [type || action.type]: (0, _helpers.newObject)(obj, ({
        toast = {}
      }) => ({
        toast: (0, _helpers.newObject)(toast, {
          message: '',
          status: '',
          isError: false,
          key: ''
        })
      }))
    }));
    if (filter || responseFilter || customTask && customLoader) State = (0, _helpers.newObject)(State, ({
      [type || action.type]: obj
    }) => ({
      [type || action.type]: (0, _helpers.newObject)(obj, (0, _customHandlers.filterArrayloadingHandler)({
        filter: Array.isArray(filter || responseFilter) && (filter || responseFilter) || [filter || responseFilter],
        loader: customTask && customLoader ? customLoader : [_commonConstants.ON_SUCCESS, _commonConstants.ON_ERROR].includes(method) ? false : status || loader
      })(obj))
    }));else State = (0, _helpers.newObject)(State, ({
      [type || action.type]: obj
    }) => ({
      [type || action.type]: (0, _helpers.newObject)(obj, {
        loading: customTask && customLoader ? customLoader : {
          status: [_commonConstants.ON_SUCCESS, _commonConstants.ON_ERROR].includes(method) ? false : status || loader,
          lastUpdated: (0, _helpers.generateTimeStamp)()
        }
      })
    }));
    if (method === _commonConstants.ON_LOADING || loader) return State;
  }

  if ([_commonConstants.ON_SUCCESS, _commonConstants.ON_ERROR].includes(method) && // [200, 201, 400, 403, 404, 409, 500].includes(statusCode) &&
  Object.keys(constants).includes(type) && !customTask || customToast && customTask && (Array.isArray(method) ? method : [method]).includes(_commonConstants.ON_TOAST)) {
    if (responseFilter) State = (0, _helpers.newObject)(State, ({
      [type]: obj
    }) => ({
      [type]: (0, _helpers.newObject)(obj, (0, _customHandlers.filterArrayToastHandler)({
        statusCode,
        filter: Array.isArray(responseFilter) && responseFilter || [responseFilter],
        message,
        type,
        ...(customToast && customTask && (Array.isArray(method) ? method : [method]).includes(_commonConstants.ON_TOAST) ? customToast : {})
      })(obj))
    }));else State = (0, _helpers.newObject)(State, ({
      [type]: obj
    }) => ({
      [type]: (0, _helpers.newObject)(obj, {
        toast: {
          isError: ![200, 201].includes(statusCode),
          status: statusCode,
          message,
          key: type,
          lastUpdated: (0, _helpers.generateTimeStamp)(),
          ...(customToast && customTask && (Array.isArray(method) ? method : [method]).includes(_commonConstants.ON_TOAST) ? customToast : {})
        }
      })
    }));
  }

  const changeState = _helpers.newObject.bind({}, State);

  const reset = responseFilter ? _customHandlers.filterArrayResetHandler.bind({}, state, newState, action, responseFilter) : _customHandlers.resetHandler.bind({}, state, newState, action);
  return updateState({
    state: State,
    newState: changeState,
    action,
    reset
  });
};

exports.commmonStateHandler = commmonStateHandler;

const getData = (data, def, loader = true, filter = []) => ({
  data: safe(data, `.data${filter.length ? '.' : ''}${filter.join('.')}${filter.length ? '.data' : ''}`, def),
  loader: safe(data, `${filter.length ? '.data.' : ''}${filter.join('.')}.loading.status`, loader),
  lastUpdated: safe(data, `${filter.length ? '.data.' : ''}${filter.join('.')}.lastUpdated`, 0),
  isInfinite: safe(data, `${filter.length ? '.data.' : ''}${filter.join('.')}.isInfinite`, false),
  infiniteEnd: safe(data, `${filter.length ? '.data.' : ''}${filter.join('.')}.infiniteEnd`, false),
  isError: safe(data, `${filter.length ? '.data.' : ''}${filter.join('.')}.isError`, false),
  toast: safe(data, `${filter.length ? '.data.' : ''}${filter.join('.')}.toast`, {}),
  error: safe(data, `${filter.length ? '.data.' : ''}${filter.join('.')}.error`, {})
});

exports.getData = getData;

const mapDispatchToProps = (actions, componentData, reducerName) => dispatch => ({
  dispatch,
  ...(actions && Object.keys(actions).length ? (0, _helpers.newObject)(componentData, ({
    [`${reducerName}_hoc`]: data
  }) => ({
    [`${reducerName}_hoc`]: (0, _helpers.newObject)(data, {
      actions: (0, _redux.bindActionCreators)(actions, dispatch)
    })
  })) : {})
}); // export const connectHoc = connect(
//   null,
//   mapDispatchToProps({ ...AuthenticationActions, ...DashboardActions }),
// );


exports.mapDispatchToProps = mapDispatchToProps;

const checkKey = (key, name, dataType, message) => {
  (0, _invariant.default)((0, _helpers.typeOf)(key) === dataType, `(react-boilerplate-redux-saga-hoc)  Expected \`${name}\` to be  ${message || dataType}`);
};

const checkKeyWithMessage = (key, dataType, message) => {
  (0, _invariant.default)((0, _helpers.typeOf)(key) === dataType, message);
};

const previousDataKey = [];
const previousData = {};

const useHook = (name = null, array = [], config = {}) => {
  const store = (0, _reactRedux.useStore)();

  const _GetData = () => {
    let _data = {};

    const _checkFilter = e => e.filter ? Array.isArray(e.filter) ? e.filter : typeof e.filter === 'string' ? [e.filter] : undefined : undefined;

    const _getData = (e, isString) => safe(getData(safe(store, `.getState()[${name}][${isString ? array : e.key}]`), e.query ? undefined : e.default || undefined, e.initialLoaderState || false, _checkFilter(e)), `${e.query && (0, _helpers.typeOf)(e.query) === 'string' ? e.query : ''}`, e.query ? e.default || undefined : undefined);

    if (name && (Array.isArray(array) && array.length > 0 || (0, _helpers.typeOf)(array) === 'object' && Object.keys(array).length > 0)) {
      // eslint-disable-next-line consistent-return
      // eslint-disable-next-line no-underscore-dangle
      _data = ((0, _helpers.typeOf)(array) === 'object' ? [array] : array).reduce((acc, e) => (0, _helpers.typeOf)(e) === 'object' ? (0, _helpers.typeOf)(array) === 'object' ? _getData(e) : { ...acc,
        [e.name || e.key]: _getData(e)
      } : (0, _helpers.typeOf)(array) === 'object' ? safe(store, `.getState()[${name}][${e}]`) : { ...acc,
        [e]: safe(store, `.getState()[${name}][${e}]`)
      }, {});
    } else if (typeof array === 'string') _data = _getData(config, true);else if (name) _data = safe(store, `.getState()[${name}]`);else _data = safe(store, `.getState()`) || {};

    return _data;
  };

  const [data, setData] = (0, _react.useState)(_GetData());
  const [_key] = (0, _react.useState)({});
  if (name) checkKey(name, 'reducer name', 'string', 'valid string');

  const execute = () => {
    // const state = safe(store, `.getState()[${name}]`);
    // eslint-disable-next-line no-underscore-dangle
    const _data = _GetData();

    const index = previousDataKey.indexOf(_key);

    if (!(0, _isEqual.default)(_data, previousData[index])) {
      // previousData[`${key || name}_${_key}`] = _data;
      previousData[index] = _data;
      setData(_data);
    }
  };

  (0, _react.useEffect)(() => {
    const {
      length
    } = previousDataKey;
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

exports.useHook = useHook;

const useActionsHook = (name, actions) => {
  const [dispatchAction, setDispatchAction] = (0, _react.useState)({});
  const dispatch = (0, _reactRedux.useDispatch)();
  (0, _react.useEffect)(() => {
    if (!(0, _isEqual.default)(cacheActions[name], actions)) {
      cacheActions[name] = actions;
      cache[name] = (0, _redux.bindActionCreators)(actions, dispatch);
      setDispatchAction(cache[name]);
    } else setDispatchAction(cache[name]);
  }, [(0, _isEqual.default)(cacheActions[name], actions)]);
  return dispatchAction;
};

exports.useActionsHook = useActionsHook;

const useMutation = reducerName => {
  if (!reducerName) checkKeyWithMessage(reducerName, 'string', 'useMutation(`reducerkey`) : Expected a valid reducer key');
  const store = (0, _reactRedux.useStore)();
  (0, _react.useEffect)(() => {
    if (reducerName) checkKeyWithMessage(reducerName, 'string', 'useMutation(`reducerkey`) : Expected a reducer key to be string');
    if (!store.getState()[reducerName]) checkKeyWithMessage(null, 'string', ` reducerName '${reducerName}' not a valid reducer key.`);
  }, []);
  const dispatch = (0, _reactRedux.useDispatch)();
  return ({
    key: type,
    value,
    filter = []
  }) => {
    if (!type) checkKey(null, 'key', 'string', 'valid string');

    const _reducer_keys = Object.keys(store.getState()[reducerName]);

    if (type) (0, _invariant.default)(_reducer_keys.includes(type), // type.includes('_CALL') && type.slice(-5) === '_CALL',
    `'key' is invalid.${type} not found in ${reducerName} reducer`);
    checkKey(filter, 'filter', 'array');
    checkKey(value, 'value', 'object');
    checkKey(type, 'key', 'string');
    if (type.includes('_CALL') && type.slice(-5) === '_CALL') dispatch({
      type: type.slice(0, -4).concat('CUSTOM_TASK'),
      response: {
        type,
        method: _commonConstants.ON_SUCCESS,
        statusCode: 200,
        mutation: true,
        customTask: true,
        data: {
          data: value
        },
        payload: {
          filter
        }
      }
    });else dispatch({
      type,
      value,
      filter
    });
  };
};

exports.useMutation = useMutation;