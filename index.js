/* eslint-disable global-require */
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/react-boilerplate-redux-saga-hoc.production.min.js');
} else {
  module.exports = require('./dist/react-boilerplate-redux-saga-hoc.development.js');
}
