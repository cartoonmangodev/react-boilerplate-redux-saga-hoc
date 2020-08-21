function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _await(value, then, direct) {
  if (direct) {
    return then ? then(value) : value;
  }

  if (!value || !value.then) {
    value = Promise.resolve(value);
  }

  return then ? value.then(then) : value;
}

function _invoke(body, then) {
  var result = body();

  if (result && result.then) {
    return result.then(then);
  }

  return then(result);
}

function _async(f) {
  return function () {
    for (var args = [], i = 0; i < arguments.length; i++) {
      args[i] = arguments[i];
    }

    try {
      return Promise.resolve(f.apply(this, args));
    } catch (e) {
      return Promise.reject(e);
    }
  };
}

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/* eslint-disable indent */

/* eslint-disable func-names */

/* eslint-disable import/no-unresolved */

/**
 * Dashboard
 */
import React from 'react';
import { connect, useDispatch } from 'react-redux';
import invariant from 'invariant';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import isString from 'lodash/isString';
import isEmpty from 'lodash/isEmpty';
import axios from '../../config/axios'; // import { getLanguage } from '../../config/Language/index';

import generateConstants from './constants'; // eslint-disable-next-line import/no-useless-path-segments
// import injectSaga from '../../../../../app/utils/injectSaga';
// eslint-disable-next-line import/no-useless-path-segments
// import injectReducer from '../../../../../app/utils/injectReducer';

import injectSaga, { useInjectSaga } from '../../utils/utils/injectSaga';
import injectReducer, { useInjectReducer } from '../../utils/utils/injectReducer';
import { newObject, typeOf } from '../../utils/helpers';
import { makeSelectAuthenticationState } from './selectors';
import generateAction from './actions';
import Reducer from './reducer';
import Saga from './generator';
import nullcheck from '../../utils/nullCheck';
import { getData, mapDispatchToProps } from '../../utils';
import { commonConstants } from '../../index';
var safe = nullcheck; // const shape = {
//   reducerName: isString,
// };

var checkKey = function checkKey(key, name, dataType) {
  invariant(typeOf(key) === dataType, "(react-boilerplate-redux-saga-hoc)  Expected `" + name + "` to be a " + dataType);
};

