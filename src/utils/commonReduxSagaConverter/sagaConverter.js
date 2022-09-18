import { takeEvery } from 'redux-saga/effects';
import {
  CALL,
  SUCCESS,
  ERROR,
  CANCEL,
  CUSTOM,
  TAKE_EVERY,
  REDUCER_BASE_PATH,
} from './commonConstants';
// import apiEndPoints from '../../config/apiEndPoints';
import { actionsHandler } from './commonActions';
import { newObject } from '../helpers';

export const convertData = apiEndPoints =>
  Object.keys(apiEndPoints).reduce((prev, curr) => {
    const constants = Object.keys(apiEndPoints[curr]).reduce(
      (acc, key) =>
        newObject(acc, {
          [key]: {
            [CALL]: `${REDUCER_BASE_PATH}${curr}/${key}_${CALL}`,
            [SUCCESS]: `${REDUCER_BASE_PATH}${curr}/${key}_${SUCCESS}`,
            [CUSTOM]: `${REDUCER_BASE_PATH}${curr}/${key}_${CUSTOM}`,
            [ERROR]: `${REDUCER_BASE_PATH}${curr}/${key}_${ERROR}`,
            [CANCEL]: `${REDUCER_BASE_PATH}${curr}/${key}_${CANCEL}`,
          },
        }),
      {},
    );
    const actions = Object.keys(apiEndPoints[curr]).reduce(
      (acc, key) =>
        newObject(acc, {
          [key]: {
            [CALL]: actionsHandler.call(constants[key][CALL]),
            [SUCCESS]: actionsHandler.success(constants[key][SUCCESS]),
            [CUSTOM]: actionsHandler.custom(constants[key][CUSTOM]),
            [ERROR]: actionsHandler.error(constants[key][ERROR]),
            [CANCEL]: actionsHandler.cancel(constants[key][CANCEL]),
          },
        }),
      {},
    );
    const sagaConfig = Object.entries(apiEndPoints[curr]).reduce(
      (acc, [key, value]) =>
        newObject(acc, {
          [constants[key][CALL]]: {
            api: value,
            cancel: constants[key][CANCEL],
            actions: actions[key],
            effect: value.effect === TAKE_EVERY && takeEvery,
          },
        }),
      {},
    );
    return newObject(prev, { [curr]: { actions, constants, sagaConfig } });
  }, {});
