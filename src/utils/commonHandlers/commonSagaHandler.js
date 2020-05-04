import { put } from 'redux-saga/effects';
// import { responseErrorParser } from '../index';
import {
  ON_ERROR,
  ON_SUCCESS,
  ON_REQUEST,
  ON_CANCEL,
} from '../commonReduxSagaConverter/commonConstants';

export function* DEFAULT_SAGA_HANDLER({
  method,
  action,
  successData,
  requestData,
  successStatus,
  restSuccessData,
  errorStatus,
  errorData,
}) {
  switch (method) {
    case ON_REQUEST:
      return requestData;
    case ON_CANCEL:
      return true;
    case ON_SUCCESS:
      if ([200, 201].includes(successStatus)) {
        yield put(
          action.success({
            data: successData,
            ...restSuccessData,
          }),
        );
      } else return true;
      break;
    case ON_ERROR: {
      if (errorStatus) yield put(action.error({ data: errorData }));
      else yield put(action.error({ data: {} }));
      break;
    }
    default:
  }
}
