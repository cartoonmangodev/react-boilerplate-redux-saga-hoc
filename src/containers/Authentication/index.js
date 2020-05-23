/* eslint-disable func-names */
/* eslint-disable import/no-unresolved */
/**
 * Dashboard
 */
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import axios from '../../config/axios';
// import { getLanguage } from '../../config/Language/index';
import generateConstants from './constants';
// eslint-disable-next-line import/no-useless-path-segments
// import injectSaga from '../../../../../app/utils/injectSaga';
// eslint-disable-next-line import/no-useless-path-segments
// import injectReducer from '../../../../../app/utils/injectReducer';
import injectSaga from '../../utils/utils/injectSaga';
import injectReducer from '../../utils/utils/injectReducer';
import { newObject } from '../../utils/helpers';
import { makeSelectAuthenticationState } from './selectors';
import generateAction from './actions';
import Reducer from './reducer';
import Saga from './generator';
import nullcheck from '../../utils/nullCheck';
import { getData, mapDispatchToProps } from '../../utils';
import { commonConstants } from '../../index';
const safe = nullcheck;

export default ({ handlers = [], nextJS = false, createReducer = null }) => ({
  apiEndPoints = {},
  initialState = {},
  dontReset: dontResetOnLogout = {},
  isMobile = false,
  saga: sagaFunction,
  constantSaga = [],
  constantReducer,
  reducer: reducerFunction,
  name: reducerName,
  axiosInterceptors,
  // injectSaga,
  // injectReducer,
} = {}) => {
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
    },
  };
  // eslint-disable-next-line no-unused-vars
  const hoc = (WrapperComponent, autoLoginCheck = true) => {
    function WithHoc(props) {
      // const [language, setLanguage] = useState(getLanguage('EN'));
      // useEffect(() => {
      //   if (props.authentication.language !== language)
      //     setLanguage(getLanguage(props.authentication.language));
      // }, [props.authentication.language]);
      // console.log(props, '================');
      return (
        <WrapperComponent
          safe={safe}
          // language={language}
          {...props}
          getData={getData}
        />
      );
    }

    WithHoc.propTypes = {
      // [reducerName]: PropTypes.object.isRequired,
    };
    WithHoc.displayName = `withHoc(${WrapperComponent.displayName ||
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
      mapStateToProps,
      mapDispatchToProps(componentActions, componentData, reducerName),
    );
    if (nextJS)
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
        return {
          ...(data || {}),
        };
      };
    if (nextJS) return withConnect(WithHoc);
    return compose(
      withConnect,
      authenticationReducer,
      authenticationSaga,
    )(WithHoc);
  };
  if (nextJS)
    return {
      hoc,
      saga,
      reducer: { name: reducerName, reducer },
    };
  return hoc;
};
