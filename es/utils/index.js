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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// import { componentActions as DashboardActions } from '../containers/Dashboard/actions';
// import { componentActions as AuthenticationActions } from '../containers/Authentication/actions';
var cache = {};
var cacheActions = {};
var safe = _nullCheck.default;

var responseErrorParser = function responseErrorParser() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return Array.isArray(data) && data.reduce((acc, curr) => {
    var [key, message] = Object.entries(curr)[0];
    var payloadKey = key.split(',')[1];
    return _objectSpread({}, acc, {
      [payloadKey]: message
    });
  }, {}) || {};
};

exports.responseErrorParser = responseErrorParser;

var commmonStateHandler = (_ref) => {
  var {
    state,
    action,
    newState,
    method,
    constants,
    updateState
  } = _ref;

  /** This action for initial call  */
  var {
    payload: {
      filter,
      task = {}
    } = {}
  } = action;
  /** This action for after api gets success or failure  */

  var {
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
  var loader = Object.keys(constants).includes(action.type);
  var State = (0, _helpers.newObject)(state);

  if ((method === _commonConstants.ON_LOADING || loader || [_commonConstants.ON_SUCCESS, _commonConstants.ON_ERROR].includes(method)) && !customTask || customLoader && customTask && (Array.isArray(method) ? method : [method]).includes(_commonConstants.ON_LOADING)) {
    if ((status || loader) && filter) State = newState((_ref2) => {
      var {
        [type || action.type]: obj
      } = _ref2;
      return {
        [type || action.type]: (0, _helpers.newObject)(obj, (0, _customHandlers.filterArrayToastEmptyHandler)({
          isInfinite: task.name === 'Infinite-Handler',
          filter: Array.isArray(filter) && filter || [filter]
        })(obj))
      };
    });else if (status || loader) State = newState((_ref3) => {
      var {
        [type || action.type]: obj
      } = _ref3;
      return {
        [type || action.type]: (0, _helpers.newObject)(obj, (_ref4) => {
          var {
            toast = {}
          } = _ref4;
          return {
            toast: (0, _helpers.newObject)(toast, {
              message: '',
              status: '',
              isError: false,
              key: ''
            })
          };
        })
      };
    });
    if (filter || responseFilter || customTask && customLoader) State = (0, _helpers.newObject)(State, (_ref5) => {
      var {
        [type || action.type]: obj
      } = _ref5;
      return {
        [type || action.type]: (0, _helpers.newObject)(obj, (0, _customHandlers.filterArrayloadingHandler)({
          filter: Array.isArray(filter || responseFilter) && (filter || responseFilter) || [filter || responseFilter],
          loader: customTask && customLoader ? customLoader : [_commonConstants.ON_SUCCESS, _commonConstants.ON_ERROR].includes(method) ? false : status || loader
        })(obj))
      };
    });else State = (0, _helpers.newObject)(State, (_ref6) => {
      var {
        [type || action.type]: obj
      } = _ref6;
      return {
        [type || action.type]: (0, _helpers.newObject)(obj, {
          loading: customTask && customLoader ? customLoader : {
            status: [_commonConstants.ON_SUCCESS, _commonConstants.ON_ERROR].includes(method) ? false : status || loader,
            lastUpdated: (0, _helpers.generateTimeStamp)()
          }
        })
      };
    });
    if (method === _commonConstants.ON_LOADING || loader) return State;
  }

  if ([_commonConstants.ON_SUCCESS, _commonConstants.ON_ERROR].includes(method) && // [200, 201, 400, 403, 404, 409, 500].includes(statusCode) &&
  Object.keys(constants).includes(type) && !customTask || customToast && customTask && (Array.isArray(method) ? method : [method]).includes(_commonConstants.ON_TOAST)) {
    if (responseFilter) State = (0, _helpers.newObject)(State, (_ref7) => {
      var {
        [type]: obj
      } = _ref7;
      return {
        [type]: (0, _helpers.newObject)(obj, (0, _customHandlers.filterArrayToastHandler)(_objectSpread({
          statusCode,
          filter: Array.isArray(responseFilter) && responseFilter || [responseFilter],
          message,
          type
        }, customToast && customTask && (Array.isArray(method) ? method : [method]).includes(_commonConstants.ON_TOAST) ? customToast : {}))(obj))
      };
    });else State = (0, _helpers.newObject)(State, (_ref8) => {
      var {
        [type]: obj
      } = _ref8;
      return {
        [type]: (0, _helpers.newObject)(obj, {
          toast: _objectSpread({
            isError: ![200, 201].includes(statusCode),
            status: statusCode,
            message,
            key: type,
            lastUpdated: (0, _helpers.generateTimeStamp)()
          }, customToast && customTask && (Array.isArray(method) ? method : [method]).includes(_commonConstants.ON_TOAST) ? customToast : {})
        })
      };
    });
  }

  var changeState = _helpers.newObject.bind({}, State);

  var reset = responseFilter ? _customHandlers.filterArrayResetHandler.bind({}, state, newState, action, responseFilter) : _customHandlers.resetHandler.bind({}, state, newState, action);
  return updateState({
    state: State,
    newState: changeState,
    action,
    reset
  });
};

exports.commmonStateHandler = commmonStateHandler;

var getData = function getData(data, def) {
  var loader = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var filter = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  return {
    data: safe(data, ".data".concat(filter.length ? '.' : '').concat(filter.join('.')).concat(filter.length ? '.data' : ''), def),
    loader: safe(data, "".concat(filter.length ? '.data.' : '').concat(filter.join('.'), ".loading.status"), loader),
    lastUpdated: safe(data, "".concat(filter.length ? '.data.' : '').concat(filter.join('.'), ".lastUpdated"), 0),
    isInfinite: safe(data, "".concat(filter.length ? '.data.' : '').concat(filter.join('.'), ".isInfinite"), false),
    infiniteEnd: safe(data, "".concat(filter.length ? '.data.' : '').concat(filter.join('.'), ".infiniteEnd"), false),
    isError: safe(data, "".concat(filter.length ? '.data.' : '').concat(filter.join('.'), ".isError"), false),
    toast: safe(data, "".concat(filter.length ? '.data.' : '').concat(filter.join('.'), ".toast"), {}),
    error: safe(data, "".concat(filter.length ? '.data.' : '').concat(filter.join('.'), ".error"), {})
  };
};

exports.getData = getData;

var mapDispatchToProps = (actions, componentData, reducerName) => dispatch => _objectSpread({
  dispatch
}, actions && Object.keys(actions).length ? (0, _helpers.newObject)(componentData, (_ref9) => {
  var {
    ["".concat(reducerName, "_hoc")]: data
  } = _ref9;
  return {
    ["".concat(reducerName, "_hoc")]: (0, _helpers.newObject)(data, {
      actions: (0, _redux.bindActionCreators)(actions, dispatch)
    })
  };
}) : {}); // export const connectHoc = connect(
//   null,
//   mapDispatchToProps({ ...AuthenticationActions, ...DashboardActions }),
// );


exports.mapDispatchToProps = mapDispatchToProps;

var checkKey = (key, name, dataType, message) => {
  (0, _invariant.default)((0, _helpers.typeOf)(key) === dataType, "(react-boilerplate-redux-saga-hoc)  Expected `".concat(name, "` to be  ").concat(message || dataType));
};

var checkKeyWithMessage = (key, dataType, message) => {
  (0, _invariant.default)((0, _helpers.typeOf)(key) === dataType, message);
};

var previousDataKey = [];
var previousData = {};

var useHook = function useHook() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var array = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var store = (0, _reactRedux.useStore)();

  var _GetData = () => {
    var _data = {};

    var _checkFilter = e => e.filter ? Array.isArray(e.filter) ? e.filter : typeof e.filter === 'string' ? [e.filter] : undefined : undefined;

    var _getData = (e, isString) => safe(getData(safe(store, ".getState()[".concat(name, "][").concat(isString ? array : e.key, "]")), e.query ? undefined : e.default || undefined, e.initialLoaderState || false, _checkFilter(e)), "".concat(e.query && (0, _helpers.typeOf)(e.query) === 'string' ? e.query : ''), e.query ? e.default || undefined : undefined);

    if (name && (Array.isArray(array) && array.length > 0 || (0, _helpers.typeOf)(array) === 'object' && Object.keys(array).length > 0)) {
      // eslint-disable-next-line consistent-return
      // eslint-disable-next-line no-underscore-dangle
      _data = ((0, _helpers.typeOf)(array) === 'object' ? [array] : array).reduce((acc, e) => (0, _helpers.typeOf)(e) === 'object' ? (0, _helpers.typeOf)(array) === 'object' ? _getData(e) : _objectSpread({}, acc, {
        [e.name || e.key]: _getData(e)
      }) : (0, _helpers.typeOf)(array) === 'object' ? safe(store, ".getState()[".concat(name, "][").concat(e, "]")) : _objectSpread({}, acc, {
        [e]: safe(store, ".getState()[".concat(name, "][").concat(e, "]"))
      }), {});
    } else if (typeof array === 'string') _data = _getData(config, true);else if (name) _data = safe(store, ".getState()[".concat(name, "]"));else _data = safe(store, ".getState()") || {};

    return _data;
  };

  var [data, setData] = (0, _react.useState)(_GetData());
  var [_key] = (0, _react.useState)({});
  if (name) checkKey(name, 'reducer name', 'string', 'valid string');

  var execute = () => {
    // const state = safe(store, `.getState()[${name}]`);
    // eslint-disable-next-line no-underscore-dangle
    var _data = _GetData();

    var index = previousDataKey.indexOf(_key);

    if (!(0, _isEqual.default)(_data, previousData[index])) {
      // previousData[`${key || name}_${_key}`] = _data;
      previousData[index] = _data;
      setData(_data);
    }
  };

  (0, _react.useEffect)(() => {
    var {
      length
    } = previousDataKey;
    previousDataKey.push(_key);
    previousData[length] = {};
    execute();
    var unSubscribe = store.subscribe(execute);
    return () => {
      delete previousData[length];
      unSubscribe();
    };
  }, []);
  return data;
};

