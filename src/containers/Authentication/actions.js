import actionConverter from '../../utils/commonReduxSagaConverter/actionConverter';
// import { convertData } from '../../utils/commonReduxSagaConverter/sagaConverter';

export default Actions => {
  const {
    componentActions,
    actions,
    sagaActions,
    cancelActions,
  } = actionConverter(Actions);

  return { componentActions, actions, sagaActions, cancelActions };
};
