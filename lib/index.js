'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _regeneratorRuntime = _interopDefault(require('@babel/runtime/regenerator'));
var _objectWithoutProperties$1 = _interopDefault(require('@babel/runtime/helpers/objectWithoutProperties'));
var _asyncToGenerator = _interopDefault(require('@babel/runtime/helpers/asyncToGenerator'));
var _extends$3 = _interopDefault(require('@babel/runtime/helpers/extends'));
var _objectSpread = _interopDefault(require('@babel/runtime/helpers/objectSpread2'));
var _slicedToArray = _interopDefault(require('@babel/runtime/helpers/slicedToArray'));
var _defineProperty = _interopDefault(require('@babel/runtime/helpers/defineProperty'));
var React = require('react');
var React__default = _interopDefault(React);
var reactRedux = require('react-redux');
var invariant = _interopDefault(require('invariant'));
var reselect = require('reselect');
var redux = require('redux');
var axios = _interopDefault(require('axios'));
var _typeof$2 = _interopDefault(require('@babel/runtime/helpers/typeof'));
var _classCallCheck = _interopDefault(require('@babel/runtime/helpers/classCallCheck'));
var _createClass = _interopDefault(require('@babel/runtime/helpers/createClass'));
var _createSuper = _interopDefault(require('@babel/runtime/helpers/createSuper'));
var _inherits = _interopDefault(require('@babel/runtime/helpers/inherits'));
var hoistNonReactStatics = _interopDefault(require('hoist-non-react-statics'));
var _toConsumableArray = _interopDefault(require('@babel/runtime/helpers/toConsumableArray'));
var isEqual = _interopDefault(require('lodash.isequal'));
var Qs = _interopDefault(require('query-string'));

/**
 * This is axios intercepter which intercepts all the incoming and outgoing requests
 */
// import { BASE_URL, authentication } from '../shared/config/apiEndPoints';
// import { SPECIFIC_ERROR_HANDLER } from './errorHandler';

var request = axios;
request.defaults.withCredentials = true; // request.defaults.headers.common.origin = 'www.example.com'; // for cookie based auth

request.interceptors.request.use(function (config) {
  // if (!config.baseURL) {
  //   request.defaults.baseURL = BASE_URL;
  //   config.baseURL = BASE_URL; // eslint-disable-line no-param-reassign
  // }
  if (!config.headers.Authorization) ;

  return config;
}, // SPECIFIC_ERROR_HANDLER([], error);
function (error) {
  return Promise.reject(error);
}); // eslint-disable-next-line arrow-body-style

request.interceptors.response.use( // eslint-disable-next-line arrow-body-style
function (response) {
  // if (response.config.url === BASE_URL + authentication.VERIFY_OTP_API.url) {
  //   // CookieManager.get(response.config.url).then(async res => {
  //   // `res` will be true or false depending on success.
  //   request.defaults.headers.common.Authorization = `bearer ${
  //     response.data.data.token
  //   }`;
  //   try {
  //     window.localStorage.setItem('token', response.data.data.token);
  //   } catch (error) {
  //     // console.log('error while setting token in storage', error);
  //   }
  //   // });
  // }
  return response;
}, function (error) {
  return Promise.reject(error);
});

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var sym = function sym(id) {
  return '@@redux-saga/' + id;
};
var TASK = /*#__PURE__*/sym('TASK');
var HELPER = /*#__PURE__*/sym('HELPER');
var MATCH = /*#__PURE__*/sym('MATCH');
var CANCEL = /*#__PURE__*/sym('CANCEL_PROMISE');
var SAGA_ACTION = /*#__PURE__*/sym('SAGA_ACTION');
var SELF_CANCELLATION = /*#__PURE__*/sym('SELF_CANCELLATION');
var konst = function konst(v) {
  return function () {
    return v;
  };
};
var kTrue = /*#__PURE__*/konst(true);
var noop = function noop() {};
var ident = function ident(v) {
  return v;
};
function check(value, predicate, error) {
  if (!predicate(value)) {
    log('error', 'uncaught at check', error);
    throw new Error(error);
  }
}
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(object, property) {
  return is.notUndef(object) && hasOwnProperty.call(object, property);
}
var is = {
  undef: function undef(v) {
    return v === null || v === undefined;
  },
  notUndef: function notUndef(v) {
    return v !== null && v !== undefined;
  },
  func: function func(f) {
    return typeof f === 'function';
  },
  number: function number(n) {
    return typeof n === 'number';
  },
  string: function string(s) {
    return typeof s === 'string';
  },
  array: Array.isArray,
  object: function object(obj) {
    return obj && !is.array(obj) && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
  },
  promise: function promise(p) {
    return p && is.func(p.then);
  },
  iterator: function iterator(it) {
    return it && is.func(it.next) && is.func(it.throw);
  },
  iterable: function iterable(it) {
    return it && is.func(Symbol) ? is.func(it[Symbol.iterator]) : is.array(it);
  },
  task: function task(t) {
    return t && t[TASK];
  },
  observable: function observable(ob) {
    return ob && is.func(ob.subscribe);
  },
  buffer: function buffer(buf) {
    return buf && is.func(buf.isEmpty) && is.func(buf.take) && is.func(buf.put);
  },
  pattern: function pattern(pat) {
    return pat && (is.string(pat) || (typeof pat === 'undefined' ? 'undefined' : _typeof(pat)) === 'symbol' || is.func(pat) || is.array(pat));
  },
  channel: function channel(ch) {
    return ch && is.func(ch.take) && is.func(ch.close);
  },
  helper: function helper(it) {
    return it && it[HELPER];
  },
  stringableFunc: function stringableFunc(f) {
    return is.func(f) && hasOwn(f, 'toString');
  }
};
var object = {
  assign: function assign(target, source) {
    for (var i in source) {
      if (hasOwn(source, i)) {
        target[i] = source[i];
      }
    }
  }
};
function remove(array, item) {
  var index = array.indexOf(item);

  if (index >= 0) {
    array.splice(index, 1);
  }
}
var array = {
  from: function from(obj) {
    var arr = Array(obj.length);

    for (var i in obj) {
      if (hasOwn(obj, i)) {
        arr[i] = obj[i];
      }
    }

    return arr;
  }
};
function deferred() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var def = _extends({}, props);

  var promise = new Promise(function (resolve, reject) {
    def.resolve = resolve;
    def.reject = reject;
  });
  def.promise = promise;
  return def;
}
function autoInc() {
  var seed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  return function () {
    return ++seed;
  };
}
var uid = /*#__PURE__*/autoInc();

var kThrow = function kThrow(err) {
  throw err;
};

var kReturn = function kReturn(value) {
  return {
    value: value,
    done: true
  };
};

function makeIterator(next) {
  var thro = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : kThrow;
  var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var isHelper = arguments[3];
  var iterator = {
    name: name,
    next: next,
    throw: thro,
    return: kReturn
  };

  if (isHelper) {
    iterator[HELPER] = true;
  }

  if (typeof Symbol !== 'undefined') {
    iterator[Symbol.iterator] = function () {
      return iterator;
    };
  }

  return iterator;
}
/**
  Print error in a useful way whether in a browser environment
  (with expandable error stack traces), or in a node.js environment
  (text-only log output)
 **/

function log(level, message) {
  var error = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  /*eslint-disable no-console*/

  if (typeof window === 'undefined') {
    console.log('redux-saga ' + level + ': ' + message + '\n' + (error && error.stack || error));
  } else {
    console[level](message, error);
  }
}
function deprecate(fn, deprecationWarning) {
  return function () {
    if (process.env.NODE_ENV === 'development') log('warn', deprecationWarning);
    return fn.apply(undefined, arguments);
  };
}
var updateIncentive = function updateIncentive(deprecated, preferred) {
  return deprecated + ' has been deprecated in favor of ' + preferred + ', please update your code';
};
var internalErr = function internalErr(err) {
  return new Error('\n  redux-saga: Error checking hooks detected an inconsistent state. This is likely a bug\n  in redux-saga code and not yours. Thanks for reporting this in the project\'s github repo.\n  Error: ' + err + '\n');
};
var createSetContextWarning = function createSetContextWarning(ctx, props) {
  return (ctx ? ctx + '.' : '') + 'setContext(props): argument ' + props + ' is not a plain object';
};
var wrapSagaDispatch = function wrapSagaDispatch(dispatch) {
  return function (action) {
    return dispatch(Object.defineProperty(action, SAGA_ACTION, {
      value: true
    }));
  };
};

var IO = /*#__PURE__*/sym('IO');
var TAKE = 'TAKE';
var PUT = 'PUT';
var ALL = 'ALL';
var RACE = 'RACE';
var CALL = 'CALL';
var CPS = 'CPS';
var FORK = 'FORK';
var JOIN = 'JOIN';
var CANCEL$1 = 'CANCEL';
var SELECT = 'SELECT';
var ACTION_CHANNEL = 'ACTION_CHANNEL';
var CANCELLED = 'CANCELLED';
var FLUSH = 'FLUSH';
var GET_CONTEXT = 'GET_CONTEXT';
var SET_CONTEXT = 'SET_CONTEXT';
var TEST_HINT = '\n(HINT: if you are getting this errors in tests, consider using createMockTask from redux-saga/utils)';

var effect = function effect(type, payload) {
  var _ref;

  return _ref = {}, _ref[IO] = true, _ref[type] = payload, _ref;
};
function take() {
  var patternOrChannel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '*';

  if (arguments.length) {
    check(arguments[0], is.notUndef, 'take(patternOrChannel): patternOrChannel is undefined');
  }

  if (is.pattern(patternOrChannel)) {
    return effect(TAKE, {
      pattern: patternOrChannel
    });
  }

  if (is.channel(patternOrChannel)) {
    return effect(TAKE, {
      channel: patternOrChannel
    });
  }

  throw new Error('take(patternOrChannel): argument ' + String(patternOrChannel) + ' is not valid channel or a valid pattern');
}

take.maybe = function () {
  var eff = take.apply(undefined, arguments);
  eff[TAKE].maybe = true;
  return eff;
};
function put(channel, action) {
  if (arguments.length > 1) {
    check(channel, is.notUndef, 'put(channel, action): argument channel is undefined');
    check(channel, is.channel, 'put(channel, action): argument ' + channel + ' is not a valid channel');
    check(action, is.notUndef, 'put(channel, action): argument action is undefined');
  } else {
    check(channel, is.notUndef, 'put(action): argument action is undefined');
    action = channel;
    channel = null;
  }

  return effect(PUT, {
    channel: channel,
    action: action
  });
}

put.resolve = function () {
  var eff = put.apply(undefined, arguments);
  eff[PUT].resolve = true;
  return eff;
};

put.sync = /*#__PURE__*/deprecate(put.resolve, /*#__PURE__*/updateIncentive('put.sync', 'put.resolve'));
function all(effects) {
  return effect(ALL, effects);
}
function race(effects) {
  return effect(RACE, effects);
}

function getFnCallDesc(meth, fn, args) {
  check(fn, is.notUndef, meth + ': argument fn is undefined');
  var context = null;

  if (is.array(fn)) {
    var _fn = fn;
    context = _fn[0];
    fn = _fn[1];
  } else if (fn.fn) {
    var _fn2 = fn;
    context = _fn2.context;
    fn = _fn2.fn;
  }

  if (context && is.string(fn) && is.func(context[fn])) {
    fn = context[fn];
  }

  check(fn, is.func, meth + ': argument ' + fn + ' is not a function');
  return {
    context: context,
    fn: fn,
    args: args
  };
}

function call(fn) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return effect(CALL, getFnCallDesc('call', fn, args));
}
function fork(fn) {
  for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    args[_key3 - 1] = arguments[_key3];
  }

  return effect(FORK, getFnCallDesc('fork', fn, args));
}
function cancel() {
  for (var _len6 = arguments.length, tasks = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
    tasks[_key6] = arguments[_key6];
  }

  if (tasks.length > 1) {
    return all(tasks.map(function (t) {
      return cancel(t);
    }));
  }

  var task = tasks[0];

  if (tasks.length === 1) {
    check(task, is.notUndef, 'cancel(task): argument task is undefined');
    check(task, is.task, 'cancel(task): argument ' + task + ' is not a valid Task object ' + TEST_HINT);
  }

  return effect(CANCEL$1, task || SELF_CANCELLATION);
}
function cancelled() {
  return effect(CANCELLED, {});
}

var createAsEffectType = function createAsEffectType(type) {
  return function (effect) {
    return effect && effect[IO] && effect[type];
  };
};

var asEffect = {
  take: /*#__PURE__*/createAsEffectType(TAKE),
  put: /*#__PURE__*/createAsEffectType(PUT),
  all: /*#__PURE__*/createAsEffectType(ALL),
  race: /*#__PURE__*/createAsEffectType(RACE),
  call: /*#__PURE__*/createAsEffectType(CALL),
  cps: /*#__PURE__*/createAsEffectType(CPS),
  fork: /*#__PURE__*/createAsEffectType(FORK),
  join: /*#__PURE__*/createAsEffectType(JOIN),
  cancel: /*#__PURE__*/createAsEffectType(CANCEL$1),
  select: /*#__PURE__*/createAsEffectType(SELECT),
  actionChannel: /*#__PURE__*/createAsEffectType(ACTION_CHANNEL),
  cancelled: /*#__PURE__*/createAsEffectType(CANCELLED),
  flush: /*#__PURE__*/createAsEffectType(FLUSH),
  getContext: /*#__PURE__*/createAsEffectType(GET_CONTEXT),
  setContext: /*#__PURE__*/createAsEffectType(SET_CONTEXT)
};

var done = {
  done: true,
  value: undefined
};
var qEnd = {};
function safeName(patternOrChannel) {
  if (is.channel(patternOrChannel)) {
    return 'channel';
  } else if (Array.isArray(patternOrChannel)) {
    return String(patternOrChannel.map(function (entry) {
      return String(entry);
    }));
  } else {
    return String(patternOrChannel);
  }
}
function fsmIterator(fsm, q0) {
  var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'iterator';
  var updateState = void 0,
      qNext = q0;

  function next(arg, error) {
    if (qNext === qEnd) {
      return done;
    }

    if (error) {
      qNext = qEnd;
      throw error;
    } else {
      updateState && updateState(arg);

      var _fsm$qNext = fsm[qNext](),
          q = _fsm$qNext[0],
          output = _fsm$qNext[1],
          _updateState = _fsm$qNext[2];

      qNext = q;
      updateState = _updateState;
      return qNext === qEnd ? done : output;
    }
  }

  return makeIterator(next, function (error) {
    return next(null, error);
  }, name, true);
}

var BUFFER_OVERFLOW = "Channel's Buffer overflow!";
var ON_OVERFLOW_THROW = 1;
var ON_OVERFLOW_DROP = 2;
var ON_OVERFLOW_SLIDE = 3;
var ON_OVERFLOW_EXPAND = 4;
var zeroBuffer = {
  isEmpty: kTrue,
  put: noop,
  take: noop
};

function ringBuffer() {
  var limit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
  var overflowAction = arguments[1];
  var arr = new Array(limit);
  var length = 0;
  var pushIndex = 0;
  var popIndex = 0;

  var push = function push(it) {
    arr[pushIndex] = it;
    pushIndex = (pushIndex + 1) % limit;
    length++;
  };

  var take = function take() {
    if (length != 0) {
      var it = arr[popIndex];
      arr[popIndex] = null;
      length--;
      popIndex = (popIndex + 1) % limit;
      return it;
    }
  };

  var flush = function flush() {
    var items = [];

    while (length) {
      items.push(take());
    }

    return items;
  };

  return {
    isEmpty: function isEmpty() {
      return length == 0;
    },
    put: function put(it) {
      if (length < limit) {
        push(it);
      } else {
        var doubledLimit = void 0;

        switch (overflowAction) {
          case ON_OVERFLOW_THROW:
            throw new Error(BUFFER_OVERFLOW);

          case ON_OVERFLOW_SLIDE:
            arr[pushIndex] = it;
            pushIndex = (pushIndex + 1) % limit;
            popIndex = pushIndex;
            break;

          case ON_OVERFLOW_EXPAND:
            doubledLimit = 2 * limit;
            arr = flush();
            length = arr.length;
            pushIndex = arr.length;
            popIndex = 0;
            arr.length = doubledLimit;
            limit = doubledLimit;
            push(it);
            break;

        }
      }
    },
    take: take,
    flush: flush
  };
}

var buffers = {
  none: function none() {
    return zeroBuffer;
  },
  fixed: function fixed(limit) {
    return ringBuffer(limit, ON_OVERFLOW_THROW);
  },
  dropping: function dropping(limit) {
    return ringBuffer(limit, ON_OVERFLOW_DROP);
  },
  sliding: function sliding(limit) {
    return ringBuffer(limit, ON_OVERFLOW_SLIDE);
  },
  expanding: function expanding(initialSize) {
    return ringBuffer(initialSize, ON_OVERFLOW_EXPAND);
  }
};

var queue = [];
/**
  Variable to hold a counting semaphore
  - Incrementing adds a lock and puts the scheduler in a `suspended` state (if it's not
    already suspended)
  - Decrementing releases a lock. Zero locks puts the scheduler in a `released` state. This
    triggers flushing the queued tasks.
**/

var semaphore = 0;
/**
  Executes a task 'atomically'. Tasks scheduled during this execution will be queued
  and flushed after this task has finished (assuming the scheduler endup in a released
  state).
**/

function exec(task) {
  try {
    suspend();
    task();
  } finally {
    release();
  }
}
/**
  Executes or queues a task depending on the state of the scheduler (`suspended` or `released`)
**/


function asap(task) {
  queue.push(task);

  if (!semaphore) {
    suspend();
    flush();
  }
}
/**
  Puts the scheduler in a `suspended` state. Scheduled tasks will be queued until the
  scheduler is released.
**/

function suspend() {
  semaphore++;
}
/**
  Puts the scheduler in a `released` state.
**/

function release() {
  semaphore--;
}
/**
  Releases the current lock. Executes all queued tasks if the scheduler is in the released state.
**/


function flush() {
  release();
  var task = void 0;

  while (!semaphore && (task = queue.shift()) !== undefined) {
    exec(task);
  }
}

var _extends$1 = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};
var CHANNEL_END_TYPE = '@@redux-saga/CHANNEL_END';
var END = {
  type: CHANNEL_END_TYPE
};
var isEnd = function isEnd(a) {
  return a && a.type === CHANNEL_END_TYPE;
};
function emitter() {
  var subscribers = [];

  function subscribe(sub) {
    subscribers.push(sub);
    return function () {
      return remove(subscribers, sub);
    };
  }

  function emit(item) {
    var arr = subscribers.slice();

    for (var i = 0, len = arr.length; i < len; i++) {
      arr[i](item);
    }
  }

  return {
    subscribe: subscribe,
    emit: emit
  };
}
var INVALID_BUFFER = 'invalid buffer passed to channel factory function';
var UNDEFINED_INPUT_ERROR = 'Saga was provided with an undefined action';

if (process.env.NODE_ENV !== 'production') {
  UNDEFINED_INPUT_ERROR += '\nHints:\n    - check that your Action Creator returns a non-undefined value\n    - if the Saga was started using runSaga, check that your subscribe source provides the action to its listeners\n  ';
}

function channel() {
  var buffer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : buffers.fixed();
  var closed = false;
  var takers = [];
  check(buffer, is.buffer, INVALID_BUFFER);

  function checkForbiddenStates() {
    if (closed && takers.length) {
      throw internalErr('Cannot have a closed channel with pending takers');
    }

    if (takers.length && !buffer.isEmpty()) {
      throw internalErr('Cannot have pending takers with non empty buffer');
    }
  }

  function put(input) {
    checkForbiddenStates();
    check(input, is.notUndef, UNDEFINED_INPUT_ERROR);

    if (closed) {
      return;
    }

    if (!takers.length) {
      return buffer.put(input);
    }

    for (var i = 0; i < takers.length; i++) {
      var cb = takers[i];

      if (!cb[MATCH] || cb[MATCH](input)) {
        takers.splice(i, 1);
        return cb(input);
      }
    }
  }

  function take(cb) {
    checkForbiddenStates();
    check(cb, is.func, "channel.take's callback must be a function");

    if (closed && buffer.isEmpty()) {
      cb(END);
    } else if (!buffer.isEmpty()) {
      cb(buffer.take());
    } else {
      takers.push(cb);

      cb.cancel = function () {
        return remove(takers, cb);
      };
    }
  }

  function flush(cb) {
    checkForbiddenStates(); // TODO: check if some new state should be forbidden now

    check(cb, is.func, "channel.flush' callback must be a function");

    if (closed && buffer.isEmpty()) {
      cb(END);
      return;
    }

    cb(buffer.flush());
  }

  function close() {
    checkForbiddenStates();

    if (!closed) {
      closed = true;

      if (takers.length) {
        var arr = takers;
        takers = [];

        for (var i = 0, len = arr.length; i < len; i++) {
          arr[i](END);
        }
      }
    }
  }

  return {
    take: take,
    put: put,
    flush: flush,
    close: close,

    get __takers__() {
      return takers;
    },

    get __closed__() {
      return closed;
    }

  };
}
function eventChannel(subscribe) {
  var buffer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : buffers.none();
  var matcher = arguments[2];
  /**
    should be if(typeof matcher !== undefined) instead?
    see PR #273 for a background discussion
  **/

  if (arguments.length > 2) {
    check(matcher, is.func, 'Invalid match function passed to eventChannel');
  }

  var chan = channel(buffer);

  var close = function close() {
    if (!chan.__closed__) {
      if (unsubscribe) {
        unsubscribe();
      }

      chan.close();
    }
  };

  var unsubscribe = subscribe(function (input) {
    if (isEnd(input)) {
      close();
      return;
    }

    if (matcher && !matcher(input)) {
      return;
    }

    chan.put(input);
  });

  if (chan.__closed__) {
    unsubscribe();
  }

  if (!is.func(unsubscribe)) {
    throw new Error('in eventChannel: subscribe should return a function to unsubscribe');
  }

  return {
    take: chan.take,
    flush: chan.flush,
    close: close
  };
}
function stdChannel(subscribe) {
  var chan = eventChannel(function (cb) {
    return subscribe(function (input) {
      if (input[SAGA_ACTION]) {
        cb(input);
        return;
      }

      asap(function () {
        return cb(input);
      });
    });
  });
  return _extends$1({}, chan, {
    take: function take(cb, matcher) {
      if (arguments.length > 1) {
        check(matcher, is.func, "channel.take's matcher argument must be a function");
        cb[MATCH] = matcher;
      }

      chan.take(cb);
    }
  });
}

function takeEvery(patternOrChannel, worker) {
  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  var yTake = {
    done: false,
    value: take(patternOrChannel)
  };

  var yFork = function yFork(ac) {
    return {
      done: false,
      value: fork.apply(undefined, [worker].concat(args, [ac]))
    };
  };

  var action = void 0,
      setAction = function setAction(ac) {
    return action = ac;
  };

  return fsmIterator({
    q1: function q1() {
      return ['q2', yTake, setAction];
    },
    q2: function q2() {
      return action === END ? [qEnd] : ['q1', yFork(action)];
    }
  }, 'q1', 'takeEvery(' + safeName(patternOrChannel) + ', ' + worker.name + ')');
}

function takeLatest(patternOrChannel, worker) {
  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  var yTake = {
    done: false,
    value: take(patternOrChannel)
  };

  var yFork = function yFork(ac) {
    return {
      done: false,
      value: fork.apply(undefined, [worker].concat(args, [ac]))
    };
  };

  var yCancel = function yCancel(task) {
    return {
      done: false,
      value: cancel(task)
    };
  };

  var task = void 0,
      action = void 0;

  var setTask = function setTask(t) {
    return task = t;
  };

  var setAction = function setAction(ac) {
    return action = ac;
  };

  return fsmIterator({
    q1: function q1() {
      return ['q2', yTake, setAction];
    },
    q2: function q2() {
      return action === END ? [qEnd] : task ? ['q3', yCancel(task)] : ['q1', yFork(action), setTask];
    },
    q3: function q3() {
      return ['q1', yFork(action), setTask];
    }
  }, 'q1', 'takeLatest(' + safeName(patternOrChannel) + ', ' + worker.name + ')');
}

function takeEvery$1(patternOrChannel, worker) {
  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  return fork.apply(undefined, [takeEvery, patternOrChannel, worker].concat(args));
}
function takeLatest$1(patternOrChannel, worker) {
  for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
    args[_key2 - 2] = arguments[_key2];
  }

  return fork.apply(undefined, [takeLatest, patternOrChannel, worker].concat(args));
}

var API_LOADING_STATUS = 'app/API_LOADING_STATUS';
var ON_CANCEL_ERROR = 'API_CANCEL_ERROR';
var ON_ERROR = 'ERROR';
var ON_SUCCESS = 'SUCCESS';
var ON_FINALLY = 'FINALLY';
var ON_CANCEL = 'CANCEL';
var ON_REQUEST = 'REQUEST';
var ON_LOADING = 'LOADING';
var ON_UNMOUNT = 'UNMOUNT';
var ON_TOAST = 'TOAST';
var ERROR = 'ERROR';
var SUCCESS = 'SUCCESS';
var CALL$1 = 'CALL';
var CANCEL$2 = 'CANCEL';
var CUSTOM = 'CUSTOM_TASK';
var commonConstants = {
  ON_CANCEL_ERROR: ON_CANCEL_ERROR,
  ON_ERROR: ON_ERROR,
  ON_SUCCESS: ON_SUCCESS,
  ON_FINALLY: ON_FINALLY,
  ON_CANCEL: ON_CANCEL,
  ON_REQUEST: ON_REQUEST,
  ON_LOADING: ON_LOADING,
  ON_UNMOUNT: ON_UNMOUNT,
  ON_TOAST: ON_TOAST,
  ERROR: ERROR,
  SUCCESS: SUCCESS,
  CALL: CALL$1,
  CANCEL: CANCEL$2,
  CUSTOM: CUSTOM
};

// <============================ common actions ==============================>

var successAction = function successAction(actionType) {
  return function (type, method, payload, statusCode, message) {
    var data = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
    return {
      type: actionType,
      response: {
        type: type,
        data: data,
        payload: payload,
        statusCode: statusCode,
        message: message,
        method: method
      }
    };
  };
};

var errorAction = function errorAction(actionType) {
  return function (type, method, payload, statusCode, message) {
    var error = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
    return {
      type: actionType,
      response: {
        type: type,
        error: error,
        payload: payload,
        statusCode: statusCode,
        message: message,
        method: method
      }
    };
  };
};

var callAction = function callAction(actionType) {
  return function () {
    var payload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return {
      type: actionType,
      payload: payload
    };
  };
};

var cancelAction = function cancelAction(actionType) {
  return function (type, method, filter) {
    return {
      type: actionType,
      response: {
        type: type,
        method: method,
        payload: {
          filter: filter
        }
      }
    };
  };
};

var customAction = function customAction(actionType) {
  return function (type, method, payload) {
    var data = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    var statusCode = arguments.length > 4 ? arguments[4] : undefined;
    return {
      type: actionType,
      response: {
        type: type,
        method: method,
        data: data,
        statusCode: statusCode || method === ON_SUCCESS ? 200 : null,
        customTask: true,
        payload: payload
      }
    };
  };
};

var actionsHandler = {
  success: successAction,
  error: errorAction,
  call: callAction,
  cancel: cancelAction,
  custom: customAction
};
function apiLoadingStatus(_ref) {
  var type = _ref.type,
      _ref$data = _ref.data,
      data = _ref$data === void 0 ? {} : _ref$data,
      _ref$status = _ref.status,
      status = _ref$status === void 0 ? true : _ref$status,
      loader = _ref.loader,
      payload = _ref.payload;
  return {
    type: API_LOADING_STATUS,
    response: {
      type: type,
      status: status,
      data: data,
      loader: loader,
      payload: payload,
      method: ON_LOADING
    }
  };
}

