/* eslint-disable no-unused-vars */
import { put, call } from 'redux-saga/effects';
import { DEFAULT_SAGA_HANDLER as defaultSagaHandler } from '../../utils/commonHandlers/commonSagaHandler';
import { newObject } from '../../utils/helpers';
import {
  ON_ERROR,
  ON_FINALLY,
  ON_SUCCESS,
  ON_REQUEST,
  ON_CANCEL,
  ON_CANCEL_ERROR,
  CALL,
} from '../../utils/commonReduxSagaConverter/commonConstants';

export const requestResponseHandler = ({ constants, sagaFunction }) =>
  // eslint-disable-next-line func-names
  function*({
    data: {
      data: {
        status: successStatus,
        data: successData = {},
        message: successMessage,
        ...restSuccessData
      } = {},
    } = {},
    request,
    action,
    type,
    payload: { payload = {}, query = {}, params = {}, ...restPayload } = {},
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
        } = {},
      } = {},
    } = {},
    cancelled,
  }) {
    let requestData = {};
    if (method === ON_REQUEST) requestData = newObject(request);
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
      restErrorData,
    };
    const DEFAULT_SAGA_HANDLER = defaultSagaHandler.bind(null, requestParams);
    if (sagaFunction) {
      return yield call(
        sagaFunction,
        newObject(
          {
            type,
            constants,
            DEFAULT_SAGA_HANDLER,
          },
          requestParams,
        ),
      );
      // return sagaFunction(
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
      case ON_REQUEST:
        return requestData;
      default:
        return yield call(DEFAULT_SAGA_HANDLER);
    }
    // switch (type) {
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

export default [];
