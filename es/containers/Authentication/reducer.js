function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/* eslint-disable indent */

/* eslint-disable no-unused-vars */
import { ON_ERROR, ON_SUCCESS, CALL } from '../../utils/commonReduxSagaConverter/commonConstants';
import { commmonStateHandler } from '../../utils';
import { newObject, generateTimeStamp } from '../../utils/helpers'; // import {
//   constants as authenticationConstants,
//   initialState as InitialState,
// } from './constants';

import { COMMON_REDUCER_HANDLER, DEFAULT_REDUCER_HANDLER } from '../../utils/commonHandlers/commonReducerHandler';
var componentState = {// profile: {},
  // isLoggedIn: false,
  // authorization: true,
  // language: 'EN',
};
var PROFILE_UPDATE = 'PROFILE_UPDATE';
var otherReducerConstants = [];
var LANGUAGE_CONSTANTS = 'LANGUAGE';

var updateState = function updateState(_ref) {
  var authenticationConstants = _ref.authenticationConstants,
      ResetState = _ref.ResetState,
      _ref$isMobileApp = _ref.isMobileApp,
      isMobileApp = _ref$isMobileApp === void 0 ? false : _ref$isMobileApp,
      InitialState = _ref.initialState,
      reducerFunction = _ref.reducerFunction,
      _ref$handlers = _ref.handlers,
      handlers = _ref$handlers === void 0 ? [] : _ref$handlers;
  return function (_ref2) {
    var state = _ref2.state,
        newState = _ref2.newState,
        action = _ref2.action,
        reset = _ref2.reset;
    var _action$response = action.response;
    _action$response = _action$response === void 0 ? {} : _action$response;
    var _action$response$data = _action$response.data;
    _action$response$data = _action$response$data === void 0 ? {} : _action$response$data;

    var _action$response$data2 = _action$response$data.data,
        successData = _action$response$data2 === void 0 ? {} : _action$response$data2,
        restSuccessData = _objectWithoutPropertiesLoose(_action$response$data, ["data"]),
        _action$response$payl = _action$response.payload;

    _action$response$payl = _action$response$payl === void 0 ? {} : _action$response$payl;

    var _action$response$payl2 = _action$response$payl.payload,
        payload = _action$response$payl2 === void 0 ? {} : _action$response$payl2,
        _action$response$payl3 = _action$response$payl.query,
        query = _action$response$payl3 === void 0 ? {} : _action$response$payl3,
        _action$response$payl4 = _action$response$payl.params,
        params = _action$response$payl4 === void 0 ? {} : _action$response$payl4,
        restPayload = _objectWithoutPropertiesLoose(_action$response$payl, ["payload", "query", "params"]),
        loadingStatus = _action$response.status,
        statusCode = _action$response.statusCode,
        type = _action$response.type,
        method = _action$response.method,
        statusMessage = _action$response.message,
        _action$response$erro = _action$response.error;

    _action$response$erro = _action$response$erro === void 0 ? {} : _action$response$erro;

    var _action$response$erro2 = _action$response$erro.data,
        errorData = _action$response$erro2 === void 0 ? {} : _action$response$erro2,
        restErrorData = _objectWithoutPropertiesLoose(_action$response$erro, ["data"]);

    var _COMMON_REDUCER_HANDL = COMMON_REDUCER_HANDLER(action, handlers),
        commonHandler = _COMMON_REDUCER_HANDL[0],
        commmonErrorHandler = _COMMON_REDUCER_HANDL[1];

    var defaultReducerHandler = function defaultReducerHandler() {
      return DEFAULT_REDUCER_HANDLER({
        method: method,
        reset: reset,
        state: state,
        action: action,
        handlers: handlers,
        type: type
      });
    };

    switch (type) {
      case 'RESET':
        switch (method) {
          case ON_SUCCESS:
            return newObject(state, ResetState);

          default:
            return state;
        }

      // case authenticationConstants.REGISTER_API[CALL]:
      //   switch (method) {
      //     case ON_SUCCESS: {
      //       return newState(({ profile }) => ({
      //         profile: newObject(profile, successData),
      //       }));
      //     }
      //     default:
      //       return state;
      //   }
      // case authenticationConstants.LOGIN_API[CALL]:
      //   switch (method) {
      //     case ON_SUCCESS: {
      //       return newState(({ profile }) => ({
      //         profile: newObject(profile, successData),
      //       }));
      //     }
      //     default:
      //       return state;
      //   }
      // case authenticationConstants.VERIFY_OTP_API[CALL]:
      //   switch (method) {
      //     case ON_SUCCESS:
      //       return newState(({ [type]: Data }) => ({
      //         profile: successData,
      //         isLoggedIn: !!successData.data.mobile_number,
      //         [type]: newObject(Data, {
      //           lastUpdated: generateTimeStamp(),
      //           data: successData,
      //         }),
      //       }));
      //     default:
      //       return state;
      //   }
      // case authenticationConstants.LOGOUT_API[CALL]:
      //   switch (method) {
      //     case ON_SUCCESS:
      //       return newObject(state, {
      //         profile: {},
      //         isLoggedIn: false,
      //         authorization: false,
      //       });
      //     default:
      //       return state;
      //   }
      // case authenticationConstants.EDIT_MOBILE_NUMBER_API[CALL]:
      //   return state;
      // case authenticationConstants.VERIFY_OTP_FOR_EDIT_MOBILE_NUMBER_API[CALL]:
      //   switch (method) {
      //     case ON_SUCCESS:
      //       return newState(({ [type]: Data }) => ({
      //         profile: successData,
      //         [type]: newObject(Data, {
      //           lastUpdated: generateTimeStamp(),
      //           data: successData,
      //         }),
      //       }));
      //     default:
      //       return state;
      //   }
      // case authenticationConstants.UPDATE_USER_DETAILS_API[CALL]:
      //   switch (method) {
      //     case ON_SUCCESS:
      //       return newState(({ profile }) => ({
      //         profile: newObject(profile, payload, successData),
      //         isLoggedIn: true,
      //       }));
      //     default:
      //       return state;
      //   }
      // case authenticationConstants.USER_LOGOUT_API[CALL]:
      //   switch (method) {
      //     case ON_SUCCESS:
      //       return newObject(initialState, {
      //         authorization: true,
      //       });
      //     default:
      //       return state;
      //   }
      // case authenticationConstants.UPDATE_PROFILE_API[CALL]:
      //   switch (method) {
      //     case ON_SUCCESS:
      //       return newState(({ profile, [type]: Data }) => ({
      //         profile: newObject(profile, successData),
      //       }));
      //     default:
      //       return state;
      //   }
      // case authenticationConstants.USER_PROFILE_API[CALL]:
      //   switch (method) {
      //     case ON_SUCCESS:
      //       return newState(({ profile, [type]: Data }) => ({
      //         authorization: true,
      //         isLoggedIn: !!successData.name,
      //         profile: newObject(profile, successData),
      //         [type]: newObject(Data, commonHandler()),
      //       }));
      //    case ON_ERROR: {
      //         return newObject(state, ({ [type]: Data }) => ({
      //           [type]: newObject(Data, commmonErrorHandler()),
      //        }));
      // }
      //     default:
      //       return state;
      //   }

      default:
        {
          if (reducerFunction) {
            var returnData = reducerFunction({
              constants: authenticationConstants,
              successData: successData,
              restSuccessData: restSuccessData,
              payload: payload,
              query: query,
              state: state,
              params: params,
              restPayload: restPayload,
              loadingStatus: loadingStatus,
              statusCode: statusCode,
              type: type,
              reset: reset,
              newState: newState,
              method: method,
              statusMessage: statusMessage,
              errorData: errorData,
              restErrorData: restErrorData,
              resetState: ResetState,
              initialState: InitialState,
              commonHandler: commonHandler,
              commmonErrorHandler: commmonErrorHandler,
              defaultReducerHandler: defaultReducerHandler
            });
            if (returnData) return returnData;
          }

          return defaultReducerHandler();
        }
    }
  };
};

