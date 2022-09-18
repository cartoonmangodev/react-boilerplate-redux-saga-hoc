/* eslint-disable no-underscore-dangle */
/* eslint-disable indent */
import React, { useRef, useState } from 'react';
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
const isMounted = {};
const GET_INITIAL_PROPS_KEY = 'getInitialProps';
export default ({
  handlers = [],
  nextJS = false,
  createReducer = null,
  useHook = false,
  useHocHook = false,
  hookWithHoc = false,
  mapStateToProps: _mapStateToProps = true,
  getInitialPropsKey = GET_INITIAL_PROPS_KEY,
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
  // store: _store,
  useHook: _useHook = false,
  isDevelopment = false,
} = {}) => {
  let nextStateProps = null;
  let stateProps = null;
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
      constantActions: componentActions,
      axios: axiosInterceptors || axios,
      resetState,
      reducerName,
    },
  };
  const commonProps =
    useHook || _useHook || !_mapStateToProps ? { safe } : { safe, getData };
  const injectSagaConfig = { key: reducerName, saga };
  const injectReducerConfig = {
    key: reducerName,
    reducer,
  };
  // eslint-disable-next-line no-underscore-dangle

  const _useHocHook = (inject = false) => {
    const isInjected = useRef(false);
    if (
      !isMounted[reducerName] ||
      isInjected.current ||
      inject ||
      isDevelopment
    ) {
      if (!isMounted[reducerName] && isDevelopment)
        console.log(
          `===== Successfully Injected Reducer - ${reducerName} =====`,
        );
      if (!isInjected.current && !inject) isInjected.current = true;
      isMounted[reducerName] = true;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useInjectSaga(injectSagaConfig);
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useInjectReducer(injectReducerConfig, createReducer);
    }
    const dispatch = useDispatch();
    if (!stateProps || isDevelopment)
      stateProps = dispatch
        ? {
            ...componentData[`${reducerName}_hoc`],
            actions: bindActionCreators(componentActions, dispatch),
            dispatch,
          }
        : null;
    const [state] = useState(stateProps);

    return state;
  };
  // eslint-disable-next-line no-underscore-dangle

  if (useHocHook && !nextJS && !hookWithHoc) return _useHocHook;
  const hoc = WrapperComponent => {
    function WithHoc(props) {
      return <WrapperComponent {...commonProps} {...props} />;
    }
    WithHoc.propTypes = {};
    WithHoc.displayName = `withReactBoilerplateReduxSagaHoc(${WrapperComponent.displayName ||
      WrapperComponent.name ||
      'BaseComponent'})`;
    const MakeSelectAuthenticationState =
      useHook || !_mapStateToProps
        ? null
        : makeSelectAuthenticationState({
            apiEndPoints: ApiEndPoints,
            initialState: newObject(initialState, InitialState),
            InitialState: initialState,
            generatorKey: reducerName,
            constants,
          });
    const mapStateToProps =
      useHook || !_mapStateToProps
        ? null
        : createStructuredSelector({
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
      useHook || !_mapStateToProps ? null : mapStateToProps,
      mapDispatchToProps(componentActions, componentData, reducerName),
    );
    if (nextJS) {
      WithHoc[getInitialPropsKey] = async props => {
        const { res, req, store, ...rest } = props.ctx || props;
        let data = {
          res,
          req,
          store,
          ...rest,
        };
        if (WrapperComponent[getInitialPropsKey])
          data = await WrapperComponent[getInitialPropsKey]({
            ...props,
            // eslint-disable-next-line prettier/prettier
            ...mapDispatchToProps(
              componentActions,
              componentData,
              reducerName,
              // eslint-disable-next-line prettier/prettier
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
  if (!nextJS && hookWithHoc && getDefaultConfig)
    return {
      hook: _useHocHook,
      hoc,
      actions: { ...componentActions },
      ...componentData[`${reducerName}_hoc`],
    };
  if (!nextJS && hookWithHoc) return { hook: _useHocHook, hoc };
  // eslint-disable-next-line no-underscore-dangle
  const _useHocHookNextJs = (inject = false) => {
    const isInjected = useRef(false);
    if (
      !isMounted[reducerName] ||
      isInjected.current ||
      inject ||
      isDevelopment
    ) {
      if (!isInjected.current && !inject) isInjected.current = true;
      isMounted[reducerName] = true;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useInjectSaga(injectSagaConfig);
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useInjectReducer(injectReducerConfig, createReducer);
    }
    const dispatch = useDispatch();
    if ((!nextStateProps || isDevelopment) && dispatch)
      nextStateProps = {
        ...componentData[`${reducerName}_hoc`],
        actions: bindActionCreators(componentActions, dispatch),
        dispatch,
      };
    const [state] = useState(nextStateProps);
    return state;
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
