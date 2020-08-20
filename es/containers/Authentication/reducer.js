"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _commonConstants = require("../../utils/commonReduxSagaConverter/commonConstants");

var _utils = require("../../utils");

var _helpers = require("../../utils/helpers");

var _commonReducerHandler = require("../../utils/commonHandlers/commonReducerHandler");

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var componentState = {// profile: {},
  // isLoggedIn: false,
  // authorization: true,
  // language: 'EN',
};
var PROFILE_UPDATE = 'PROFILE_UPDATE';
var otherReducerConstants = [];
var LANGUAGE_CONSTANTS = 'LANGUAGE';

var updateState = (_ref) => {
  var {
    authenticationConstants,
    ResetState,
    isMobileApp = false,
    initialState: InitialState,
    reducerFunction,
    handlers = []
  } = _ref;
  return (_ref2) => {
    var {
      state,
      newState,
      action,
      reset
    } = _ref2;

    var {
      response: {
        data: {
          data: successData = {}
        } = {},
        payload: {
          payload = {},
          query = {},
          params = {}
        } = {},
        status: loadingStatus,
        statusCode,
        type,
        method,
        message: statusMessage,
        error: {
          data: errorData = {}
        } = {}
      } = {}
    } = action,
        restSuccessData = _objectWithoutProperties(action.response.data, ["data"]),
        restPayload = _objectWithoutProperties(action.response.payload, ["payload", "query", "params"]),
        restErrorData = _objectWithoutProperties(action.response.error, ["data"]);

    var [commonHandler, commmonErrorHandler] = (0, _commonReducerHandler.COMMON_REDUCER_HANDLER)(action, handlers);

    var defaultReducerHandler = () => (0, _commonReducerHandler.DEFAULT_REDUCER_HANDLER)({
      method,
      reset,
      state,
      action,
      handlers,
      type
    });

    switch (type) {
      case 'RESET':
        switch (method) {
          case _commonConstants.ON_SUCCESS:
            return (0, _helpers.newObject)(state, ResetState);

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
              successData,
              restSuccessData,
              payload,
              query,
              state,
              params,
              restPayload,
              loadingStatus,
              statusCode,
              type,
              reset,
              newState,
              method,
              statusMessage,
              errorData,
              restErrorData,
              resetState: ResetState,
              initialState: InitialState,
              commonHandler,
              commmonErrorHandler,
              defaultReducerHandler
            });
            if (returnData) return returnData;
          }

          return defaultReducerHandler();
        }
    }
  };
};

var _default = (_ref3) => {
  var {
    reducerFunction,
    constants: authenticationConstants,
    InitialState,
    handlers = [],
    resetState: ResetState = {},
    isMobile: isMobileApp = false,
    constantReducer
  } = _ref3;
  var initialState = (0, _helpers.newObject)(InitialState, componentState);
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments.length > 1 ? arguments[1] : undefined;

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
          var reducerState = (0, _helpers.newObject)(state);

          if (constantReducer) {
            var returnData = constantReducer({
              state: reducerState,
              type: type || action.type,
              action,
              constants: authenticationConstants,
              isMobile: isMobileApp,
              initialState: InitialState,
              resetState: ResetState
            });
            if (typeof returnData !== 'undefined') reducerState = returnData;
          }

          var newState = _helpers.newObject.bind({}, reducerState);

          var {
            response: {
              method,
              type
            } = {}
          } = action;
          var execute = Object.keys(InitialState).concat(otherReducerConstants).includes(type || action.type);
          var constants = InitialState;
          if (execute) return (0, _utils.commmonStateHandler)({
            constants,
            state: reducerState,
            action,
            method,
            newState,
            updateState: updateState({
              authenticationConstants,
              ResetState,
              isMobileApp,
              handlers,
              initialState,
              reducerFunction
            })
          });
          return reducerState;
        }
    }
  };
};

exports.default = _default;