var cloneObject = function cloneObject(oldState) {
  var newState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return Object.assign({}, oldState, newState);
};
var newObject = function newObject() {
  var oldState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    rest[_key - 1] = arguments[_key];
  }

  return rest.reduce(function (acc, curr) {
    return cloneObject(acc, typeof curr === 'function' && curr(oldState, acc) || curr);
  }, cloneObject(oldState));
};

function deleteIn(obj, arr) {
  var i = 0;
  var o = obj;

  function update() {
    if (Array.isArray(o)) {
      return function () {
        var a = !(arr.length - 1 === i && +arr[i] >= o.slice().length) ? o.slice().map(function (data, ind) {
          if (+arr[i] === ind) {
            if (arr.length - 1 === i) {
              if (Array.isArray(o)) o.splice(+arr[i], 1);else delete o[arr[i]];
              return Array.isArray(o) ? null : o;
            }

            return function () {
              o = data;
              i += 1;
              return update();
            }();
          }

          return data;
        }).filter(function (e) {
          return e;
        }) : function () {
          if (arr.length - 1 === i) {
            if (Array.isArray(o)) o.splice(+arr[i], 1);else delete o[arr[i]];
            return o;
          }

          return o;
        }();
        return a;
      }();
    }

    return function () {
      if (arr.length - 1 === i) {
        delete o[arr[i]];
        return o;
      }

      return cloneObject(o, _defineProperty({}, arr[i], function () {
        o = o[arr[i]];
        i += 1;
        return update();
      }()));
    }();
  }

  return update();
}

/* eslint-disable no-nested-ternary */

/* eslint-disable indent */
function getIn(obj, arr) {
  var i = 0;
  var o = obj;

  function get() {
    return arr.length > 0 && arr.length - 1 === i ? typeof o === 'undefined' || o === null ? o : o[arr[i]] : function () {
      if (typeof o === 'undefined' || o === null) return o;
      o = o[arr[i]];
      i += 1;
      return get();
    }();
  }

  return arr.length > 0 ? get() : obj;
}

/* eslint-disable no-restricted-syntax */

/* eslint-disable no-continue */
function objectEquals(x, y) {
  if (x === y) return true; // if both x and y are null or undefined and exactly the same

  if (!(x instanceof Object) || !(y instanceof Object)) return false; // if they are not strictly equal, they both need to be Objects

  if (x.constructor !== y.constructor) return false; // they must have the exact same prototype chain, the closest we can do is
  // test there constructor.

  for (var _i = 0, _Object$entries = Object.entries(x); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 1),
        p = _Object$entries$_i[0];

    if (!(p in x)) continue; // other properties were tested using x.constructor === y.constructor

    if (!(p in y)) return false; // allows to compare x[ p ] and y[ p ] when set to undefined

    if (x[p] === y[p]) continue; // if they have the same strict value or identity then they are equal

    if (_typeof$2(x[p]) !== 'object') return false; // Numbers, Strings, Functions, Booleans must be strictly equal

    if (!Object.equals(x[p], y[p])) return false; // Objects and Arrays must be tested recursively
  }

  for (var _i2 = 0, _Object$entries2 = Object.entries(y); _i2 < _Object$entries2.length; _i2++) {
    var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 1),
        _p = _Object$entries2$_i[0];

    if (_p in y && !(_p in x)) return false; // allows x[ p ] to be set to undefined
  }

  return true;
}

function setIn(obj, arr, value) {
  var i = 0;
  var o = obj;

  function update() {
    if (Array.isArray(o)) {
      return function () {
        var a = !(arr.length - 1 === i && +arr[i] >= o.slice().length) ? o.slice().map(function (data, ind) {
          if (+arr[i] === ind) {
            return arr.length - 1 === i ? value : function () {
              o = data;
              i += 1;
              return update();
            }();
          }

          return data;
        }) : function () {
          o[+arr[i]] = value;
          return o;
        }();
        return a;
      }();
    }

    return cloneObject(o, _defineProperty({}, arr[i], arr.length - 1 === i ? value : function () {
      o = o[arr[i]] || {};
      i += 1;
      return update();
    }()));
  }

  return update();
}

function updateIn(obj) {
  var arr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var callback = arguments.length > 2 ? arguments[2] : undefined;
  var i = 0;
  var o = obj;

  function update() {
    if (Array.isArray(o)) {
      return o.slice().map(function (data, ind) {
        if (+arr[i] === ind) {
          return arr.length - 1 === i ? callback(data) : function () {
            o = data;
            i += 1;
            return update();
          }();
        }

        return data;
      });
    }

    return cloneObject(o, _defineProperty({}, arr && arr[i], arr.length - 1 === i ? callback(o[arr[i]]) : function () {
      o = o[arr[i]] || {};
      i += 1;
      return update();
    }()));
  }

  return arr.length > 0 ? update() : obj;
}

var generateTimeStamp = function generateTimeStamp() {
  return new Date().getTime();
};
var toCapitalize = function toCapitalize(string) {
  return string && typeof string === 'string' ? string.charAt(0).toUpperCase() + string.slice(1) : null;
};
var type = {
  '[object Null]': 'null',
  '[object Undefined]': 'undefined',
  '[object String]': 'string',
  '[object Array]': 'array',
  '[object Boolean]': 'boolean',
  '[object Object]': 'object',
  '[object Function]': 'function' // '[object Symbol]': 'symbol',
  // '[object GeneratorFunction]': 'generatorFunction',

};
var typeOf = function typeOf(_obj) {
  return type[Object.prototype.toString.call(_obj)] || _typeof$2(_obj);
};

var convertData = function convertData(apiEndPoints) {
  return Object.keys(apiEndPoints).reduce(function (prev, curr) {
    var constants = Object.keys(apiEndPoints[curr]).reduce(function (acc, key) {
      var _key;

      return newObject(acc, _defineProperty({}, key, (_key = {}, _defineProperty(_key, CALL$1, "app/containers/".concat(curr, "/").concat(key, "_").concat(CALL$1)), _defineProperty(_key, SUCCESS, "app/containers/".concat(curr, "/").concat(key, "_").concat(SUCCESS)), _defineProperty(_key, CUSTOM, "app/containers/".concat(curr, "/").concat(key, "_").concat(CUSTOM)), _defineProperty(_key, ERROR, "app/containers/".concat(curr, "/").concat(key, "_").concat(ERROR)), _defineProperty(_key, CANCEL$2, "app/containers/".concat(curr, "/").concat(key, "_").concat(CANCEL$2)), _key)));
    }, {});
    var actions = Object.keys(apiEndPoints[curr]).reduce(function (acc, key) {
      var _key2;

      return newObject(acc, _defineProperty({}, key, (_key2 = {}, _defineProperty(_key2, CALL$1, actionsHandler.call(constants[key][CALL$1])), _defineProperty(_key2, SUCCESS, actionsHandler.success(constants[key][SUCCESS])), _defineProperty(_key2, CUSTOM, actionsHandler.custom(constants[key][CUSTOM])), _defineProperty(_key2, ERROR, actionsHandler.error(constants[key][ERROR])), _defineProperty(_key2, CANCEL$2, actionsHandler.cancel(constants[key][CANCEL$2])), _key2)));
    }, {});
    var sagaConfig = Object.entries(apiEndPoints[curr]).reduce(function (acc, _ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          key = _ref2[0],
          value = _ref2[1];

      return newObject(acc, _defineProperty({}, constants[key][CALL$1], {
        api: value,
        cancel: constants[key][CANCEL$2],
        actions: actions[key],
        effect: value.effect === 'every' && takeEvery$1
      }));
    }, {});
    return newObject(prev, _defineProperty({}, curr, {
      actions: actions,
      constants: constants,
      sagaConfig: sagaConfig
    }));
  }, {});
};

var generateConstants = (function (_ref) {
  var apiEndPoints = _ref.apiEndPoints,
      generatorKey = _ref.generatorKey,
      dontResetOnLogout = _ref.dontResetOnLogout;

  var _dontResetOnLogout = Array.isArray(dontResetOnLogout) ? dontResetOnLogout.reduce(function (acc, key) {
    return Object.assign(acc, _defineProperty({}, key, key));
  }, {}) : dontResetOnLogout;

  var ConvertData = convertData(apiEndPoints);

  var _Object$keys$reduce = Object.keys(apiEndPoints[generatorKey]).reduce(function (acc, key) {
    return {
      initialState: newObject({}, acc.initialState, _defineProperty({}, ConvertData[generatorKey].constants[key][CALL$1], _objectSpread({
        loading: {},
        toast: {}
      }, apiEndPoints[generatorKey][key].initialData ? {
        data: apiEndPoints[generatorKey][key].initialData
      } : {}))),
      resetState: typeof _dontResetOnLogout[key] === 'undefined' && newObject({}, acc.resetState, _defineProperty({}, ConvertData[generatorKey].constants[key][CALL$1], _objectSpread({
        loading: {},
        toast: {}
      }, apiEndPoints[generatorKey][key].initialData ? {
        data: apiEndPoints[generatorKey][key]
      } : {}))) || acc.resetState
    };
  }, {
    initialState: {},
    resetState: {}
  }),
      initialState = _Object$keys$reduce.initialState,
      resetState = _Object$keys$reduce.resetState;

  var _ConvertData$generato = ConvertData[generatorKey],
      constants = _ConvertData$generato.constants,
      actions = _ConvertData$generato.actions,
      sagaConfig = _ConvertData$generato.sagaConfig;
  return {
    constants: constants,
    initialState: initialState,
    generatorKey: generatorKey,
    actions: actions,
    sagaConfig: sagaConfig,
    resetState: resetState
  };
});

// import isFunction from 'lodash/isFunction';
/**
 * Validate the shape of redux store
 */
// export default function checkStore(store) {
//   const shape = {
//     dispatch: isFunction,
//     subscribe: isFunction,
//     getState: isFunction,
//     replaceReducer: isFunction,
//     runSaga: isFunction,
//     injectedReducers: isObject,
//     injectedSagas: isObject,
// //   };
//   invariant(
//     conformsTo(store, shape),
//     '(app/utils...) injectors: Expected a valid redux store',
//   );
// }

function checkStore(store) {
  invariant(typeOf(store) === 'object' && typeOf(store.dispatch) === 'function' && typeOf(store.subscribe) === 'function' && typeOf(store.getState) === 'function' && typeOf(store.replaceReducer) === 'function' && typeOf(store.runSaga) === 'function' && typeOf(store.injectedReducers) === 'object' && typeOf(store.injectedSagas) === 'object', '(app/utils...) injectors: Expected a valid redux store');
}

var RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
var DAEMON = '@@saga-injector/daemon';
var ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';

var allowedModes = [RESTART_ON_REMOUNT, DAEMON, ONCE_TILL_UNMOUNT];

var checkKey = function checkKey(key) {
  return invariant(key && typeOf(key) === 'string', '(app/utils...) injectSaga: Expected `key` to be a non empty string');
};

var checkDescriptor = function checkDescriptor(descriptor) {
  // const shape = {
  //   saga: isFunction,
  //   mode: mode => isString(mode) && allowedModes.includes(mode),
  // };
  invariant(typeOf(descriptor) === 'object' && typeof descriptor.saga === 'function' && allowedModes.includes(descriptor.mode), '(app/utils...) injectSaga: Expected a valid saga descriptor');
};

function injectSagaFactory(store, isValid) {
  return function injectSaga(key) {
    var descriptor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var args = arguments.length > 2 ? arguments[2] : undefined;
    if (!isValid) checkStore(store);

    var newDescriptor = _objectSpread({}, descriptor, {
      mode: descriptor.mode || DAEMON
    });

    var saga = newDescriptor.saga,
        mode = newDescriptor.mode;
    checkKey(key);
    checkDescriptor(newDescriptor);
    var hasSaga = Reflect.has(store.injectedSagas, key);

    if (process.env.NODE_ENV !== 'production') {
      var oldDescriptor = store.injectedSagas[key]; // enable hot reloading of daemon and once-till-unmount sagas

      if (hasSaga && oldDescriptor.saga !== saga) {
        oldDescriptor.task.cancel();
        hasSaga = false;
      }
    }

    if (!hasSaga || hasSaga && mode !== DAEMON && mode !== ONCE_TILL_UNMOUNT) {
      /* eslint-disable no-param-reassign */
      store.injectedSagas[key] = _objectSpread({}, newDescriptor, {
        task: store.runSaga(saga, args)
      });
      /* eslint-enable no-param-reassign */
    }
  };
}
function ejectSagaFactory(store, isValid) {
  return function ejectSaga(key) {
    if (!isValid) checkStore(store);
    checkKey(key);

    if (Reflect.has(store.injectedSagas, key)) {
      var descriptor = store.injectedSagas[key];

      if (descriptor.mode && descriptor.mode !== DAEMON) {
        descriptor.task.cancel(); // Clean up in production; in development we need `descriptor.saga` for hot reloading

        if (process.env.NODE_ENV === 'production') {
          // Need some value to be able to detect `ONCE_TILL_UNMOUNT` sagas in `injectSaga`
          store.injectedSagas[key] = 'done'; // eslint-disable-line no-param-reassign
        }
      }
    }
  };
}
function getInjectors(store) {
  checkStore(store);
  return {
    injectSaga: injectSagaFactory(store, true),
    ejectSaga: ejectSagaFactory(store, true)
  };
}

/**
 * Dynamically injects a saga, passes component's props as saga arguments
 *
 * @param {string} key A key of the saga
 * @param {function} saga A root saga that will be injected
 * @param {string} [mode] By default (constants.DAEMON) the saga will be started
 * on component mount and never canceled or started again. Another two options:
 *   - constants.RESTART_ON_REMOUNT — the saga will be started on component mount and
 *   cancelled with `task.cancel()` on component unmount for improved performance,
 *   - constants.ONCE_TILL_UNMOUNT — behaves like 'RESTART_ON_REMOUNT' but never runs it again.
 *
 */

var injectSaga = (function (_ref) {
  var key = _ref.key,
      saga = _ref.saga,
      mode = _ref.mode;
  return function (WrappedComponent) {
    var InjectSaga = /*#__PURE__*/function (_React$Component) {
      _inherits(InjectSaga, _React$Component);

      var _super = _createSuper(InjectSaga);

      function InjectSaga(props, context) {
        var _this;

        _classCallCheck(this, InjectSaga);

        _this = _super.call(this, props, context);
        _this.injectors = getInjectors(context.store);

        _this.injectors.injectSaga(key, {
          saga: saga,
          mode: mode
        }, _this.props);

        return _this;
      }

      _createClass(InjectSaga, [{
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
          this.injectors.ejectSaga(key);
        }
      }, {
        key: "render",
        value: function render() {
          return React__default.createElement(WrappedComponent, this.props);
        }
      }]);

      return InjectSaga;
    }(React__default.Component);

    _defineProperty(InjectSaga, "WrappedComponent", WrappedComponent);

    _defineProperty(InjectSaga, "contextType", reactRedux.ReactReduxContext);

    _defineProperty(InjectSaga, "displayName", "withSaga(".concat(WrappedComponent.displayName || WrappedComponent.name || 'Component', ")"));

    return hoistNonReactStatics(InjectSaga, WrappedComponent);
  };
});

var useInjectSaga = function useInjectSaga(_ref2) {
  var key = _ref2.key,
      saga = _ref2.saga,
      mode = _ref2.mode;
  var context = React__default.useContext(reactRedux.ReactReduxContext);
  React__default.useEffect(function () {
    var injectors = getInjectors(context.store);
    injectors.injectSaga(key, {
      saga: saga,
      mode: mode
    });
    return function () {
      injectors.ejectSaga(key);
    };
  }, []);
};

/* eslint-disable no-underscore-dangle */
/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */

function createReducer() {
  var injectedReducers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var reducer = Object.keys(injectedReducers).length > 0 ? injectedReducers : {
    global: function global() {
      return {};
    }
  };
  var rootReducer = redux.combineReducers(reducer);
  return rootReducer;
}

function injectReducerFactory(store, isValid) {
  return function injectReducer(key, reducer, customCreateReducer) {
    if (!isValid) checkStore(store);
    invariant(typeOf(key) === 'string' && key && typeOf(reducer) === 'function', '(app/utils...) injectReducer: Expected `reducer` to be a reducer function'); // Check `store.injectedReducers[key] === reducer` for hot reloading when a key is the same but a reducer is different

    if (Reflect.has(store.injectedReducers, key) && store.injectedReducers[key] === reducer) return;
    store.injectedReducers[key] = reducer; // eslint-disable-line no-param-reassign

    store.replaceReducer((customCreateReducer || createReducer)(store.injectedReducers));
  };
}
function getInjectors$1(store) {
  checkStore(store);
  return {
    injectReducer: injectReducerFactory(store, true)
  };
}

/**
 * Dynamically injects a reducer
 *
 * @param {string} key A key of the reducer
 * @param {function} reducer A reducer that will be injected
 *
 */

var injectReducer = (function (_ref, createReducer) {
  var key = _ref.key,
      reducer = _ref.reducer;
  return function (WrappedComponent) {
    var ReducerInjector = /*#__PURE__*/function (_React$Component) {
      _inherits(ReducerInjector, _React$Component);

      var _super = _createSuper(ReducerInjector);

      function ReducerInjector(props, context) {
        var _this;

        _classCallCheck(this, ReducerInjector);

        _this = _super.call(this, props, context);
        getInjectors$1(context.store).injectReducer(key, reducer, createReducer);
        return _this;
      }

      _createClass(ReducerInjector, [{
        key: "render",
        value: function render() {
          return React__default.createElement(WrappedComponent, this.props);
        }
      }]);

      return ReducerInjector;
    }(React__default.Component);

    _defineProperty(ReducerInjector, "WrappedComponent", WrappedComponent);

    _defineProperty(ReducerInjector, "contextType", reactRedux.ReactReduxContext);

    _defineProperty(ReducerInjector, "displayName", "withReducer(".concat(WrappedComponent.displayName || WrappedComponent.name || 'Component', ")"));

    return hoistNonReactStatics(ReducerInjector, WrappedComponent);
  };
});

var useInjectReducer = function useInjectReducer(_ref2, createReducer) {
  var key = _ref2.key,
      reducer = _ref2.reducer;
  var context = React__default.useContext(reactRedux.ReactReduxContext);
  React__default.useEffect(function () {
    getInjectors$1(context.store).injectReducer(key, reducer, createReducer);
  }, []);
};

var selectAuthenticationDomain = function selectAuthenticationDomain(initialState, generatorKey) {
  return function (state) {
    return state[generatorKey] || initialState;
  };
};

var makeSelectAuthenticationState = function makeSelectAuthenticationState(_ref) {
  var apiEndPoints = _ref.apiEndPoints,
      initialState = _ref.initialState,
      InitialState = _ref.InitialState,
      generatorKey = _ref.generatorKey,
      constants = _ref.constants;
  return function () {
    return reselect.createSelector(selectAuthenticationDomain(initialState, generatorKey), function (substate) {
      return newObject(Object.keys(InitialState).reduce(function (acc, key) {
        return _objectSpread({}, acc, _defineProperty({}, key, substate[key]));
      }, {}), Object.keys(apiEndPoints[generatorKey]).reduce(function (acc, key) {
        return _objectSpread({}, acc, _defineProperty({}, key, substate[constants[key][CALL$1]]));
      }, {}));
    });
  };
};

var ignore = {
  component: [SUCCESS, ERROR],
  saga: [CALL$1, CANCEL$2, CUSTOM],
  cancel: [SUCCESS, ERROR, CALL$1, CUSTOM]
};
var bindKey = [CANCEL$2, CUSTOM];

var actionConverter = function actionConverter(action, actionName, ignoreStatus, type) {
  return Object.entries(action).reduce(function (acc, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    return ignoreStatus && ignore[type].includes(key) && acc || cloneObject(acc, _defineProperty({}, "".concat(actionName, "_").concat(key), bindKey.includes(key) && value.bind({}, action[CALL$1]().type) || value));
  }, {});
};

var actionConverter$1 = (function (action) {
  return Object.entries(action).reduce(function (acc, _ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        key = _ref4[0],
        value = _ref4[1];

    return {
      actions: cloneObject(acc.actions, actionConverter(value, key)),
      sagaActions: cloneObject(acc.sagaActions, actionConverter(value, key, true, 'saga')),
      componentActions: cloneObject(acc.componentActions, actionConverter(value, key, true, 'component')),
      cancelActions: cloneObject(acc.cancelActions, actionConverter(value, key, true, 'cancel'))
    };
  }, {});
});

