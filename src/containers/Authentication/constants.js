/* eslint-disable indent */
/* eslint-disable no-underscore-dangle */
import { convertData } from '../../utils/commonReduxSagaConverter/sagaConverter';
import { CALL } from '../../utils/commonReduxSagaConverter/commonConstants';
import { newObject } from '../../utils/helpers';
export default ({ apiEndPoints, generatorKey, dontResetOnLogout }) => {
  const _dontResetOnLogout = Array.isArray(dontResetOnLogout)
    ? dontResetOnLogout.reduce(
        (acc, key) =>
          Object.assign(acc, {
            [key]: key,
          }),
        {},
      )
    : dontResetOnLogout;
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
        (typeof _dontResetOnLogout[key] === 'undefined' &&
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
