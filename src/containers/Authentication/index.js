/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable camelcase */
/* eslint-disable no-console */
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
import {
  commonConstants,
  FOR_INTERNAL_USE_ONLY,
  HOC_INITIAL_CONFIG_KEY,
  HOC_MAIN_CONFIG_KEY,
  GET_INITIAL_PROPS_DEFAULT,
} from '../../utils/commonReduxSagaConverter/commonConstants';
const {
  HANDLERS,
  NEXT_JS,
  CREATE_REDUCER,
  USE_HOC_HOOK,
  ALLOW_MAP_STATE_TO_PROPS,
  GET_INITIAL_PROPS_KEY,
  IS_DEVELOPMENT,
  USE_TYPE,
  USE_HOOK,
  HOOK_WITH_HOC,
} = HOC_MAIN_CONFIG_KEY;

const {
  API_END_POINTS,
  INITIAL_STATE,
  GET_DEFAULT_CONFIG,
  DONT_RESET_REDUCER_KEYS,
  IS_MOBILE,
  SAGA,
  SAGA_CONSTANT,
  REDUCER_CONSTANT,
  REDUCER,
  AXIOS_INTERCEPTORS,
  REDUCER_NAME,
} = HOC_INITIAL_CONFIG_KEY;

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
const showInjectedMessage = reducerName => {
  console.log(`===== Successfully Injected Reducer - ${reducerName} =====`);
};
const reducerNameErrorMessage =
  '(react-boilerplate-redux-saga-hoc)  Expected `name` to be a non empty string';
const showDepricatedMessage = reducerName => {
  const DEPRICATED_MESSAGE = `<======= "${reducerName} Reducer" (react-boilerplate-redux-saga-hoc) Sorry! This package is depricated.This version is no longer supported, and will not receive security updates.====>`;
  if (console.warn) console.warn(DEPRICATED_MESSAGE);
  if (console.error) console.error(DEPRICATED_MESSAGE);
  if (console.info) console.info(DEPRICATED_MESSAGE);
};
const isMounted = {};

export default ({
  [HANDLERS]: handlers = [],
  [NEXT_JS]: nextJS = false,
  [CREATE_REDUCER]: createReducer = null,
  [USE_HOOK]: useHook = false,
  [USE_HOC_HOOK]: useHocHook = false,
  [HOOK_WITH_HOC]: hookWithHoc = false,
  [ALLOW_MAP_STATE_TO_PROPS]: _mapStateToProps = true,
  [GET_INITIAL_PROPS_KEY]: getInitialPropsKey = GET_INITIAL_PROPS_DEFAULT,
  [IS_DEVELOPMENT]: isDevelopment = false,
  [USE_TYPE]: useType,
}) => ({
  [API_END_POINTS]: apiEndPoints = {},
  [INITIAL_STATE]: initialState = {},
  [GET_DEFAULT_CONFIG]: getDefaultConfig = false,
  [DONT_RESET_REDUCER_KEYS]: dontResetOnLogout = {},
  [IS_MOBILE]: isMobile = false,
  [SAGA]: sagaFunction,
  [SAGA_CONSTANT]: constantSaga = [],
  [REDUCER_CONSTANT]: constantReducer,
  [REDUCER]: reducerFunction,
  [REDUCER_NAME]: reducerName,
  [AXIOS_INTERCEPTORS]: axiosInterceptors,
  [USE_HOOK]: _useHook = false,
  // store: _store,
} = {}) => {
  const reducer_name_hoc_key = `${reducerName}_hoc`;
  let stateProps = null;
  invariant(
    !!reducerName && typeOf(reducerName) === 'string',
    reducerNameErrorMessage,
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
    [reducer_name_hoc_key]: {
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
  const _useHocHook = () => {
    const isInjected = useRef(isMounted[reducerName]);
    if (useType !== FOR_INTERNAL_USE_ONLY) {
      showDepricatedMessage(reducerName);
    } else if (!isInjected.current && !nextJS) {
      useInjectSaga(injectSagaConfig, !isMounted[reducerName], false, () => {
        if (isDevelopment) showInjectedMessage(reducerName);
      });
      useInjectReducer(
        injectReducerConfig,
        createReducer,
        !isMounted[reducerName],
      );
      if (!isMounted[reducerName]) isMounted[reducerName] = true;
    }
    const dispatch = useDispatch();
    if ((!stateProps || isDevelopment) && dispatch) {
      stateProps = {
        ...componentData[reducer_name_hoc_key],
        actions: bindActionCreators(componentActions, dispatch),
        dispatch,
      };
    }
    return useState(stateProps)[0];
  };
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

    const authenticationReducer = !isMounted[reducerName]
      ? injectReducer(
          {
            key: reducerName,
            reducer,
          },
          createReducer,
        )
      : undefined;
    const authenticationSaga = !isMounted[reducerName]
      ? injectSaga({ key: reducerName, saga })
      : undefined;
    const withConnect = connect(
      useHook || !_mapStateToProps ? null : mapStateToProps,
      mapDispatchToProps(componentActions, componentData, reducerName),
    );
    if (nextJS) {
      if (useType !== FOR_INTERNAL_USE_ONLY) {
        showDepricatedMessage(reducerName);
        return WithHoc;
      }
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
    if (useType !== FOR_INTERNAL_USE_ONLY) {
      showDepricatedMessage(reducerName);
      return WithHoc;
    }
    if (!isMounted[reducerName]) {
      isMounted[reducerName] = true;
      if (isDevelopment) showInjectedMessage(reducerName);
      return compose(
        withConnect,
        authenticationReducer,
        authenticationSaga,
      )(WithHoc);
    }
    return withConnect(WithHoc);
  };
  if (!nextJS && hookWithHoc && getDefaultConfig)
    return {
      hook: _useHocHook,
      hoc,
      actions: { ...componentActions },
      ...componentData[reducer_name_hoc_key],
    };
  if (!nextJS && hookWithHoc) return { hook: _useHocHook, hoc };
  if (nextJS && getDefaultConfig)
    return {
      hoc,
      saga,
      hook: _useHocHook,
      reducer: { name: reducerName, reducer },
      actions: { ...componentActions },
      ...componentData[reducer_name_hoc_key],
    };
  if (nextJS)
    return {
      hoc,
      saga,
      hook: _useHocHook,
      reducer: { name: reducerName, reducer },
    };
  if (getDefaultConfig) {
    return {
      hoc,
      actions: { ...componentActions },
      ...componentData[reducer_name_hoc_key],
    };
  }
  return hoc;
};