var generateAction = (function (Actions) {
  var _actionConverter = actionConverter$1(Actions),
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

var executeTask = function executeTask(_ref, data) {
  var id = _ref.id,
      key = _ref.key;
  return !Array.isArray(data) ? data : Array.isArray(id) ? data.reduce(function (acc, curr) {
    return id.includes(curr[key]) ? acc : acc.concat([curr]);
  }, []) : data.filter(function (_ref2) {
    var objId = _ref2[key];
    return objId !== id;
  });
};

var deleteHandler = function deleteHandler(_ref3) {
  var _ref3$task = _ref3.task;
  _ref3$task = _ref3$task === void 0 ? {} : _ref3$task;
  var key = _ref3$task.key,
      id = _ref3$task.id,
      _ref3$task$subKey = _ref3$task.subKey,
      subKey = _ref3$task$subKey === void 0 ? [] : _ref3$task$subKey,
      _ref3$successData = _ref3.successData,
      successData = _ref3$successData === void 0 ? {} : _ref3$successData,
      successDataStatusCode = _ref3.successDataStatusCode;
  return function () {
    var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref4$data = _ref4.data,
        data = _ref4$data === void 0 ? [] : _ref4$data,
        statusCode = _ref4.statusCode;

    var commonData = {
      key: key,
      id: id
    };

    var _successData = typeOf(successData) === 'object' ? successData : {};

    return {
      data: subKey.length > 0 ? updateIn(_objectSpread({}, data, {}, _successData, _defineProperty({}, subKey[0], data[subKey[0]])), subKey, function (_data) {
        return executeTask(commonData, _data);
      }) : executeTask(commonData, data),
      statusCode: successDataStatusCode || statusCode,
      lastUpdated: generateTimeStamp(),
      isError: false
    };
  };
};

//   data: Data = {},
// }) => ({
//   data: updateIn(Data, filter, oldData =>
//     newObject(oldData, {
//       error: errorData || null,
//       isError: true,
//       lastUpdated: generateTimeStamp(),
//       isInfinite: undefined,
//       infiniteEnd: undefined,
//     }),
//   ),
// });

var errorHandler = function errorHandler() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      errorData = _ref.errorData,
      _ref$clearDataOnError = _ref.clearDataOnError,
      clearDataOnError = _ref$clearDataOnError === void 0 ? false : _ref$clearDataOnError;

  return function (_ref2) {
    var _ref2$data = _ref2.data,
        Data = _ref2$data === void 0 ? {} : _ref2$data;
    return _objectSpread({}, clearDataOnError ? {
      data: Array.isArray(Data) ? [] : {}
    } : {}, {
      error: errorData || null,
      isError: true,
      lastUpdated: generateTimeStamp(),
      isInfinite: null,
      infiniteEnd: null
    });
  };
};

var _CheckFilter = function _CheckFilter(Filter) {
  return Array.isArray(Filter) && Filter.length > 0 ? Filter : Filter && typeof Filter === 'string' ? Filter.split('.') : [];
};

var filterArrayErrorHandler = function filterArrayErrorHandler() {
  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      errorData = _ref3.errorData,
      filter = _ref3.filter,
      clearDataOnError = _ref3.clearDataOnError;

  return function (_ref4) {
    var _ref4$data = _ref4.data,
        Data = _ref4$data === void 0 ? {} : _ref4$data;
    return {
      data: function () {
        if (filter && filter.some(function (fil) {
          return Array.isArray(fil);
        })) {
          return filter.reduce(function (accumulator, filterArray) {
            return updateIn(accumulator, _CheckFilter(filterArray), function (data) {
              return _CheckFilter(filterArray).length > 0 ? newObject(data, function (_ref5) {
                var oldData = _ref5.data;
                return _objectSpread({}, clearDataOnError ? {
                  data: Array.isArray(oldData) ? [] : {}
                } : {}, {
                  error: errorData || null,
                  isError: true,
                  statusCode: 'ERROR',
                  lastUpdated: generateTimeStamp(),
                  isInfinite: null,
                  infiniteEnd: null
                });
              }) : data;
            });
          }, Data);
        }

        return updateIn(Data, filter, function (data) {
          return newObject(data, function (_ref6) {
            var oldData = _ref6.data;
            return _objectSpread({}, clearDataOnError ? {
              data: Array.isArray(oldData) ? [] : {}
            } : {}, {
              error: errorData || null,
              isError: true,
              statusCode: 'ERROR',
              lastUpdated: generateTimeStamp(),
              isInfinite: null,
              infiniteEnd: null
            });
          });
        });
      }()
    };
  };
};

var _CheckFilter$1 = function _CheckFilter(Filter) {
  return Array.isArray(Filter) && Filter.length > 0 ? Filter : Filter && typeof Filter === 'string' ? Filter.split('.') : [];
};

var commonFilterHandler = function commonFilterHandler(customHandler) {
  return function () {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$filter = _ref.filter,
        filter = _ref$filter === void 0 ? [] : _ref$filter,
        successDataStatusCode = _ref.successDataStatusCode,
        rest = _objectWithoutProperties$1(_ref, ["filter", "successDataStatusCode"]);

    return function (_ref2) {
      var _ref2$data = _ref2.data,
          Data = _ref2$data === void 0 ? {} : _ref2$data,
          statusCode = _ref2.statusCode;
      return {
        data: function () {
          var paramKey = _objectSpread({
            filter: filter
          }, rest);

          if (filter && filter.some(function (fil) {
            return Array.isArray(fil);
          })) {
            return filter.reduce(function (accumulator, filterArray) {
              return updateIn(accumulator, _CheckFilter$1(filterArray), function (data) {
                return _CheckFilter$1(filterArray).length > 0 ? newObject(data, customHandler(paramKey)) : data;
              });
            }, Data);
          }

          return updateIn(Data, filter, function (data) {
            return newObject(_objectSpread({}, data, {
              statusCode: successDataStatusCode || statusCode,
              lastUpdated: generateTimeStamp(),
              error: false,
              isError: false
            }), customHandler(paramKey));
          });
        }()
      };
    };
  };
};
/** for Future reference */
// export const filterArrayCustomHandler = ({
//   isInfinite,
//   successData,
//   clearData,
//   query,
//   filter,
//   customHandler,
//   ...rest
// } = {}) => ({ data: Data = {} }) => ({
//   data: updateIn(Data, filter, oldData =>
//     newObject(
//       oldData,
//       customHandler({ isInfinite, successData, query, clearData, ...rest }),
//     ),
//   ),
// });

/* eslint-disable no-console */

/* eslint-disable indent */

/* eslint-disable no-nested-ternary */

/* eslint-disable no-self-compare */

/* eslint-disable prefer-const */

/* eslint-disable no-var */

/* eslint-disable no-plusplus */

/* eslint-disable no-lonely-if */

/* eslint-disable no-unused-expressions */

/* eslint-disable no-underscore-dangle */
var CONSTRUCTOR_CHECK = {
  string: String,
  number: Number,
  boolean: Boolean
};

var errorConsole = function errorConsole(parentObj, error, path) {
  var func = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var notFound = arguments.length > 4 ? arguments[4] : undefined;
  if (!func) console.log("%c".concat(notFound ? '%c key' : "".concat(parentObj, " %c is undefined"), "%c \"").concat(error, "\" %cnot found ").concat(notFound ? "in %c\"".concat(parentObj, "\"%c object") : '%c%c', " %c ").concat(path, " %c is invalid"), 'background: #000; color: red; font-size: 12px', 'background: #000; color: orange; font-size: 12px', 'background: #000; color: red; font-size: 12px', 'background: #000; color: orange; font-size: 12px', 'background: #000; color: green; font-size: 12px', 'background: #000; color: orange; font-size: 12px', 'background: #000; color: red; font-size: 12px', 'background: #000; color: orange; font-size: 12px');else console.log("%c".concat(parentObj, " %c is found %c \"").concat(error, "\" %c not a function %c ").concat(path, " %c is invalid"), 'background: #000; color: red; font-size: 12px', 'background: #000; color: orange; font-size: 12px', 'background: #000; color: red; font-size: 12px', 'background: #000; color: orange; font-size: 12px', 'background: #000; color: red; font-size: 12px', 'background: #000; color: orange; font-size: 12px');
};

var errorLog = function errorLog() {
  var e = new Error();
  var stack = e.stack.toString().split(/\r\n|\n/);
  console.log('Error :');
  stack.splice(0, 1);
  stack.map(function (err, index) {
    return console.log("[".concat(stack[stack.length - 1 - index], " ]"));
  }); // console.log(`[ Error ${stack[stack.length - 1]} ]`);
};
/**
 * Required parameter for nullcheck
 *  @param object parent object {},[] !9
 *  @param path  path to be execute eg: a.b.c.e()[0]().f !(Required)
 *  @param default  default value to be print if it is null or error (optional)
 *  @param func  function parameters [ [1],[2]] (optional)
 *  @param errorDisplay  whether to show error in console - default false (optional)
 */


var nullCheck = function nullCheck(Error) {
  var obj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var path = arguments.length > 2 ? arguments[2] : undefined;
  var def = arguments.length > 3 ? arguments[3] : undefined;
  var callBack = arguments.length > 4 ? arguments[4] : undefined;
  var func = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : [];
  var errorDisplay = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
  var returnDefaultData = def !== undefined ? def : undefined;

  if (typeof path !== 'string') {
    if (errorDisplay) {
      console.log("%c[Object] path is invalid it should be string", 'background: #000; color: orange; font-size: 12px');
      errorLog(new Error());
    }

    return typeof callBack === 'function' ? callBack(returnDefaultData) : returnDefaultData;
  }

  var propNames = path.split(/\.|\[|\(/);
  propNames = propNames.map(function (prop) {
    return prop.replace(/\]|\(/g, '').replace(/\)/, '()');
  });
  var parent = propNames.splice(0, 1);

  if (!obj || _typeof$2(obj) !== 'object' || Object.keys(obj).length === 0) {
    if (errorDisplay) errorLog(new Error());
    return typeof callBack === 'function' ? callBack(returnDefaultData) : returnDefaultData;
  }

  var data = obj;
  var error = parent;
  var index = 0;
  var parentObj = error; // eslint-disable-next-line no-undef-init

  var type = undefined;

  for (var key = 0; key < propNames.length; key++) {
    if (data[propNames[key]] || typeof data === 'boolean' || Object.prototype.hasOwnProperty.call(data, propNames[key])) {
      if (Number(propNames[key]) || Number(propNames[key]) === 0) error = "".concat(error, "[").concat(propNames[key], "]");else error = "".concat(error, ".").concat(propNames[key]);
      data = data[propNames[key]];
      if (!data && typeof data !== 'boolean' && key === propNames.length - 1) return typeof callBack === 'function' ? callBack(def !== undefined ? def : data) : def !== undefined ? def : data;

      if (!data && typeof data !== 'boolean') {
        if (errorDisplay) {
          errorLog(new Error());
          errorConsole(parentObj, error, path);
        }

        return typeof callBack === 'function' ? callBack(def !== undefined ? def : data) : def !== undefined ? def : data;
      }

      if ((data || typeof data === 'boolean') && propNames[key + 1] && typeof data[propNames[key + 1]] === 'function') {
        type = data;
      }

      if (propNames[key + 1]) {
        if (propNames[key + 1] === '()' && typeof data !== 'function') {
          if (errorDisplay) {
            errorLog(new Error());
            errorConsole(parentObj, error, path, true);
          }

          return typeof callBack === 'function' ? callBack(returnDefaultData) : returnDefaultData;
        }

        if (_typeof$2(data) !== 'object' && propNames[key + 1] !== '()' && !data[propNames[key + 1]] && typeof data !== 'boolean') {
          if (errorDisplay) {
            errorLog(new Error());
            errorConsole(parentObj, error, path, false);
          }

          return typeof callBack === 'function' ? callBack(returnDefaultData) : returnDefaultData;
        }
      }
    } else if (propNames[key] === '()') {
      error = "".concat(error).concat(propNames[key]);

      if (typeof data === 'function') {
        if (CONSTRUCTOR_CHECK[_typeof$2(type)]) {
          if (func && func[index]) data = CONSTRUCTOR_CHECK[_typeof$2(type)].prototype[propNames[key - 1]].apply(type, func[index]);else data = CONSTRUCTOR_CHECK[_typeof$2(type)].prototype[propNames[key - 1]].call(type);
        } else {
          if (func && func[index]) data = data.apply({}, _toConsumableArray(func[index]));else data = data();
        }

        if (!data && typeof data !== 'boolean' && key === propNames.length - 1) return typeof callBack === 'function' ? callBack(def !== undefined ? def : data) : def !== undefined ? def : data;

        if (!data && typeof data !== 'boolean') {
          if (errorDisplay) {
            errorLog(new Error());
            errorConsole(parentObj, error, path);
          }

          return typeof callBack === 'function' ? callBack(def !== undefined ? def : data) : def !== undefined ? def : data;
        }
      } else {
        if (errorDisplay) {
          errorLog(new Error());
          errorConsole(parentObj, error, path, true);
        }

        return typeof callBack === 'function' ? callBack(returnDefaultData) : returnDefaultData;
      }

      if (!data && typeof data !== 'boolean' && key === propNames.length - 1) return typeof callBack === 'function' ? callBack(def !== undefined ? def : data) : def !== undefined ? def : data;

      if (!data && typeof data !== 'boolean') {
        if (errorDisplay) {
          errorLog(new Error());
          errorConsole(parentObj, error, path);
        }

        return typeof callBack === 'function' ? callBack(def !== undefined ? def : data) : def !== undefined ? def : data;
      }

      if ((data || typeof data === 'boolean') && propNames[key + 1] && typeof data[propNames[key + 1]] === 'function') {
        type = data;
      }

      if (propNames[key + 1]) {
        if (propNames[key + 1] === '()' && typeof data !== 'function') {
          if (errorDisplay) {
            errorLog(new Error());
            errorConsole(parentObj, error, path, true);
          }

          return typeof callBack === 'function' ? callBack(returnDefaultData) : returnDefaultData;
        }

        if (_typeof$2(data) !== 'object' && propNames[key + 1] !== '()' && !data[propNames[key + 1]] && typeof data !== 'boolean') {
          if (errorDisplay) {
            errorLog(new Error());
            errorConsole(parentObj, error, path, true);
          }

          return typeof callBack === 'function' ? callBack(returnDefaultData) : returnDefaultData;
        }
      }

      index += 1;
    } else {
      if (Number(propNames[key]) || Number(propNames[key]) === 0) error = "".concat(error, "[").concat(propNames[key], "]");else error = "".concat(error, ".").concat(propNames[key]);

      if (errorDisplay) {
        errorLog(new Error());
        errorConsole(error, propNames[key], path, false, true);
      }

      return typeof callBack === 'function' ? callBack(returnDefaultData) : returnDefaultData;
    }

    parentObj = error;
  }

  var verifyData = (data || typeof data === 'boolean') && Object.prototype.toString.call(def) !== '[object Null]' && typeof def !== 'undefined' && Object.prototype.toString.call(data) === Object.prototype.toString.call(def) ? data : typeof def !== 'undefined' ? def : data;
  return typeof callBack === 'function' ? callBack(verifyData) : verifyData;
};

var nullcheck = nullCheck.bind(null, Error);

var infiniteHandler = function infiniteHandler(_ref) {
  var _ref$task = _ref.task;
  _ref$task = _ref$task === void 0 ? {} : _ref$task;
  var clearData = _ref$task.clearData,
      _ref$task$subKey = _ref$task.subKey,
      subKey = _ref$task$subKey === void 0 ? [] : _ref$task$subKey,
      limit = _ref$task.limit,
      _ref$task$isAppendTop = _ref$task.isAppendTop,
      isAppendTop = _ref$task$isAppendTop === void 0 ? false : _ref$task$isAppendTop,
      setInfiniteEnd = _ref$task.setInfiniteEnd,
      _ref$callback = _ref.callback;
  _ref$callback = _ref$callback === void 0 ? {} : _ref$callback;
  var updateCallback = _ref$callback.updateCallback,
      _ref$successData = _ref.successData,
      successData = _ref$successData === void 0 ? {} : _ref$successData,
      successDataStatusCode = _ref.successDataStatusCode;
  return function () {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref2$data = _ref2.data,
        oldData = _ref2$data === void 0 ? {} : _ref2$data,
        statusCode = _ref2.statusCode;

    return {
      data: function () {
        if (subKey.length > 0 && Array.isArray(getIn(oldData, subKey))) {
          var _oldCopyData = _objectSpread({}, oldData, {}, typeOf(successData) === 'object' ? successData : {}, _defineProperty({}, subKey[0], oldData[subKey[0]])); // return _oldCopyData


          return updateIn(_oldCopyData, subKey, function (_oldData) {
            if (clearData) return nullcheck(successData, ".".concat(subKey.join('.')), []);
            return updateCallback ? updateCallback(_oldData, nullcheck(successData, ".".concat(subKey.join('.')), [])) : isAppendTop ? nullcheck(successData, ".".concat(subKey.join('.')), []).concat(_oldData) : _oldData.concat(nullcheck(successData, ".".concat(subKey.join('.')), []));
          });
        }

        var getData = Array.isArray(successData) ? successData : [];
        var appendData = Array.isArray(oldData) ? isAppendTop ? getData.concat(oldData) : oldData.concat(getData) : getData;
        var newData = clearData ? successData : Array.isArray(successData) ? appendData : successData;
        return updateCallback ? updateCallback(oldData, successData) : newData;
      }(),
      error: false,
      lastUpdated: generateTimeStamp(),
      statusCode: successDataStatusCode || statusCode,
      isInfinite: true,
      isError: false,
      infiniteEnd: setInfiniteEnd !== undefined && typeof setInfiniteEnd === 'function' ? setInfiniteEnd(successData) : limit !== undefined && typeof limit === 'number' ? (subKey.length > 0 ? nullcheck(successData, ".".concat(subKey.join('.')), []) : successData).length < limit : null
    };
  };
};

//   data: Data = {},
// } = {}) => ({
//   data: updateIn(Data, filter, oldData =>
//     newObject(oldData, {
//       loading: {
//         status: loader,
//         lastUpdated: generateTimeStamp(),
//       },
//     }),
//   ),
// });

var _CheckFilter$2 = function _CheckFilter(Filter) {
  return Array.isArray(Filter) && Filter.length > 0 ? Filter : Filter && typeof Filter === 'string' ? Filter.split('.') : [];
};

var returnData = function returnData(data, initialData, clearData, loader) {
  return newObject(data, function (_ref) {
    var _data = _ref.data;
    return _objectSpread({
      loading: {
        status: loader,
        lastUpdated: generateTimeStamp()
      }
    }, clearData || initialData ? {
      data: Array.isArray(_data) ? initialData || [] : initialData || {}
    } : {});
  });
};

var filterArrayloadingHandler = function filterArrayloadingHandler() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      loader = _ref2.loader,
      filter = _ref2.filter,
      clearData = _ref2.clearData,
      initialData = _ref2.initialData;

  return function (_ref3) {
    var _ref3$data = _ref3.data,
        Data = _ref3$data === void 0 ? {} : _ref3$data;
    return {
      data: function () {
        if (filter && filter.some(function (fil) {
          return Array.isArray(fil);
        })) {
          return filter.reduce(function (accumulator, filterArray) {
            return updateIn(accumulator, _CheckFilter$2(filterArray), function (data) {
              return _CheckFilter$2(filterArray).length > 0 ? returnData(data, initialData, clearData, loader) : data;
            });
          }, Data);
        }

        return updateIn(Data, filter, function (data) {
          return returnData(data, initialData, clearData, loader);
        });
      }()
    };
  };
};

var _CheckFilter$3 = function _CheckFilter(Filter) {
  return Array.isArray(Filter) && Filter.length > 0 ? Filter : Filter && typeof Filter === 'string' ? Filter.split('.') : [];
};

var filterArrayToastEmptyHandler = function filterArrayToastEmptyHandler() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      filter = _ref.filter,
      isInfinite = _ref.isInfinite;

  return function (_ref2) {
    var _ref2$data = _ref2.data,
        Data = _ref2$data === void 0 ? {} : _ref2$data;
    return {
      data: function () {
        if (filter && filter.some(function (fil) {
          return Array.isArray(fil);
        })) {
          return filter.reduce(function (accumulator, filterArray) {
            return updateIn(accumulator, _CheckFilter$3(filterArray), function (data) {
              return _CheckFilter$3(filterArray).length > 0 ? newObject(data, function (_ref3) {
                var _ref3$toast = _ref3.toast,
                    toast = _ref3$toast === void 0 ? {} : _ref3$toast;
                return {
                  isInfinite: isInfinite,
                  toast: newObject(toast, {
                    message: '',
                    status: '',
                    isError: null,
                    key: ''
                  })
                };
              }) : data;
            });
          }, Data);
        }

        return updateIn(Data, filter, function (data) {
          return newObject(data, function (_ref4) {
            var _ref4$toast = _ref4.toast,
                toast = _ref4$toast === void 0 ? {} : _ref4$toast;
            return {
              isInfinite: isInfinite,
              toast: newObject(toast, {
                message: '',
                status: '',
                isError: null,
                key: ''
              })
            };
          });
        });
      }()
    };
  };
}; // export const filterArrayToastEmptyHandler = ({ filter, isInfinite }) => ({
//   statusCode,
//   filter,
//   message,
//   isError,
//   type,
// } = {}) => ({ data: Data = {} } = {}) => ({
//   data: updateIn(Data, filter, oldData =>
//     newObject(oldData, {
//       toast: {
//         isError:
//           typeof isError === 'boolean'
//             ? isError
//             : ![200, 201].includes(statusCode),
//         status: statusCode,
//         message,
//         key: type,
//         lastUpdated: generateTimeStamp(),
//       },
//     }),
//   ),
// });

var filterArrayToastHandler = function filterArrayToastHandler() {
  var _ref10 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      statusCode = _ref10.statusCode,
      filter = _ref10.filter,
      message = _ref10.message,
      isError = _ref10.isError,
      type = _ref10.type;

  return function (_ref11) {
    var _ref11$data = _ref11.data,
        Data = _ref11$data === void 0 ? {} : _ref11$data;
    return {
      data: function () {
        if (filter && filter.some(function (fil) {
          return Array.isArray(fil);
        })) {
          return filter.reduce(function (accumulator, filterArray) {
            return updateIn(accumulator, _CheckFilter$3(filterArray), function (data) {
              return _CheckFilter$3(filterArray).length > 0 ? newObject(data, {
                toast: {
                  isError: typeof isError === 'boolean' ? isError : ![200, 201].includes(statusCode),
                  status: statusCode,
                  message: message,
                  key: type,
                  lastUpdated: generateTimeStamp()
                }
              }) : data;
            });
          }, Data);
        }

        return updateIn(Data, filter, function (data) {
          return newObject(data, {
            toast: {
              isError: typeof isError === 'boolean' ? isError : ![200, 201].includes(statusCode),
              status: statusCode,
              message: message,
              key: type,
              lastUpdated: generateTimeStamp()
            }
          });
        });
      }()
    };
  };
};

var updateData = function updateData(data, successData, updateCallback) {
  if (updateCallback) return updateCallback(data, successData) || data;
  if (_typeof$2(successData) === 'object' && !Array.isArray(successData) && _typeof$2(data) === 'object' && !Array.isArray(data)) return newObject(data, successData);
  return successData;
};

var updateHandler = function updateHandler(_ref) {
  var _ref$task = _ref.task;
  _ref$task = _ref$task === void 0 ? {} : _ref$task;
  var key = _ref$task.key,
      id = _ref$task.id,
      _ref$task$subKey = _ref$task.subKey,
      subKey = _ref$task$subKey === void 0 ? [] : _ref$task$subKey,
      _ref$task$values = _ref$task.values,
      values = _ref$task$values === void 0 ? {} : _ref$task$values,
      _ref$callback = _ref.callback;
  _ref$callback = _ref$callback === void 0 ? {} : _ref$callback;
  var updateCallback = _ref$callback.updateCallback,
      _ref$successData = _ref.successData,
      successData = _ref$successData === void 0 ? {} : _ref$successData,
      successDataStatusCode = _ref.successDataStatusCode;
  return function () {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref2$data = _ref2.data,
        data = _ref2$data === void 0 ? [] : _ref2$data,
        statusCode = _ref2.statusCode;

    return {
      data: subKey.length > 0 ? updateIn(_objectSpread({}, data, {}, typeOf(successData) === 'object' ? successData : {}, _defineProperty({}, subKey[0], data[subKey[0]])), subKey, function (_Data) {
        return function () {
          var index = -1;

          var _values = Array.isArray(values);
          /**  update data if old data is object */


          if (!Array.isArray(_Data)) return updateData(_Data, nullcheck(successData, ".".concat(subKey.join('.'))), updateCallback);
          if (Array.isArray(id) && key && Array.isArray(_Data)) return _Data.reduce(function (acc) {
            var curr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return id.includes(curr[key]) ? function () {
              index += 1;
              return acc.concat([updateData(curr, values[_values ? index : curr[key]] || curr, updateCallback)]);
            }() : acc.concat([curr]);
          }, []);
          if ((id === 0 || id) && key) return _Data.map(function (_data) {
            return _data[key] === id ? function () {
              index += 1;
              return updateData(_data, values[_values ? index : _data[key]] || _data, updateCallback);
            }() : _data;
          });
          return updateData(_Data, nullcheck(successData, ".".concat(subKey.join('.'))), updateCallback);
        }();
      }) : function () {
        var index = -1;

        var _values = Array.isArray(values);

        if (!Array.isArray(data)) return updateData(data, successData, updateCallback);
        if (Array.isArray(id) && key) return data.reduce(function (acc) {
          var curr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          return id.includes(curr[key]) ? function () {
            index += 1;
            return acc.concat([updateData(curr, values[_values ? index : curr[key]] || curr, updateCallback)]);
          }() : acc.concat([curr]);
        }, []);
        if ((id === 0 || id) && key) return data.map(function (_data) {
          return _data[key] === id ? function () {
            index += 1;
            return updateData(_data, values[_values ? index : _data[key]] || _data, updateCallback);
          }() : _data;
        });
        return updateData(data, successData, updateCallback);
      }(),
      statusCode: successDataStatusCode || statusCode,
      lastUpdated: generateTimeStamp(),
      isError: false
    };
  };
};

var deletedData = function deletedData() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var keyArray = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  // eslint-disable-next-line no-underscore-dangle
  var _obj = obj;
  _obj = typeOf(obj) === 'object' ? _objectSpread({}, _obj) : _obj;

  if (typeOf(obj) === 'object') {
    (Array.isArray(keyArray) ? keyArray : [keyArray]).forEach(function (_key) {
      _obj = Array.isArray(_key) ? deleteIn(_obj, _key) : deleteIn(_obj, [_key]);
    });
    return _obj;
  }

  return obj;
};

var executeTask$1 = function executeTask(_ref, data) {
  var updateCallback = _ref.updateCallback,
      successData = _ref.successData,
      deleteKey = _ref.deleteKey,
      id = _ref.id,
      key = _ref.key;
  return updateCallback ? updateCallback(data, successData) || data : !Array.isArray(data) ? deletedData(data, deleteKey) : Array.isArray(id) ? data.reduce(function (acc, curr) {
    return id.includes(curr[key]) ? acc.concat([deletedData(curr, deleteKey)]) : acc.concat([curr]);
  }, []) : data.map(function (_data) {
    return _data[key] === id ? deletedData(_data, deleteKey) : _data;
  });
};

var deleteKeyHandler = function deleteKeyHandler(_ref2) {
  var _ref2$task = _ref2.task;
  _ref2$task = _ref2$task === void 0 ? {} : _ref2$task;
  var key = _ref2$task.key,
      id = _ref2$task.id,
      _ref2$task$deleteKey = _ref2$task.deleteKey,
      deleteKey = _ref2$task$deleteKey === void 0 ? [] : _ref2$task$deleteKey,
      _ref2$task$subKey = _ref2$task.subKey,
      subKey = _ref2$task$subKey === void 0 ? [] : _ref2$task$subKey,
      _ref2$callback = _ref2.callback;
  _ref2$callback = _ref2$callback === void 0 ? {} : _ref2$callback;
  var updateCallback = _ref2$callback.updateCallback,
      _ref2$successData = _ref2.successData,
      successData = _ref2$successData === void 0 ? {} : _ref2$successData,
      successDataStatusCode = _ref2.successDataStatusCode;
  return function () {
    var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref3$data = _ref3.data,
        data = _ref3$data === void 0 ? {} : _ref3$data,
        statusCode = _ref3.statusCode;

    var commonData = {
      updateCallback: updateCallback,
      successData: successData,
      deleteKey: deleteKey,
      id: id,
      key: key
    };
    return {
      data: subKey.length > 0 ? updateIn(_objectSpread({}, data, {}, successData, _defineProperty({}, subKey[0], data[subKey[0]])), subKey, function (_Data) {
        return executeTask$1(commonData, _Data);
      }) : executeTask$1(commonData, data),
      statusCode: successDataStatusCode || statusCode,
      lastUpdated: generateTimeStamp(),
      isError: false
    };
  };
};

var resetHandler = function resetHandler(state, newState, _ref) {
  var type = _ref.response.type;
  var customType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
  return newObject(state, function (_ref2) {
    var Data = _ref2[customType || type];
    return _defineProperty({}, customType || type, newObject(Data, function (_ref3) {
      var data = _ref3.data,
          toast = _ref3.toast,
          infiniteEnd = _ref3.infiniteEnd;
      return {
        data: Array.isArray(data) && [] || {},
        toast: newObject(toast, {
          message: '',
          status: ''
        }),
        isError: false,
        statusCode: 200,
        infiniteEnd: typeof infiniteEnd === 'boolean' ? false : undefined,
        lastUpdated: generateTimeStamp()
      };
    }));
  });
};

var _CheckFilter$4 = function _CheckFilter(Filter) {
  return Array.isArray(Filter) && Filter.length > 0 ? Filter : Filter && typeof Filter === 'string' ? Filter.split('.') : [];
};

var filterArrayResetHandler = function filterArrayResetHandler(state, newState, action, filter) {
  var customType = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;
  var type = action.response.type;
  return newObject(state, function (_ref5) {
    var oldData = _ref5[customType || type];
    return _defineProperty({}, type, newObject(oldData, function () {
      var _ref6 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref6$data = _ref6.data,
          Data = _ref6$data === void 0 ? {} : _ref6$data;

      return {
        data: function () {
          if (filter && filter.some(function (fil) {
            return Array.isArray(fil);
          })) {
            return filter.reduce(function (accumulator, filterArray) {
              return updateIn(accumulator, _CheckFilter$4(filterArray), function (_data) {
                return _CheckFilter$4(filterArray).length > 0 ? newObject(_data, function (_ref7) {
                  var data = _ref7.data,
                      toast = _ref7.toast,
                      infiniteEnd = _ref7.infiniteEnd;
                  return {
                    data: Array.isArray(data) && [] || {},
                    toast: newObject(toast, {
                      message: '',
                      status: ''
                    }),
                    isError: false,
                    infiniteEnd: typeof infiniteEnd === 'boolean' ? false : undefined,
                    lastUpdated: generateTimeStamp()
                  };
                }) : _data;
              });
            }, Data);
          }

          return updateIn(Data, filter, function (updateData) {
            return newObject(updateData, function (_ref8) {
              var data = _ref8.data,
                  toast = _ref8.toast,
                  infiniteEnd = _ref8.infiniteEnd;
              return {
                data: Array.isArray(data) && [] || {},
                toast: newObject(toast, {
                  message: '',
                  status: ''
                }),
                isError: false,
                infiniteEnd: typeof infiniteEnd === 'boolean' ? false : undefined,
                lastUpdated: generateTimeStamp()
              };
            });
          });
        }()
      };
    }));
  });
};

var updateData$1 = function updateData(data, successData, updateCallback, updateKey) {
  if (updateCallback) return updateCallback(data, successData) || data;

  if (_typeof$2(successData) === 'object' && !Array.isArray(successData) && _typeof$2(data) === 'object' && !Array.isArray(data)) {
    return !updateKey ? data : updateKey.reduce(function (acc, key) {
      if (Array.isArray(key) && key.length > 0) {
        return updateIn(acc, key, function (_data) {
          return nullcheck(successData, ".".concat(key.join('.')));
        });
      }

      return _objectSpread({}, acc, _defineProperty({}, key, successData[key]));
    }, data);
  }

  return successData;
};

var updateKeyHandler = function updateKeyHandler(_ref) {
  var _ref$task = _ref.task;
  _ref$task = _ref$task === void 0 ? {} : _ref$task;
  var key = _ref$task.key,
      id = _ref$task.id,
      _ref$task$subKey = _ref$task.subKey,
      subKey = _ref$task$subKey === void 0 ? [] : _ref$task$subKey,
      _ref$task$values = _ref$task.values,
      values = _ref$task$values === void 0 ? {} : _ref$task$values,
      _ref$task$updateKey = _ref$task.updateKey,
      updateKey = _ref$task$updateKey === void 0 ? [] : _ref$task$updateKey,
      _ref$callback = _ref.callback;
  _ref$callback = _ref$callback === void 0 ? {} : _ref$callback;
  var updateCallback = _ref$callback.updateCallback,
      _ref$successData = _ref.successData,
      successData = _ref$successData === void 0 ? {} : _ref$successData,
      successDataStatusCode = _ref.successDataStatusCode;
  return function () {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref2$data = _ref2.data,
        data = _ref2$data === void 0 ? [] : _ref2$data,
        statusCode = _ref2.statusCode;

    return {
      data: subKey.length > 0 ? updateIn(_objectSpread({}, data, {}, successData, _defineProperty({}, subKey[0], data[subKey[0]])), subKey, function (_Data) {
        return function () {
          var index = -1;

          var _values = Array.isArray(values);
          /**  update data if old data is object */


          if (!Array.isArray(_Data)) return updateData$1(_Data, nullcheck(successData, ".".concat(subKey.join('.'))), updateCallback, updateKey);else if (Array.isArray(id) && key && Array.isArray(_Data)) return _Data.reduce(function (acc) {
            var curr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return id.includes(curr[key]) ? function () {
              index += 1;
              return acc.concat([updateData$1(curr, values[_values ? index : curr[key]] || curr, updateCallback, updateKey)]);
            }() : acc.concat([curr]);
          }, []);else if ((id === 0 || id) && key) return _Data.map(function (_data) {
            return _data[key] === id ? function () {
              index += 1;
              return updateData$1(_data, values[_values ? index : _data[key]] || _data, updateCallback, updateKey);
            }() : _data;
          });
          return updateData$1(_Data, nullcheck(successData, ".".concat(subKey.join('.'))), updateCallback, updateKey);
        }();
      }) : function () {
        var index = -1;

        var _values = Array.isArray(values);

        if (!Array.isArray(data)) return updateData$1(data, successData, updateCallback, updateKey);else if (Array.isArray(id) && key) return data.reduce(function (acc) {
          var curr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          return id.includes(curr[key]) ? function () {
            index = index + 1;
            return acc.concat([updateData$1(curr, values[_values ? index : curr[key]] || curr, updateCallback, updateKey)]);
          }() : acc.concat([curr]);
        }, []);else if ((id === 0 || id) && key) return data.map(function (_data) {
          return _data[key] === id ? function () {
            index = index + 1;
            return updateData$1(_data, values[_values ? index : _data[key]], updateCallback, updateKey);
          }() : _data;
        });
        return updateData$1(data, successData, updateCallback, updateKey);
      }(),
      statusCode: successDataStatusCode || statusCode,
      lastUpdated: generateTimeStamp(),
      isError: false
    };
  };
};

