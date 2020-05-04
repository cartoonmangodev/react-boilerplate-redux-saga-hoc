import { takeEvery } from 'redux-saga/effects';
import { CALL, SUCCESS, ERROR, CANCEL, CUSTOM } from './commonConstants';
// import apiEndPoints from '../../config/apiEndPoints';
import { actionsHandler } from './commonActions';
import { newObject } from '../helpers';

export const convertData = apiEndPoints =>
  Object.keys(apiEndPoints).reduce((prev, curr) => {
    const constants = Object.keys(apiEndPoints[curr]).reduce(
      (acc, key) =>
        newObject(acc, {
          [key]: {
            [CALL]: `app/conatainers/${curr}/${key}_${CALL}`,
            [SUCCESS]: `app/conatainers/${curr}/${key}_${SUCCESS}`,
            [CUSTOM]: `app/conatainers/${curr}/${key}_${CUSTOM}`,
            [ERROR]: `app/conatainers/${curr}/${key}_${ERROR}`,
            [CANCEL]: `app/conatainers/${curr}/${key}_${CANCEL}`,
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
            effect: value.effect === 'every' && takeEvery,
          },
        }),
      {},
    );
    return newObject(prev, { [curr]: { actions, constants, sagaConfig } });
  }, {});
