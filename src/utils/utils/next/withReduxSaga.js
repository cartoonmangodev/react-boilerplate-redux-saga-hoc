/* eslint-disable */
(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? (module.exports = factory(
        require('@babel/runtime/regenerator'),
        require('react'),
        require('redux-saga'),
      ))
    : typeof define === 'function' && define.amd
    ? define(['@babel/runtime/regenerator', 'react', 'redux-saga'], factory)
    : (global['next-redux-saga'] = factory(
        global._regeneratorRuntime,
        global.React,
        global.ReduxSaga,
      ));
})(this, function(_regeneratorRuntime, React, reduxSaga) {
  'use strict';

  _regeneratorRuntime =
    _regeneratorRuntime && _regeneratorRuntime.hasOwnProperty('default')
      ? _regeneratorRuntime['default']
      : _regeneratorRuntime;
  var React__default = 'default' in React ? React['default'] : React;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function() {
      var self = this,
        args = arguments;
      return new Promise(function(resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(
            gen,
            resolve,
            reject,
            _next,
            _throw,
            'next',
            value,
          );
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'throw', err);
        }

        _next(undefined);
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ('value' in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true,
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(
          Object.getOwnPropertySymbols(source).filter(function(sym) {
            return Object.getOwnPropertyDescriptor(source, sym).enumerable;
          }),
        );
      }

      ownKeys.forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
      throw new TypeError('Super expression must either be null or a function');
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true,
      },
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf =
      Object.setPrototypeOf ||
      function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
      };

    return _setPrototypeOf(o, p);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called",
      );
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === 'object' || typeof call === 'function')) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function hoc(config) {
    return function(BaseComponent) {
      var WrappedComponent =
        /*#__PURE__*/
        (function(_Component) {
          _inherits(WrappedComponent, _Component);

          function WrappedComponent() {
            _classCallCheck(this, WrappedComponent);

            return _possibleConstructorReturn(
              this,
              (
                WrappedComponent.__proto__ ||
                Object.getPrototypeOf(WrappedComponent)
              ).apply(this, arguments),
            );
          }

          _createClass(
            WrappedComponent,
            [
              {
                key: 'render',
                value: function render() {
                  return React__default.createElement(
                    BaseComponent,
                    this.props,
                  );
                },
              },
            ],
            [
              {
                key: 'getInitialProps',
                value: (function() {
                  var _getInitialProps = _asyncToGenerator(
                    /*#__PURE__*/
                    _regeneratorRuntime.mark(function _callee(props) {
                      var _props$ctx, isServer, store, pageProps;

                      return _regeneratorRuntime.wrap(
                        function _callee$(_context) {
                          while (1) {
                            switch ((_context.prev = _context.next)) {
                              case 0:
                                (_props$ctx = props.ctx),
                                  (isServer = _props$ctx.isServer),
                                  (store = _props$ctx.store);
                                pageProps = {};

                                if (!BaseComponent.getInitialProps) {
                                  _context.next = 6;
                                  break;
                                }

                                _context.next = 5;
                                return BaseComponent.getInitialProps(props);

                              case 5:
                                pageProps = _context.sent;

                              case 6:
                                if (!(config.async && !isServer)) {
                                  _context.next = 8;
                                  break;
                                }

                                return _context.abrupt('return', pageProps);

                              case 8:
                                // Force saga to end in all other cases
                                store.dispatch(reduxSaga.END);
                                _context.next = 11;
                                return store.sagaTask.done;

                              case 11:
                                // Restart saga on the client (sync mode)
                                if (!isServer) {
                                  store.runSagaTask();
                                }

                                return _context.abrupt('return', pageProps);

                              case 13:
                              case 'end':
                                return _context.stop();
                            }
                          }
                        },
                        _callee,
                        this,
                      );
                    }),
                  );

                  return function getInitialProps(_x) {
                    return _getInitialProps.apply(this, arguments);
                  };
                })(),
              },
            ],
          );

          return WrappedComponent;
        })(React.Component);

      Object.defineProperty(WrappedComponent, 'displayName', {
        configurable: true,
        enumerable: true,
        writable: true,
        value: 'withReduxSaga('.concat(
          BaseComponent.displayName || BaseComponent.name || 'BaseComponent',
          ')',
        ),
      });
      return WrappedComponent;
    };
  }

  function withReduxSaga(arg) {
    var defaultConfig = {
      async: false,
    };

    if (typeof arg === 'function') {
      return hoc(defaultConfig)(arg);
    }

    return hoc(_objectSpread({}, defaultConfig, arg));
  }

  return withReduxSaga;
});
//# sourceMappingURL=next-redux-saga.umd.js.map