var toggleData = function toggleData(obj, keyArray) {
  return Object.keys(obj).reduce(function (acc, curr) {
    return _objectSpread({}, acc, _defineProperty({}, curr, keyArray.includes(curr) ? !obj[curr] : obj[curr]));
  }, {});
};

var executeTask$2 = function executeTask(_ref, _Data) {
  var successData = _ref.successData,
      toggleKey = _ref.toggleKey,
      id = _ref.id,
      key = _ref.key,
      updateCallback = _ref.updateCallback;
  return updateCallback ? updateCallback(_Data, successData) || _Data : !Array.isArray(_Data) ? toggleData(_Data, toggleKey) : Array.isArray(id) ? _Data.reduce(function (acc, curr) {
    return id.includes(curr[key]) ? acc.concat([toggleData(curr, toggleKey)]) : acc.concat([curr]);
  }, []) : _Data.map(function (_data) {
    return _data[key] === id ? toggleData(_data, toggleKey) : _data;
  });
};

var toggleKeyHandler = function toggleKeyHandler(_ref2) {
  var _ref2$task = _ref2.task;
  _ref2$task = _ref2$task === void 0 ? {} : _ref2$task;
  var key = _ref2$task.key,
      id = _ref2$task.id,
      _ref2$task$toggleKey = _ref2$task.toggleKey,
      toggleKey = _ref2$task$toggleKey === void 0 ? [] : _ref2$task$toggleKey,
      _ref2$task$subKey = _ref2$task.subKey,
      subKey = _ref2$task$subKey === void 0 ? [] : _ref2$task$subKey,
      _ref2$callback = _ref2.callback;
  _ref2$callback = _ref2$callback === void 0 ? {} : _ref2$callback;
  var updateCallback = _ref2$callback.updateCallback,
      _ref2$successData = _ref2.successData,
      successData = _ref2$successData === void 0 ? {} : _ref2$successData,
      successDataStatusCode = _ref2.successDataStatusCode;
  return function () {
    var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref3$data = _ref3.data,
        data = _ref3$data === void 0 ? {} : _ref3$data,
        statusCode = _ref3.statusCode;

    var commonData = {
      successData: successData,
      toggleKey: toggleKey,
      id: id,
      key: key,
      updateCallback: updateCallback
    };
    return {
      data: subKey.length > 0 ? updateIn(_objectSpread({}, data, {}, typeOf(successData) === 'object' ? successData : {}, _defineProperty({}, subKey[0], data[subKey[0]])), subKey, function (_Data) {
        return executeTask$2(commonData, _Data);
      }) : executeTask$2(commonData, data),
      statusCode: successDataStatusCode || statusCode,
      lastUpdated: generateTimeStamp(),
      isError: false
    };
  };
};

var _checkIsNotObject = function _checkIsNotObject(data) {
  return Object.prototype.toString.call(data) !== '[object Object]';
};

var dataHandler = function dataHandler(_ref) {
  var isMutation = _ref.mutation,
      _ref$task = _ref.task;
  _ref$task = _ref$task === void 0 ? {} : _ref$task;
  var clearData = _ref$task.clearData,
      _ref$task$subKey = _ref$task.subKey,
      subKey = _ref$task$subKey === void 0 ? [] : _ref$task$subKey,
      _ref$callback = _ref.callback;
  _ref$callback = _ref$callback === void 0 ? {} : _ref$callback;
  var updateCallback = _ref$callback.updateCallback,
      _ref$successData = _ref.successData,
      successData = _ref$successData === void 0 ? {} : _ref$successData,
      successDataStatusCode = _ref.successDataStatusCode;
  return function () {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref2$data = _ref2.data,
        oldData = _ref2$data === void 0 ? {} : _ref2$data,
        statusCode = _ref2.statusCode,
        rest = _objectWithoutProperties$1(_ref2, ["data", "statusCode"]);

    return isMutation ? _objectSpread({
      data: oldData,
      statusCode: statusCode
    }, rest, {}, successData) : {
      data: function () {
        if (subKey.length > 0) {
          var _oldCopyData = _objectSpread({}, oldData, {}, _checkIsNotObject(successData) ? {} : successData, _defineProperty({}, subKey[0], oldData[subKey[0]]));

          return updateIn(_oldCopyData, subKey, function (_oldData) {
            if (clearData) return nullcheck(successData, ".".concat(subKey.join('.')));
            return updateCallback ? updateCallback(_oldData, nullcheck(successData, ".".concat(subKey.join('.')))) : _checkIsNotObject(nullcheck(successData, ".".concat(subKey.join('.')))) || _checkIsNotObject(nullcheck(_oldData, ".".concat(subKey.join('.')))) ? nullcheck(successData, ".".concat(subKey.join('.'))) : newObject(_oldData, nullcheck(successData, ".".concat(subKey.join('.'))));
          });
        }

        return updateCallback ? updateCallback(oldData, successData) : _checkIsNotObject(successData) || _checkIsNotObject(oldData) || clearData ? successData : newObject(oldData, successData);
      }(),
      statusCode: successDataStatusCode || statusCode,
      error: false,
      lastUpdated: generateTimeStamp(),
      isInfinite: null,
      infiniteEnd: null,
      isError: false
    };
  };
};

/* eslint-disable */
var dontUpdateDataHandler = function dontUpdateDataHandler(_ref) {
  var successDataStatusCode = _ref.successDataStatusCode;
  return function () {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        statusCode = _ref2.statusCode;

    return {
      statusCode: successDataStatusCode || statusCode,
      error: false,
      lastUpdated: generateTimeStamp(),
      isError: false
    };
  };
};

var spliceHandler = function spliceHandler(_ref) {
  var _ref$task = _ref.task;
  _ref$task = _ref$task === void 0 ? {} : _ref$task;
  var clearData = _ref$task.clearData,
      _ref$task$spliceKey = _ref$task.spliceKey,
      spliceKey = _ref$task$spliceKey === void 0 ? [] : _ref$task$spliceKey,
      _ref$task$subKey = _ref$task.subKey,
      subKey = _ref$task$subKey === void 0 ? [] : _ref$task$subKey,
      _ref$callback = _ref.callback;
  _ref$callback = _ref$callback === void 0 ? {} : _ref$callback;
  var updateCallback = _ref$callback.updateCallback,
      _ref$successData = _ref.successData,
      successData = _ref$successData === void 0 ? {} : _ref$successData,
      successDataStatusCode = _ref.successDataStatusCode;
  return function () {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref2$data = _ref2.data,
        oldData = _ref2$data === void 0 ? {} : _ref2$data,
        statusCode = _ref2.statusCode;

    return {
      data: function () {
        if (subKey.length > 0 && Array.isArray(getIn(oldData, subKey))) {
          var _oldCopyData = _objectSpread({}, oldData, {}, typeOf(successData) === 'object' ? successData : {}, _defineProperty({}, subKey[0], oldData[subKey[0]])); // return _oldCopyData


          return updateIn(_oldCopyData, subKey, function (_oldData) {
            if (clearData) return nullcheck(successData, ".".concat(subKey.join('.')), []);
            return updateCallback ? updateCallback(_oldData, nullcheck(successData, ".".concat(subKey.join('.')), [])) : Array.isArray(_oldData) ? function () {
              var _newData = _oldData.slice();

              _newData.splice.apply(_newData, _toConsumableArray(spliceKey).concat(_toConsumableArray(nullcheck(successData, ".".concat(subKey.join('.')), []))));

              return _newData;
            }() : _oldData;
          });
        }

        var newData = Array.isArray(oldData) ? function () {
          var _newData = oldData.slice();

          return _newData.splice.apply(_newData, _toConsumableArray(spliceKey).concat(_toConsumableArray(nullcheck(successData, ".".concat(subKey.join('.')), []))));
        }() : oldData;
        return updateCallback ? updateCallback(oldData, successData) : newData;
      }(),
      statusCode: successDataStatusCode || statusCode,
      error: false,
      lastUpdated: generateTimeStamp(),
      isError: false
    };
  };
};

/* eslint-disable */
// import { generateTimeStamp, updateIn, getIn, newObject } from '../helpers';
// import Safe from '../nullCheck';
// const _checkIsNotObject = data =>
//   Object.prototype.toString.call(data) !== '[object Object]';
var callbackHandler = function callbackHandler(_ref) {
  var _ref$task = _ref.task;
  _ref$task = _ref$task === void 0 ? {} : _ref$task;
  var callback = _ref$task.callback,
      _ref$successData = _ref.successData,
      successData = _ref$successData === void 0 ? {} : _ref$successData,
      successDataStatusCode = _ref.successDataStatusCode;
  return function () {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref2$data = _ref2.data,
        oldData = _ref2$data === void 0 ? {} : _ref2$data,
        statusCode = _ref2.statusCode,
        rest = _objectWithoutProperties$1(_ref2, ["data", "statusCode"]);

    return callback({
      old: oldData,
      new: successData,
      rest: rest,
      status: statusCode || successDataStatusCode
    });
  };
};

var cache = {};
var cacheActions = {};
var safe = nullcheck;
var responseErrorParser = function responseErrorParser() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return Array.isArray(data) && data.reduce(function (acc, curr) {
    var _Object$entries$ = _slicedToArray(Object.entries(curr)[0], 2),
        key = _Object$entries$[0],
        message = _Object$entries$[1];

    var payloadKey = key.split(',')[1];
    return _objectSpread({}, acc, _defineProperty({}, payloadKey, message));
  }, {}) || {};
};
var commmonStateHandler = function commmonStateHandler(_ref) {
  var state = _ref.state,
      action = _ref.action,
      newState = _ref.newState,
      method = _ref.method,
      constants = _ref.constants,
      updateState = _ref.updateState;

  /** This action for initial call  */
  var _action$payload = action.payload;
  _action$payload = _action$payload === void 0 ? {} : _action$payload;
  var filter = _action$payload.filter,
      _action$payload$task = _action$payload.task,
      task = _action$payload$task === void 0 ? {} : _action$payload$task;
  var _action$payload2 = action.payload;
  _action$payload2 = _action$payload2 === void 0 ? {} : _action$payload2;
  var _action$payload2$task = _action$payload2.task;
  _action$payload2$task = _action$payload2$task === void 0 ? {} : _action$payload2$task;
  var clearData = _action$payload2$task.clearDataOnStart,
      initialData = _action$payload2.initialCallData;
  /** This action for after api gets success or failure  */

  var _action$response = action.response;
  _action$response = _action$response === void 0 ? {} : _action$response;
  var type = _action$response.type,
      statusCode = _action$response.statusCode,
      message = _action$response.message,
      status = _action$response.status,
      customTask = _action$response.customTask,
      _action$response$payl = _action$response.payload;
  _action$response$payl = _action$response$payl === void 0 ? {} : _action$response$payl;
  var responseFilter = _action$response$payl.filter,
      customLoader = _action$response$payl.loader,
      customToast = _action$response$payl.toast;
  var loader = Object.keys(constants).includes(action.type);
  var State = newObject(state);

  if ((method === ON_LOADING || loader || [ON_SUCCESS, ON_ERROR].includes(method)) && !customTask || customLoader !== undefined && customTask && (Array.isArray(method) ? method : [method]).includes(ON_LOADING)) {
    if ((status || loader) && filter && filter.length > 0) State = newState(function (_ref2) {
      var obj = _ref2[type || action.type];
      return _defineProperty({}, type || action.type, newObject(obj, filterArrayToastEmptyHandler({
        isInfinite: task.name === 'Infinite-Handler',
        filter: Array.isArray(filter) && filter || [filter]
      })(obj)));
    });else if (status || loader) State = newState(function (_ref4) {
      var obj = _ref4[type || action.type];
      return _defineProperty({}, type || action.type, newObject(obj, function (_ref5) {
        var _ref5$toast = _ref5.toast,
            toast = _ref5$toast === void 0 ? {} : _ref5$toast;
        return {
          toast: newObject(toast, {
            message: '',
            status: '',
            isError: false,
            key: ''
          })
        };
      }));
    });
    if (((filter || responseFilter) && !customTask ? (filter || responseFilter).length > 0 : false) || customTask && customLoader !== undefined) State = newObject(State, function (_ref7) {
      var obj = _ref7[type || action.type];
      return _defineProperty({}, type || action.type, newObject(obj, filterArrayloadingHandler({
        filter: Array.isArray(filter || responseFilter) && (filter || responseFilter) || [filter || responseFilter],
        loader: customTask && customLoader !== undefined ? customLoader : initialData ? false : [ON_SUCCESS, ON_ERROR].includes(method) ? false : status || loader,
        clearData: clearData,
        initialData: initialData
      })(obj)));
    });else State = newObject(State, function (_ref9) {
      var obj = _ref9[type || action.type];
      return _defineProperty({}, type || action.type, newObject(obj, function (_ref10) {
        var _data = _ref10.data;
        return _objectSpread({
          loading: {
            status: customTask && customLoader !== undefined ? customLoader : initialData ? false : [ON_SUCCESS, ON_ERROR].includes(method) ? false : status || loader,
            lastUpdated: generateTimeStamp()
          }
        }, (clearData || initialData) && ![ON_SUCCESS, ON_ERROR].includes(method) ? {
          data: initialData || (Array.isArray(_data) ? [] : {})
        } : {});
      }));
    });
    if (method === ON_LOADING || loader) return State;
  }

  if ([ON_SUCCESS, ON_ERROR].includes(method) && // [200, 201, 400, 403, 404, 409, 500].includes(statusCode) &&
  Object.keys(constants).includes(type) && !customTask || customToast && customTask && (Array.isArray(method) ? method : [method]).includes(ON_TOAST)) {
    if (responseFilter && responseFilter.length > 0) State = newObject(State, function (_ref12) {
      var obj = _ref12[type];
      return _defineProperty({}, type, newObject(obj, filterArrayToastHandler(_objectSpread({
        statusCode: statusCode,
        filter: Array.isArray(responseFilter) && responseFilter || [responseFilter],
        message: message,
        type: type
      }, customToast && customTask && (Array.isArray(method) ? method : [method]).includes(ON_TOAST) ? customToast : {}))(obj)));
    });else State = newObject(State, function (_ref14) {
      var obj = _ref14[type];
      return _defineProperty({}, type, newObject(obj, {
        toast: _objectSpread({
          isError: ![200, 201].includes(statusCode),
          status: statusCode,
          message: message,
          key: type,
          lastUpdated: generateTimeStamp()
        }, customToast && customTask && (Array.isArray(method) ? method : [method]).includes(ON_TOAST) ? customToast : {})
      }));
    });
  }

  var changeState = newObject.bind({}, State);
  var reset = responseFilter && responseFilter.length > 0 ? filterArrayResetHandler.bind({}, state, newState, action, responseFilter) : resetHandler.bind({}, state, newState, action);
  return updateState({
    state: State,
    newState: changeState,
    action: action,
    reset: reset
  });
};
var getData = function getData(data, def) {
  var loader = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var filter = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  return _objectSpread({}, safe(data, "".concat(filter.length ? '.data.' : '').concat(filter.join('.')), {}), {
    data: safe(data, ".data".concat(filter.length ? '.' : '').concat(filter.join('.')).concat(filter.length ? '.data' : ''), def),
    loader: safe(data, "".concat(filter.length ? '.data.' : '').concat(filter.join('.'), ".loading.status"), typeof loader !== 'boolean' ? false : loader),
    lastUpdated: safe(data, "".concat(filter.length ? '.data.' : '').concat(filter.join('.'), ".lastUpdated"), generateTimeStamp()),
    isInfinite: safe(data, "".concat(filter.length ? '.data.' : '').concat(filter.join('.'), ".isInfinite"), false),
    infiniteEnd: safe(data, "".concat(filter.length ? '.data.' : '').concat(filter.join('.'), ".infiniteEnd"), false),
    isError: safe(data, "".concat(filter.length ? '.data.' : '').concat(filter.join('.'), ".isError"), false),
    toast: safe(data, "".concat(filter.length ? '.data.' : '').concat(filter.join('.'), ".toast"), {}),
    error: safe(data, "".concat(filter.length ? '.data.' : '').concat(filter.join('.'), ".error"), {})
  });
};
var mapDispatchToProps = function mapDispatchToProps(actions, componentData, reducerName) {
  return function (dispatch) {
    return _objectSpread({
      dispatch: dispatch
    }, actions && Object.keys(actions).length ? newObject(componentData, function (_ref16) {
      var data = _ref16["".concat(reducerName, "_hoc")];

      return _defineProperty({}, "".concat(reducerName, "_hoc"), newObject(data, {
        actions: redux.bindActionCreators(actions, dispatch)
      }));
    }) : {});
  };
};

var checkKey$1 = function checkKey(key, name, dataType, message) {
  invariant(typeOf(key) === dataType, "(react-boilerplate-redux-saga-hoc)  Expected `".concat(name, "` to be  ").concat(message || dataType));
};

var checkKeyWithMessage = function checkKeyWithMessage(key, dataType, message) {
  invariant(typeOf(key) === dataType, message);
};

var previousData = new Map();
var previousConfig = new Map();
var useQuery = function useQuery() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var array = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var callback = arguments.length > 3 ? arguments[3] : undefined;
  if (name) checkKey$1(name, 'reducer name', 'string', 'valid string');
  var store = reactRedux.useStore();

  var _useState = React.useState({}),
      _useState2 = _slicedToArray(_useState, 1),
      _key = _useState2[0];

  var exeuteRequiredData = React.useCallback(function (_data) {
    var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return e.requiredKey && Array.isArray(e.requiredKey) && e.requiredKey.length > 0 && typeOf(_data) === 'object' ? Object.entries(_data).reduce(function (acc, _ref18) {
      var _ref19 = _slicedToArray(_ref18, 2),
          _DataKey = _ref19[0],
          _DataValue = _ref19[1];

      return _objectSpread({}, acc, {}, e.requiredKey.includes(_DataKey) ? _defineProperty({}, _DataKey, _DataValue) : {});
    }, {}) : e.requiredKey ? _data || {} : _data;
  }, []);

  var _checkFilter = React.useCallback(function (e) {
    return e.filter ? Array.isArray(e.filter) ? e.filter : typeof e.filter === 'string' ? [e.filter] : undefined : undefined;
  }, []);

  var _getData = React.useCallback(function (e, isString) {
    return (typeof e.defaultDataFormat === 'boolean' || !(isString ? array : e.key) ? !e.defaultDataFormat || !(isString ? array : e.key) : false) ? (isString ? array : e.key) ? safe(store, ".getState()[".concat(name, "][").concat(isString ? array : e.key, "]").concat(e.query ? e.query : ''), e.default) : name ? safe(store, ".getState()[".concat(name, "]").concat(e.query ? e.query : ''), e.default) : safe(store, ".getState()".concat(e.query ? e.query : ''), e.default) : safe(getData(safe(store, ".getState()[".concat(name, "][").concat(isString ? array : e.key, "]")), e.query ? undefined : e.default || undefined, e.initialLoaderState || false, _checkFilter(e), e.dataQuery), "".concat(e.query && typeOf(e.query) === 'string' ? e.query : ''), e.query ? e.default !== undefined ? e.default : undefined : undefined);
  }, [array]);

  var _GetData = React.useCallback(function () {
    var _data = {};

    if (name && (Array.isArray(array) && array.length > 0 || typeOf(array) === 'object' && Object.keys(array).length > 0)) {
      // eslint-disable-next-line consistent-return
      // eslint-disable-next-line no-underscore-dangle
      _data = (typeOf(array) === 'object' ? [array] : array).reduce(function (acc, e) {
        if (typeOf(e) === 'object') {
          if (typeOf(array) === 'object') return exeuteRequiredData(_getData(e), e);

          var _arr2 = _toConsumableArray(acc);

          _arr2.push(exeuteRequiredData(_getData(e), e));

          return _arr2;
        }

        if (typeOf(array) === 'object') return safe(store, ".getState()[".concat(name, "][").concat(e, "]"));

        var _arr = _toConsumableArray(acc);

        _arr.push(safe(store, ".getState()[".concat(name, "][").concat(e, "]")));

        return _arr;
      }, typeOf(array) === 'object' ? {} : []); // if()
    } else if (typeof array === 'string' && config && typeOf(config) === 'array') _data = config.reduce(function (acc, _config) {
      return [].concat(_toConsumableArray(acc), [exeuteRequiredData(_getData(_config, true), _config)]);
    }, []);else if (typeof array === 'string') _data = exeuteRequiredData(_getData(config, true), config);else if (name) _data = safe(store, ".getState()[".concat(name, "]"));else _data = safe(store, ".getState()") || {};

    return _data;
  }, [config, array]);

  var _useState3 = React.useState(_GetData()),
      _useState4 = _slicedToArray(_useState3, 2),
      data = _useState4[0],
      setData = _useState4[1];

  var execute = React.useCallback(function () {
    // const state = safe(store, `.getState()[${name}]`);
    // eslint-disable-next-line no-underscore-dangle
    var _data = _GetData();

    if (!isEqual(_data, previousData.get(_key))) {
      // previousData[`${key || name}_${_key}`] = _data;
      var callbackData;
      if (callback && typeof callback === 'function') callbackData = callback(_data);
      previousData.set(_key, _data);
      if (callbackData) setData(callbackData);else setData(_data);
    }
  }, [config, array]);
  React.useEffect(function () {
    var unSubscribe = store.subscribe(execute);
    return function () {
      delete previousData.delete(_key);
      unSubscribe();
    };
  }, []);
  React.useEffect(function () {
    previousData.set(_key, {});

    if (!isEqual(previousConfig.get(_key), {
      array: array,
      config: config
    })) {
      previousConfig.set(_key, {
        array: array,
        config: config
      });
      execute();
    }
  }, [config, array]);
  return data;
};
var useActionsHook = function useActionsHook(name, actions) {
  var _useState5 = React.useState({}),
      _useState6 = _slicedToArray(_useState5, 2),
      dispatchAction = _useState6[0],
      setDispatchAction = _useState6[1];

  var dispatch = reactRedux.useDispatch();
  React.useEffect(function () {
    if (!isEqual(cacheActions[name], actions)) {
      cacheActions[name] = actions;
      cache[name] = redux.bindActionCreators(actions, dispatch);
      setDispatchAction(cache[name]);
    } else setDispatchAction(cache[name]);
  }, [isEqual(cacheActions[name], actions)]);
  return dispatchAction;
};
var useMutation = function useMutation(reducerName) {
  if (!reducerName) checkKeyWithMessage(reducerName, 'string', 'useMutation(`reducerkey`) : Expected a valid reducer key');
  var store = reactRedux.useStore();
  React.useEffect(function () {
    if (reducerName) checkKeyWithMessage(reducerName, 'string', 'useMutation(`reducerkey`) : Expected a reducer key to be string');
    if (!store.getState()[reducerName]) checkKeyWithMessage(null, 'string', " reducerName '".concat(reducerName, "' not a valid reducer key."));
  }, []);
  var dispatch = reactRedux.useDispatch();
  return function (_ref21) {
    var type = _ref21.key,
        value = _ref21.value,
        _ref21$filter = _ref21.filter,
        filter = _ref21$filter === void 0 ? [] : _ref21$filter;
    if (!type) checkKey$1(null, 'key', 'string', 'valid string');

    var _reducer_keys = Object.keys(store.getState()[reducerName]);

    if (type) invariant(_reducer_keys.includes(type), // type.includes('_CALL') && type.slice(-5) === '_CALL',
    "'key' is invalid.".concat(type, " not found in ").concat(reducerName, " reducer"));
    checkKey$1(filter, 'filter', 'array');
    checkKey$1(type, 'key', 'string');

    if (type.includes('_CALL') && type.slice(-5) === '_CALL') {
      checkKey$1(value, 'value', 'object');
      dispatch({
        type: type.slice(0, -4).concat('CUSTOM_TASK'),
        response: {
          type: type,
          method: ON_SUCCESS,
          statusCode: 200,
          mutation: true,
          customTask: true,
          data: {
            data: typeof value === 'function' ? value(store.getState()[reducerName][type]) : value
          },
          payload: {
            filter: filter
          }
        }
      });
    } else dispatch({
      type: "".concat(reducerName, "_MUTATE_STATE"),
      payload: _defineProperty({}, type, typeof value === 'function' ? value(store.getState()[reducerName][type]) : value)
    });
  };
};
var toPromise = function toPromise(action) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var isReject = arguments.length > 2 ? arguments[2] : undefined;
  if (typeOf(config) !== 'null' || typeOf(config) !== 'undefined') checkKeyWithMessage(config, 'object', "toPromise() : Expected a config (second parameter) to be object");
  return new Promise(function (resolve, reject) {
    return action(_objectSpread({}, config, {
      resolve: resolve,
      reject: reject,
      isReject: isReject
    }));
  });
};
var toPromiseFunction = function toPromiseFunction(action, isReject) {
  return function (config) {
    if (typeOf(config) !== 'null' || typeOf(config) !== 'undefined') checkKeyWithMessage(config, 'object', "toPromise() : Expected a config (second parameter) to be object");
    return new Promise(function (resolve, reject) {
      return action(_objectSpread({}, config, {
        resolve: resolve,
        reject: reject,
        isReject: isReject
      }));
    });
  };
};
var CACHE = {};

function stringify(val) {
  return _typeof$2(val) === 'object' ? JSON.stringify(val) : String(val);
}

