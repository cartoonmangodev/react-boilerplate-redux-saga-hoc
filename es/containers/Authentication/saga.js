function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/* eslint-disable no-unused-vars */
import { put, call } from 'redux-saga/effects';
import { DEFAULT_SAGA_HANDLER as defaultSagaHandler } from '../../utils/commonHandlers/commonSagaHandler';
import { newObject } from '../../utils/helpers';
import { ON_ERROR, ON_FINALLY, ON_SUCCESS, ON_REQUEST, ON_CANCEL, ON_CANCEL_ERROR, CALL } from '../../utils/commonReduxSagaConverter/commonConstants';
export var requestResponseHandler = function requestResponseHandler(_ref) {
  var constants = _ref.constants,
      sagaFunction = _ref.sagaFunction;
  return (// eslint-disable-next-line func-names
    function* (_ref2) {
      var _ref2$data = _ref2.data;
      _ref2$data = _ref2$data === void 0 ? {} : _ref2$data;
      var _ref2$data$data = _ref2$data.data;
      _ref2$data$data = _ref2$data$data === void 0 ? {} : _ref2$data$data;

      var successStatus = _ref2$data$data.status,
          _ref2$data$data$data = _ref2$data$data.data,
          successData = _ref2$data$data$data === void 0 ? {} : _ref2$data$data$data,
          successMessage = _ref2$data$data.message,
          restSuccessData = _objectWithoutPropertiesLoose(_ref2$data$data, ["status", "data", "message"]),
          request = _ref2.request,
          action = _ref2.action,
          type = _ref2.type,
          _ref2$payload = _ref2.payload;

      _ref2$payload = _ref2$payload === void 0 ? {} : _ref2$payload;

      var _ref2$payload$payload = _ref2$payload.payload,
          payload = _ref2$payload$payload === void 0 ? {} : _ref2$payload$payload,
          _ref2$payload$query = _ref2$payload.query,
          query = _ref2$payload$query === void 0 ? {} : _ref2$payload$query,
          _ref2$payload$params = _ref2$payload.params,
          params = _ref2$payload$params === void 0 ? {} : _ref2$payload$params,
          restPayload = _objectWithoutPropertiesLoose(_ref2$payload, ["payload", "query", "params"]),
          method = _ref2.method,
          actionData = _ref2.actionData,
          axiosCancel = _ref2.axiosCancel,
          _ref2$error = _ref2.error;

      _ref2$error = _ref2$error === void 0 ? {} : _ref2$error;
      var _ref2$error$response = _ref2$error.response;
      _ref2$error$response = _ref2$error$response === void 0 ? {} : _ref2$error$response;
      var _ref2$error$response$ = _ref2$error$response.data;
      _ref2$error$response$ = _ref2$error$response$ === void 0 ? {} : _ref2$error$response$;

      var errorStatus = _ref2$error$response$.status,
          _ref2$error$response$2 = _ref2$error$response$.data,
          errorData = _ref2$error$response$2 === void 0 ? [] : _ref2$error$response$2,
          errorMessage = _ref2$error$response$.message,
          restErrorData = _objectWithoutPropertiesLoose(_ref2$error$response$, ["status", "data", "message"]),
          cancelled = _ref2.cancelled;

      var requestData = {};
      if (method === ON_REQUEST) requestData = newObject(request);
      var requestParams = {
        method: method,
        action: action,
        successData: successData,
        requestData: requestData,
        successStatus: successStatus,
        restSuccessData: restSuccessData,
        errorStatus: errorStatus,
        errorData: errorData,
        restPayload: restPayload,
        restErrorData: restErrorData
      };
      var DEFAULT_SAGA_HANDLER = defaultSagaHandler.bind(null, requestParams);

      if (sagaFunction) {
        return yield call(sagaFunction, newObject({
          type: type,
          constants: constants,
          DEFAULT_SAGA_HANDLER: DEFAULT_SAGA_HANDLER
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
        case ON_REQUEST:
          return requestData;

        default:
          return yield call(DEFAULT_SAGA_HANDLER);
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

    }
  );
};
export default [];