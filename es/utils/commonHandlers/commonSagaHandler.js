"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_SAGA_HANDLER = DEFAULT_SAGA_HANDLER;

var _effects = require("redux-saga/effects");

var _commonConstants = require("../commonReduxSagaConverter/commonConstants");

// import { responseErrorParser } from '../index';
function* DEFAULT_SAGA_HANDLER({
  method,
  action,
  successData,
  requestData,
  successStatus,
  restSuccessData,
  errorStatus,
  errorData
}) {
  switch (method) {
    case _commonConstants.ON_REQUEST:
      return requestData;

    case _commonConstants.ON_CANCEL:
      return true;

    case _commonConstants.ON_SUCCESS:
      if ([200, 201].includes(successStatus)) {
        yield (0, _effects.put)(action.success({
          data: successData,
          ...restSuccessData
        }));
      } else return true;

      break;

    case _commonConstants.ON_ERROR:
      {
        if (errorStatus) yield (0, _effects.put)(action.error({
          data: errorData
        }));else yield (0, _effects.put)(action.error({
          data: {}
        }));
        break;
      }

    default:
  }
}