function hashArgs() {
  for (var _len = arguments.length, args = new Array(_len), _key2 = 0; _key2 < _len; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return args.reduce(function (acc, arg) {
    return "".concat(stringify(arg), ":").concat(acc);
  }, '');
}

function useStaleRefresh(fn, name) // initialLoadingstate = true,
{
  var arg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var initial = arguments.length > 3 ? arguments[3] : undefined;
  var prevArgs = React.useRef(null);

  var _useState7 = React.useState(null),
      _useState8 = _slicedToArray(_useState7, 2),
      isUpdating = _useState8[0],
      setIsUpdating = _useState8[1];

  var refresh = React.useCallback(function () {
    var _ref22 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        loader = _ref22.loader,
        clearData = _ref22.clearData,
        config = _ref22.config;

    var args = config || arg;
    var cacheID = hashArgs(name, args); // look in cache and set response if present
    // fetch new data

    if (CACHE[cacheID]) setIsUpdating(true);
    toPromise(fn, Object.assign({}, args, CACHE[cacheID] && !loader ? {
      initialCallData: CACHE[cacheID]
    } : {}, clearData ? {
      task: args.task ? _objectSpread({}, args.task, {
        clearDataOnStart: true
      }) : {
        clearDataOnStart: true
      }
    } : {})).then(function (newData) {
      if (CACHE[cacheID]) setIsUpdating(false);

      if (newData && newData.status === 'SUCCESS') {
        CACHE[cacheID] = newData.data; // setData(newData);
      } // setLoading(false);

    });
  }, [arg, initial]);
  React.useEffect(function () {
    // args is an object so deep compare to rule out false changes
    if (isEqual(arg, prevArgs.current)) {
      return;
    }

    if (initial) refresh(); // cacheID is how a cache is identified against a unique request
  }, [arg, fn, name, initial]);
  React.useEffect(function () {
    prevArgs.current = arg;
  });
  return [refresh, isUpdating];
}
var useMutateReducer = function useMutateReducer(reducerName) {
  var store = reactRedux.useStore();
  var dispatch = reactRedux.useDispatch();
  return function (callback) {
    var state = reducerName ? store.getState()[reducerName] : store.getState();
    dispatch({
      type: reducerName ? "".concat(reducerName, "_MUTATE_STATE") : 'MUTATE_STATE',
      payload: callback(state) || {}
    });
  };
};
var useResetState = function useResetState(reducerName) {
  var dispatch = reactRedux.useDispatch();
  return function () {
    dispatch({
      type: reducerName ? "".concat(reducerName, "_RESET_STATE") : 'RESET_STATE'
    });
  };
};
var useResetOnlyApiEndPointsState = function useResetOnlyApiEndPointsState(reducerName) {
  var dispatch = reactRedux.useDispatch();
  return function () {
    var dontResetKeys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    dispatch({
      type: reducerName ? "".concat(reducerName, "_RESET_API") : 'RESET_API',
      payload: dontResetKeys
    });
  };
};
var useOptimizedQuery = function useOptimizedQuery() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var array = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var callback = arguments.length > 3 ? arguments[3] : undefined;
  if (name) checkKey$1(name, 'reducer name', 'string', 'valid string');
  var store = reactRedux.useStore();

  var _useState9 = React.useState({}),
      _useState10 = _slicedToArray(_useState9, 1),
      _key = _useState10[0];

  var exeuteRequiredData = React.useCallback(function (_data) {
    var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return e.requiredKey && Array.isArray(e.requiredKey) && e.requiredKey.length > 0 && typeOf(_data) === 'object' ? Object.entries(_data).reduce(function (acc, _ref23) {
      var _ref24 = _slicedToArray(_ref23, 2),
          _DataKey = _ref24[0],
          _DataValue = _ref24[1];

      return _objectSpread({}, acc, {}, e.requiredKey.includes(_DataKey) ? _defineProperty({}, _DataKey, _DataValue) : {});
    }, {}) : e.requiredKey ? _data || {} : _data;
  }, []);

  var _checkFilter = React.useCallback(function (e) {
    return e.filter ? Array.isArray(e.filter) ? e.filter : typeof e.filter === 'string' ? [e.filter] : undefined : undefined;
  }, []);

  var _getData = React.useCallback(function (e, isString) {
    return ((typeof e.defaultDataFormat === 'boolean' ? e.defaultDataFormat : true) || !(isString ? array : e.key) ? !(typeof e.defaultDataFormat === 'boolean' ? e.defaultDataFormat : true) || !(isString ? array : e.key) : false) ? (isString ? array : e.key) ? safe(store, ".getState()[".concat(name, "][").concat(isString ? array : e.key, "]").concat(e.query ? e.query : ''), e.default) : name ? safe(store, ".getState()[".concat(name, "]").concat(e.query ? e.query : ''), e.default) : safe(store, ".getState()".concat(e.query ? e.query : ''), e.default) : safe(getData(safe(store, ".getState()[".concat(name, "][").concat(isString ? array : e.key, "]")), e.query ? undefined : e.default || undefined, e.initialLoaderState || false, _checkFilter(e), e.dataQuery), "".concat(e.query && typeOf(e.query) === 'string' ? e.query : ''), e.query ? e.default !== undefined ? e.default : undefined : undefined);
  }, []);

  var _GetData = React.useCallback(function () {
    var _data = {};

    if (name && (Array.isArray(array) && array.length > 0 || typeOf(array) === 'object' && Object.keys(array).length > 0)) {
      // eslint-disable-next-line consistent-return
      // eslint-disable-next-line no-underscore-dangle
      _data = (typeOf(array) === 'object' ? [array] : array).reduce(function (acc, e) {
        if (typeOf(e) === 'object') {
          if (typeOf(array) === 'object') return exeuteRequiredData(_getData(e), e);

          var _arr3 = _toConsumableArray(acc);

          _arr3.push(exeuteRequiredData(_getData(e), e));

          return _arr3;
        }

        if (typeOf(array) === 'object') return safe(store, ".getState()[".concat(name, "][").concat(e, "]"));

        var _arr = _toConsumableArray(acc);

        _arr.push(safe(store, ".getState()[".concat(name, "][").concat(e, "]")));

        return _arr;
      }, typeOf(array) === 'object' ? {} : []); // if()
    } else if (typeof array === 'string' && config && typeOf(config) === 'array') _data = config.reduce(function (acc, _config) {
      return [].concat(_toConsumableArray(acc), [exeuteRequiredData(_getData(_config, true), _config)]);
    }, []);else if (typeof array === 'string') _data = exeuteRequiredData(_getData(config, true), config);else if (name) _data = safe(store, ".getState()[".concat(name, "]"));else _data = safe(store, ".getState()") || {};

    return _data;
  }, []);

  var _useState11 = React.useState(_GetData()),
      _useState12 = _slicedToArray(_useState11, 2),
      data = _useState12[0],
      setData = _useState12[1];

  var execute = React.useCallback(function () {
    // const state = safe(store, `.getState()[${name}]`);
    // eslint-disable-next-line no-underscore-dangle
    var _data = _GetData();

    if (!isEqual(_data, previousData.get(_key))) {
      // previousData[`${key || name}_${_key}`] = _data;
      var callbackData;
      if (callback && typeof callback === 'function') callbackData = callback(_data);
      previousData.set(_key, _data);
      if (callbackData) setData(callbackData);else setData(_data);
    }
  }, []);
  React.useEffect(function () {
    previousData.set(_key, {});
    execute();
    var unSubscribe = store.subscribe(execute);
    return function () {
      delete previousData.delete(_key);
      unSubscribe();
    };
  }, []);
  return data;
};

var HANDLERS = [{
  name: 'Infinite-Handler',
  handler: infiniteHandler
}, {
  name: 'Data-Handler',
  handler: dataHandler
}, {
  name: 'Delete-Handler',
  handler: deleteHandler
}, {
  name: 'Update-Handler',
  handler: updateHandler
}, {
  name: 'Update-Key-Handler',
  handler: updateKeyHandler
}, {
  name: 'Delete-Key-Handler',
  handler: deleteKeyHandler
}, {
  name: 'Toggle-Key-Handler',
  handler: toggleKeyHandler
}, {
  name: 'Splice-Data-Handler',
  handler: spliceHandler
}, {
  name: 'callback-Handler',
  handler: callbackHandler
}, {
  name: "Don't-Update-Data-Handler",
  handler: dontUpdateDataHandler
}];

var checkKey$2 = function checkKey(key, name, dataType) {
  invariant(typeOf(key) === dataType, "(react-boilerplate-redux-saga-hoc)  Expected `".concat(name, "` to be a ").concat(dataType));
};

var CheckCustomHanderFormat = function CheckCustomHanderFormat(_handler) {
  return _handler ? typeof _handler === 'function' ? // ? typeof _handler() === 'function'
  // ? typeof _handler()() !== 'function'
  _handler : // : null
  null : // : null
  null;
};

var _CheckFilter$5 = function _CheckFilter(Filter) {
  return Array.isArray(Filter) && Filter.length > 0 ? Filter : Filter && typeof Filter === 'string' && Filter.length > 0 ? Filter.split('.') : null;
};

var COMMON_HANDLER = function COMMON_HANDLER(payload, data) {
  var DATA = data; // const bindAction = Action => Action(payload);

  var _tasks = typeOf(payload.tasks) === 'array' ? payload.tasks.filter(function (e) {
    return e.task || e.filter;
  }) : [];

  (_tasks.length > 0 ? _tasks : Array(1).fill(payload)).forEach( // eslint-disable-next-line consistent-return
  function () {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$task = _ref.task,
        task = _ref$task === void 0 ? {} : _ref$task,
        filter = _ref.filter;

    var customTaskBindAction = null; // const isMultiTask = Array.isArray(payload.tasks);
    // if (isMultiTask)

    if (task.response) checkKey$2(task.response, 'task { response  : { data }}', 'object');

    customTaskBindAction = function customTaskBindAction(Action) {
      return Action(_objectSpread({}, payload, {
        filter: _CheckFilter$5(filter || payload.filter),
        successData: (task.response || {}).data || payload.successData
      }));
    };

    var customHandler = CheckCustomHanderFormat(task.customHandler);

    var isFilter = _CheckFilter$5(filter);

    var BindHandler = function BindHandler(handler) {
      return newObject(DATA, customTaskBindAction(handler));
    };

    var _handler = HANDLERS.concat(Array.isArray(payload.handlers) ? payload.handlers : []).find(function (_ref2) {
      var name = _ref2.name;
      return name === task.name || name === task;
    });

    if (_handler) {
      checkKey$2(_handler.handler, "".concat(_handler.name, " handler with key name handler"), 'function');
      DATA = isFilter ? BindHandler(commonFilterHandler(_handler.handler)) : BindHandler(_handler.handler);
    } else if (customHandler && task.name === 'Custom-Handler') DATA = (isFilter ? BindHandler(commonFilterHandler(customHandler)) : BindHandler(customHandler)) || DATA;else if (task.name === "Don't-Update-Data-Handler" || task === "Don't-Update-Data-Handler") return DATA;else DATA = isFilter ? BindHandler(commonFilterHandler(dataHandler)) : BindHandler(dataHandler);
  });
  return DATA;
};

var COMMON_REDUCER_HANDLER = function COMMON_REDUCER_HANDLER(action, handlers) {
  var _action$response = action.response;
  _action$response = _action$response === void 0 ? {} : _action$response;
  var customTask = _action$response.customTask,
      mutation = _action$response.mutation,
      _action$response$data = _action$response.data;
  _action$response$data = _action$response$data === void 0 ? {} : _action$response$data;

  var _action$response$data2 = _action$response$data.data,
      successData = _action$response$data2 === void 0 ? {} : _action$response$data2,
      rest = _objectWithoutProperties$1(_action$response$data, ["data"]),
      _action$response$payl = _action$response.payload;

  _action$response$payl = _action$response$payl === void 0 ? {} : _action$response$payl;
  var _action$response$payl2 = _action$response$payl.request;
  _action$response$payl2 = _action$response$payl2 === void 0 ? {} : _action$response$payl2;
  var _action$response$payl3 = _action$response$payl2.query,
      query = _action$response$payl3 === void 0 ? {} : _action$response$payl3,
      _action$response$payl4 = _action$response$payl2.clearDataOnError,
      clearDataOnError = _action$response$payl4 === void 0 ? false : _action$response$payl4,
      Filter = _action$response$payl.filter,
      error = _action$response$payl.error,
      _action$response$erro = _action$response.error;
  _action$response$erro = _action$response$erro === void 0 ? {} : _action$response$erro;
  var _action$response$erro2 = _action$response$erro.data,
      errorData = _action$response$erro2 === void 0 ? {} : _action$response$erro2; // console.log(rest, 'common reducer handler');

  var filter = _CheckFilter$5(Filter);

  var commonHandler = COMMON_HANDLER.bind(null, _objectSpread({
    handlers: handlers,
    successData: successData,
    errorData: errorData,
    successDataStatusCode: rest.statusCode,
    customTask: customTask,
    mutation: mutation
  }, action.response.payload));
  var ErrorHandler = filter && filterArrayErrorHandler || errorHandler;
  var commmonErrorHandler = ErrorHandler.bind(null, {
    errorData: customTask ? error : errorData,
    query: query,
    filter: filter,
    clearDataOnError: clearDataOnError
  });
  return [commonHandler, commmonErrorHandler];
};
var DEFAULT_REDUCER_HANDLER = function DEFAULT_REDUCER_HANDLER(_ref3) {
  var method = _ref3.method,
      reset = _ref3.reset,
      state = _ref3.state,
      action = _ref3.action,
      handlers = _ref3.handlers,
      type = _ref3.type;

  var _COMMON_REDUCER_HANDL = COMMON_REDUCER_HANDLER(action, handlers),
      _COMMON_REDUCER_HANDL2 = _slicedToArray(_COMMON_REDUCER_HANDL, 2),
      commonHandler = _COMMON_REDUCER_HANDL2[0],
      commmonErrorHandler = _COMMON_REDUCER_HANDL2[1];

  var _action$response2 = action.response;
  _action$response2 = _action$response2 === void 0 ? {} : _action$response2;
  var customTask = _action$response2.customTask,
      mutation = _action$response2.mutation,
      _action$response2$dat = _action$response2.data;
  _action$response2$dat = _action$response2$dat === void 0 ? {} : _action$response2$dat;

  var _action$response2$dat2 = _action$response2$dat.data,
      successData = _action$response2$dat2 === void 0 ? {} : _action$response2$dat2,
      rest = _objectWithoutProperties$1(_action$response2$dat, ["data"]),
      _action$response2$pay = _action$response2.payload;

  _action$response2$pay = _action$response2$pay === void 0 ? {} : _action$response2$pay;
  var _action$response2$pay2 = _action$response2$pay.callback;
  _action$response2$pay2 = _action$response2$pay2 === void 0 ? {} : _action$response2$pay2;
  var updateStateCallback = _action$response2$pay2.updateStateCallback,
      tasks = _action$response2$pay.tasks,
      updateDataReducerKey = _action$response2$pay.updateDataReducerKey,
      _action$response2$err = _action$response2.error;
  _action$response2$err = _action$response2$err === void 0 ? {} : _action$response2$err;
  var _action$response2$err2 = _action$response2$err.data,
      errorData = _action$response2$err2 === void 0 ? {} : _action$response2$err2;
  var DATA = state;

  var _method = (Array.isArray(method) ? method : [method]).filter(function (e) {
    return [ON_SUCCESS, ON_ERROR, ON_UNMOUNT].includes(e);
  });

  for (var i = 0; i < _method.length; i += 1) {
    switch (_method[i]) {
      case ON_SUCCESS:
        {
          var updatedState = void 0;

          var _tasks = tasks ? Array.isArray(tasks) && tasks.filter(function (e) {
            return typeOf(e) === 'object';
          }) : null;

          if (_tasks && Array.isArray(_tasks) && _tasks.length > 0) {
            var _loop = function _loop(k) {
              var _commonHandler = COMMON_HANDLER.bind(null, _objectSpread({
                handlers: handlers,
                successData: successData,
                errorData: errorData,
                successDataStatusCode: rest.statusCode,
                customTask: customTask,
                mutation: mutation
              }, action.response.payload, {}, _tasks[k], {
                tasks: undefined
              }));

              var _updateDataReducerKey = _tasks[k] && _tasks[k].updateDataReducerKey || updateDataReducerKey;

              if (Array.isArray(_updateDataReducerKey) && _updateDataReducerKey.length > 0) {
                var _loop2 = function _loop2(l) {
                  DATA = newObject(DATA, function (_ref4) {
                    var Data = _ref4[_updateDataReducerKey[l] || type];
                    return _defineProperty({}, _updateDataReducerKey[l] || type, _commonHandler(Data, state, type));
                  });
                };

                for (var l = 0; l < _updateDataReducerKey.length; l += 1) {
                  _loop2(l);
                }
              } else {
                DATA = newObject(DATA, function (_ref6) {
                  var Data = _ref6[updateDataReducerKey || type];
                  return _defineProperty({}, updateDataReducerKey || type, _commonHandler(Data, state, type));
                });
              }
            };

            for (var k = 0; k < _tasks.length; k += 1) {
              _loop(k);
            }

            updatedState = DATA;
          } else if (Array.isArray(updateDataReducerKey) && updateDataReducerKey.length) {
            var _loop3 = function _loop3(j) {
              DATA = newObject(DATA, function (_ref8) {
                var Data = _ref8[updateDataReducerKey[j] || type];
                return _defineProperty({}, updateDataReducerKey[j] || type, commonHandler(Data, state, type));
              });
            };

            for (var j = 0; i < updateDataReducerKey.length; j += 1) {
              _loop3(j);
            }

            updatedState = DATA;
          } else {
            updatedState = newObject(DATA, function (_ref10) {
              var Data = _ref10[updateDataReducerKey || type];
              return _defineProperty({}, updateDataReducerKey || type, commonHandler(Data, state, type));
            });
          }

          DATA = updateStateCallback ? updateStateCallback({
            state: updatedState,
            data: successData
          }) || updatedState : updatedState;
          break;
        }

      case ON_ERROR:
        {
          DATA = newObject(DATA, function (_ref12) {
            var Data = _ref12[type];
            return _defineProperty({}, type, newObject(Data, commmonErrorHandler()));
          });
          break;
        }

      case ON_UNMOUNT:
        {
          DATA = reset();
          break;
        }
    }
  }

  return DATA;
};

var componentState = {// profile: {},
  // isLoggedIn: false,
  // authorization: true,
  // language: 'EN',
};
var otherReducerConstants = [];

var updateState = function updateState(_ref) {
  var authenticationConstants = _ref.authenticationConstants,
      ResetState = _ref.ResetState,
      _ref$isMobileApp = _ref.isMobileApp,
      InitialState = _ref.initialState,
      reducerFunction = _ref.reducerFunction,
      _ref$handlers = _ref.handlers,
      handlers = _ref$handlers === void 0 ? [] : _ref$handlers;
  return function (_ref2) {
    var state = _ref2.state,
        newState = _ref2.newState,
        action = _ref2.action,
        reset = _ref2.reset;
    var _action$response = action.response;
    _action$response = _action$response === void 0 ? {} : _action$response;
    var _action$response$data = _action$response.data;
    _action$response$data = _action$response$data === void 0 ? {} : _action$response$data;

    var _action$response$data2 = _action$response$data.data,
        successData = _action$response$data2 === void 0 ? {} : _action$response$data2,
        restSuccessData = _objectWithoutProperties$1(_action$response$data, ["data"]),
        _action$response$payl = _action$response.payload;

    _action$response$payl = _action$response$payl === void 0 ? {} : _action$response$payl;

    var _action$response$payl2 = _action$response$payl.payload,
        payload = _action$response$payl2 === void 0 ? {} : _action$response$payl2,
        _action$response$payl3 = _action$response$payl.query,
        query = _action$response$payl3 === void 0 ? {} : _action$response$payl3,
        _action$response$payl4 = _action$response$payl.params,
        params = _action$response$payl4 === void 0 ? {} : _action$response$payl4,
        restPayload = _objectWithoutProperties$1(_action$response$payl, ["payload", "query", "params"]),
        loadingStatus = _action$response.status,
        statusCode = _action$response.statusCode,
        type = _action$response.type,
        method = _action$response.method,
        statusMessage = _action$response.message,
        _action$response$erro = _action$response.error;

    _action$response$erro = _action$response$erro === void 0 ? {} : _action$response$erro;

    var _action$response$erro2 = _action$response$erro.data,
        errorData = _action$response$erro2 === void 0 ? {} : _action$response$erro2,
        restErrorData = _objectWithoutProperties$1(_action$response$erro, ["data"]);

    var _COMMON_REDUCER_HANDL = COMMON_REDUCER_HANDLER(action, handlers),
        _COMMON_REDUCER_HANDL2 = _slicedToArray(_COMMON_REDUCER_HANDL, 2),
        commonHandler = _COMMON_REDUCER_HANDL2[0],
        commmonErrorHandler = _COMMON_REDUCER_HANDL2[1];

    var defaultReducerHandler = function defaultReducerHandler() {
      return DEFAULT_REDUCER_HANDLER({
        method: method,
        reset: reset,
        state: state,
        action: action,
        handlers: handlers,
        type: type
      });
    };

    switch (type) {
      case 'RESET':
        switch (method) {
          case ON_SUCCESS:
            return newObject(state, ResetState);

          default:
            return state;
        }

      // case authenticationConstants.REGISTER_API[CALL]:
      //   switch (method) {
      //     case ON_SUCCESS: {
      //       return newState(({ profile }) => ({
      //         profile: newObject(profile, successData),
      //       }));
      //     }
      //     default:
      //       return state;
      //   }
      // case authenticationConstants.LOGIN_API[CALL]:
      //   switch (method) {
      //     case ON_SUCCESS: {
      //       return newState(({ profile }) => ({
      //         profile: newObject(profile, successData),
      //       }));
      //     }
      //     default:
      //       return state;
      //   }
      // case authenticationConstants.VERIFY_OTP_API[CALL]:
      //   switch (method) {
      //     case ON_SUCCESS:
      //       return newState(({ [type]: Data }) => ({
      //         profile: successData,
      //         isLoggedIn: !!successData.data.mobile_number,
      //         [type]: newObject(Data, {
      //           lastUpdated: generateTimeStamp(),
      //           data: successData,
      //         }),
      //       }));
      //     default:
      //       return state;
      //   }
      // case authenticationConstants.LOGOUT_API[CALL]:
      //   switch (method) {
      //     case ON_SUCCESS:
      //       return newObject(state, {
      //         profile: {},
      //         isLoggedIn: false,
      //         authorization: false,
      //       });
      //     default:
      //       return state;
      //   }
      // case authenticationConstants.EDIT_MOBILE_NUMBER_API[CALL]:
      //   return state;
      // case authenticationConstants.VERIFY_OTP_FOR_EDIT_MOBILE_NUMBER_API[CALL]:
      //   switch (method) {
      //     case ON_SUCCESS:
      //       return newState(({ [type]: Data }) => ({
      //         profile: successData,
      //         [type]: newObject(Data, {
      //           lastUpdated: generateTimeStamp(),
      //           data: successData,
      //         }),
      //       }));
      //     default:
      //       return state;
      //   }
      // case authenticationConstants.UPDATE_USER_DETAILS_API[CALL]:
      //   switch (method) {
      //     case ON_SUCCESS:
      //       return newState(({ profile }) => ({
      //         profile: newObject(profile, payload, successData),
      //         isLoggedIn: true,
      //       }));
      //     default:
      //       return state;
      //   }
      // case authenticationConstants.USER_LOGOUT_API[CALL]:
      //   switch (method) {
      //     case ON_SUCCESS:
      //       return newObject(initialState, {
      //         authorization: true,
      //       });
      //     default:
      //       return state;
      //   }
      // case authenticationConstants.UPDATE_PROFILE_API[CALL]:
      //   switch (method) {
      //     case ON_SUCCESS:
      //       return newState(({ profile, [type]: Data }) => ({
      //         profile: newObject(profile, successData),
      //       }));
      //     default:
      //       return state;
      //   }
      // case authenticationConstants.USER_PROFILE_API[CALL]:
      //   switch (method) {
      //     case ON_SUCCESS:
      //       return newState(({ profile, [type]: Data }) => ({
      //         authorization: true,
      //         isLoggedIn: !!successData.name,
      //         profile: newObject(profile, successData),
      //         [type]: newObject(Data, commonHandler()),
      //       }));
      //    case ON_ERROR: {
      //         return newObject(state, ({ [type]: Data }) => ({
      //           [type]: newObject(Data, commmonErrorHandler()),
      //        }));
      // }
      //     default:
      //       return state;
      //   }

      default:
        {
          if (reducerFunction) {
            var returnData = reducerFunction({
              constants: authenticationConstants,
              successData: successData,
              restSuccessData: restSuccessData,
              payload: payload,
              query: query,
              state: state,
              params: params,
              restPayload: restPayload,
              loadingStatus: loadingStatus,
              statusCode: statusCode,
              type: type,
              reset: reset,
              newState: newState,
              method: method,
              statusMessage: statusMessage,
              errorData: errorData,
              restErrorData: restErrorData,
              resetState: ResetState,
              initialState: InitialState,
              commonHandler: commonHandler,
              commmonErrorHandler: commmonErrorHandler,
              defaultReducerHandler: defaultReducerHandler
            });
            if (returnData) return returnData;
          }

          return defaultReducerHandler();
        }
    }
  };
};

var dontResetKeyCheck = function dontResetKeyCheck(ResetState, action) {
  return (action.payload.dontResetKeys || []).length > 0 ? Object.entries(ResetState).reduce(function (acc, _ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        key = _ref4[0],
        val = _ref4[1];

    return (action.payload.dontResetKeys || []).includes(key) ? acc : _objectSpread({}, acc, _defineProperty({}, key, val));
  }, {}) : ResetState;
};

var Reducer = (function (_ref5) {
  var reducerFunction = _ref5.reducerFunction,
      authenticationConstants = _ref5.constants,
      InitialState = _ref5.InitialState,
      _ref5$handlers = _ref5.handlers,
      handlers = _ref5$handlers === void 0 ? [] : _ref5$handlers,
      _ref5$resetState = _ref5.resetState,
      ResetState = _ref5$resetState === void 0 ? {} : _ref5$resetState,
      _ref5$isMobile = _ref5.isMobile,
      isMobileApp = _ref5$isMobile === void 0 ? false : _ref5$isMobile,
      constantReducer = _ref5.constantReducer,
      reducerName = _ref5.reducerName;
  var initialState = newObject(InitialState, componentState);
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments.length > 1 ? arguments[1] : undefined;

    switch (action.type) {
      case 'RESET_API':
        return newObject(state, dontResetKeyCheck(ResetState, action));

      case 'MUTATE_STATE':
        return newObject(state, action.payload);

      case 'RESET_STATE':
        return newObject(state, dontResetKeyCheck(ResetState, action), dontResetKeyCheck(InitialState, action));

      case "".concat(reducerName, "_RESET_API"):
        return newObject(state, dontResetKeyCheck(ResetState, action));

      case "".concat(reducerName, "_MUTATE_STATE"):
        return newObject(state, action.payload);

      case "".concat(reducerName, "_RESET_STATE"):
        return newObject(state, dontResetKeyCheck(ResetState, action), dontResetKeyCheck(InitialState, action));

      default:
        {
          var reducerState = newObject(state);

          if (constantReducer) {
            var returnData = constantReducer({
              state: reducerState,
              type: type || action.type,
              action: action,
              constants: authenticationConstants,
              isMobile: isMobileApp,
              initialState: InitialState,
              resetState: ResetState
            });
            if (typeof returnData !== 'undefined') reducerState = returnData;
          }

          var newState = newObject.bind({}, reducerState);
          var _action$response2 = action.response;
          _action$response2 = _action$response2 === void 0 ? {} : _action$response2;
          var method = _action$response2.method,
              type = _action$response2.type;
          var execute = Object.keys(InitialState).concat(otherReducerConstants).includes(type || action.type);
          var constants = InitialState;
          if (execute) return commmonStateHandler({
            constants: constants,
            state: reducerState,
            action: action,
            method: method,
            newState: newState,
            updateState: updateState({
              authenticationConstants: authenticationConstants,
              ResetState: ResetState,
              isMobileApp: isMobileApp,
              handlers: handlers,
              initialState: initialState,
              reducerFunction: reducerFunction
            })
          });
          return reducerState;
        }
    }
  };
});

function CustomError(err) {
  var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var fileName = arguments.length > 2 ? arguments[2] : undefined;
  var lineNumber = arguments.length > 3 ? arguments[3] : undefined;
  var instance = new Error(message, fileName, lineNumber);
  instance = err;
  Object.setPrototypeOf(instance, Object.getPrototypeOf(this));

  if (Error.captureStackTrace) {
    Error.captureStackTrace(instance, CustomError);
  }

  return instance;
}

CustomError.prototype = Object.create(Error.prototype, {
  constructor: {
    value: Error,
    enumerable: false,
    writable: true,
    configurable: true
  }
});

if (Object.setPrototypeOf) {
  Object.setPrototypeOf(CustomError, Error);
}

var _marked = /*#__PURE__*/_regeneratorRuntime.mark(loaderGenerator);
var headers = '';

function loaderGenerator(_ref) {
  var type, commonData;
  return _regeneratorRuntime.wrap(function loaderGenerator$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          type = _ref.type, commonData = _ref.commonData;
          _context.next = 3;
          return put(apiLoadingStatus({
            type: type,
            payload: commonData,
            status: false
          }));

        case 3:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}

var delay = function delay(ms) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms);
  });
};

var checkKey$3 = function checkKey(key, name, dataType) {
  invariant(typeOf(key) === dataType, "(react-boilerplate-redux-saga-hoc)  Expected `".concat(name, "` to be a ").concat(dataType));
};