export default (function (_ref3) {
  var reducerFunction = _ref3.reducerFunction,
      authenticationConstants = _ref3.constants,
      InitialState = _ref3.InitialState,
      _ref3$handlers = _ref3.handlers,
      handlers = _ref3$handlers === void 0 ? [] : _ref3$handlers,
      _ref3$resetState = _ref3.resetState,
      ResetState = _ref3$resetState === void 0 ? {} : _ref3$resetState,
      _ref3$isMobile = _ref3.isMobile,
      isMobileApp = _ref3$isMobile === void 0 ? false : _ref3$isMobile,
      constantReducer = _ref3.constantReducer;
  var initialState = newObject(InitialState, componentState);
  return function (state, action) {
    if (state === void 0) {
      state = initialState;
    }

    switch (action.type) {
      // case LANGUAGE_CONSTANTS:
      //   return newObject(state, { language: action.payload });
      // case PROFILE_UPDATE:
      //   return newObject(state, ({ profile }) => ({
      //     profile: newObject(profile, action.payload),
      //     isLoggedIn: true,
      //     authorization: true,
      //   }));
      default:
        {
          var reducerState = newObject(state);

          if (constantReducer) {
            var returnData = constantReducer({
              state: reducerState,
              type: type || action.type,
              action: action,
              constants: authenticationConstants,
              isMobile: isMobileApp,
              initialState: InitialState,
              resetState: ResetState
            });
            if (typeof returnData !== 'undefined') reducerState = returnData;
          }

          var newState = newObject.bind({}, reducerState);
          var _action$response2 = action.response;
          _action$response2 = _action$response2 === void 0 ? {} : _action$response2;
          var method = _action$response2.method,
              type = _action$response2.type;
          var execute = Object.keys(InitialState).concat(otherReducerConstants).includes(type || action.type);
          var constants = InitialState;
          if (execute) return commmonStateHandler({
            constants: constants,
            state: reducerState,
            action: action,
            method: method,
            newState: newState,
            updateState: updateState({
              authenticationConstants: authenticationConstants,
              ResetState: ResetState,
              isMobileApp: isMobileApp,
              handlers: handlers,
              initialState: initialState,
              reducerFunction: reducerFunction
            })
          });
          return reducerState;
        }
    }
  };
});