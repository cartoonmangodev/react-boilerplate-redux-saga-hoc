function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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
import { convertData } from '../../utils/commonReduxSagaConverter/sagaConverter';
import { CALL } from '../../utils/commonReduxSagaConverter/commonConstants';
import { newObject } from '../../utils/helpers';
export default (function (_ref) {
  var apiEndPoints = _ref.apiEndPoints,
      generatorKey = _ref.generatorKey,
      dontResetOnLogout = _ref.dontResetOnLogout;
  var ConvertData = convertData(apiEndPoints);
  var initialState = Object.keys(apiEndPoints[generatorKey]).reduce(function (acc, key) {
    var _newObject;

    return newObject(acc, (_newObject = {}, _newObject[ConvertData[generatorKey].constants[key][CALL]] = _extends({
      loading: {},
      toast: {}
    }, apiEndPoints[generatorKey][key].initialData ? {
      data: apiEndPoints[generatorKey][key].initialData
    } : {}), _newObject));
  }, {});
  var resetState = Object.keys(apiEndPoints[generatorKey]).reduce(function (acc, key) {
    var _newObject2;

    return !Object.keys(dontResetOnLogout || {}).includes(key) && newObject(acc, (_newObject2 = {}, _newObject2[ConvertData[generatorKey].constants[key][CALL]] = _extends({
      loading: {},
      toast: {}
    }, apiEndPoints[generatorKey][key].initialData ? {
      data: apiEndPoints[generatorKey][key]
    } : {}), _newObject2)) || acc;
  }, {});
  var _ConvertData$generato = ConvertData[generatorKey],
      constants = _ConvertData$generato.constants,
      actions = _ConvertData$generato.actions,
      sagaConfig = _ConvertData$generato.sagaConfig;
  return {
    constants: constants,
    initialState: initialState,
    generatorKey: generatorKey,
    actions: actions,
    sagaConfig: sagaConfig,
    resetState: resetState
  };
});