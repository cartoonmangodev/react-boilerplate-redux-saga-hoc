// import queryString from 'query-string';
import { all } from 'redux-saga/effects';
import _sagaHandler from '../../utils/commonReduxSagaConverter/commonGenerator';
import { requestResponseHandler } from './saga';

export default ({
  sagaConfig,
  constants,
  sagaFunction,
  axiosInterceptors,
  constantSaga: OtherGenerator = [],
}) => {
  const [generatorPattern, sagaGenerator] = _sagaHandler({
    requestResponseHandler: requestResponseHandler({ constants, sagaFunction }),
    actionType: sagaConfig,
    axiosInterceptors,
  });

  // For Test Purpose
  const Generator = sagaGenerator;
  // eslint-disable-next-line func-names
  const saga = function*() {
    yield all(generatorPattern.concat(OtherGenerator || []));
  };

  return {
    saga,
    Generator,
  };
};
