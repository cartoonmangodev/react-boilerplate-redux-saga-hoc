import { CALL, SUCCESS, ERROR, CANCEL, CUSTOM } from './commonConstants';
import { cloneObject } from '../helpers';
var ignore = {
  component: [SUCCESS, ERROR],
  saga: [CALL, CANCEL, CUSTOM],
  cancel: [SUCCESS, ERROR, CALL, CUSTOM]
};
var bindKey = [CANCEL, CUSTOM];

var actionConverter = function actionConverter(action, actionName, ignoreStatus, type) {
  return Object.entries(action).reduce(function (acc, _ref) {
    var _cloneObject;

    var key = _ref[0],
        value = _ref[1];
    return ignoreStatus && ignore[type].includes(key) && acc || cloneObject(acc, (_cloneObject = {}, _cloneObject[actionName + "_" + key] = bindKey.includes(key) && value.bind({}, action[CALL]().type) || value, _cloneObject));
  }, {});
};

export default (function (action) {
  return Object.entries(action).reduce(function (acc, _ref2) {
    var key = _ref2[0],
        value = _ref2[1];
    return {
      actions: cloneObject(acc.actions, actionConverter(value, key)),
      sagaActions: cloneObject(acc.sagaActions, actionConverter(value, key, true, 'saga')),
      componentActions: cloneObject(acc.componentActions, actionConverter(value, key, true, 'component')),
      cancelActions: cloneObject(acc.cancelActions, actionConverter(value, key, true, 'cancel'))
    };
  }, {});
});