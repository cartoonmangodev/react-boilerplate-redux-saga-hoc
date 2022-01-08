/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import {
  ON_ERROR,
  ON_SUCCESS,
  CALL,
} from '../../utils/commonReduxSagaConverter/commonConstants';
import { commmonStateHandler } from '../../utils';
import { newObject, generateTimeStamp } from '../../utils/helpers';
// import {
//   constants as authenticationConstants,
//   initialState as InitialState,
// } from './constants';
import {
  COMMON_REDUCER_HANDLER,
  DEFAULT_REDUCER_HANDLER,
} from '../../utils/commonHandlers/commonReducerHandler';

const componentState = {
  // profile: {},
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
  handlers = [],
}) => ({ state, newState, action, reset }) => {
  const {
    response: {
      data: { data: successData = {}, ...restSuccessData } = {},
      payload: { payload = {}, query = {}, params = {}, ...restPayload } = {},
      status: loadingStatus,
      statusCode,
      type,
      method,
      message: statusMessage,
      error: { data: errorData = {}, ...restErrorData } = {},
    } = {},
  } = action;
  const [commonHandler, commmonErrorHandler] = COMMON_REDUCER_HANDLER(
    action,
    handlers,
  );
  const defaultReducerHandler = () =>
    DEFAULT_REDUCER_HANDLER({
      method,
      reset,
      state,
      action,
      handlers,
      type,
    });
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
    default: {
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
          defaultReducerHandler,
        });
        if (returnData) return returnData;
      }
      return defaultReducerHandler();
    }
  }
};

const dontResetKeyCheck = (ResetState, action) =>
  (action.payload.dontResetKeys || []).length > 0
    ? Object.entries(ResetState).reduce(
        (acc, [key, val]) =>
          (action.payload.dontResetKeys || []).includes(key)
            ? acc
            : {
                ...acc,
                [key]: val,
              },
        {},
      )
    : ResetState;

export default ({
  reducerFunction,
  constants: authenticationConstants,
  InitialState,
  handlers = [],
  resetState: ResetState = {},
  isMobile: isMobileApp = false,
  constantReducer,
  reducerName,
}) => {
  const initialState = newObject(InitialState, componentState);
  return (state = initialState, action) => {
    const {
      payload: { dontUpdateReducer, dontUpdateReducerOnCall } = {},
    } = action;
    if (dontUpdateReducer || dontUpdateReducerOnCall) return state;
    switch (action.type) {
      case 'RESET_API':
        return newObject(state, dontResetKeyCheck(ResetState, action));
      case 'MUTATE_STATE':
        return newObject(state, action.payload);
      case 'RESET_STATE':
        return newObject(
          state,
          dontResetKeyCheck(ResetState, action),
          dontResetKeyCheck(InitialState, action),
        );
      case `${reducerName}_RESET_API`:
        return newObject(state, dontResetKeyCheck(ResetState, action));
      case `${reducerName}_MUTATE_STATE`:
        return newObject(state, action.payload);
      case `${reducerName}_RESET_STATE`:
        return newObject(
          state,
          dontResetKeyCheck(ResetState, action),
          dontResetKeyCheck(InitialState, action),
        );
      default: {
        let reducerState = newObject(state);
        if (constantReducer) {
          const returnData = constantReducer({
            state: reducerState,
            type: type || action.type,
            action,
            constants: authenticationConstants,
            isMobile: isMobileApp,
            initialState: InitialState,
            resetState: ResetState,
          });
          if (typeof returnData !== 'undefined') reducerState = returnData;
        }
        const newState = newObject.bind({}, reducerState);
        const { response: { method, type } = {} } = action;
        const execute = Object.keys(InitialState)
          .concat(otherReducerConstants)
          .includes(type || action.type);
        const constants = InitialState;
        if (execute)
          return commmonStateHandler({
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
              reducerFunction,
            }),
          });
        return reducerState;
      }
    }
  };
};
