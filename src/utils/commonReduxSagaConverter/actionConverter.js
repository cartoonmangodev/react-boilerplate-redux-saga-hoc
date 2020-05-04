import { CALL, SUCCESS, ERROR, CANCEL, CUSTOM } from './commonConstants';
import { cloneObject } from '../helpers';
const ignore = {
  component: [SUCCESS, ERROR],
  saga: [CALL, CANCEL, CUSTOM],
  cancel: [SUCCESS, ERROR, CALL, CUSTOM],
};
const bindKey = [CANCEL, CUSTOM];
const actionConverter = (action, actionName, ignoreStatus, type) =>
  Object.entries(action).reduce(
    (acc, [key, value]) =>
      (ignoreStatus && ignore[type].includes(key) && acc) ||
      cloneObject(acc, {
        [`${actionName}_${key}`]:
          (bindKey.includes(key) && value.bind({}, action[CALL]().type)) ||
          value,
      }),
    {},
  );

export default action =>
  Object.entries(action).reduce(
    (acc, [key, value]) => ({
      actions: cloneObject(acc.actions, actionConverter(value, key)),
      sagaActions: cloneObject(
        acc.sagaActions,
        actionConverter(value, key, true, 'saga'),
      ),
      componentActions: cloneObject(
        acc.componentActions,
        actionConverter(value, key, true, 'component'),
      ),
      cancelActions: cloneObject(
        acc.cancelActions,
        actionConverter(value, key, true, 'cancel'),
      ),
    }),
    {},
  );