var _cache = {};
function _sagaHandler (_ref2) {
  var _marked2 = /*#__PURE__*/_regeneratorRuntime.mark(commonGenerator);

  var _ref2$actionType = _ref2.actionType,
      actionType = _ref2$actionType === void 0 ? {} : _ref2$actionType,
      requestResponseHandler = _ref2.requestResponseHandler,
      axiosInterceptors = _ref2.axiosInterceptors;

  function commonGenerator(_ref3) {
    var _ref3$payload, resolve, reject, isReject, _ref3$payload$request, _ref3$payload$request2, asyncFunction, _ref3$payload$request3, asyncFunctionParams, _ref3$payload$request4, payload, _ref3$payload$request5, params, query, _ref3$payload$request6, paramsSerializer, _ref3$payload$request7, axiosConfig, _ref3$payload$request8, cacheControl, _ref3$payload$request9, errorDataHandling, _ref3$payload$request10, clearDataOnError, _ref3$payload$request11, polling, _ref3$payload$request12, errorParser, _ref3$payload$request13, isResponseErrorParser, _ref3$payload$request14, Delay, _ref3$payload$request15, retry, _ref3$payload$request16, pollingCount, rest, _ref3$payload$callbac, successCallback, errorCallback, logoutCallback, finalCallback, pollingCallback, restCallback, restPayload, type, loop, count, pollingRequestConfig, _loop;

    return _regeneratorRuntime.wrap(function commonGenerator$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _ref3$payload = _ref3.payload;
            _ref3$payload = _ref3$payload === void 0 ? {} : _ref3$payload;
            resolve = _ref3$payload.resolve, reject = _ref3$payload.reject, isReject = _ref3$payload.isReject, _ref3$payload$request = _ref3$payload.request;
            _ref3$payload$request = _ref3$payload$request === void 0 ? {} : _ref3$payload$request;
            _ref3$payload$request2 = _ref3$payload$request.asyncFunction, asyncFunction = _ref3$payload$request2 === void 0 ? null : _ref3$payload$request2, _ref3$payload$request3 = _ref3$payload$request.asyncFunctionParams, asyncFunctionParams = _ref3$payload$request3 === void 0 ? null : _ref3$payload$request3, _ref3$payload$request4 = _ref3$payload$request.payload, payload = _ref3$payload$request4 === void 0 ? {} : _ref3$payload$request4, _ref3$payload$request5 = _ref3$payload$request.params, params = _ref3$payload$request5 === void 0 ? {} : _ref3$payload$request5, query = _ref3$payload$request.query, _ref3$payload$request6 = _ref3$payload$request.paramsSerializer, paramsSerializer = _ref3$payload$request6 === void 0 ? {
              arrayFormat: 'brackets'
            } : _ref3$payload$request6, _ref3$payload$request7 = _ref3$payload$request.axiosConfig, axiosConfig = _ref3$payload$request7 === void 0 ? {} : _ref3$payload$request7, _ref3$payload$request8 = _ref3$payload$request.useCache, cacheControl = _ref3$payload$request8 === void 0 ? false : _ref3$payload$request8, _ref3$payload$request9 = _ref3$payload$request.errorDataHandling, errorDataHandling = _ref3$payload$request9 === void 0 ? true : _ref3$payload$request9, _ref3$payload$request10 = _ref3$payload$request.clearDataOnError, clearDataOnError = _ref3$payload$request10 === void 0 ? false : _ref3$payload$request10, _ref3$payload$request11 = _ref3$payload$request.polling, polling = _ref3$payload$request11 === void 0 ? false : _ref3$payload$request11, _ref3$payload$request12 = _ref3$payload$request.errorParser, errorParser = _ref3$payload$request12 === void 0 ? false : _ref3$payload$request12, _ref3$payload$request13 = _ref3$payload$request.defaultErrorParser, isResponseErrorParser = _ref3$payload$request13 === void 0 ? false : _ref3$payload$request13, _ref3$payload$request14 = _ref3$payload$request.delay, Delay = _ref3$payload$request14 === void 0 ? 8000 : _ref3$payload$request14, _ref3$payload$request15 = _ref3$payload$request.retry, retry = _ref3$payload$request15 === void 0 ? 0 : _ref3$payload$request15, _ref3$payload$request16 = _ref3$payload$request.pollingCount, pollingCount = _ref3$payload$request16 === void 0 ? 'unlimited' : _ref3$payload$request16, rest = _objectWithoutProperties$1(_ref3$payload$request, ["asyncFunction", "asyncFunctionParams", "payload", "params", "query", "paramsSerializer", "axiosConfig", "useCache", "errorDataHandling", "clearDataOnError", "polling", "errorParser", "defaultErrorParser", "delay", "retry", "pollingCount"]), _ref3$payload$callbac = _ref3$payload.callback;
            _ref3$payload$callbac = _ref3$payload$callbac === void 0 ? {} : _ref3$payload$callbac;
            successCallback = _ref3$payload$callbac.successCallback, errorCallback = _ref3$payload$callbac.errorCallback, logoutCallback = _ref3$payload$callbac.logoutCallback, finalCallback = _ref3$payload$callbac.finalCallback, pollingCallback = _ref3$payload$callbac.pollingCallback, restCallback = _objectWithoutProperties$1(_ref3$payload$callbac, ["successCallback", "errorCallback", "logoutCallback", "finalCallback", "pollingCallback"]), restPayload = _objectWithoutProperties$1(_ref3$payload, ["resolve", "reject", "isReject", "request", "callback"]), type = _ref3.type;
            loop = true;
            count = 1;
            pollingRequestConfig = {};
            _loop = /*#__PURE__*/_regeneratorRuntime.mark(function _loop() {
              var axios, CancelToken, source, action, url, commonData, actionBind, request$1, _query, _url, requestData, postData, cancelTask, cacheId, _yield$race, _postData, _cancelTask, data, statusKey, _ref4, _ref4$data, _ref4$data$status, successStatus, _ref4$data$message, successMessage, successCallbackResponse, loader, _ref5, customMethod, _ref6, _ref6$data, _ref6$data$status, _successStatus, _ref6$data$message, _successMessage, pollingRes, _ref7, _ref7$response, _ref7$response$data, _ref7$response$data2, errorData, _ref7$response$data$s, errorStatus, _ref7$response$data$m, errorMessage, _loader, Cancelled, _yield$race2, CancelPolling;

              return _regeneratorRuntime.wrap(function _loop$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      axios = axiosInterceptors || request;
                      CancelToken = axios.CancelToken;
                      _context2.next = 4;
                      return CancelToken.source();

                    case 4:
                      source = _context2.sent;
                      _context2.next = 7;
                      return actionType[type];

                    case 7:
                      action = _context2.sent;
                      _context2.next = 10;
                      return action = _objectSpread({}, action, {
                        error: action.error || action.actions[ERROR],
                        success: action.success || action.actions[SUCCESS],
                        customTask: action.custom || action.actions[CUSTOM]
                      });

                    case 10:
                      url = '';

                      if (action.api && ['string', 'function'].includes(_typeof$2(action.api))) {
                        url = action.api;
                        action.api = {};
                      }

                      commonData = _objectSpread({
                        payload: payload,
                        params: params,
                        query: query
                      }, rest, {}, pollingRequestConfig, {
                        request: _objectSpread({
                          payload: payload,
                          params: params,
                          query: query,
                          errorDataHandling: errorDataHandling,
                          clearDataOnError: clearDataOnError
                        }, rest, {}, pollingRequestConfig),
                        callback: restCallback
                      }, restPayload);

                      actionBind = function actionBind(_action, _method) {
                        return _action.bind({}, type, _method, commonData);
                      };

                      if (!(typeof action.error === 'function')) {
                        _context2.next = 19;
                        break;
                      }

                      _context2.next = 17;
                      return actionBind(action.error, ON_ERROR);

                    case 17:
                      _context2.next = 19;
                      return action.error = _context2.sent;

                    case 19:
                      if (!(typeof action.success === 'function')) {
                        _context2.next = 24;
                        break;
                      }

                      _context2.next = 22;
                      return actionBind(action.success, ON_SUCCESS);

                    case 22:
                      _context2.next = 24;
                      return action.success = _context2.sent;

                    case 24:
                      _context2.next = 26;
                      return _objectSpread({}, action.api || {}, {
                        cancelToken: source.token,
                        url: action.api.url || url,
                        method: action.api.method || 'GET',
                        data: payload,
                        headers: headers
                      });

                    case 26:
                      request$1 = _context2.sent;

                      if (!action.effect) {
                        _context2.next = 30;
                        break;
                      }

                      _context2.next = 30;
                      return delete action.effect;

                    case 30:
                      if (!action.actions) {
                        _context2.next = 33;
                        break;
                      }

                      _context2.next = 33;
                      return delete action.actions;

                    case 33:
                      if (!((pollingRequestConfig && pollingRequestConfig.params || params) && typeof request$1.url === 'function')) {
                        _context2.next = 38;
                        break;
                      }

                      checkKey$3(params, '{request: { params }}', 'object'); // throw new Error(
                      //   `key 'params' should be object not a ${typeOf(params)}`,
                      // );

                      _context2.next = 37;
                      return request$1.url(pollingRequestConfig && pollingRequestConfig.params || params);

                    case 37:
                      request$1.url = _context2.sent;

                    case 38:
                      if (query || pollingRequestConfig && pollingRequestConfig.query) {
                        request$1.params = pollingRequestConfig && pollingRequestConfig.query || query; // eslint-disable-next-line no-loop-func

                        request$1.paramsSerializer = function (param) {
                          return Qs.stringify(param, pollingRequestConfig && pollingRequestConfig.paramsSerializer || paramsSerializer);
                        };
                      }

                      _query = pollingRequestConfig && pollingRequestConfig.query || query;
                      _url = "".concat(request$1.url).concat(Object.keys(_query || {}).length > 0 ? "?".concat(request$1.paramsSerializer(_query)) : '');

                      if (!(process.env.NODE_ENV !== 'test' || !action.test)) {
                        _context2.next = 44;
                        break;
                      }

                      _context2.next = 44;
                      return delete request$1.headers;

                    case 44:
                      _context2.next = 46;
                      return call(requestResponseHandler, {
                        type: type,
                        action: action,
                        request: request$1,
                        payload: commonData,
                        actionData: rest,
                        method: ON_REQUEST
                      });

                    case 46:
                      requestData = _context2.sent;
                      _context2.next = 49;
                      return request$1 = requestData || request$1;

                    case 49:
                      if (['POST', 'PATCH', 'PUT', 'DELETE'].includes(request$1.method)) {
                        _context2.next = 52;
                        break;
                      }

                      _context2.next = 52;
                      return delete request$1.data;

                    case 52:
                      if (request$1.effect) delete request$1.effect;
                      postData = '';
                      cancelTask = '';
                      _context2.prev = 55;
                      cacheId = "".concat(_url || '', "_").concat(JSON.stringify(request$1));

                      if (!(cacheControl && request$1.method === 'GET' && _cache[cacheId] && !polling)) {
                        _context2.next = 61;
                        break;
                      }

                      postData = _objectSpread({}, _cache[cacheId]);
                      _context2.next = 68;
                      break;

                    case 61:
                      _context2.next = 63;
                      return race({
                        posts: typeof asyncFunction === 'function' ? call.apply(void 0, [asyncFunction].concat(_toConsumableArray(Array.isArray(pollingRequestConfig && pollingRequestConfig.asyncFunctionParams || asyncFunctionParams) ? pollingRequestConfig && pollingRequestConfig.asyncFunctionParams || asyncFunctionParams : []))) : call(axios, _objectSpread({}, request$1, {}, pollingRequestConfig && pollingRequestConfig.axiosConfig || axiosConfig)),
                        cancel: take(action.cancel)
                      });

                    case 63:
                      _yield$race = _context2.sent;
                      _postData = _yield$race.posts;
                      _cancelTask = _yield$race.cancel;
                      cancelTask = _cancelTask;
                      postData = _postData;

                    case 68:
                      data = postData ? _objectSpread({}, postData) : postData;
                      postData = postData || {};

                      if (!(postData && postData.data)) {
                        _context2.next = 75;
                        break;
                      }

                      statusKey = action.api.responseStatusCodeKey || '';
                      data = {
                        data: {
                          status: ((action.api.responseStatusCode || []).includes((postData.data || {})[statusKey]) ? 200 : (postData.data || {})[statusKey]) || postData && postData.status,
                          statusCode: (postData.data || {})[statusKey] || postData && postData.status,
                          message: (postData.data || {})[action.api.responseMessageKey || 'message'],
                          data: (postData.data || {})[action.api.responseDataKey] || postData.data || postData
                        }
                      };

                      if (!(action.api.errorHandlerStatusCode && (action.api.errorHandlerStatusCode || []).includes(data.data.status))) {
                        _context2.next = 75;
                        break;
                      }

                      throw new CustomError({
                        isAxiosError: true,
                        response: {
                          data: {
                            error: (postData && postData.data || {})[action.api.errorDataKey || 'error'] || postData && postData.data || postData,
                            status: data.data.status,
                            statusCode: data.data.status,
                            message: data.data.message || 'Error'
                          }
                        }
                      });

                    case 75:
                      if (!data) {
                        _context2.next = 96;
                        break;
                      }

                      _ref4 = data || {}, _ref4$data = _ref4.data;
                      _ref4$data = _ref4$data === void 0 ? {} : _ref4$data;
                      _ref4$data$status = _ref4$data.status, successStatus = _ref4$data$status === void 0 ? postData && postData.status : _ref4$data$status, _ref4$data$message = _ref4$data.message, successMessage = _ref4$data$message === void 0 ? '' : _ref4$data$message;
                      _context2.next = 81;
                      return action.success = action.success.bind({}, successStatus, successMessage);

                    case 81:
                      successCallbackResponse = null;

                      if (!(typeof successCallback === 'function')) {
                        _context2.next = 86;
                        break;
                      }

                      _context2.next = 85;
                      return call(successCallback, {
                        response: postData,
                        posts: data,
                        data: data.data,
                        res: data && data.data && data.data.data,
                        message: successMessage,
                        status: successStatus
                      });

                    case 85:
                      successCallbackResponse = _context2.sent;

                    case 86:
                      if (successCallbackResponse) if (typeOf(successCallbackResponse) === 'object') {
                        if (typeOf(successCallbackResponse.task) === 'object') commonData.task = successCallbackResponse.task;
                        if (successCallbackResponse.filter) commonData.filter = successCallbackResponse.filter;
                        if (successCallbackResponse.updateDataReducerKey) commonData.updateDataReducerKey = successCallbackResponse.updateDataReducerKey;
                        if (typeOf(successCallbackResponse) === 'array' && successCallbackResponse.tasks.filter(function (e) {
                          return e.task || e.filter;
                        }).length > 0) commonData.tasks = successCallbackResponse.tasks;
                      } else if (typeOf(successCallbackResponse) === 'array' && successCallbackResponse.filter(function (e) {
                        return e.task || e.filter;
                      }).length > 0) commonData.tasks = successCallbackResponse;
                      _context2.next = 89;
                      return call(requestResponseHandler, {
                        data: data,
                        type: type,
                        action: action,
                        payload: commonData,
                        actionData: rest,
                        method: ON_SUCCESS
                      });

                    case 89:
                      loader = _context2.sent;

                      if (!loader) {
                        _context2.next = 93;
                        break;
                      }

                      _context2.next = 93;
                      return call(loaderGenerator, {
                        type: type,
                        commonData: commonData
                      });

                    case 93:
                      if (typeof logoutCallback === 'function') setTimeout(function () {
                        return logoutCallback(data);
                      }, 500);
                      _context2.next = 115;
                      break;

                    case 96:
                      if (!(cancelTask && typeof source.cancel === 'function')) {
                        _context2.next = 108;
                        break;
                      }

                      _context2.next = 99;
                      return source.cancel();

                    case 99:
                      _ref5 = cancelTask || {}, customMethod = _ref5.response.method;

                      if (customMethod) {
                        _context2.next = 103;
                        break;
                      }

                      _context2.next = 103;
                      return call(requestResponseHandler, {
                        type: type,
                        action: action,
                        payload: commonData,
                        actionData: rest,
                        method: ON_CANCEL,
                        axiosCancel: cancelTask
                      });

                    case 103:
                      _context2.next = 105;
                      return call(loaderGenerator, {
                        type: type,
                        commonData: commonData
                      });

                    case 105:
                      loop = false;
                      _context2.next = 115;
                      break;

                    case 108:
                      if (!(process.env.NODE_ENV === 'test' && action.success)) {
                        _context2.next = 113;
                        break;
                      }

                      _context2.next = 111;
                      return put(action.success({
                        data: data
                      }));

                    case 111:
                      _context2.next = 115;
                      break;

                    case 113:
                      _context2.next = 115;
                      return call(loaderGenerator, {
                        type: type,
                        commonData: commonData
                      });

                    case 115:
                      if (!(polling && typeof window !== 'undefined' && typeof pollingCallback === 'function')) {
                        _context2.next = 123;
                        break;
                      }

                      _ref6 = data || {}, _ref6$data = _ref6.data;
                      _ref6$data = _ref6$data === void 0 ? {} : _ref6$data;
                      _ref6$data$status = _ref6$data.status, _successStatus = _ref6$data$status === void 0 ? postData && postData.status : _ref6$data$status, _ref6$data$message = _ref6$data.message, _successMessage = _ref6$data$message === void 0 ? '' : _ref6$data$message;
                      _context2.next = 121;
                      return call(pollingCallback, {
                        response: data,
                        data: data && data.data,
                        message: _successMessage,
                        status: _successStatus,
                        count: count
                      });

                    case 121:
                      pollingRes = _context2.sent;
                      if (typeof pollingRes === 'boolean') loop = pollingRes;else if (Object.prototype.toString.call(pollingRes) === '[object Object]') pollingRequestConfig = pollingRes;

                    case 123:
                      if (!polling && retry) loop = false;
                      if (resolve && typeOf(resolve) === 'function') if (cancelTask && typeof source.cancel === 'function') {
                        resolve({
                          status: 'CANCELLED',
                          response: null,
                          data: null
                        });
                      } else {
                        resolve({
                          status: 'SUCCESS',
                          response: postData,
                          data: data && data.data && data.data.data
                        });
                        _cache[cacheId] = postData;
                      }
                      _context2.next = 159;
                      break;

                    case 127:
                      _context2.prev = 127;
                      _context2.t0 = _context2["catch"](55);

                      if (!(_context2.t0 && _typeof$2(_context2.t0) === 'object' && !_context2.t0.isAxiosError)) {
                        _context2.next = 131;
                        break;
                      }

                      throw new Error(_context2.t0);

                    case 131:
                      if (!(!polling && retry && retry - 1 >= count)) {
                        _context2.next = 134;
                        break;
                      }

                      _context2.next = 159;
                      break;

                    case 134:
                      if (isReject && reject && typeOf(reject) === 'function') reject({
                        status: 'ERROR',
                        error: _context2.t0,
                        respone: _context2.t0 && _context2.t0.response
                      });else if (resolve && typeOf(resolve) === 'function') resolve({
                        status: 'ERROR',
                        error: _context2.t0,
                        respone: _context2.t0 && _context2.t0.response
                      });
                      if (process.env.NODE_ENV === 'test') console.log(_context2.t0);
                      _ref7 = _context2.t0 || {}, _ref7$response = _ref7.response;
                      _ref7$response = _ref7$response === void 0 ? {} : _ref7$response;
                      _ref7$response$data = _ref7$response.data;
                      _ref7$response$data = _ref7$response$data === void 0 ? {} : _ref7$response$data;
                      _ref7$response$data2 = _ref7$response$data[action.api.errorDataKey || 'error'], errorData = _ref7$response$data2 === void 0 ? _context2.t0 && _context2.t0.response && _context2.t0.response.data || _context2.t0 && _context2.t0.response || '' : _ref7$response$data2, _ref7$response$data$s = _ref7$response$data.status, errorStatus = _ref7$response$data$s === void 0 ? _context2.t0 && _context2.t0.response && _context2.t0.response.data && (_context2.t0.response.data[action.api.errorStatusKey] || _context2.t0 && _context2.t0.response && _context2.t0.response.status) : _ref7$response$data$s, _ref7$response$data$m = _ref7$response$data.message, errorMessage = _ref7$response$data$m === void 0 ? _context2.t0 && _context2.t0.response && _context2.t0.response.data && _context2.t0.response.data[action.api.errorMessageKey] || _context2.t0 && _context2.t0.response && _context2.t0.response.statusText || '' : _ref7$response$data$m;

                      if (!(typeof errorCallback === 'function')) {
                        _context2.next = 144;
                        break;
                      }

                      _context2.next = 144;
                      return call(errorCallback, _objectSpread({
                        error: _context2.t0,
                        errorData: isResponseErrorParser ? errorData && _typeof$2(responseErrorParser(errorData)) === 'object' && Object.keys(responseErrorParser(errorData) || {}).length > 0 ? responseErrorParser(errorData) : errorData : errorData
                      }, typeof errorParser === 'function' ? {
                        errorParser: errorParser({
                          error: _context2.t0,
                          errorData: errorData,
                          status: errorStatus,
                          response: _context2.t0 && _context2.t0.response,
                          message: errorMessage
                        })
                      } : {}, {
                        message: errorMessage,
                        status: errorStatus,
                        response: _context2.t0 && _context2.t0.response,
                        errors: errorData
                      }));

                    case 144:
                      _context2.next = 146;
                      return action.error = action.error.bind({}, errorStatus, errorMessage);

                    case 146:
                      if (!(axios.isCancel(_context2.t0) && action.cancel)) {
                        _context2.next = 153;
                        break;
                      }

                      _context2.next = 149;
                      return call(loaderGenerator, {
                        type: type,
                        commonData: commonData
                      });

                    case 149:
                      _context2.next = 151;
                      return call(requestResponseHandler, {
                        type: type,
                        action: action,
                        payload: commonData,
                        actionData: rest,
                        method: ON_CANCEL_ERROR
                      });

                    case 151:
                      _context2.next = 159;
                      break;

                    case 153:
                      _context2.next = 155;
                      return call(requestResponseHandler, {
                        error: {
                          response: {
                            data: {
                              status: errorStatus,
                              data: errorDataHandling ? errorData : null,
                              message: errorMessage
                            }
                          }
                        },
                        type: type,
                        action: action,
                        payload: commonData,
                        actionData: rest,
                        method: ON_ERROR
                      });

                    case 155:
                      _loader = _context2.sent;

                      if (!_loader) {
                        _context2.next = 159;
                        break;
                      }

                      _context2.next = 159;
                      return call(loaderGenerator, {
                        type: type,
                        commonData: commonData
                      });

                    case 159:
                      _context2.prev = 159;
                      _context2.next = 162;
                      return cancelled();

                    case 162:
                      Cancelled = _context2.sent;

                      if (!(typeof finalCallback === 'function')) {
                        _context2.next = 166;
                        break;
                      }

                      _context2.next = 166;
                      return call(finalCallback, {
                        type: type,
                        action: action,
                        payload: commonData,
                        Cancelled: Cancelled
                      });

                    case 166:
                      _context2.next = 168;
                      return call(requestResponseHandler, {
                        type: type,
                        action: action,
                        payload: commonData,
                        actionData: rest,
                        method: ON_FINALLY,
                        cancelled: Cancelled
                      });

                    case 168:
                      if (!Cancelled) {
                        _context2.next = 173;
                        break;
                      }

                      if (!(typeof source.cancel === 'function')) {
                        _context2.next = 172;
                        break;
                      }

                      _context2.next = 172;
                      return source.cancel();

                    case 172:
                      loop = false;

                    case 173:
                      return _context2.finish(159);

                    case 174:
                      if (!(polling && typeof window !== 'undefined' && loop)) {
                        _context2.next = 187;
                        break;
                      }

                      if (!(pollingCount === 'unlimited' || pollingCount - 1 >= count)) {
                        _context2.next = 184;
                        break;
                      }

                      count += 1;
                      _context2.next = 179;
                      return race({
                        posts: call(delay, Delay),
                        cancel: take(action.cancel)
                      });

                    case 179:
                      _yield$race2 = _context2.sent;
                      CancelPolling = _yield$race2.cancel;
                      if (CancelPolling) loop = false;
                      _context2.next = 185;
                      break;

                    case 184:
                      loop = false;

                    case 185:
                      _context2.next = 188;
                      break;

                    case 187:
                      if (!polling && retry && loop) {
                        if (retry - 1 >= count) {
                          loop = true;
                          count += 1;
                        } else loop = false;
                      } else loop = false;

                    case 188:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _loop, null, [[55, 127, 159, 174]]);
            });

          case 11:
            return _context3.delegateYield(_loop(), "t0", 12);

          case 12:
            if (loop) {
              _context3.next = 11;
              break;
            }

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _marked2);
  }

  var generatorPattern = Object.keys(actionType).map(function (pattern) {
    return (actionType[pattern].effect || takeLatest$1)(pattern, commonGenerator);
  });
  return [generatorPattern, commonGenerator];
}

var _marked$1 = /*#__PURE__*/_regeneratorRuntime.mark(DEFAULT_SAGA_HANDLER);
function DEFAULT_SAGA_HANDLER(_ref) {
  var method, action, successData, requestData, successStatus, restSuccessData, errorStatus, errorData;
  return _regeneratorRuntime.wrap(function DEFAULT_SAGA_HANDLER$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          method = _ref.method, action = _ref.action, successData = _ref.successData, requestData = _ref.requestData, successStatus = _ref.successStatus, restSuccessData = _ref.restSuccessData, errorStatus = _ref.errorStatus, errorData = _ref.errorData;
          _context.t0 = method;
          _context.next = _context.t0 === ON_REQUEST ? 4 : _context.t0 === ON_CANCEL ? 5 : _context.t0 === ON_SUCCESS ? 6 : _context.t0 === ON_ERROR ? 13 : 21;
          break;

        case 4:
          return _context.abrupt("return", requestData);

        case 5:
          return _context.abrupt("return", true);

        case 6:
          if (![200, 201].includes(successStatus)) {
            _context.next = 11;
            break;
          }

          _context.next = 9;
          return put(action.success(_objectSpread({
            data: successData
          }, restSuccessData)));

        case 9:
          _context.next = 12;
          break;

        case 11:
          return _context.abrupt("return", true);

        case 12:
          return _context.abrupt("break", 21);

        case 13:
          if (!errorStatus) {
            _context.next = 18;
            break;
          }

          _context.next = 16;
          return put(action.error({
            data: errorData
          }));

        case 16:
          _context.next = 20;
          break;

        case 18:
          _context.next = 20;
          return put(action.error({
            data: {}
          }));

        case 20:
          return _context.abrupt("break", 21);

        case 21:
        case "end":
          return _context.stop();
      }
    }
  }, _marked$1);
}

var requestResponseHandler = function requestResponseHandler(_ref) {
  var constants = _ref.constants,
      sagaFunction = _ref.sagaFunction;
  return (
    /*#__PURE__*/
    // eslint-disable-next-line func-names
    _regeneratorRuntime.mark(function _callee(_ref2) {
      var _ref2$data, _ref2$data$data, successStatus, _ref2$data$data$data, successData, successMessage, restSuccessData, request, action, type, _ref2$payload, _ref2$payload$payload, _ref2$payload$query, _ref2$payload$params, restPayload, method, actionData, axiosCancel, _ref2$error, _ref2$error$response, _ref2$error$response$, errorStatus, _ref2$error$response$2, errorData, errorMessage, restErrorData, cancelled, requestData, requestParams, DEFAULT_SAGA_HANDLER$1;

      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _ref2$data = _ref2.data;
              _ref2$data = _ref2$data === void 0 ? {} : _ref2$data;
              _ref2$data$data = _ref2$data.data;
              _ref2$data$data = _ref2$data$data === void 0 ? {} : _ref2$data$data;
              successStatus = _ref2$data$data.status, _ref2$data$data$data = _ref2$data$data.data, successData = _ref2$data$data$data === void 0 ? {} : _ref2$data$data$data, successMessage = _ref2$data$data.message, restSuccessData = _objectWithoutProperties$1(_ref2$data$data, ["status", "data", "message"]), request = _ref2.request, action = _ref2.action, type = _ref2.type, _ref2$payload = _ref2.payload;
              _ref2$payload = _ref2$payload === void 0 ? {} : _ref2$payload;
              _ref2$payload$payload = _ref2$payload.payload, _ref2$payload$query = _ref2$payload.query, _ref2$payload$params = _ref2$payload.params, restPayload = _objectWithoutProperties$1(_ref2$payload, ["payload", "query", "params"]), method = _ref2.method, actionData = _ref2.actionData, axiosCancel = _ref2.axiosCancel, _ref2$error = _ref2.error;
              _ref2$error = _ref2$error === void 0 ? {} : _ref2$error;
              _ref2$error$response = _ref2$error.response;
              _ref2$error$response = _ref2$error$response === void 0 ? {} : _ref2$error$response;
              _ref2$error$response$ = _ref2$error$response.data;
              _ref2$error$response$ = _ref2$error$response$ === void 0 ? {} : _ref2$error$response$;
              errorStatus = _ref2$error$response$.status, _ref2$error$response$2 = _ref2$error$response$.data, errorData = _ref2$error$response$2 === void 0 ? [] : _ref2$error$response$2, errorMessage = _ref2$error$response$.message, restErrorData = _objectWithoutProperties$1(_ref2$error$response$, ["status", "data", "message"]), cancelled = _ref2.cancelled;
              requestData = {};
              if (method === ON_REQUEST) requestData = newObject(request);
              requestParams = {
                method: method,
                action: action,
                successData: successData,
                requestData: requestData,
                successStatus: successStatus,
                restSuccessData: restSuccessData,
                errorStatus: errorStatus,
                errorData: errorData,
                restPayload: restPayload,
                restErrorData: restErrorData
              };
              DEFAULT_SAGA_HANDLER$1 = DEFAULT_SAGA_HANDLER.bind(null, requestParams);

              if (!sagaFunction) {
                _context.next = 21;
                break;
              }

              _context.next = 20;
              return call(sagaFunction, newObject({
                type: type,
                constants: constants,
                DEFAULT_SAGA_HANDLER: DEFAULT_SAGA_HANDLER$1
              }, requestParams));

            case 20:
              return _context.abrupt("return", _context.sent);

            case 21:
              _context.t0 = method;
              _context.next = _context.t0 === ON_REQUEST ? 24 : 25;
              break;

            case 24:
              return _context.abrupt("return", requestData);

            case 25:
              _context.next = 27;
              return call(DEFAULT_SAGA_HANDLER$1);

            case 27:
              return _context.abrupt("return", _context.sent);

            case 28:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })
  );
};

