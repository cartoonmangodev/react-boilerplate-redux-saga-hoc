function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { put } from 'redux-saga/effects'; // import { responseErrorParser } from '../index';

import { ON_ERROR, ON_SUCCESS, ON_REQUEST, ON_CANCEL } from '../commonReduxSagaConverter/commonConstants';
export function* DEFAULT_SAGA_HANDLER(_ref) {
  var method = _ref.method,
      action = _ref.action,
      successData = _ref.successData,
      requestData = _ref.requestData,
      successStatus = _ref.successStatus,
      restSuccessData = _ref.restSuccessData,
      errorStatus = _ref.errorStatus,
      errorData = _ref.errorData;

  switch (method) {
    case ON_REQUEST:
      return requestData;

    case ON_CANCEL:
      return true;

    case ON_SUCCESS:
      if ([200, 201].includes(successStatus)) {
        yield put(action.success(_extends({
          data: successData
        }, restSuccessData)));
      } else return true;

      break;

    case ON_ERROR:
      {
        if (errorStatus) yield put(action.error({
          data: errorData
        }));else yield put(action.error({
          data: {}
        }));
        break;
      }

    default:
  }
}