export default (function (_ref) {
  var _ref$handlers = _ref.handlers,
      handlers = _ref$handlers === void 0 ? [] : _ref$handlers,
      _ref$nextJS = _ref.nextJS,
      nextJS = _ref$nextJS === void 0 ? false : _ref$nextJS,
      _ref$createReducer = _ref.createReducer,
      createReducer = _ref$createReducer === void 0 ? null : _ref$createReducer,
      _ref$useHook = _ref.useHook,
      useHook = _ref$useHook === void 0 ? false : _ref$useHook,
      _ref$useHocHook = _ref.useHocHook,
      useHocHook = _ref$useHocHook === void 0 ? false : _ref$useHocHook;
  return function (_temp) {
    var _ApiEndPoints, _componentData;

    var _ref2 = _temp === void 0 ? {} : _temp,
        _ref2$apiEndPoints = _ref2.apiEndPoints,
        apiEndPoints = _ref2$apiEndPoints === void 0 ? {} : _ref2$apiEndPoints,
        _ref2$initialState = _ref2.initialState,
        initialState = _ref2$initialState === void 0 ? {} : _ref2$initialState,
        _ref2$getDefaultConfi = _ref2.getDefaultConfig,
        getDefaultConfig = _ref2$getDefaultConfi === void 0 ? false : _ref2$getDefaultConfi,
        _ref2$dontReset = _ref2.dontReset,
        dontResetOnLogout = _ref2$dontReset === void 0 ? {} : _ref2$dontReset,
        _ref2$isMobile = _ref2.isMobile,
        isMobile = _ref2$isMobile === void 0 ? false : _ref2$isMobile,
        sagaFunction = _ref2.saga,
        _ref2$constantSaga = _ref2.constantSaga,
        constantSaga = _ref2$constantSaga === void 0 ? [] : _ref2$constantSaga,
        constantReducer = _ref2.constantReducer,
        reducerFunction = _ref2.reducer,
        reducerName = _ref2.name,
        axiosInterceptors = _ref2.axiosInterceptors,
        _ref2$useHook = _ref2.useHook,
        _useHook = _ref2$useHook === void 0 ? false : _ref2$useHook;

    invariant(isString(reducerName) && !isEmpty(reducerName), '(react-boilerplate-redux-saga-hoc)  Expected `name` to be a non empty string');
    checkKey(apiEndPoints, 'apiEndPoints', 'object');
    checkKey(initialState, 'initialState', 'object');
    checkKey(dontResetOnLogout, 'dontReset', 'object');
    if (sagaFunction) checkKey(sagaFunction, 'saga', 'function');
    checkKey(constantSaga, 'constantSaga', 'array');
    checkKey(handlers, 'handlers', 'array');
    if (constantReducer) checkKey(constantReducer, 'constantReducer', 'function');
    if (reducerFunction) checkKey(reducerFunction, 'reducer', 'function');
    if (createReducer) checkKey(createReducer, 'createReducer', 'function');
    var ApiEndPoints = (_ApiEndPoints = {}, _ApiEndPoints[reducerName] = apiEndPoints, _ApiEndPoints);

    var _generateConstants = generateConstants({
      apiEndPoints: ApiEndPoints,
      generatorKey: reducerName,
      dontResetOnLogout: dontResetOnLogout
    }),
        constants = _generateConstants.constants,
        InitialState = _generateConstants.initialState,
        resetState = _generateConstants.resetState,
        Action = _generateConstants.actions,
        sagaConfig = _generateConstants.sagaConfig;

    var _generateAction = generateAction(Action),
        componentActions = _generateAction.componentActions;

    var _Saga = Saga({
      sagaConfig: sagaConfig,
      constants: constants,
      sagaFunction: sagaFunction,
      axiosInterceptors: axiosInterceptors,
      constantSaga: constantSaga
    }),
        saga = _Saga.saga;

    var reducer = Reducer({
      constants: constants,
      InitialState: newObject(initialState, InitialState),
      reducerFunction: reducerFunction,
      resetState: resetState,
      constantReducer: constantReducer,
      isMobile: isMobile,
      handlers: handlers
    });
    var componentData = (_componentData = {}, _componentData[reducerName + "_hoc"] = {
      reducerConstants: Object.entries(constants).reduce(function (acc, _ref3) {
        var _extends2;

        var key = _ref3[0],
            value = _ref3[1];
        return _extends({}, acc, (_extends2 = {}, _extends2[key] = value[commonConstants.CALL], _extends2));
      }, {}),
      constants: constants,
      initialState: initialState,
      axios: axiosInterceptors || axios,
      resetState: resetState,
      reducerName: reducerName
    }, _componentData);
    var commonProps = useHook || _useHook ? {
      safe: safe
    } : {
      safe: safe,
      getData: getData
    }; // eslint-disable-next-line no-underscore-dangle

    var _useHocHook = function _useHocHook() {
      useInjectSaga({
        key: reducerName,
        saga: saga
      });
      useInjectReducer({
        key: reducerName,
        reducer: reducer
      }, createReducer);
      var dispatch = useDispatch();

      var _React$useState = React.useState(_extends({}, componentData[reducerName + "_hoc"], {
        actions: bindActionCreators(componentActions, dispatch),
        dispatch: dispatch
      })),
          state = _React$useState[0];

      return state;
    };

    if (useHocHook && !nextJS) return _useHocHook; // eslint-disable-next-line no-unused-vars

    var hoc = function hoc(WrapperComponent, autoLoginCheck) {
      var _createStructuredSele;

      if (autoLoginCheck === void 0) {
        autoLoginCheck = true;
      }

      function WithHoc(props) {
        // const [language, setLanguage] = useState(getLanguage('EN'));
        // useEffect(() => {
        //   if (props.authentication.language !== language)
        //     setLanguage(getLanguage(props.authentication.language));
        // }, [props.authentication.language]);
        // console.log(props, '================');
        return React.createElement(WrapperComponent // language={language}
        , _extends({}, commonProps, props));
      }

      WithHoc.propTypes = {// [reducerName]: PropTypes.object.isRequired,
      };
      WithHoc.displayName = "withReactBoilerplateReduxSagaHoc(" + (WrapperComponent.displayName || WrapperComponent.name || 'BaseComponent') + ")";
      var MakeSelectAuthenticationState = makeSelectAuthenticationState({
        apiEndPoints: ApiEndPoints,
        initialState: newObject(initialState, InitialState),
        InitialState: initialState,
        generatorKey: reducerName,
        constants: constants
      });
      var mapStateToProps = createStructuredSelector((_createStructuredSele = {}, _createStructuredSele[reducerName + "_data"] = MakeSelectAuthenticationState(), _createStructuredSele));
      var authenticationReducer = injectReducer({
        key: reducerName,
        reducer: reducer
      }, createReducer);
      var authenticationSaga = injectSaga({
        key: reducerName,
        saga: saga
      });
      var withConnect = connect(mapStateToProps, mapDispatchToProps(componentActions, componentData, reducerName));

      if (nextJS) {
        WithHoc.getInitialProps = _async(function (props) {
          var _ref4 = props.ctx || props,
              res = _ref4.res,
              req = _ref4.req,
              store = _ref4.store,
              rest = _objectWithoutPropertiesLoose(_ref4, ["res", "req", "store"]);

          var data = _extends({
            res: res,
            req: req,
            store: store
          }, rest);

          return _invoke(function () {
            if (WrapperComponent.getInitialProps) return _await(WrapperComponent.getInitialProps(_extends({}, props, {}, mapDispatchToProps(componentActions, componentData, reducerName)(store.dispatch))), function (_WrapperComponent$get) {
              data = _WrapperComponent$get;
            });
          }, function () {
            return data || {};
          });
        });
        return withConnect(WithHoc);
      }

      return (useHook || _useHook ? compose(connect(null, mapDispatchToProps(componentActions, componentData, reducerName)), authenticationReducer, authenticationSaga) : compose(withConnect, authenticationReducer, authenticationSaga))(WithHoc);
    };

    if (nextJS && getDefaultConfig) return _extends({
      hoc: hoc,
      saga: saga,
      hook: useHocHook,
      reducer: {
        name: reducerName,
        reducer: reducer
      },
      actions: _extends({}, componentActions)
    }, componentData[reducerName + "_hoc"]);
    if (nextJS) return {
      hoc: hoc,
      saga: saga,
      hook: useHocHook,
      reducer: {
        name: reducerName,
        reducer: reducer
      }
    };

    if (getDefaultConfig) {
      return _extends({
        hoc: hoc,
        actions: _extends({}, componentActions)
      }, componentData[reducerName + "_hoc"]);
    }

    return hoc;
  };
});