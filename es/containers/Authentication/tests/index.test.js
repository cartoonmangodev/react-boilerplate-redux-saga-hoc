"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestingLibrary = require("react-testing-library");

var _index = _interopRequireDefault(require("../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 * Tests for Dashboard
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */
// import 'jest-dom/extend-expect'; // add some helpful assertions
describe('<Dashboard />', function () {
  it('Expect to not log errors in console', function () {
    var spy = jest.spyOn(global.console, 'error');
    var dispatch = jest.fn();
    (0, _reactTestingLibrary.render)(_react.default.createElement(_index.default, {
      dispatch: dispatch
    }));
    expect(spy).not.toHaveBeenCalled();
  });
  it('Expect to have additional unit tests specified', function () {
    expect(true).toEqual(false);
  });
  /**
   * Unskip this test to use it
   *
   * @see {@link https://jestjs.io/docs/en/api#testskipname-fn}
   */

  it.skip('Should render and match the snapshot', function () {
    var _render = (0, _reactTestingLibrary.render)(_react.default.createElement(_index.default, null)),
        firstChild = _render.container.firstChild;

    expect(firstChild).toMatchSnapshot();
  });
});