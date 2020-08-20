"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.requestResponseHandler = void 0;

var _effects = require("redux-saga/effects");

var _commonSagaHandler = require("../../utils/commonHandlers/commonSagaHandler");

var _helpers = require("../../utils/helpers");

var _commonConstants = require("../../utils/commonReduxSagaConverter/commonConstants");

/* eslint-disable no-unused-vars */
const requestResponseHandler = ({
  constants,
  sagaFunction
}) => // eslint-disable-next-line func-names
function* ({
  data: {
    data: {
      status: successStatus,
      data: successData = {},
      message: successMessage,
      ...restSuccessData
    } = {}
  } = {},
  request,
  action,
  type,
  payload: {
    payload = {},
    query = {},
    params = {},
    ...restPayload
  } = {},
  method,
  actionData,
  axiosCancel,
  error: {
    response: {
      data: {
        status: errorStatus,
        data: errorData = [],
        message: errorMessage,
        ...restErrorData
      } = {}
    } = {}
  } = {},
  cancelled
}) {
  let requestData = {};
  if (method === _commonConstants.ON_REQUEST) requestData = (0, _helpers.newObject)(request);
  const requestParams = {
    method,
    action,
    successData,
    requestData,
    successStatus,
    restSuccessData,
    errorStatus,
    errorData,
    restPayload,
    restErrorData
  };

  const DEFAULT_SAGA_HANDLER = _commonSagaHandler.DEFAULT_SAGA_HANDLER.bind(null, requestParams);

  if (sagaFunction) {
    return yield (0, _effects.call)(sagaFunction, (0, _helpers.newObject)({
      type,
      constants,
      DEFAULT_SAGA_HANDLER
    }, requestParams)); // return sagaFunction(
    //   newObject(
    //     {
    //       type,
    //       constants,
    //       DEFAULT_SAGA_HANDLER,
    //     },
    //     requestParams,
    //   ),
    // );
  }

  switch (method) {
    case _commonConstants.ON_REQUEST:
      return requestData;

    default:
      return yield (0, _effects.call)(DEFAULT_SAGA_HANDLER);
  } // switch (type) {
  //   case authenticationConstants.REGISTER_API[CALL]:
  //     switch (method) {
  //       case ON_SUCCESS: {
  //         if ([200].includes(successStatus))
  //           yield put(action.success({ data: payload }));
  //         else return true; /** @param return true for stopping loader */
  //         break;
  //       }
  //       case ON_ERROR: {
  //         return true; /** @param return true for stopping loader */
  //       }
  //       case ON_FINALLY:
  //         break;
  //       default:
  //         yield call(DEFAULT_SAGA_HANDLER);
  //     }
  //     break;
  //   case authenticationConstants.LOGIN_API[CALL]:
  //     switch (method) {
  //       case ON_SUCCESS: {
  //         if ([200].includes(successStatus))
  //           yield put(action.success({ data: payload }));
  //         else return true; /** @param return true for stopping loader */
  //         break;
  //       }
  //       case ON_ERROR: {
  //         return true; /** @param return true for stopping loader */
  //       }
  //       case ON_FINALLY:
  //         break;
  //       default:
  //         yield call(DEFAULT_SAGA_HANDLER);
  //     }
  //     break;
  //   case authenticationConstants.VERIFY_OTP_API[CALL]:
  //     switch (method) {
  //       case ON_SUCCESS:
  //         if ([200].includes(successStatus))
  //           yield put(action.success({ data: successData }));
  //         else return true;
  //         break;
  //       default:
  //         return yield call(DEFAULT_SAGA_HANDLER);
  //     }
  //     break;
  // case authenticationConstants.ONBOARDING_API[CALL]:
  //   switch (method) {
  //     case ON_SUCCESS:
  //       if ([200].includes(successStatus))
  //         yield put(action.success({ data: { is_onboarded: true } }));
  //       else return true;
  //       break;
  //     default:
  //       return yield call(DEFAULT_SAGA_HANDLER);
  //   }
  //   break;
  // case authenticationConstants.EDIT_MOBILE_NUMBER_API[CALL]:
  //   switch (method) {
  //     default:
  //       return yield call(DEFAULT_SAGA_HANDLER);
  //   }
  // case authenticationConstants.VERIFY_OTP_FOR_EDIT_MOBILE_NUMBER_API[CALL]:
  //   switch (method) {
  //     case ON_SUCCESS:
  //       yield put(action.success({ data: successData }));
  //       break;
  //     default:
  //       return yield call(DEFAULT_SAGA_HANDLER);
  //   }
  //   break;
  // case authenticationConstants.UPDATE_PROFILE_API[CALL]:
  //   switch (method) {
  //     case ON_SUCCESS:
  //       yield put(action.success({ data: successData }));
  //       break;
  //     default:
  //       return yield call(DEFAULT_SAGA_HANDLER);
  //   }
  //   break;
  // case authenticationConstants.UPDATE_USER_DETAILS_API[CALL]:
  //   switch (method) {
  //     case ON_SUCCESS:
  //       yield put(action.success({ data: successData }));
  //       break;
  //     default:
  //       return yield call(DEFAULT_SAGA_HANDLER);
  //   }
  //   break;
  // case authenticationConstants.USER_LOGOUT_API[CALL]:
  //   switch (method) {
  //     case ON_SUCCESS:
  //       if ([200].includes(successStatus)) yield put(action.success());
  //       else return true;
  //       break;
  //     default:
  //       return yield call(DEFAULT_SAGA_HANDLER);
  //   }
  //   break;
  // case authenticationConstants.USER_PROFILE_API[CALL]:
  //   switch (method) {
  //     case ON_SUCCESS:
  //       if ([200].includes(successStatus))
  //         yield put(action.success({ data: successData }));
  //       else return true;
  //       break;
  //     default:
  //       return yield call(DEFAULT_SAGA_HANDLER);
  //   }
  //   break;
  //   default:
  //     switch (method) {
  //       case ON_REQUEST:
  //         return requestData;
  //       default:
  //         return yield call(DEFAULT_SAGA_HANDLER);
  //     }
  // }
  // return null;

};

exports.requestResponseHandler = requestResponseHandler;
var _default = [];
exports.default = _default;