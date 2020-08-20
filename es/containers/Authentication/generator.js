// import queryString from 'query-string';
import { all } from 'redux-saga/effects';
import _sagaHandler from '../../utils/commonReduxSagaConverter/commonGenerator';
import { requestResponseHandler } from './saga';
export default (function (_ref) {
  var sagaConfig = _ref.sagaConfig,
      constants = _ref.constants,
      sagaFunction = _ref.sagaFunction,
      axiosInterceptors = _ref.axiosInterceptors,
      _ref$constantSaga = _ref.constantSaga,
      OtherGenerator = _ref$constantSaga === void 0 ? [] : _ref$constantSaga;

  var _sagaHandler2 = _sagaHandler({
    requestResponseHandler: requestResponseHandler({
      constants: constants,
      sagaFunction: sagaFunction
    }),
    actionType: sagaConfig,
    axiosInterceptors: axiosInterceptors
  }),
      generatorPattern = _sagaHandler2[0],
      sagaGenerator = _sagaHandler2[1]; // For Test Purpose


  var Generator = sagaGenerator; // eslint-disable-next-line func-names

  var saga = function* saga() {
    yield all(generatorPattern.concat(OtherGenerator || []));
  };

  return {
    saga: saga,
    Generator: Generator
  };
});