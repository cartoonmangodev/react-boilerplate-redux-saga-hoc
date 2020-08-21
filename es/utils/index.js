function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/* eslint-disable camelcase */

/* eslint-disable no-underscore-dangle */

/* eslint-disable no-nested-ternary */

/* eslint-disable indent */
import { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useStore, useDispatch } from 'react-redux';
import isEqual from 'lodash/isEqual';
import invariant from 'invariant'; // import { connect } from 'react-redux';

import { ON_ERROR, ON_SUCCESS, ON_LOADING, ON_TOAST } from './commonReduxSagaConverter/commonConstants';
import { newObject, generateTimeStamp, typeOf } from './helpers';
import { filterArrayToastEmptyHandler, filterArrayloadingHandler, filterArrayToastHandler, resetHandler, filterArrayResetHandler } from './customHandlers';
import nullcheck from './nullCheck'; // import { componentActions as DashboardActions } from '../containers/Dashboard/actions';
// import { componentActions as AuthenticationActions } from '../containers/Authentication/actions';

var cache = {};
var cacheActions = {};
var safe = nullcheck;
export var responseErrorParser = function responseErrorParser(data) {
  if (data === void 0) {
    data = {};
  }

  return Array.isArray(data) && data.reduce(function (acc, curr) {
    var _extends2;

    var _Object$entries$ = Object.entries(curr)[0],
        key = _Object$entries$[0],
        message = _Object$entries$[1];
    var payloadKey = key.split(',')[1];
    return _extends({}, acc, (_extends2 = {}, _extends2[payloadKey] = message, _extends2));
  }, {}) || {};
};
export var commmonStateHandler = function commmonStateHandler(_ref) {
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
  var State = newObject(state);

  if ((method === ON_LOADING || loader || [ON_SUCCESS, ON_ERROR].includes(method)) && !customTask || customLoader && customTask && (Array.isArray(method) ? method : [method]).includes(ON_LOADING)) {
    if ((status || loader) && filter) State = newState(function (_ref2) {
      var _ref3;

      var obj = _ref2[type || action.type];
      return _ref3 = {}, _ref3[type || action.type] = newObject(obj, filterArrayToastEmptyHandler({
        isInfinite: task.name === 'Infinite-Handler',
        filter: Array.isArray(filter) && filter || [filter]
      })(obj)), _ref3;
    });else if (status || loader) State = newState(function (_ref4) {
      var _ref6;

      var obj = _ref4[type || action.type];
      return _ref6 = {}, _ref6[type || action.type] = newObject(obj, function (_ref5) {
        var _ref5$toast = _ref5.toast,
            toast = _ref5$toast === void 0 ? {} : _ref5$toast;
        return {
          toast: newObject(toast, {
            message: '',
            status: '',
            isError: false,
            key: ''
          })
        };
      }), _ref6;
    });
    if (filter || responseFilter || customTask && customLoader) State = newObject(State, function (_ref7) {
      var _ref8;

      var obj = _ref7[type || action.type];
      return _ref8 = {}, _ref8[type || action.type] = newObject(obj, filterArrayloadingHandler({
        filter: Array.isArray(filter || responseFilter) && (filter || responseFilter) || [filter || responseFilter],
        loader: customTask && customLoader ? customLoader : [ON_SUCCESS, ON_ERROR].includes(method) ? false : status || loader
      })(obj)), _ref8;
    });else State = newObject(State, function (_ref9) {
      var _ref10;

      var obj = _ref9[type || action.type];
      return _ref10 = {}, _ref10[type || action.type] = newObject(obj, {
        loading: customTask && customLoader ? customLoader : {
          status: [ON_SUCCESS, ON_ERROR].includes(method) ? false : status || loader,
          lastUpdated: generateTimeStamp()
        }
      }), _ref10;
    });
    if (method === ON_LOADING || loader) return State;
  }

  if ([ON_SUCCESS, ON_ERROR].includes(method) && // [200, 201, 400, 403, 404, 409, 500].includes(statusCode) &&
  Object.keys(constants).includes(type) && !customTask || customToast && customTask && (Array.isArray(method) ? method : [method]).includes(ON_TOAST)) {
    if (responseFilter) State = newObject(State, function (_ref11) {
      var _ref12;

      var obj = _ref11[type];
      return _ref12 = {}, _ref12[type] = newObject(obj, filterArrayToastHandler(_extends({
        statusCode: statusCode,
        filter: Array.isArray(responseFilter) && responseFilter || [responseFilter],
        message: message,
        type: type
      }, customToast && customTask && (Array.isArray(method) ? method : [method]).includes(ON_TOAST) ? customToast : {}))(obj)), _ref12;
    });else State = newObject(State, function (_ref13) {
      var _ref14;

      var obj = _ref13[type];
      return _ref14 = {}, _ref14[type] = newObject(obj, {
        toast: _extends({
          isError: ![200, 201].includes(statusCode),
          status: statusCode,
          message: message,
          key: type,
          lastUpdated: generateTimeStamp()
        }, customToast && customTask && (Array.isArray(method) ? method : [method]).includes(ON_TOAST) ? customToast : {})
      }), _ref14;
    });
  }

  var changeState = newObject.bind({}, State);
  var reset = responseFilter ? filterArrayResetHandler.bind({}, state, newState, action, responseFilter) : resetHandler.bind({}, state, newState, action);
  return updateState({
    state: State,
    newState: changeState,
    action: action,
    reset: reset
  });
};
export var getData = function getData(data, def, loader, filter) {
  if (loader === void 0) {
    loader = true;
  }

  if (filter === void 0) {
    filter = [];
  }

  return {
    data: safe(data, ".data" + (filter.length ? '.' : '') + filter.join('.') + (filter.length ? '.data' : ''), def),
    loader: safe(data, "" + (filter.length ? '.data.' : '') + filter.join('.') + ".loading.status", loader),
    lastUpdated: safe(data, "" + (filter.length ? '.data.' : '') + filter.join('.') + ".lastUpdated", 0),
    isInfinite: safe(data, "" + (filter.length ? '.data.' : '') + filter.join('.') + ".isInfinite", false),
    infiniteEnd: safe(data, "" + (filter.length ? '.data.' : '') + filter.join('.') + ".infiniteEnd", false),
    isError: safe(data, "" + (filter.length ? '.data.' : '') + filter.join('.') + ".isError", false),
    toast: safe(data, "" + (filter.length ? '.data.' : '') + filter.join('.') + ".toast", {}),
    error: safe(data, "" + (filter.length ? '.data.' : '') + filter.join('.') + ".error", {})
  };
};
export var mapDispatchToProps = function mapDispatchToProps(actions, componentData, reducerName) {
  return function (dispatch) {
    return _extends({
      dispatch: dispatch
    }, actions && Object.keys(actions).length ? newObject(componentData, function (_ref15) {
      var _ref16;

      var data = _ref15[reducerName + "_hoc"];
      return _ref16 = {}, _ref16[reducerName + "_hoc"] = newObject(data, {
        actions: bindActionCreators(actions, dispatch)
      }), _ref16;
    }) : {});
  };
}; // export const connectHoc = connect(
//   null,
//   mapDispatchToProps({ ...AuthenticationActions, ...DashboardActions }),
// );

