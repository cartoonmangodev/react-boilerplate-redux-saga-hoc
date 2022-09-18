import { createSelector } from 'reselect';
import { CALL } from '../../utils/commonReduxSagaConverter/commonConstants';
// import * as apiEndPoints from '../../config/apiEndPoints';
import { newObject } from '../../utils/helpers';

const selectAuthenticationDomain = (initialState, generatorKey) => state =>
  state[generatorKey] || initialState;

const makeSelectAuthenticationState = ({
  apiEndPoints,
  initialState,
  InitialState,
  generatorKey,
  constants,
}) => () =>
  createSelector(
    selectAuthenticationDomain(initialState, generatorKey),
    substate =>
      newObject(
        Object.keys(InitialState).reduce(
          (acc, key) => ({
            ...acc,
            [key]: substate[key],
          }),
          {},
        ),
        Object.keys(apiEndPoints[generatorKey]).reduce(
          (acc, key) => ({
            ...acc,
            [key]: substate[constants[key][CALL]],
          }),
          {},
        ),
      ),
  );

export { selectAuthenticationDomain, makeSelectAuthenticationState };
