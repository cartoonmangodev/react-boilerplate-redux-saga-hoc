"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _invariant = _interopRequireDefault(require("invariant"));

var _reselect = require("reselect");

var _redux = require("redux");

var _isString = _interopRequireDefault(require("lodash/isString"));

var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));

var _axios = _interopRequireDefault(require("../../config/axios"));

var _constants = _interopRequireDefault(require("./constants"));

var _injectSaga = _interopRequireWildcard(require("../../utils/utils/injectSaga"));

var _injectReducer = _interopRequireWildcard(require("../../utils/utils/injectReducer"));

var _helpers = require("../../utils/helpers");

var _selectors = require("./selectors");

var _actions = _interopRequireDefault(require("./actions"));

var _reducer = _interopRequireDefault(require("./reducer"));

var _generator = _interopRequireDefault(require("./generator"));

var _nullCheck = _interopRequireDefault(require("../../utils/nullCheck"));

var _utils = require("../../utils");

var _index = require("../../index");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const safe = _nullCheck.default; // const shape = {
//   reducerName: isString,
// };

const checkKey = (key, name, dataType) => {
  (0, _invariant.default)((0, _helpers.typeOf)(key) === dataType, `(react-boilerplate-redux-saga-hoc)  Expected \`${name}\` to be a ${dataType}`);
};

var _default = ({
  handlers = [],
  nextJS = false,
  createReducer = null,
  useHook = false,
  useHocHook = false
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
  useHook: _useHook = false // injectSaga,
  // injectReducer,

} = {}) => {
  (0, _invariant.default)((0, _isString.default)(reducerName) && !(0, _isEmpty.default)(reducerName), '(react-boilerplate-redux-saga-hoc)  Expected `name` to be a non empty string');
  checkKey(apiEndPoints, 'apiEndPoints', 'object');
  checkKey(initialState, 'initialState', 'object');
  checkKey(dontResetOnLogout, 'dontReset', 'object');
  if (sagaFunction) checkKey(sagaFunction, 'saga', 'function');
  checkKey(constantSaga, 'constantSaga', 'array');
  checkKey(handlers, 'handlers', 'array');
  if (constantReducer) checkKey(constantReducer, 'constantReducer', 'function');
  if (reducerFunction) checkKey(reducerFunction, 'reducer', 'function');
  if (createReducer) checkKey(createReducer, 'createReducer', 'function');
  const ApiEndPoints = {
    [reducerName]: apiEndPoints
  };
  const {
    constants,
    initialState: InitialState,
    resetState,
    actions: Action,
    sagaConfig
  } = (0, _constants.default)({
    apiEndPoints: ApiEndPoints,
    generatorKey: reducerName,
    dontResetOnLogout
  });
  const {
    componentActions // actions,
    // sagaActions,
    // cancelActions,

  } = (0, _actions.default)(Action);
  const {
    saga
  } = (0, _generator.default)({
    sagaConfig,
    constants,
    sagaFunction,
    axiosInterceptors,
    constantSaga
  });
  const reducer = (0, _reducer.default)({
    constants,
    InitialState: (0, _helpers.newObject)(initialState, InitialState),
    reducerFunction,
    resetState,
    constantReducer,
    isMobile,
    handlers
  });
  const componentData = {
    [`${reducerName}_hoc`]: {
      reducerConstants: Object.entries(constants).reduce((acc, [key, value]) => ({ ...acc,
        [key]: value[_index.commonConstants.CALL]
      }), {}),
      constants,
      initialState,
      axios: axiosInterceptors || _axios.default,
      resetState,
      reducerName
    }
  };
  const commonProps = useHook || _useHook ? {
    safe
  } : {
    safe,
    getData: _utils.getData
  }; // eslint-disable-next-line no-underscore-dangle

  const _useHocHook = () => {
    (0, _injectSaga.useInjectSaga)({
      key: reducerName,
      saga
    });
    (0, _injectReducer.useInjectReducer)({
      key: reducerName,
      reducer
    }, createReducer);
    const dispatch = (0, _reactRedux.useDispatch)();

    const [state] = _react.default.useState({ ...componentData[`${reducerName}_hoc`],
      actions: (0, _redux.bindActionCreators)(componentActions, dispatch),
      dispatch
    });

    return state;
  };

  if (useHocHook && !nextJS) return _useHocHook; // eslint-disable-next-line no-unused-vars

  const hoc = (WrapperComponent, autoLoginCheck = true) => {
    function WithHoc(props) {
      // const [language, setLanguage] = useState(getLanguage('EN'));
      // useEffect(() => {
      //   if (props.authentication.language !== language)
      //     setLanguage(getLanguage(props.authentication.language));
      // }, [props.authentication.language]);
      // console.log(props, '================');
      return _react.default.createElement(WrapperComponent // language={language}
      , _extends({}, commonProps, props));
    }

    WithHoc.propTypes = {// [reducerName]: PropTypes.object.isRequired,
    };
    WithHoc.displayName = `withReactBoilerplateReduxSagaHoc(${WrapperComponent.displayName || WrapperComponent.name || 'BaseComponent'})`;
    const MakeSelectAuthenticationState = (0, _selectors.makeSelectAuthenticationState)({
      apiEndPoints: ApiEndPoints,
      initialState: (0, _helpers.newObject)(initialState, InitialState),
      InitialState: initialState,
      generatorKey: reducerName,
      constants
    });
    const mapStateToProps = (0, _reselect.createStructuredSelector)({
      [`${reducerName}_data`]: MakeSelectAuthenticationState()
    });
    const authenticationReducer = (0, _injectReducer.default)({
      key: reducerName,
      reducer
    }, createReducer);
    const authenticationSaga = (0, _injectSaga.default)({
      key: reducerName,
      saga
    });
    const withConnect = (0, _reactRedux.connect)(mapStateToProps, (0, _utils.mapDispatchToProps)(componentActions, componentData, reducerName));

    if (nextJS) {
      WithHoc.getInitialProps = async props => {
        const {
          res,
          req,
          store,
          ...rest
        } = props.ctx || props;
        let data = {
          res,
          req,
          store,
          ...rest
        };
        if (WrapperComponent.getInitialProps) data = await WrapperComponent.getInitialProps({ ...props,
          ...(0, _utils.mapDispatchToProps)(componentActions, componentData, reducerName)(store.dispatch)
        });
        return data || {};
      };

      return withConnect(WithHoc);
    }

    return (useHook || _useHook ? (0, _redux.compose)((0, _reactRedux.connect)(null, (0, _utils.mapDispatchToProps)(componentActions, componentData, reducerName)), authenticationReducer, authenticationSaga) : (0, _redux.compose)(withConnect, authenticationReducer, authenticationSaga))(WithHoc);
  };

  if (nextJS && getDefaultConfig) return {
    hoc,
    saga,
    hook: useHocHook,
    reducer: {
      name: reducerName,
      reducer
    },
    actions: { ...componentActions
    },
    ...componentData[`${reducerName}_hoc`]
  };
  if (nextJS) return {
    hoc,
    saga,
    hook: useHocHook,
    reducer: {
      name: reducerName,
      reducer
    }
  };

  if (getDefaultConfig) {
    return {
      hoc,
      actions: { ...componentActions
      },
      ...componentData[`${reducerName}_hoc`]
    };
  }

  return hoc;
};

exports.default = _default;