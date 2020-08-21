import actionConverter from '../../utils/commonReduxSagaConverter/actionConverter'; // import { convertData } from '../../utils/commonReduxSagaConverter/sagaConverter';

export default (function (Actions) {
  var _actionConverter = actionConverter(Actions),
      componentActions = _actionConverter.componentActions,
      actions = _actionConverter.actions,
      sagaActions = _actionConverter.sagaActions,
      cancelActions = _actionConverter.cancelActions;

  return {
    componentActions: componentActions,
    actions: actions,
    sagaActions: sagaActions,
    cancelActions: cancelActions
  };
});