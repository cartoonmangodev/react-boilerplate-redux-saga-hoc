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
export default ({ apiEndPoints, generatorKey, dontResetOnLogout }) => {
  const ConvertData = convertData(apiEndPoints);
  const { initialState, resetState } = Object.keys(
    apiEndPoints[generatorKey],
  ).reduce(
    (acc, key) => ({
      initialState: newObject({}, acc.initialState, {
        [ConvertData[generatorKey].constants[key][CALL]]: {
          loading: {},
          toast: {},
          ...(apiEndPoints[generatorKey][key].initialData
            ? { data: apiEndPoints[generatorKey][key].initialData }
            : {}),
        },
      }),
      resetState:
        (typeof dontResetOnLogout[key] === 'undefined' &&
          newObject({}, acc.resetState, {
            [ConvertData[generatorKey].constants[key][CALL]]: {
              loading: {},
              toast: {},
              ...(apiEndPoints[generatorKey][key].initialData
                ? { data: apiEndPoints[generatorKey][key] }
                : {}),
            },
          })) ||
        acc.resetState,
    }),
    { initialState: {}, resetState: {} },
  );
  const { constants, actions, sagaConfig } = ConvertData[generatorKey];
  return {
    constants,
    initialState,
    generatorKey,
    actions,
    sagaConfig,
    resetState,
  };
};