var Saga = (function (_ref) {
  var sagaConfig = _ref.sagaConfig,
      constants = _ref.constants,
      sagaFunction = _ref.sagaFunction,
      axiosInterceptors = _ref.axiosInterceptors,
      _ref$constantSaga = _ref.constantSaga,
      OtherGenerator = _ref$constantSaga === void 0 ? [] : _ref$constantSaga;

  var _sagaHandler2 = _sagaHandler({
    requestResponseHandler: requestResponseHandler({
      constants: constants,
      sagaFunction: sagaFunction
    }),
    actionType: sagaConfig,
    axiosInterceptors: axiosInterceptors
  }),
      _sagaHandler3 = _slicedToArray(_sagaHandler2, 2),
      generatorPattern = _sagaHandler3[0],
      sagaGenerator = _sagaHandler3[1]; // For Test Purpose


  var Generator = sagaGenerator; // eslint-disable-next-line func-names

  var saga = /*#__PURE__*/_regeneratorRuntime.mark(function saga() {
    return _regeneratorRuntime.wrap(function saga$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return all(generatorPattern.concat(OtherGenerator || []));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, saga);
  });

  return {
    saga: saga,
    Generator: Generator
  };
});

var safe$1 = nullcheck;

var checkKey$4 = function checkKey(key, name, dataType) {
  var convertArray = Array.isArray(dataType) ? dataType : [dataType];
  invariant(convertArray.includes(typeOf(key)), "(react-boilerplate-redux-saga-hoc)  Expected `".concat(name, "` to be a (").concat(convertArray.join(' | '), ")"));
};

var index = (function (_ref) {
  var _ref$handlers = _ref.handlers,
      handlers = _ref$handlers === void 0 ? [] : _ref$handlers,
      _ref$nextJS = _ref.nextJS,
      nextJS = _ref$nextJS === void 0 ? false : _ref$nextJS,
      _ref$createReducer = _ref.createReducer,
      createReducer = _ref$createReducer === void 0 ? null : _ref$createReducer,
      _ref$useHook = _ref.useHook,
      useHook = _ref$useHook === void 0 ? false : _ref$useHook,
      _ref$useHocHook = _ref.useHocHook,
      useHocHook = _ref$useHocHook === void 0 ? false : _ref$useHocHook;
  return function () {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref2$apiEndPoints = _ref2.apiEndPoints,
        apiEndPoints = _ref2$apiEndPoints === void 0 ? {} : _ref2$apiEndPoints,
        _ref2$initialState = _ref2.initialState,
        initialState = _ref2$initialState === void 0 ? {} : _ref2$initialState,
        _ref2$getDefaultConfi = _ref2.getDefaultConfig,
        getDefaultConfig = _ref2$getDefaultConfi === void 0 ? false : _ref2$getDefaultConfi,
        _ref2$dontReset = _ref2.dontReset,
        dontResetOnLogout = _ref2$dontReset === void 0 ? {} : _ref2$dontReset,
        _ref2$isMobile = _ref2.isMobile,
        isMobile = _ref2$isMobile === void 0 ? false : _ref2$isMobile,
        sagaFunction = _ref2.saga,
        _ref2$constantSaga = _ref2.constantSaga,
        constantSaga = _ref2$constantSaga === void 0 ? [] : _ref2$constantSaga,
        constantReducer = _ref2.constantReducer,
        reducerFunction = _ref2.reducer,
        reducerName = _ref2.name,
        axiosInterceptors = _ref2.axiosInterceptors,
        _ref2$useHook = _ref2.useHook,
        _useHook = _ref2$useHook === void 0 ? false : _ref2$useHook;

    invariant(!!reducerName && typeOf(reducerName) === 'string', '(react-boilerplate-redux-saga-hoc)  Expected `name` to be a non empty string');
    checkKey$4(apiEndPoints, 'apiEndPoints', 'object');
    checkKey$4(initialState, 'initialState', 'object');
    checkKey$4(dontResetOnLogout, 'dontReset', ['object', 'array']);
    if (sagaFunction) checkKey$4(sagaFunction, 'saga', 'function');
    checkKey$4(constantSaga, 'constantSaga', 'array');
    checkKey$4(handlers, 'handlers', 'array');
    if (constantReducer) checkKey$4(constantReducer, 'constantReducer', 'function');
    if (reducerFunction) checkKey$4(reducerFunction, 'reducer', 'function');
    if (createReducer) checkKey$4(createReducer, 'createReducer', 'function');

    var ApiEndPoints = _defineProperty({}, reducerName, apiEndPoints);

    var _generateConstants = generateConstants({
      apiEndPoints: ApiEndPoints,
      generatorKey: reducerName,
      dontResetOnLogout: dontResetOnLogout
    }),
        constants = _generateConstants.constants,
        InitialState = _generateConstants.initialState,
        resetState = _generateConstants.resetState,
        Action = _generateConstants.actions,
        sagaConfig = _generateConstants.sagaConfig;

    var _generateAction = generateAction(Action),
        componentActions = _generateAction.componentActions;

    var _Saga = Saga({
      sagaConfig: sagaConfig,
      constants: constants,
      sagaFunction: sagaFunction,
      axiosInterceptors: axiosInterceptors,
      constantSaga: constantSaga
    }),
        saga = _Saga.saga;

    var reducer = Reducer({
      constants: constants,
      InitialState: newObject(initialState, InitialState),
      reducerFunction: reducerFunction,
      resetState: resetState,
      constantReducer: constantReducer,
      isMobile: isMobile,
      handlers: handlers,
      reducerName: reducerName
    });

    var componentData = _defineProperty({}, "".concat(reducerName, "_hoc"), {
      reducerConstants: Object.entries(constants).reduce(function (acc, _ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            key = _ref4[0],
            value = _ref4[1];

        return _objectSpread({}, acc, _defineProperty({}, key, value[commonConstants.CALL]));
      }, {}),
      constants: constants,
      initialState: initialState,
      axios: axiosInterceptors || request,
      resetState: resetState,
      reducerName: reducerName
    });

    var commonProps = useHook || _useHook ? {
      safe: safe$1
    } : {
      safe: safe$1,
      getData: getData
    };
    var injectSagaConfig = {
      key: reducerName,
      saga: saga
    };
    var injectReducerConfig = {
      key: reducerName,
      reducer: reducer
    }; // eslint-disable-next-line no-underscore-dangle

    var _useHocHook = function _useHocHook() {
      useInjectSaga(injectSagaConfig);
      useInjectReducer(injectReducerConfig, createReducer);
      var dispatch = reactRedux.useDispatch();

      var _useState = React.useState(_objectSpread({}, componentData["".concat(reducerName, "_hoc")], {
        actions: redux.bindActionCreators(componentActions, dispatch),
        dispatch: dispatch
      })),
          _useState2 = _slicedToArray(_useState, 1),
          state = _useState2[0];

      return state;
    };

    if (useHocHook && !nextJS) return _useHocHook;

    var hoc = function hoc(WrapperComponent) {
      function WithHoc(props) {
        return React__default.createElement(WrapperComponent, _extends$3({}, commonProps, props));
      }

      WithHoc.propTypes = {};
      WithHoc.displayName = "withReactBoilerplateReduxSagaHoc(".concat(WrapperComponent.displayName || WrapperComponent.name || 'BaseComponent', ")");
      var MakeSelectAuthenticationState = makeSelectAuthenticationState({
        apiEndPoints: ApiEndPoints,
        initialState: newObject(initialState, InitialState),
        InitialState: initialState,
        generatorKey: reducerName,
        constants: constants
      });
      var mapStateToProps = reselect.createStructuredSelector(_defineProperty({}, "".concat(reducerName, "_data"), MakeSelectAuthenticationState()));
      var authenticationReducer = injectReducer({
        key: reducerName,
        reducer: reducer
      }, createReducer);
      var authenticationSaga = injectSaga({
        key: reducerName,
        saga: saga
      });
      var withConnect = reactRedux.connect(useHook ? null : mapStateToProps, mapDispatchToProps(componentActions, componentData, reducerName));

      if (nextJS) {
        WithHoc.getInitialProps = /*#__PURE__*/function () {
          var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(props) {
            var _ref6, res, req, store, rest, data;

            return _regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _ref6 = props.ctx || props, res = _ref6.res, req = _ref6.req, store = _ref6.store, rest = _objectWithoutProperties$1(_ref6, ["res", "req", "store"]);
                    data = _objectSpread({
                      res: res,
                      req: req,
                      store: store
                    }, rest);

                    if (!WrapperComponent.getInitialProps) {
                      _context.next = 6;
                      break;
                    }

                    _context.next = 5;
                    return WrapperComponent.getInitialProps(_objectSpread({}, props, {}, mapDispatchToProps(componentActions, componentData, reducerName)(store.dispatch)));

                  case 5:
                    data = _context.sent;

                  case 6:
                    return _context.abrupt("return", data || {});

                  case 7:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));

          return function (_x) {
            return _ref5.apply(this, arguments);
          };
        }();

        return withConnect(WithHoc);
      }

      return redux.compose(withConnect, authenticationReducer, authenticationSaga)(WithHoc);
    };

    if (nextJS && getDefaultConfig) return _objectSpread({
      hoc: hoc,
      saga: saga,
      hook: useHocHook,
      reducer: {
        name: reducerName,
        reducer: reducer
      },
      actions: _objectSpread({}, componentActions)
    }, componentData["".concat(reducerName, "_hoc")]);
    if (nextJS) return {
      hoc: hoc,
      saga: saga,
      hook: useHocHook,
      reducer: {
        name: reducerName,
        reducer: reducer
      }
    };

    if (getDefaultConfig) {
      return _objectSpread({
        hoc: hoc,
        actions: _objectSpread({}, componentActions)
      }, componentData["".concat(reducerName, "_hoc")]);
    }

    return hoc;
  };
});

var passwordReg = new RegExp(/^.{6,16}$/);
var emailReg = new RegExp('^([\\w\\.\\+\\-]+\\@[a-zA-Z0-9\\.\\-]+\\.[a-zA-z0-9]{2,4})$');
var mobileReg = new RegExp(/^\d{10,10}$/);
var nameReg = new RegExp('^[a-zA-Z ]+$');
var stringReg = new RegExp(/^[a-zA-Z0-9\s,'-]*$/);
var numberReg = new RegExp('^[\\d]+$');
var decimalReg = new RegExp('^[+-]?([0-9]*[.])?[0-9]+');
var postiveIntegerReg = new RegExp('^([1-9][0-9]+|[0-9])$');

/* eslint-disable */

function _isEmpty(value) {
  if (value && typeof value === 'string' && value.trim()) return false;
  if (typeof value === 'number' && (value || value === 0)) return false;
  return true;
}
function _isValidPassword(value) {
  return passwordReg.test(value.trim());
}
function _isValidEmail(value) {
  return emailReg.test(value.trim());
}
function _isValidMobile(value) {
  return mobileReg.test(value.trim());
}
function _isValidNumber(value) {
  return numberReg.test(value);
}
function _isValidFloatNumber(value) {
  return decimalReg.test(value);
}
function _isPostiveInteger(value) {
  return postiveIntegerReg.test(value);
}
function _isMatching(val1, val2) {
  // return type should be boolean
  if (val1 && val2 && typeof val1 === 'string' && typeof val2 === 'string' && val1.trim() == val2.trim()) return true;
  return false;
}
function _isValidName(value) {
  return nameReg.test(value.trim());
}
function _isValidString(value) {
  return stringReg.test(value.trim());
}
function _isValidTextAreaInput(value) {
  return value.length > 4 ? false : true;
}
function _isValidArray(value) {
  return value.length > 0 ? false : true;
}

/* eslint-disable no-underscore-dangle */

function validateForm(validationData) {
  // let value = this[`${type}Ref`].value(),
  var error = {
    isError: false
  }; // eslint-disable-next-line

  Object.entries(validationData).map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        formObject = _ref2[1];

    var type = formObject.type,
        value = formObject.value,
        message = formObject.message,
        _formObject$optional = formObject.optional,
        optional = _formObject$optional === void 0 ? false : _formObject$optional; // const isEmpty = validate._isEmpty(validationData[value].value);

    var isEmpty;

    if (!optional || value) {
      if (Array.isArray(value)) {
        isEmpty = !value.length > 0;
      } else {
        isEmpty = _isEmpty(value);
      }

      var typeMatch = {};

      if (!isEmpty) {
        // Add more cases depending upon the types that need to be checked
        // eslint-disable-next-line default-case
        switch (type) {
          case 'email':
            typeMatch.hasPassed = _isValidEmail(value);

            if (!typeMatch.hasPassed) {
              error["".concat(key)] = message || 'Please enter Valid Email eg. (abc@abc.com)';
            }

            break;

          case 'mobile':
            typeMatch.hasPassed = _isValidMobile(value);

            if (!typeMatch.hasPassed) {
              error["".concat(key)] = message || 'Please enter Valid Mobile Number';
            }

            break;

          case 'password':
            typeMatch.hasPassed = _isValidPassword(value);

            if (!typeMatch.hasPassed) {
              error["".concat(key)] = message || 'Passwords must contain at least 6 characters to 20 characters';
            }

            break;

          case 'confirmPassword':
            {
              // eslint-disable-line no-case-declarations
              // const password  = findKey(validationData, { type: 'password' });
              var password = validationData[key].compareValue;
              typeMatch.hasPassed = _isMatching(password, value);

              if (!typeMatch.hasPassed) {
                error["".concat(key)] = message || 'Password & Confirm password do not match';
              }

              break;
            }

          case 'string':
            typeMatch.hasPassed = _isValidString(value);

            if (!typeMatch.hasPassed) {
              error["".concat(key)] = message || 'Invalid format';
            }

            break;

          case 'name':
            typeMatch.hasPassed = _isValidName(value);

            if (!typeMatch.hasPassed) {
              error["".concat(key)] = message || 'Invalid format';
            }

            if (validationData[value] && value.length < 3) {
              error["".concat(key)] = message || 'Name Must Be Greater Than 2 Characters';
            }

            break;

          case 'number':
            typeMatch.hasPassed = _isValidNumber(value);

            if (!typeMatch.hasPassed) {
              error["".concat(key)] = message || 'Invalid format';
            }

            break;

          case 'float':
            typeMatch.hasPassed = _isValidFloatNumber(value);

            if (!typeMatch.hasPassed) {
              error["".concat(key)] = message || 'Invalid format';
            }

            break;

          case 'postiveIntegerReg':
            typeMatch.hasPassed = _isPostiveInteger(value);

            if (!typeMatch.hasPassed) {
              error["".concat(key)] = message || 'Enter a valid input';
            }

            break;

          case 'array':
            typeMatch.hasPassed = _isValidArray(value);

            if (typeMatch.hasPassed) {
              error["".concat(key)] = message || 'Please upload Images';
            }

            break;

          case 'textarea':
            typeMatch.hasPassed = _isValidTextAreaInput(value);

            if (typeMatch.hasPassed) {
              error["".concat(key)] = message || 'Description should be of mininum 5 characters';
            }

            break;

          case 'dateString':
            typeMatch.hasPassed = _isValidTextAreaInput(value);

            if (typeMatch.hasPassed) {
              error["".concat(key)] = message || 'Description should be of mininum 5 characters';
            }

            break;
        }
      } else {
        error[key] = validationData[key].type === 'mobile' ? message || 'Please enter Valid Mobile Number' : message || 'Please provide the necessary details';
      }
    }
  });

  if (Object.keys(error).length > 1) {
    error.isError = true;
  }

  return error;
}

var _extends$2 = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var _typeof$1 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

function _defineEnumerableProperties(obj, descs) {
  for (var key in descs) {
    var desc = descs[key];
    desc.configurable = desc.enumerable = true;
    if ("value" in desc) desc.writable = true;
    Object.defineProperty(obj, key, desc);
  }

  return obj;
}
var NOT_ITERATOR_ERROR = 'proc first argument (Saga function result) must be an iterator';
var CHANNEL_END = {
  toString: function toString() {
    return '@@redux-saga/CHANNEL_END';
  }
};
var TASK_CANCEL = {
  toString: function toString() {
    return '@@redux-saga/TASK_CANCEL';
  }
};
var matchers = {
  wildcard: function wildcard() {
    return kTrue;
  },
  default: function _default(pattern) {
    return (typeof pattern === 'undefined' ? 'undefined' : _typeof$1(pattern)) === 'symbol' ? function (input) {
      return input.type === pattern;
    } : function (input) {
      return input.type === String(pattern);
    };
  },
  array: function array(patterns) {
    return function (input) {
      return patterns.some(function (p) {
        return matcher(p)(input);
      });
    };
  },
  predicate: function predicate(_predicate) {
    return function (input) {
      return _predicate(input);
    };
  }
};

function matcher(pattern) {
  // prettier-ignore
  return (pattern === '*' ? matchers.wildcard : is.array(pattern) ? matchers.array : is.stringableFunc(pattern) ? matchers.default : is.func(pattern) ? matchers.predicate : matchers.default)(pattern);
}
/**
  Used to track a parent task and its forks
  In the new fork model, forked tasks are attached by default to their parent
  We model this using the concept of Parent task && main Task
  main task is the main flow of the current Generator, the parent tasks is the
  aggregation of the main tasks + all its forked tasks.
  Thus the whole model represents an execution tree with multiple branches (vs the
  linear execution tree in sequential (non parallel) programming)

  A parent tasks has the following semantics
  - It completes if all its forks either complete or all cancelled
  - If it's cancelled, all forks are cancelled as well
  - It aborts if any uncaught error bubbles up from forks
  - If it completes, the return value is the one returned by the main task
**/


function forkQueue(name, mainTask, cb) {
  var tasks = [],
      result = void 0,
      completed = false;
  addTask(mainTask);

  function abort(err) {
    cancelAll();
    cb(err, true);
  }

  function addTask(task) {
    tasks.push(task);

    task.cont = function (res, isErr) {
      if (completed) {
        return;
      }

      remove(tasks, task);
      task.cont = noop;

      if (isErr) {
        abort(res);
      } else {
        if (task === mainTask) {
          result = res;
        }

        if (!tasks.length) {
          completed = true;
          cb(result);
        }
      }
    }; // task.cont.cancel = task.cancel

  }

  function cancelAll() {
    if (completed) {
      return;
    }

    completed = true;
    tasks.forEach(function (t) {
      t.cont = noop;
      t.cancel();
    });
    tasks = [];
  }

  return {
    addTask: addTask,
    cancelAll: cancelAll,
    abort: abort,
    getTasks: function getTasks() {
      return tasks;
    },
    taskNames: function taskNames() {
      return tasks.map(function (t) {
        return t.name;
      });
    }
  };
}

function createTaskIterator(_ref) {
  var context = _ref.context,
      fn = _ref.fn,
      args = _ref.args;

  if (is.iterator(fn)) {
    return fn;
  } // catch synchronous failures; see #152 and #441


  var result = void 0,
      error = void 0;

  try {
    result = fn.apply(context, args);
  } catch (err) {
    error = err;
  } // i.e. a generator function returns an iterator


  if (is.iterator(result)) {
    return result;
  } // do not bubble up synchronous failures for detached forks
  // instead create a failed task. See #152 and #441


  return error ? makeIterator(function () {
    throw error;
  }) : makeIterator(function () {
    var pc = void 0;
    var eff = {
      done: false,
      value: result
    };

    var ret = function ret(value) {
      return {
        done: true,
        value: value
      };
    };

    return function (arg) {
      if (!pc) {
        pc = true;
        return eff;
      } else {
        return ret(arg);
      }
    };
  }());
}

var wrapHelper = function wrapHelper(helper) {
  return {
    fn: helper
  };
};

