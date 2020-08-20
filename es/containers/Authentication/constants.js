"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sagaConverter = require("../../utils/commonReduxSagaConverter/sagaConverter");

var _commonConstants = require("../../utils/commonReduxSagaConverter/commonConstants");

var _helpers = require("../../utils/helpers");

// import * as apiEndPoints from '../../config/apiEndPoints';
// import { convertData } from '../../utils/commonReduxSagaConverter/sagaConverter';
// import { CALL } from '../../utils/commonReduxSagaConverter/commonConstants';
// import { newObject } from '../../utils/helpers';
// const generatorKey = 'authentication';
// const initialState = Object.keys(apiEndPoints[generatorKey]).reduce(
//   (acc, key) =>
//     newObject(acc, {
//       [convertData[generatorKey].constants[key][CALL]]: {
//         loading: {},
//         toast: {},
//       },
//     }),
//   {},
// );
// const { constants } = convertData[generatorKey];
// export { constants, initialState, generatorKey };

/* <============================ END ==============================> */
var _default = ({
  apiEndPoints,
  generatorKey,
  dontResetOnLogout
}) => {
  const ConvertData = (0, _sagaConverter.convertData)(apiEndPoints);
  const initialState = Object.keys(apiEndPoints[generatorKey]).reduce((acc, key) => (0, _helpers.newObject)(acc, {
    [ConvertData[generatorKey].constants[key][_commonConstants.CALL]]: {
      loading: {},
      toast: {},
      ...(apiEndPoints[generatorKey][key].initialData ? {
        data: apiEndPoints[generatorKey][key].initialData
      } : {})
    }
  }), {});
  const resetState = Object.keys(apiEndPoints[generatorKey]).reduce((acc, key) => !Object.keys(dontResetOnLogout || {}).includes(key) && (0, _helpers.newObject)(acc, {
    [ConvertData[generatorKey].constants[key][_commonConstants.CALL]]: {
      loading: {},
      toast: {},
      ...(apiEndPoints[generatorKey][key].initialData ? {
        data: apiEndPoints[generatorKey][key]
      } : {})
    }
  }) || acc, {});
  const {
    constants,
    actions,
    sagaConfig
  } = ConvertData[generatorKey];
  return {
    constants,
    initialState,
    generatorKey,
    actions,
    sagaConfig,
    resetState
  };
};

exports.default = _default;