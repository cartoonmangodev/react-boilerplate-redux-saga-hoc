import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import invariant from 'invariant';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import axios from '../../config/axios';
import generateConstants from './constants';
import injectSaga, { useInjectSaga } from '../../utils/utils/injectSaga';
import injectReducer, {
  useInjectReducer,
} from '../../utils/utils/injectReducer';
import { newObject, typeOf } from '../../utils/helpers';
import { makeSelectAuthenticationState } from './selectors';
import generateAction from './actions';
import Reducer from './reducer';
import Saga from './generator';
import nullcheck from '../../utils/nullCheck';
import { getData, mapDispatchToProps } from '../../utils';
import { commonConstants } from '../../utils/commonReduxSagaConverter/commonConstants';
const safe = nullcheck;

const checkKey = (key, name, dataType) => {
  const convertArray = Array.isArray(dataType) ? dataType : [dataType];
  invariant(
    convertArray.includes(typeOf(key)),
    `(react-boilerplate-redux-saga-hoc)  Expected \`${name}\` to be a (${convertArray.join(
      ' | ',
    )})`,
  );
};

export default ({
  handlers = [],
  nextJS = false,
  createReducer = null,
  useHook = false,
  useHocHook = false,
}) => ({
  apiEndPoints = {},
  initialState = {},
  getDefaultConfig = false,
  dontReset: dontResetOnLogout = {},
  isMobile = false,
  saga: sagaFunction,
  constantSaga = [],
  constantReducer,
  reducer: reducerFunction,
  name: reducerName,
  axiosInterceptors,
  useHook: _useHook = false,
} = {}) => {
  invariant(
    !!reducerName && typeOf(reducerName) === 'string',
    '(react-boilerplate-redux-saga-hoc)  Expected `name` to be a non empty string',
  );
  checkKey(apiEndPoints, 'apiEndPoints', 'object');
  checkKey(initialState, 'initialState', 'object');
  checkKey(dontResetOnLogout, 'dontReset', ['object', 'array']);
  if (sagaFunction) checkKey(sagaFunction, 'saga', 'function');
  checkKey(constantSaga, 'constantSaga', 'array');
  checkKey(handlers, 'handlers', 'array');
  if (constantReducer) checkKey(constantReducer, 'constantReducer', 'function');
  if (reducerFunction) checkKey(reducerFunction, 'reducer', 'function');
  if (createReducer) checkKey(createReducer, 'createReducer', 'function');

  const ApiEndPoints = {
    [reducerName]: apiEndPoints,
  };
  const {
    constants,
    initialState: InitialState,
    resetState,
    actions: Action,
    sagaConfig,
  } = generateConstants({
    apiEndPoints: ApiEndPoints,
    generatorKey: reducerName,
    dontResetOnLogout,
  });

  const {
    componentActions,
    // actions,
    // sagaActions,
    // cancelActions,
  } = generateAction(Action);
  const { saga } = Saga({
    sagaConfig,
    constants,
    sagaFunction,
    axiosInterceptors,
    constantSaga,
  });
  const reducer = Reducer({
    constants,
    InitialState: newObject(initialState, InitialState),
    reducerFunction,
    resetState,
    constantReducer,
    isMobile,
    handlers,
    reducerName,
  });
  const componentData = {
    [`${reducerName}_hoc`]: {
      reducerConstants: Object.entries(constants).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: value[commonConstants.CALL],
        }),
        {},
      ),
      constants,
      initialState,
      axios: axiosInterceptors || axios,
      resetState,
      reducerName,
    },
  };
  const commonProps = useHook || _useHook ? { safe } : { safe, getData };
  const injectSagaConfig = { key: reducerName, saga };
  const injectReducerConfig = {
    key: reducerName,
    reducer,
  };
  // eslint-disable-next-line no-underscore-dangle
  const _useHocHook = (inject = true) => {
    useInjectSaga(injectSagaConfig, inject);
    useInjectReducer(injectReducerConfig, createReducer, inject);
    const dispatch = useDispatch();
    const [state] = useState({
      ...componentData[`${reducerName}_hoc`],
      actions: bindActionCreators(componentActions, dispatch),
      dispatch,
    });
    return state;
  };
  // eslint-disable-next-line no-underscore-dangle
  const _useHocHookNextJs = (inject = true) => {
    useInjectSaga(injectSagaConfig, inject);
    useInjectReducer(injectReducerConfig, createReducer, inject);
    const dispatch = useDispatch();
    const [state] = useState({
      ...componentData[`${reducerName}_hoc`],
      actions: bindActionCreators(componentActions, dispatch),
      dispatch,
    });
    return state;
  };
  if (useHocHook && !nextJS) return _useHocHook;
  const hoc = WrapperComponent => {
    function WithHoc(props) {
      return <WrapperComponent {...commonProps} {...props} />;
    }
    WithHoc.propTypes = {};
    WithHoc.displayName = `withReactBoilerplateReduxSagaHoc(${WrapperComponent.displayName ||
      WrapperComponent.name ||
      'BaseComponent'})`;
    const MakeSelectAuthenticationState = makeSelectAuthenticationState({
      apiEndPoints: ApiEndPoints,
      initialState: newObject(initialState, InitialState),
      InitialState: initialState,
      generatorKey: reducerName,
      constants,
    });
    const mapStateToProps = createStructuredSelector({
      [`${reducerName}_data`]: MakeSelectAuthenticationState(),
    });

    const authenticationReducer = injectReducer(
      {
        key: reducerName,
        reducer,
      },
      createReducer,
    );
    const authenticationSaga = injectSaga({ key: reducerName, saga });
    const withConnect = connect(
      useHook ? null : mapStateToProps,
      mapDispatchToProps(componentActions, componentData, reducerName),
    );
    if (nextJS) {
      WithHoc.getInitialProps = async props => {
        const { res, req, store, ...rest } = props.ctx || props;
        let data = {
          res,
          req,
          store,
          ...rest,
        };
        if (WrapperComponent.getInitialProps)
          data = await WrapperComponent.getInitialProps({
            ...props,
            ...mapDispatchToProps(
              componentActions,
              componentData,
              reducerName,
            )(store.dispatch),
          });
        return data || {};
      };
      return withConnect(WithHoc);
    }
    return compose(
      withConnect,
      authenticationReducer,
      authenticationSaga,
    )(WithHoc);
  };
  if (nextJS && getDefaultConfig)
    return {
      hoc,
      saga,
      hook: _useHocHookNextJs,
      reducer: { name: reducerName, reducer },
      actions: { ...componentActions },
      ...componentData[`${reducerName}_hoc`],
    };
  if (nextJS)
    return {
      hoc,
      saga,
      hook: _useHocHookNextJs,
      reducer: { name: reducerName, reducer },
    };
  if (getDefaultConfig) {
    return {
      hoc,
      actions: { ...componentActions },
      ...componentData[`${reducerName}_hoc`],
    };
  }
  return hoc;
};
