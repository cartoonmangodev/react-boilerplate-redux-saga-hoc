"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _commonConstants = require("../../utils/commonReduxSagaConverter/commonConstants");

var _utils = require("../../utils");

var _helpers = require("../../utils/helpers");

var _commonReducerHandler = require("../../utils/commonHandlers/commonReducerHandler");

/* eslint-disable indent */

/* eslint-disable no-unused-vars */
// import {
//   constants as authenticationConstants,
//   initialState as InitialState,
// } from './constants';
const componentState = {// profile: {},
  // isLoggedIn: false,
  // authorization: true,
  // language: 'EN',
};
const PROFILE_UPDATE = 'PROFILE_UPDATE';
const otherReducerConstants = [];
const LANGUAGE_CONSTANTS = 'LANGUAGE';

const updateState = ({
  authenticationConstants,
  ResetState,
  isMobileApp = false,
  initialState: InitialState,
  reducerFunction,
  handlers = []
}) => ({
  state,
  newState,
  action,
  reset
}) => {
  const {
    response: {
      data: {
        data: successData = {},
        ...restSuccessData
      } = {},
      payload: {
        payload = {},
        query = {},
        params = {},
        ...restPayload
      } = {},
      status: loadingStatus,
      statusCode,
      type,
      method,
      message: statusMessage,
      error: {
        data: errorData = {},
        ...restErrorData
      } = {}
    } = {}
  } = action;
  const [commonHandler, commmonErrorHandler] = (0, _commonReducerHandler.COMMON_REDUCER_HANDLER)(action, handlers);

  const defaultReducerHandler = () => (0, _commonReducerHandler.DEFAULT_REDUCER_HANDLER)({
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
          const returnData = reducerFunction({
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

var _default = ({
  reducerFunction,
  constants: authenticationConstants,
  InitialState,
  handlers = [],
  resetState: ResetState = {},
  isMobile: isMobileApp = false,
  constantReducer
}) => {
  const initialState = (0, _helpers.newObject)(InitialState, componentState);
  return (state = initialState, action) => {
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
          let reducerState = (0, _helpers.newObject)(state);

          if (constantReducer) {
            const returnData = constantReducer({
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

          const newState = _helpers.newObject.bind({}, reducerState);

          const {
            response: {
              method,
              type
            } = {}
          } = action;
          const execute = Object.keys(InitialState).concat(otherReducerConstants).includes(type || action.type);
          const constants = InitialState;
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