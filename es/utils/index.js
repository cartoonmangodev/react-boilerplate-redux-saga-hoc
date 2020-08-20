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

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// import { componentActions as DashboardActions } from '../containers/Dashboard/actions';
// import { componentActions as AuthenticationActions } from '../containers/Authentication/actions';
var cache = {};
var cacheActions = {};
var safe = _nullCheck.default;

var responseErrorParser = function responseErrorParser() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return Array.isArray(data) && data.reduce(function (acc, curr) {
    var _Object$entries$ = _slicedToArray(Object.entries(curr)[0], 2),
        key = _Object$entries$[0],
        message = _Object$entries$[1];

    var payloadKey = key.split(',')[1];
    return _objectSpread({}, acc, _defineProperty({}, payloadKey, message));
  }, {}) || {};
};

exports.responseErrorParser = responseErrorParser;

var commmonStateHandler = function commmonStateHandler(_ref) {
  var state = _ref.state,
      action = _ref.action,
      newState = _ref.newState,
      method = _ref.method,
      constants = _ref.constants,
      updateState = _ref.updateState;

  /** This action for initial call  */
  var _action$payload = action.payload;
  _action$payload = _action$payload === void 0 ? {} : _action$payload;
  var filter = _action$payload.filter,
      _action$payload$task = _action$payload.task,
      task = _action$payload$task === void 0 ? {} : _action$payload$task;
  /** This action for after api gets success or failure  */

  var _action$response = action.response;
  _action$response = _action$response === void 0 ? {} : _action$response;
  var type = _action$response.type,
      statusCode = _action$response.statusCode,
      message = _action$response.message,
      status = _action$response.status,
      customTask = _action$response.customTask,
      _action$response$payl = _action$response.payload;
  _action$response$payl = _action$response$payl === void 0 ? {} : _action$response$payl;
  var responseFilter = _action$response$payl.filter,
      customLoader = _action$response$payl.loader,
      customToast = _action$response$payl.toast;
  var loader = Object.keys(constants).includes(action.type);
  var State = (0, _helpers.newObject)(state);

  if ((method === _commonConstants.ON_LOADING || loader || [_commonConstants.ON_SUCCESS, _commonConstants.ON_ERROR].includes(method)) && !customTask || customLoader && customTask && (Array.isArray(method) ? method : [method]).includes(_commonConstants.ON_LOADING)) {
    if ((status || loader) && filter) State = newState(function (_ref2) {
      var obj = _ref2[type || action.type];
      return _defineProperty({}, type || action.type, (0, _helpers.newObject)(obj, (0, _customHandlers.filterArrayToastEmptyHandler)({
        isInfinite: task.name === 'Infinite-Handler',
        filter: Array.isArray(filter) && filter || [filter]
      })(obj)));
    });else if (status || loader) State = newState(function (_ref4) {
      var obj = _ref4[type || action.type];
      return _defineProperty({}, type || action.type, (0, _helpers.newObject)(obj, function (_ref5) {
        var _ref5$toast = _ref5.toast,
            toast = _ref5$toast === void 0 ? {} : _ref5$toast;
        return {
          toast: (0, _helpers.newObject)(toast, {
            message: '',
            status: '',
            isError: false,
            key: ''
          })
        };
      }));
    });
    if (filter || responseFilter || customTask && customLoader) State = (0, _helpers.newObject)(State, function (_ref7) {
      var obj = _ref7[type || action.type];
      return _defineProperty({}, type || action.type, (0, _helpers.newObject)(obj, (0, _customHandlers.filterArrayloadingHandler)({
        filter: Array.isArray(filter || responseFilter) && (filter || responseFilter) || [filter || responseFilter],
        loader: customTask && customLoader ? customLoader : [_commonConstants.ON_SUCCESS, _commonConstants.ON_ERROR].includes(method) ? false : status || loader
      })(obj)));
    });else State = (0, _helpers.newObject)(State, function (_ref9) {
      var obj = _ref9[type || action.type];
      return _defineProperty({}, type || action.type, (0, _helpers.newObject)(obj, {
        loading: customTask && customLoader ? customLoader : {
          status: [_commonConstants.ON_SUCCESS, _commonConstants.ON_ERROR].includes(method) ? false : status || loader,
          lastUpdated: (0, _helpers.generateTimeStamp)()
        }
      }));
    });
    if (method === _commonConstants.ON_LOADING || loader) return State;
  }

  if ([_commonConstants.ON_SUCCESS, _commonConstants.ON_ERROR].includes(method) && // [200, 201, 400, 403, 404, 409, 500].includes(statusCode) &&
  Object.keys(constants).includes(type) && !customTask || customToast && customTask && (Array.isArray(method) ? method : [method]).includes(_commonConstants.ON_TOAST)) {
    if (responseFilter) State = (0, _helpers.newObject)(State, function (_ref11) {
      var obj = _ref11[type];
      return _defineProperty({}, type, (0, _helpers.newObject)(obj, (0, _customHandlers.filterArrayToastHandler)(_objectSpread({
        statusCode: statusCode,
        filter: Array.isArray(responseFilter) && responseFilter || [responseFilter],
        message: message,
        type: type
      }, customToast && customTask && (Array.isArray(method) ? method : [method]).includes(_commonConstants.ON_TOAST) ? customToast : {}))(obj)));
    });else State = (0, _helpers.newObject)(State, function (_ref13) {
      var obj = _ref13[type];
      return _defineProperty({}, type, (0, _helpers.newObject)(obj, {
        toast: _objectSpread({
          isError: ![200, 201].includes(statusCode),
          status: statusCode,
          message: message,
          key: type,
          lastUpdated: (0, _helpers.generateTimeStamp)()
        }, customToast && customTask && (Array.isArray(method) ? method : [method]).includes(_commonConstants.ON_TOAST) ? customToast : {})
      }));
    });
  }

  var changeState = _helpers.newObject.bind({}, State);

  var reset = responseFilter ? _customHandlers.filterArrayResetHandler.bind({}, state, newState, action, responseFilter) : _customHandlers.resetHandler.bind({}, state, newState, action);
  return updateState({
    state: State,
    newState: changeState,
    action: action,
    reset: reset
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

var mapDispatchToProps = function mapDispatchToProps(actions, componentData, reducerName) {
  return function (dispatch) {
    return _objectSpread({
      dispatch: dispatch
    }, actions && Object.keys(actions).length ? (0, _helpers.newObject)(componentData, function (_ref15) {
      var data = _ref15["".concat(reducerName, "_hoc")];

      return _defineProperty({}, "".concat(reducerName, "_hoc"), (0, _helpers.newObject)(data, {
        actions: (0, _redux.bindActionCreators)(actions, dispatch)
      }));
    }) : {});
  };
}; // export const connectHoc = connect(
//   null,
//   mapDispatchToProps({ ...AuthenticationActions, ...DashboardActions }),
// );


exports.mapDispatchToProps = mapDispatchToProps;

var checkKey = function checkKey(key, name, dataType, message) {
  (0, _invariant.default)((0, _helpers.typeOf)(key) === dataType, "(react-boilerplate-redux-saga-hoc)  Expected `".concat(name, "` to be  ").concat(message || dataType));
};

var previousDataKey = [];
var previousData = {};

var useHook = function useHook() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var array = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var store = (0, _reactRedux.useStore)();

  var _GetData = function _GetData() {
    var _data = {};

    var _checkFilter = function _checkFilter(e) {
      return e.filter ? Array.isArray(e.filter) ? e.filter : typeof e.filter === 'string' ? [e.filter] : undefined : undefined;
    };

    var _getData = function _getData(e, isString) {
      return safe(getData(safe(store, ".getState()[".concat(name, "][").concat(isString ? array : e.key, "]")), e.query ? undefined : e.default || undefined, e.initialLoaderState || false, _checkFilter(e)), "".concat(e.query && (0, _helpers.typeOf)(e.query) === 'string' ? e.query : ''), e.query ? e.default || undefined : undefined);
    };

    if (name && (Array.isArray(array) && array.length > 0 || (0, _helpers.typeOf)(array) === 'object' && Object.keys(array).length > 0)) {
      // eslint-disable-next-line consistent-return
      // eslint-disable-next-line no-underscore-dangle
      _data = ((0, _helpers.typeOf)(array) === 'object' ? [array] : array).reduce(function (acc, e) {
        return (0, _helpers.typeOf)(e) === 'object' ? (0, _helpers.typeOf)(array) === 'object' ? _getData(e) : _objectSpread({}, acc, _defineProperty({}, e.name || e.key, _getData(e))) : (0, _helpers.typeOf)(array) === 'object' ? safe(store, ".getState()[".concat(name, "][").concat(e, "]")) : _objectSpread({}, acc, _defineProperty({}, e, safe(store, ".getState()[".concat(name, "][").concat(e, "]"))));
      }, {});
    } else if (typeof array === 'string') _data = _getData(config, true);else if (name) _data = safe(store, ".getState()[".concat(name, "]"));else _data = safe(store, ".getState()") || {};

    return _data;
  };

  var _useState = (0, _react.useState)(_GetData()),
      _useState2 = _slicedToArray(_useState, 2),
      data = _useState2[0],
      setData = _useState2[1];

  var _useState3 = (0, _react.useState)({}),
      _useState4 = _slicedToArray(_useState3, 1),
      _key = _useState4[0];

  if (name) checkKey(name, 'reducer name', 'string', 'valid string');

  var execute = function execute() {
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

  (0, _react.useEffect)(function () {
    var length = previousDataKey.length;
    previousDataKey.push(_key);
    previousData[length] = {};
    execute();
    var unSubscribe = store.subscribe(execute);
    return function () {
      delete previousData[length];
      unSubscribe();
    };
  }, []);
  return data;
};

exports.useHook = useHook;

var useActionsHook = function useActionsHook(name, actions) {
  var _useState5 = (0, _react.useState)({}),
      _useState6 = _slicedToArray(_useState5, 2),
      dispatchAction = _useState6[0],
      setDispatchAction = _useState6[1];

  var dispatch = (0, _reactRedux.useDispatch)();
  (0, _react.useEffect)(function () {
    if (!(0, _isEqual.default)(cacheActions[name], actions)) {
      cacheActions[name] = actions;
      cache[name] = (0, _redux.bindActionCreators)(actions, dispatch);
      setDispatchAction(cache[name]);
    } else setDispatchAction(cache[name]);
  }, [(0, _isEqual.default)(cacheActions[name], actions)]);
  return dispatchAction;
};

exports.useActionsHook = useActionsHook;

var useMutation = function useMutation() {
  var dispatch = (0, _reactRedux.useDispatch)();
  return function (_ref17) {
    var type = _ref17.key,
        value = _ref17.value,
        _ref17$filter = _ref17.filter,
        filter = _ref17$filter === void 0 ? [] : _ref17$filter;
    if (!type) checkKey(null, 'key', 'string', 'valid string');
    checkKey(filter, 'filter', 'array');
    checkKey(value, 'value', 'object');
    checkKey(type, 'key', 'string');
    dispatch({
      type: type,
      response: {
        type: type,
        method: _commonConstants.ON_SUCCESS,
        statusCode: 200,
        mutation: true,
        customTask: true,
        update: value,
        payload: {
          filter: filter
        }
      }
    });
  };
};

exports.useMutation = useMutation;