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
  const initialState = Object.keys(apiEndPoints[generatorKey]).reduce(
    (acc, key) =>
      newObject(acc, {
        [ConvertData[generatorKey].constants[key][CALL]]: {
          loading: {},
          toast: {},
        },
      }),
    {},
  );
  const resetState = Object.keys(apiEndPoints[generatorKey]).reduce(
    (acc, key) =>
      (!Object.keys(dontResetOnLogout || {}).includes(key) &&
        newObject(acc, {
          [ConvertData[generatorKey].constants[key][CALL]]: {
            loading: {},
            toast: {},
          },
        })) ||
      acc,
    {},
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