var checkKey = function checkKey(key, name, dataType, message) {
  invariant(typeOf(key) === dataType, "(react-boilerplate-redux-saga-hoc)  Expected `" + name + "` to be  " + (message || dataType));
};

var checkKeyWithMessage = function checkKeyWithMessage(key, dataType, message) {
  invariant(typeOf(key) === dataType, message);
};

var previousDataKey = [];
var previousData = {};
export var useHook = function useHook(name, array, config) {
  if (name === void 0) {
    name = null;
  }

  if (array === void 0) {
    array = [];
  }

  if (config === void 0) {
    config = {};
  }

  var store = useStore();

  var _GetData = function _GetData() {
    var _data = {};

    var _checkFilter = function _checkFilter(e) {
      return e.filter ? Array.isArray(e.filter) ? e.filter : typeof e.filter === 'string' ? [e.filter] : undefined : undefined;
    };

    var _getData = function _getData(e, isString) {
      return safe(getData(safe(store, ".getState()[" + name + "][" + (isString ? array : e.key) + "]"), e.query ? undefined : e.default || undefined, e.initialLoaderState || false, _checkFilter(e)), "" + (e.query && typeOf(e.query) === 'string' ? e.query : ''), e.query ? e.default || undefined : undefined);
    };

    if (name && (Array.isArray(array) && array.length > 0 || typeOf(array) === 'object' && Object.keys(array).length > 0)) {
      // eslint-disable-next-line consistent-return
      // eslint-disable-next-line no-underscore-dangle
      _data = (typeOf(array) === 'object' ? [array] : array).reduce(function (acc, e) {
        var _extends3, _extends4;

        return typeOf(e) === 'object' ? typeOf(array) === 'object' ? _getData(e) : _extends({}, acc, (_extends3 = {}, _extends3[e.name || e.key] = _getData(e), _extends3)) : typeOf(array) === 'object' ? safe(store, ".getState()[" + name + "][" + e + "]") : _extends({}, acc, (_extends4 = {}, _extends4[e] = safe(store, ".getState()[" + name + "][" + e + "]"), _extends4));
      }, {});
    } else if (typeof array === 'string') _data = _getData(config, true);else if (name) _data = safe(store, ".getState()[" + name + "]");else _data = safe(store, ".getState()") || {};

    return _data;
  };

  var _useState = useState(_GetData()),
      data = _useState[0],
      setData = _useState[1];

  var _useState2 = useState({}),
      _key = _useState2[0];

  if (name) checkKey(name, 'reducer name', 'string', 'valid string');

  var execute = function execute() {
    // const state = safe(store, `.getState()[${name}]`);
    // eslint-disable-next-line no-underscore-dangle
    var _data = _GetData();

    var index = previousDataKey.indexOf(_key);

    if (!isEqual(_data, previousData[index])) {
      // previousData[`${key || name}_${_key}`] = _data;
      previousData[index] = _data;
      setData(_data);
    }
  };

  useEffect(function () {
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
export var useActionsHook = function useActionsHook(name, actions) {
  var _useState3 = useState({}),
      dispatchAction = _useState3[0],
      setDispatchAction = _useState3[1];

  var dispatch = useDispatch();
  useEffect(function () {
    if (!isEqual(cacheActions[name], actions)) {
      cacheActions[name] = actions;
      cache[name] = bindActionCreators(actions, dispatch);
      setDispatchAction(cache[name]);
    } else setDispatchAction(cache[name]);
  }, [isEqual(cacheActions[name], actions)]);
  return dispatchAction;
};
export var useMutation = function useMutation(reducerName) {
  if (!reducerName) checkKeyWithMessage(reducerName, 'string', 'useMutation(`reducerkey`) : Expected a valid reducer key');
  var store = useStore();
  useEffect(function () {
    if (reducerName) checkKeyWithMessage(reducerName, 'string', 'useMutation(`reducerkey`) : Expected a reducer key to be string');
    if (!store.getState()[reducerName]) checkKeyWithMessage(null, 'string', " reducerName '" + reducerName + "' not a valid reducer key.");
  }, []);
  var dispatch = useDispatch();
  return function (_ref17) {
    var type = _ref17.key,
        value = _ref17.value,
        _ref17$filter = _ref17.filter,
        filter = _ref17$filter === void 0 ? [] : _ref17$filter;
    if (!type) checkKey(null, 'key', 'string', 'valid string');

    var _reducer_keys = Object.keys(store.getState()[reducerName]);

    if (type) invariant(_reducer_keys.includes(type), // type.includes('_CALL') && type.slice(-5) === '_CALL',
    "'key' is invalid." + type + " not found in " + reducerName + " reducer");
    checkKey(filter, 'filter', 'array');
    checkKey(value, 'value', 'object');
    checkKey(type, 'key', 'string');
    if (type.includes('_CALL') && type.slice(-5) === '_CALL') dispatch({
      type: type.slice(0, -4).concat('CUSTOM_TASK'),
      response: {
        type: type,
        method: ON_SUCCESS,
        statusCode: 200,
        mutation: true,
        customTask: true,
        data: {
          data: value
        },
        payload: {
          filter: filter
        }
      }
    });else dispatch({
      type: type,
      value: value,
      filter: filter
    });
  };
};
export var toPromise = function toPromise(action, config) {
  if (config === void 0) {
    config = {};
  }

  if (typeOf(config) !== 'null' || typeOf(config) !== 'undefined') checkKeyWithMessage(config, 'object', "toPromise() : Expected a config (second parameter) to be object");
  return new Promise(function (resolve, reject) {
    return action(_extends({}, config, {
      resolve: resolve,
      reject: reject
    }));
  });
};