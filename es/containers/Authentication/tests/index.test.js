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
describe('<Dashboard />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    const dispatch = jest.fn();
    (0, _reactTestingLibrary.render)(_react.default.createElement(_index.default, {
      dispatch: dispatch
    }));
    expect(spy).not.toHaveBeenCalled();
  });
  it('Expect to have additional unit tests specified', () => {
    expect(true).toEqual(false);
  });
  /**
   * Unskip this test to use it
   *
   * @see {@link https://jestjs.io/docs/en/api#testskipname-fn}
   */

  it.skip('Should render and match the snapshot', () => {
    const {
      container: {
        firstChild
      }
    } = (0, _reactTestingLibrary.render)(_react.default.createElement(_index.default, null));
    expect(firstChild).toMatchSnapshot();
  });
});