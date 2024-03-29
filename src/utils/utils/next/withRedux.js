/* eslint-disable */
'use strict';

function _instanceof(left, right) {
  if (
    right != null &&
    typeof Symbol !== 'undefined' &&
    right[Symbol.hasInstance]
  ) {
    return !!right[Symbol.hasInstance](left);
  } else {
    return left instanceof right;
  }
}

var __extends =
  (void 0 && (void 0).__extends) ||
  (function() {
    var _extendStatics = function extendStatics(d, b) {
      _extendStatics =
        Object.setPrototypeOf ||
        (_instanceof(
          {
            __proto__: [],
          },
          Array,
        ) &&
          function(d, b) {
            d.__proto__ = b;
          }) ||
        function(d, b) {
          for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
          }
        };

      return _extendStatics(d, b);
    };

    return function(d, b) {
      _extendStatics(d, b);

      function __() {
        this.constructor = d;
      }

      d.prototype =
        b === null
          ? Object.create(b)
          : ((__.prototype = b.prototype), new __());
    };
  })();

var __assign =
  (void 0 && (void 0).__assign) ||
  function() {
    __assign =
      Object.assign ||
      function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];

          for (var p in s) {
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
          }
        }

        return t;
      };

    return __assign.apply(this, arguments);
  };

var __awaiter =
  (void 0 && (void 0).__awaiter) ||
  function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return _instanceof(value, P)
        ? value
        : new P(function(resolve) {
            resolve(value);
          });
    }

    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }

      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }

      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }

      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };

var __generator =
  (void 0 && (void 0).__generator) ||
  function(thisArg, body) {
    var _ = {
        label: 0,
        sent: function sent() {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2),
      }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function() {
          return this;
        }),
      g
    );

    function verb(n) {
      return function(v) {
        return step([n, v]);
      };
    }

    function step(op) {
      if (f) throw new TypeError('Generator is already executing.');

      while (_) {
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y['return']
                  : op[0]
                  ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];

          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;

            case 4:
              _.label++;
              return {
                value: op[1],
                done: false,
              };

            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;

            case 7:
              op = _.ops.pop();

              _.trys.pop();

              continue;

            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }

              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }

              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }

              if (t && _.label < t[2]) {
                _.label = t[2];

                _.ops.push(op);

                break;
              }

              if (t[2]) _.ops.pop();

              _.trys.pop();

              continue;
          }

          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      }

      if (op[0] & 5) throw op[1];
      return {
        value: op[0] ? op[1] : void 0,
        done: true,
      };
    }
  };

var __rest =
  (void 0 && (void 0).__rest) ||
  function(s, e) {
    var t = {};

    for (var p in s) {
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    }

    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };

var __importStar =
  (void 0 && (void 0).__importStar) ||
  function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod) {
        if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
      }
    result['default'] = mod;
    return result;
  };

Object.defineProperty(
  typeof exports !== 'undefined' ? exports : {},
  '__esModule',
  {
    value: true,
  },
);

var react_1 = __importStar(require('react'));

var defaultConfig = {
  storeKey: '__NEXT_REDUX_STORE__',
  debug: false,
  serializeState: function serializeState(state) {
    return state;
  },
  deserializeState: function deserializeState(state) {
    return state;
  },
};

export default function(makeStore, setStore, config) {
  config = __assign(__assign({}, defaultConfig), config);
  var isServer = typeof window === 'undefined';

  var initStore = function initStore(_a) {
    var initialState = _a.initialState,
      ctx = _a.ctx;
    var storeKey = config.storeKey;

    var createStore = function createStore() {
      return makeStore(
        config.deserializeState(initialState),
        __assign(__assign(__assign({}, ctx), config), {
          isServer: isServer,
        }),
      );
    };
    const _store = createStore();
    if (typeof setStore === 'function') setStore(_store);

    if (isServer) return _store; // Memoize store if client

    if (!(storeKey in window)) {
      window[storeKey] = _store;
    }

    return window[storeKey];
  };

  return function(App) {
    var _a;

    return (
      (_a =
        /** @class */
        (function(_super) {
          __extends(WrappedApp, _super);

          function WrappedApp(props, context) {
            var _this = _super.call(this, props, context) || this;

            var initialState = props.initialState;
            if (config.debug)
              console.log(
                '4. WrappedApp.render created new store with initialState',
                initialState,
              );
            _this.store = initStore({
              initialState: initialState,
            });
            return _this;
          }

          WrappedApp.prototype.render = function() {
            var _a = this.props,
              initialProps = _a.initialProps,
              initialState = _a.initialState,
              props = __rest(_a, ['initialProps', 'initialState']); // Cmp render must return something like <Provider><Component/></Provider>

            return react_1.default.createElement(
              App,
              __assign({}, props, initialProps, {
                store: this.store,
              }),
            );
          };

          return WrappedApp;
        })(react_1.Component)),
      /* istanbul ignore next */
      (_a.displayName =
        'withRedux(' + (App.displayName || App.name || 'App') + ')'),
      (_a.getInitialProps = function(appCtx) {
        return __awaiter(void 0, void 0, void 0, function() {
          var store, initialProps;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                /* istanbul ignore next */
                if (!appCtx) throw new Error('No app context');
                /* istanbul ignore next */

                if (!appCtx.ctx) throw new Error('No page context');
                store = initStore({
                  ctx: appCtx.ctx,
                });
                if (config.debug)
                  console.log(
                    '1. WrappedApp.getInitialProps wrapper got the store with state',
                    store.getState(),
                  );
                appCtx.ctx.store = store;
                appCtx.ctx.isServer = isServer;
                initialProps = {};
                if (!('getInitialProps' in App))
                  return [
                    3,
                    /*break*/
                    2,
                  ];
                return [
                  4,
                  /*yield*/
                  App.getInitialProps.call(App, appCtx),
                ];

              case 1:
                initialProps = _a.sent();
                _a.label = 2;

              case 2:
                if (config.debug)
                  console.log(
                    '3. WrappedApp.getInitialProps has store state',
                    store.getState(),
                  );
                return [
                  2,
                  /*return*/
                  {
                    isServer: isServer,
                    initialState: isServer
                      ? config.serializeState(store.getState())
                      : store.getState(),
                    initialProps: initialProps,
                  },
                ];
            }
          });
        });
      }),
      _a
    );
  };
}