function proc(iterator) {
  var subscribe = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
    return noop;
  };
  var dispatch = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop;
  var getState = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : noop;
  var parentContext = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  var options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
  var parentEffectId = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
  var name = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 'anonymous';
  var cont = arguments[8];
  check(iterator, is.iterator, NOT_ITERATOR_ERROR);
  var effectsString = '[...effects]';
  var runParallelEffect = deprecate(runAllEffect, updateIncentive(effectsString, 'all(' + effectsString + ')'));
  var sagaMonitor = options.sagaMonitor,
      logger = options.logger,
      onError = options.onError;
  var log$1 = logger || log;

  var logError = function logError(err) {
    var message = err.sagaStack;

    if (!message && err.stack) {
      message = err.stack.split('\n')[0].indexOf(err.message) !== -1 ? err.stack : 'Error: ' + err.message + '\n' + err.stack;
    }

    log$1('error', 'uncaught at ' + name, message || err.message || err);
  };

  var stdChannel$1 = stdChannel(subscribe);

  var taskContext = Object.create(parentContext);
  /**
    Tracks the current effect cancellation
    Each time the generator progresses. calling runEffect will set a new value
    on it. It allows propagating cancellation to child effects
  **/

  next.cancel = noop;
  /**
    Creates a new task descriptor for this generator, We'll also create a main task
    to track the main flow (besides other forked tasks)
  **/

  var task = newTask(parentEffectId, name, iterator, cont);
  var mainTask = {
    name: name,
    cancel: cancelMain,
    isRunning: true
  };
  var taskQueue = forkQueue(name, mainTask, end);
  /**
    cancellation of the main task. We'll simply resume the Generator with a Cancel
  **/

  function cancelMain() {
    if (mainTask.isRunning && !mainTask.isCancelled) {
      mainTask.isCancelled = true;
      next(TASK_CANCEL);
    }
  }
  /**
    This may be called by a parent generator to trigger/propagate cancellation
    cancel all pending tasks (including the main task), then end the current task.
     Cancellation propagates down to the whole execution tree holded by this Parent task
    It's also propagated to all joiners of this task and their execution tree/joiners
     Cancellation is noop for terminated/Cancelled tasks tasks
  **/


  function cancel() {
    /**
      We need to check both Running and Cancelled status
      Tasks can be Cancelled but still Running
    **/
    if (iterator._isRunning && !iterator._isCancelled) {
      iterator._isCancelled = true;
      taskQueue.cancelAll();
      /**
        Ending with a Never result will propagate the Cancellation to all joiners
      **/

      end(TASK_CANCEL);
    }
  }
  /**
    attaches cancellation logic to this task's continuation
    this will permit cancellation to propagate down the call chain
  **/


  cont && (cont.cancel = cancel); // tracks the running status

  iterator._isRunning = true; // kicks up the generator

  next(); // then return the task descriptor to the caller

  return task;
  /**
    This is the generator driver
    It's a recursive async/continuation function which calls itself
    until the generator terminates or throws
  **/

  function next(arg, isErr) {
    // Preventive measure. If we end up here, then there is really something wrong
    if (!mainTask.isRunning) {
      throw new Error('Trying to resume an already finished generator');
    }

    try {
      var result = void 0;

      if (isErr) {
        result = iterator.throw(arg);
      } else if (arg === TASK_CANCEL) {
        /**
          getting TASK_CANCEL automatically cancels the main task
          We can get this value here
           - By cancelling the parent task manually
          - By joining a Cancelled task
        **/
        mainTask.isCancelled = true;
        /**
          Cancels the current effect; this will propagate the cancellation down to any called tasks
        **/

        next.cancel();
        /**
          If this Generator has a `return` method then invokes it
          This will jump to the finally block
        **/

        result = is.func(iterator.return) ? iterator.return(TASK_CANCEL) : {
          done: true,
          value: TASK_CANCEL
        };
      } else if (arg === CHANNEL_END) {
        // We get CHANNEL_END by taking from a channel that ended using `take` (and not `takem` used to trap End of channels)
        result = is.func(iterator.return) ? iterator.return() : {
          done: true
        };
      } else {
        result = iterator.next(arg);
      }

      if (!result.done) {
        runEffect(result.value, parentEffectId, '', next);
      } else {
        /**
          This Generator has ended, terminate the main task and notify the fork queue
        **/
        mainTask.isMainRunning = false;
        mainTask.cont && mainTask.cont(result.value);
      }
    } catch (error) {
      if (mainTask.isCancelled) {
        logError(error);
      }

      mainTask.isMainRunning = false;
      mainTask.cont(error, true);
    }
  }

  function end(result, isErr) {
    iterator._isRunning = false;
    stdChannel$1.close();

    if (!isErr) {
      iterator._result = result;
      iterator._deferredEnd && iterator._deferredEnd.resolve(result);
    } else {
      if (result instanceof Error) {
        Object.defineProperty(result, 'sagaStack', {
          value: 'at ' + name + ' \n ' + (result.sagaStack || result.stack),
          configurable: true
        });
      }

      if (!task.cont) {
        if (result instanceof Error && onError) {
          onError(result);
        } else {
          logError(result);
        }
      }

      iterator._error = result;
      iterator._isAborted = true;
      iterator._deferredEnd && iterator._deferredEnd.reject(result);
    }

    task.cont && task.cont(result, isErr);
    task.joiners.forEach(function (j) {
      return j.cb(result, isErr);
    });
    task.joiners = null;
  }

  function runEffect(effect, parentEffectId) {
    var label = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    var cb = arguments[3];
    var effectId = uid();
    sagaMonitor && sagaMonitor.effectTriggered({
      effectId: effectId,
      parentEffectId: parentEffectId,
      label: label,
      effect: effect
    });
    /**
      completion callback and cancel callback are mutually exclusive
      We can't cancel an already completed effect
      And We can't complete an already cancelled effectId
    **/

    var effectSettled = void 0; // Completion callback passed to the appropriate effect runner

    function currCb(res, isErr) {
      if (effectSettled) {
        return;
      }

      effectSettled = true;
      cb.cancel = noop; // defensive measure

      if (sagaMonitor) {
        isErr ? sagaMonitor.effectRejected(effectId, res) : sagaMonitor.effectResolved(effectId, res);
      }

      cb(res, isErr);
    } // tracks down the current cancel


    currCb.cancel = noop; // setup cancellation logic on the parent cb

    cb.cancel = function () {
      // prevents cancelling an already completed effect
      if (effectSettled) {
        return;
      }

      effectSettled = true;
      /**
        propagates cancel downward
        catch uncaught cancellations errors; since we can no longer call the completion
        callback, log errors raised during cancellations into the console
      **/

      try {
        currCb.cancel();
      } catch (err) {
        logError(err);
      }

      currCb.cancel = noop; // defensive measure

      sagaMonitor && sagaMonitor.effectCancelled(effectId);
    };
    /**
      each effect runner must attach its own logic of cancellation to the provided callback
      it allows this generator to propagate cancellation downward.
       ATTENTION! effect runners must setup the cancel logic by setting cb.cancel = [cancelMethod]
      And the setup must occur before calling the callback
       This is a sort of inversion of control: called async functions are responsible
      for completing the flow by calling the provided continuation; while caller functions
      are responsible for aborting the current flow by calling the attached cancel function
       Library users can attach their own cancellation logic to promises by defining a
      promise[CANCEL] method in their returned promises
      ATTENTION! calling cancel must have no effect on an already completed or cancelled effect
    **/


    var data = void 0; // prettier-ignore

    return (// Non declarative effect
      is.promise(effect) ? resolvePromise(effect, currCb) : is.helper(effect) ? runForkEffect(wrapHelper(effect), effectId, currCb) : is.iterator(effect) ? resolveIterator(effect, effectId, name, currCb) // declarative effects
      : is.array(effect) ? runParallelEffect(effect, effectId, currCb) : (data = asEffect.take(effect)) ? runTakeEffect(data, currCb) : (data = asEffect.put(effect)) ? runPutEffect(data, currCb) : (data = asEffect.all(effect)) ? runAllEffect(data, effectId, currCb) : (data = asEffect.race(effect)) ? runRaceEffect(data, effectId, currCb) : (data = asEffect.call(effect)) ? runCallEffect(data, effectId, currCb) : (data = asEffect.cps(effect)) ? runCPSEffect(data, currCb) : (data = asEffect.fork(effect)) ? runForkEffect(data, effectId, currCb) : (data = asEffect.join(effect)) ? runJoinEffect(data, currCb) : (data = asEffect.cancel(effect)) ? runCancelEffect(data, currCb) : (data = asEffect.select(effect)) ? runSelectEffect(data, currCb) : (data = asEffect.actionChannel(effect)) ? runChannelEffect(data, currCb) : (data = asEffect.flush(effect)) ? runFlushEffect(data, currCb) : (data = asEffect.cancelled(effect)) ? runCancelledEffect(data, currCb) : (data = asEffect.getContext(effect)) ? runGetContextEffect(data, currCb) : (data = asEffect.setContext(effect)) ? runSetContextEffect(data, currCb) :
      /* anything else returned as is */
      currCb(effect)
    );
  }

  function resolvePromise(promise, cb) {
    var cancelPromise = promise[CANCEL];

    if (is.func(cancelPromise)) {
      cb.cancel = cancelPromise;
    } else if (is.func(promise.abort)) {
      cb.cancel = function () {
        return promise.abort();
      }; // TODO: add support for the fetch API, whenever they get around to
      // adding cancel support

    }

    promise.then(cb, function (error) {
      return cb(error, true);
    });
  }

  function resolveIterator(iterator, effectId, name, cb) {
    proc(iterator, subscribe, dispatch, getState, taskContext, options, effectId, name, cb);
  }

  function runTakeEffect(_ref2, cb) {
    var channel = _ref2.channel,
        pattern = _ref2.pattern,
        maybe = _ref2.maybe;
    channel = channel || stdChannel$1;

    var takeCb = function takeCb(inp) {
      return inp instanceof Error ? cb(inp, true) : isEnd(inp) && !maybe ? cb(CHANNEL_END) : cb(inp);
    };

    try {
      channel.take(takeCb, matcher(pattern));
    } catch (err) {
      return cb(err, true);
    }

    cb.cancel = takeCb.cancel;
  }

  function runPutEffect(_ref3, cb) {
    var channel = _ref3.channel,
        action = _ref3.action,
        resolve = _ref3.resolve;
    /**
      Schedule the put in case another saga is holding a lock.
      The put will be executed atomically. ie nested puts will execute after
      this put has terminated.
    **/

    asap(function () {
      var result = void 0;

      try {
        result = (channel ? channel.put : dispatch)(action);
      } catch (error) {
        // If we have a channel or `put.resolve` was used then bubble up the error.
        if (channel || resolve) return cb(error, true);
        logError(error);
      }

      if (resolve && is.promise(result)) {
        resolvePromise(result, cb);
      } else {
        return cb(result);
      }
    }); // Put effects are non cancellables
  }

  function runCallEffect(_ref4, effectId, cb) {
    var context = _ref4.context,
        fn = _ref4.fn,
        args = _ref4.args;
    var result = void 0; // catch synchronous failures; see #152

    try {
      result = fn.apply(context, args);
    } catch (error) {
      return cb(error, true);
    }

    return is.promise(result) ? resolvePromise(result, cb) : is.iterator(result) ? resolveIterator(result, effectId, fn.name, cb) : cb(result);
  }

  function runCPSEffect(_ref5, cb) {
    var context = _ref5.context,
        fn = _ref5.fn,
        args = _ref5.args; // CPS (ie node style functions) can define their own cancellation logic
    // by setting cancel field on the cb
    // catch synchronous failures; see #152

    try {
      var cpsCb = function cpsCb(err, res) {
        return is.undef(err) ? cb(res) : cb(err, true);
      };

      fn.apply(context, args.concat(cpsCb));

      if (cpsCb.cancel) {
        cb.cancel = function () {
          return cpsCb.cancel();
        };
      }
    } catch (error) {
      return cb(error, true);
    }
  }

  function runForkEffect(_ref6, effectId, cb) {
    var context = _ref6.context,
        fn = _ref6.fn,
        args = _ref6.args,
        detached = _ref6.detached;
    var taskIterator = createTaskIterator({
      context: context,
      fn: fn,
      args: args
    });

    try {
      suspend();

      var _task = proc(taskIterator, subscribe, dispatch, getState, taskContext, options, effectId, fn.name, detached ? null : noop);

      if (detached) {
        cb(_task);
      } else {
        if (taskIterator._isRunning) {
          taskQueue.addTask(_task);
          cb(_task);
        } else if (taskIterator._error) {
          taskQueue.abort(taskIterator._error);
        } else {
          cb(_task);
        }
      }
    } finally {
      flush();
    } // Fork effects are non cancellables

  }

  function runJoinEffect(t, cb) {
    if (t.isRunning()) {
      var joiner = {
        task: task,
        cb: cb
      };

      cb.cancel = function () {
        return remove(t.joiners, joiner);
      };

      t.joiners.push(joiner);
    } else {
      t.isAborted() ? cb(t.error(), true) : cb(t.result());
    }
  }

  function runCancelEffect(taskToCancel, cb) {
    if (taskToCancel === SELF_CANCELLATION) {
      taskToCancel = task;
    }

    if (taskToCancel.isRunning()) {
      taskToCancel.cancel();
    }

    cb(); // cancel effects are non cancellables
  }

  function runAllEffect(effects, effectId, cb) {
    var keys = Object.keys(effects);

    if (!keys.length) {
      return cb(is.array(effects) ? [] : {});
    }

    var completedCount = 0;
    var completed = void 0;
    var results = {};
    var childCbs = {};

    function checkEffectEnd() {
      if (completedCount === keys.length) {
        completed = true;
        cb(is.array(effects) ? array.from(_extends$2({}, results, {
          length: keys.length
        })) : results);
      }
    }

    keys.forEach(function (key) {
      var chCbAtKey = function chCbAtKey(res, isErr) {
        if (completed) {
          return;
        }

        if (isErr || isEnd(res) || res === CHANNEL_END || res === TASK_CANCEL) {
          cb.cancel();
          cb(res, isErr);
        } else {
          results[key] = res;
          completedCount++;
          checkEffectEnd();
        }
      };

      chCbAtKey.cancel = noop;
      childCbs[key] = chCbAtKey;
    });

    cb.cancel = function () {
      if (!completed) {
        completed = true;
        keys.forEach(function (key) {
          return childCbs[key].cancel();
        });
      }
    };

    keys.forEach(function (key) {
      return runEffect(effects[key], effectId, key, childCbs[key]);
    });
  }

  function runRaceEffect(effects, effectId, cb) {
    var completed = void 0;
    var keys = Object.keys(effects);
    var childCbs = {};
    keys.forEach(function (key) {
      var chCbAtKey = function chCbAtKey(res, isErr) {
        if (completed) {
          return;
        }

        if (isErr) {
          // Race Auto cancellation
          cb.cancel();
          cb(res, true);
        } else if (!isEnd(res) && res !== CHANNEL_END && res !== TASK_CANCEL) {
          var _response;

          cb.cancel();
          completed = true;
          var response = (_response = {}, _response[key] = res, _response);
          cb(is.array(effects) ? [].slice.call(_extends$2({}, response, {
            length: keys.length
          })) : response);
        }
      };

      chCbAtKey.cancel = noop;
      childCbs[key] = chCbAtKey;
    });

    cb.cancel = function () {
      // prevents unnecessary cancellation
      if (!completed) {
        completed = true;
        keys.forEach(function (key) {
          return childCbs[key].cancel();
        });
      }
    };

    keys.forEach(function (key) {
      if (completed) {
        return;
      }

      runEffect(effects[key], effectId, key, childCbs[key]);
    });
  }

  function runSelectEffect(_ref7, cb) {
    var selector = _ref7.selector,
        args = _ref7.args;

    try {
      var state = selector.apply(undefined, [getState()].concat(args));
      cb(state);
    } catch (error) {
      cb(error, true);
    }
  }

  function runChannelEffect(_ref8, cb) {
    var pattern = _ref8.pattern,
        buffer = _ref8.buffer;
    var match = matcher(pattern);
    match.pattern = pattern;
    cb(eventChannel(subscribe, buffer || buffers.fixed(), match));
  }

  function runCancelledEffect(data, cb) {
    cb(!!mainTask.isCancelled);
  }

  function runFlushEffect(channel, cb) {
    channel.flush(cb);
  }

  function runGetContextEffect(prop, cb) {
    cb(taskContext[prop]);
  }

  function runSetContextEffect(props, cb) {
    object.assign(taskContext, props);
    cb();
  }

  function newTask(id, name, iterator, cont) {
    var _done, _ref9, _mutatorMap;

    iterator._deferredEnd = null;
    return _ref9 = {}, _ref9[TASK] = true, _ref9.id = id, _ref9.name = name, _done = 'done', _mutatorMap = {}, _mutatorMap[_done] = _mutatorMap[_done] || {}, _mutatorMap[_done].get = function () {
      if (iterator._deferredEnd) {
        return iterator._deferredEnd.promise;
      } else {
        var def = deferred();
        iterator._deferredEnd = def;

        if (!iterator._isRunning) {
          iterator._error ? def.reject(iterator._error) : def.resolve(iterator._result);
        }

        return def.promise;
      }
    }, _ref9.cont = cont, _ref9.joiners = [], _ref9.cancel = cancel, _ref9.isRunning = function isRunning() {
      return iterator._isRunning;
    }, _ref9.isCancelled = function isCancelled() {
      return iterator._isCancelled;
    }, _ref9.isAborted = function isAborted() {
      return iterator._isAborted;
    }, _ref9.result = function result() {
      return iterator._result;
    }, _ref9.error = function error() {
      return iterator._error;
    }, _ref9.setContext = function setContext(props) {
      check(props, is.object, createSetContextWarning('task', props));
      object.assign(taskContext, props);
    }, _defineEnumerableProperties(_ref9, _mutatorMap), _ref9;
  }
}

var RUN_SAGA_SIGNATURE = 'runSaga(storeInterface, saga, ...args)';
var NON_GENERATOR_ERR = RUN_SAGA_SIGNATURE + ': saga argument must be a Generator function!';
function runSaga(storeInterface, saga) {
  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  var iterator = void 0;

  if (is.iterator(storeInterface)) {
    if (process.env.NODE_ENV === 'development') {
      log('warn', 'runSaga(iterator, storeInterface) has been deprecated in favor of ' + RUN_SAGA_SIGNATURE);
    }

    iterator = storeInterface;
    storeInterface = saga;
  } else {
    check(saga, is.func, NON_GENERATOR_ERR);
    iterator = saga.apply(undefined, args);
    check(iterator, is.iterator, NON_GENERATOR_ERR);
  }

  var _storeInterface = storeInterface,
      subscribe = _storeInterface.subscribe,
      dispatch = _storeInterface.dispatch,
      getState = _storeInterface.getState,
      context = _storeInterface.context,
      sagaMonitor = _storeInterface.sagaMonitor,
      logger = _storeInterface.logger,
      onError = _storeInterface.onError;
  var effectId = uid();

  if (sagaMonitor) {
    // monitors are expected to have a certain interface, let's fill-in any missing ones
    sagaMonitor.effectTriggered = sagaMonitor.effectTriggered || noop;
    sagaMonitor.effectResolved = sagaMonitor.effectResolved || noop;
    sagaMonitor.effectRejected = sagaMonitor.effectRejected || noop;
    sagaMonitor.effectCancelled = sagaMonitor.effectCancelled || noop;
    sagaMonitor.actionDispatched = sagaMonitor.actionDispatched || noop;
    sagaMonitor.effectTriggered({
      effectId: effectId,
      root: true,
      parentEffectId: 0,
      effect: {
        root: true,
        saga: saga,
        args: args
      }
    });
  }

  var task = proc(iterator, subscribe, wrapSagaDispatch(dispatch), getState, context, {
    sagaMonitor: sagaMonitor,
    logger: logger,
    onError: onError
  }, effectId, saga.name);

  if (sagaMonitor) {
    sagaMonitor.effectResolved(effectId, task);
  }

  return task;
}

function _objectWithoutProperties(obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
}
function sagaMiddlewareFactory() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var _ref$context = _ref.context,
      context = _ref$context === undefined ? {} : _ref$context,
      options = _objectWithoutProperties(_ref, ['context']);

  var sagaMonitor = options.sagaMonitor,
      logger = options.logger,
      onError = options.onError;

  if (is.func(options)) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Saga middleware no longer accept Generator functions. Use sagaMiddleware.run instead');
    } else {
      throw new Error('You passed a function to the Saga middleware. You are likely trying to start a        Saga by directly passing it to the middleware. This is no longer possible starting from 0.10.0.        To run a Saga, you must do it dynamically AFTER mounting the middleware into the store.\n        Example:\n          import createSagaMiddleware from \'redux-saga\'\n          ... other imports\n\n          const sagaMiddleware = createSagaMiddleware()\n          const store = createStore(reducer, applyMiddleware(sagaMiddleware))\n          sagaMiddleware.run(saga, ...args)\n      ');
    }
  }

  if (logger && !is.func(logger)) {
    throw new Error('`options.logger` passed to the Saga middleware is not a function!');
  }

  if (process.env.NODE_ENV === 'development' && options.onerror) {
    throw new Error('`options.onerror` was removed. Use `options.onError` instead.');
  }

  if (onError && !is.func(onError)) {
    throw new Error('`options.onError` passed to the Saga middleware is not a function!');
  }

  if (options.emitter && !is.func(options.emitter)) {
    throw new Error('`options.emitter` passed to the Saga middleware is not a function!');
  }

  function sagaMiddleware(_ref2) {
    var getState = _ref2.getState,
        dispatch = _ref2.dispatch;
    var sagaEmitter = emitter();
    sagaEmitter.emit = (options.emitter || ident)(sagaEmitter.emit);
    sagaMiddleware.run = runSaga.bind(null, {
      context: context,
      subscribe: sagaEmitter.subscribe,
      dispatch: dispatch,
      getState: getState,
      sagaMonitor: sagaMonitor,
      logger: logger,
      onError: onError
    });
    return function (next) {
      return function (action) {
        if (sagaMonitor && sagaMonitor.actionDispatched) {
          sagaMonitor.actionDispatched(action);
        }

        var result = next(action); // hit reducers

        sagaEmitter.emit(action);
        return result;
      };
    };
  }

  sagaMiddleware.run = function () {
    throw new Error('Before running a Saga, you must mount the Saga middleware on the Store using applyMiddleware');
  };

  sagaMiddleware.setContext = function (props) {
    check(props, is.object, createSetContextWarning('sagaMiddleware', props));
    object.assign(context, props);
  };

  return sagaMiddleware;
}

function configureStore() {
  var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var middleWare = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var composeEnhancers = redux.compose;
  var reduxSagaMonitorOptions = {}; // const routerMiddleware = isWeb
  //   ? require('connected-react-router').routerMiddleware
  //   : null;
  // const History = isWeb ? require('./utils/history').default : null;
  // If Redux Dev Tools and Saga Dev Tools Extensions are installed, enable them

  /* istanbul ignore next */

  if (process.env.NODE_ENV !== 'production' && (typeof window === "undefined" ? "undefined" : _typeof$2(window)) === 'object') {
    /* eslint-disable no-underscore-dangle */
    if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}); // NOTE: Uncomment the code below to restore support for Redux Saga
    // Dev Tools once it supports redux-saga version 1.x.x
    // if (window.__SAGA_MONITOR_EXTENSION__)
    //   reduxSagaMonitorOptions = {
    //     sagaMonitor: window.__SAGA_MONITOR_EXTENSION__,
    //   };

    /* eslint-enable */
  }

  var sagaMiddleware = sagaMiddlewareFactory(reduxSagaMonitorOptions); // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state

  var middlewares = [sagaMiddleware].concat(middleWare // isWeb ? [routerMiddleware(History)] : [],
  );
  var enhancers = [redux.applyMiddleware.apply(void 0, _toConsumableArray(middlewares))];
  var store = redux.createStore(createReducer({}), initialState, composeEnhancers.apply(void 0, enhancers)); // Extensions

  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {}; // Reducer registry

  store.injectedSagas = {}; // Saga registry
  // Make reducers hot reloadable, see http://mxs.is/googmo

  /* istanbul ignore next */
  // if (typeof module === 'object' && module.hot) {
  //   module.hot.accept('./reducers', () => {
  //     store.replaceReducer(createReducer(store.injectedReducers));
  //   });
  // }
  // global._redux_store = store;

  return store;
}

var nextStore = function nextStore(_ref) {
  var saga = _ref.saga,
      reducer = _ref.reducer;
  return function () {
    var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        isServer = _ref2.isServer,
        _ref2$req = _ref2.req,
        req = _ref2$req === void 0 ? null : _ref2$req;

    var composeEnhancers = redux.compose;
    var monitor = null; // if (typeof window !== "undefined")
    //   monitor = window["__SAGA_MONITOR_EXTENSION__"];

    var reduxSagaMonitorOptions = {
      sagaMonitor: monitor
    }; // eslint-disable-next-line global-require
    // If Redux Dev Tools and Saga Dev Tools Extensions are installed, enable them

    /* istanbul ignore next */

    if (process.env.NODE_ENV !== 'production' && (typeof window === "undefined" ? "undefined" : _typeof$2(window)) === 'object') {
      /* eslint-disable no-underscore-dangle */
      if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}); // NOTE: Uncomment the code below to restore support for Redux Saga
      // Dev Tools once it supports redux-saga version 1.x.x
      // if (window.__SAGA_MONITOR_EXTENSION__)
      //   reduxSagaMonitorOptions = {
      //     sagaMonitor: window.__SAGA_MONITOR_EXTENSION__,
      //   };

      /* eslint-enable */
    }

    var sagaMiddleware = sagaMiddlewareFactory(reduxSagaMonitorOptions); // Create the store with two middlewares
    // 1. sagaMiddleware: Makes redux-sagas work
    // 2. routerMiddleware: Syncs the location/URL path to the state

    var middlewares = [sagaMiddleware];
    var enhancers = [redux.applyMiddleware.apply(void 0, middlewares)];
    var store = redux.createStore(redux.combineReducers(reducer.reduce(function (acc, e) {
      return _objectSpread({}, acc, _defineProperty({}, e.name, e.reducer));
    }, {})), initialState, composeEnhancers.apply(void 0, enhancers)); // Extensions

    store.runSaga = sagaMiddleware.run; // store.sagaTask = sagaMiddleware;

    store.injectedReducers = {}; // Reducer registry

    store.injectedSagas = {}; // Saga registry

    store.tasks = {};

    if (req || !isServer) {
      store.sagaTask = sagaMiddleware.run( /*#__PURE__*/_regeneratorRuntime.mark(function rootSaga() {
        return _regeneratorRuntime.wrap(function rootSaga$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return all(saga.map(fork));

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, rootSaga);
      }));
    } // Make reducers hot reloadable, see http://mxs.is/googmo

    /* istanbul ignore next */
    // if (module && module.hot) {
    //   module.hot.accept("./reducers", () => {`
    //     store.replaceReducer(createReducer(store.injectedReducers));
    //   });
    // }


    return store;
  };
};

function withReduxSaga() {
  var BaseComponent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var WrappedComponent = /*#__PURE__*/function (_Component) {
    _inherits(WrappedComponent, _Component);

    var _super = _createSuper(WrappedComponent);

    function WrappedComponent() {
      _classCallCheck(this, WrappedComponent);

      return _super.apply(this, arguments);
    }

    _createClass(WrappedComponent, [{
      key: "render",
      value: function render() {
        return React__default.createElement(BaseComponent, this.props);
      }
    }], [{
      key: "getInitialProps",
      value: function () {
        var _getInitialProps = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
          var props,
              isServer,
              store,
              pageProps,
              _args = arguments;
          return _regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  props = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
                  isServer = props.ctx ? props.ctx.isServer : props.isServer;
                  store = props.ctx ? props.ctx.store : props.store;
                  pageProps = {};

                  if (!BaseComponent.getInitialProps) {
                    _context.next = 8;
                    break;
                  }

                  _context.next = 7;
                  return BaseComponent.getInitialProps(props);

                case 7:
                  pageProps = _context.sent;

                case 8:
                  if (!isServer) {
                    _context.next = 17;
                    break;
                  }

                  store.dispatch(END);

                  if (!store.sagaTask.toPromise) {
                    _context.next = 15;
                    break;
                  }

                  _context.next = 13;
                  return store.sagaTask.toPromise();

                case 13:
                  _context.next = 17;
                  break;

                case 15:
                  _context.next = 17;
                  return store.sagaTask.done;

                case 17:
                  return _context.abrupt("return", pageProps);

                case 18:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        function getInitialProps() {
          return _getInitialProps.apply(this, arguments);
        }

        return getInitialProps;
      }()
    }]);

    return WrappedComponent;
  }(React.Component);

  _defineProperty(WrappedComponent, "displayName", "withReduxSaga(".concat(BaseComponent.displayName || BaseComponent.name || 'BaseComponent', ")"));

  return WrappedComponent;
}

/* eslint-disable */

function _instanceof(left, right) {
  if (right != null && typeof Symbol !== 'undefined' && right[Symbol.hasInstance]) {
    return !!right[Symbol.hasInstance](left);
  } else {
    return left instanceof right;
  }
}

var __extends =  function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || _instanceof({
      __proto__: []
    }, Array) && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __assign =  function () {
  __assign = Object.assign || function (t) {
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

var __awaiter =  function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return _instanceof(value, P) ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
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
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator =  function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    throw: verb(1),
    return: verb(2)
  }, typeof Symbol === 'function' && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError('Generator is already executing.');

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y['return'] : op[0] ? y['throw'] || ((t = y['return']) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
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
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
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
      done: true
    };
  }
};

var __rest =  function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === 'function') for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

var __importStar =  function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
  }
  result['default'] = mod;
  return result;
};

Object.defineProperty(exports, '__esModule', {
  value: true
});

var react_1 = __importStar(require('react'));

var defaultConfig = {
  storeKey: '__NEXT_REDUX_STORE__',
  debug: false,
  serializeState: function serializeState(state) {
    return state;
  },
  deserializeState: function deserializeState(state) {
    return state;
  }
};
function withRedux (makeStore, config) {
  config = __assign(__assign({}, defaultConfig), config);
  var isServer = typeof window === 'undefined';

  var initStore = function initStore(_a) {
    var initialState = _a.initialState,
        ctx = _a.ctx;
    var storeKey = config.storeKey;

    var createStore = function createStore() {
      return makeStore(config.deserializeState(initialState), __assign(__assign(__assign({}, ctx), config), {
        isServer: isServer
      }));
    };

    if (isServer) return createStore(); // Memoize store if client

    if (!(storeKey in window)) {
      window[storeKey] = createStore();
    }

    return window[storeKey];
  };

  return function (App) {
    var _a;

    return _a =
    /** @class */
    function (_super) {
      __extends(WrappedApp, _super);

      function WrappedApp(props, context) {
        var _this = _super.call(this, props, context) || this;

        var initialState = props.initialState;
        if (config.debug) console.log('4. WrappedApp.render created new store with initialState', initialState);
        _this.store = initStore({
          initialState: initialState
        });
        return _this;
      }

      WrappedApp.prototype.render = function () {
        var _a = this.props,
            initialProps = _a.initialProps,
            initialState = _a.initialState,
            props = __rest(_a, ['initialProps', 'initialState']); // Cmp render must return something like <Provider><Component/></Provider>


        return react_1.default.createElement(App, __assign({}, props, initialProps, {
          store: this.store
        }));
      };

      return WrappedApp;
    }(react_1.Component),
    /* istanbul ignore next */
    _a.displayName = 'withRedux(' + (App.displayName || App.name || 'App') + ')', _a.getInitialProps = function (appCtx) {
      return __awaiter(void 0, void 0, void 0, function () {
        var store, initialProps;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              /* istanbul ignore next */
              if (!appCtx) throw new Error('No app context');
              /* istanbul ignore next */

              if (!appCtx.ctx) throw new Error('No page context');
              store = initStore({
                ctx: appCtx.ctx
              });
              if (config.debug) console.log('1. WrappedApp.getInitialProps wrapper got the store with state', store.getState());
              appCtx.ctx.store = store;
              appCtx.ctx.isServer = isServer;
              initialProps = {};
              if (!('getInitialProps' in App)) return [3,
              /*break*/
              2];
              return [4,
              /*yield*/
              App.getInitialProps.call(App, appCtx)];

            case 1:
              initialProps = _a.sent();
              _a.label = 2;

            case 2:
              if (config.debug) console.log('3. WrappedApp.getInitialProps has store state', store.getState());
              return [2,
              /*return*/
              {
                isServer: isServer,
                initialState: isServer ? config.serializeState(store.getState()) : store.getState(),
                initialProps: initialProps
              }];
          }
        });
      });
    }, _a;
  };
}

Object.defineProperty(exports, 'useDispatch', {
enumerable: true,
get: function () {
return reactRedux.useDispatch;
}
});
Object.defineProperty(exports, 'useSelector', {
enumerable: true,
get: function () {
return reactRedux.useSelector;
}
});
Object.defineProperty(exports, 'useStore', {
enumerable: true,
get: function () {
return reactRedux.useStore;
}
});
exports.CustomError = CustomError;
exports.FormValidator = validateForm;
exports.HOC = index;
exports.Safe = nullcheck;
exports.axios = request;
exports.cloneObject = cloneObject;
exports.commonConstants = commonConstants;
exports.deleteIn = deleteIn;
exports.generateTimeStamp = generateTimeStamp;
exports.getData = getData;
exports.getIn = getIn;
exports.injectReducer = injectReducer;
exports.injectSaga = injectSaga;
exports.newObject = newObject;
exports.nextStore = nextStore;
exports.objectEquals = objectEquals;
exports.setIn = setIn;
exports.store = configureStore;
exports.toCapitalize = toCapitalize;
exports.toPromise = toPromise;
exports.toPromiseFunction = toPromiseFunction;
exports.typeOf = typeOf;
exports.updateIn = updateIn;
exports.useActions = useActionsHook;
exports.useInjectReducer = useInjectReducer;
exports.useInjectSaga = useInjectSaga;
exports.useMutateReducer = useMutateReducer;
exports.useMutation = useMutation;
exports.useOptimizedQuery = useOptimizedQuery;
exports.useQuery = useQuery;
exports.useResetOnlyApiEndPointsState = useResetOnlyApiEndPointsState;
exports.useResetState = useResetState;
exports.useStaleRefresh = useStaleRefresh;
exports.withRedux = withRedux;
exports.withReduxSaga = withReduxSaga;