exports.useHook = useHook;

var useActionsHook = (name, actions) => {
  var [dispatchAction, setDispatchAction] = (0, _react.useState)({});
  var dispatch = (0, _reactRedux.useDispatch)();
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

var useMutation = reducerName => {
  if (!reducerName) checkKeyWithMessage(reducerName, 'string', 'useMutation(`reducerkey`) : Expected a valid reducer key');
  var store = (0, _reactRedux.useStore)();
  (0, _react.useEffect)(() => {
    if (reducerName) checkKeyWithMessage(reducerName, 'string', 'useMutation(`reducerkey`) : Expected a reducer key to be string');
    if (!store.getState()[reducerName]) checkKeyWithMessage(null, 'string', " reducerName '".concat(reducerName, "' not a valid reducer key."));
  }, []);
  var dispatch = (0, _reactRedux.useDispatch)();
  return (_ref10) => {
    var {
      key: type,
      value,
      filter = []
    } = _ref10;
    if (!type) checkKey(null, 'key', 'string', 'valid string');

    var _reducer_keys = Object.keys(store.getState()[reducerName]);

    if (type) (0, _invariant.default)(_reducer_keys.includes(type), // type.includes('_CALL') && type.slice(-5) === '_CALL',
    "'key' is invalid.".concat(type, " not found in ").concat(reducerName, " reducer"));
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