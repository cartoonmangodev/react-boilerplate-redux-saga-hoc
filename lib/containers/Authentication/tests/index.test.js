/**
 *
 * Tests for Dashboard
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */
import React from 'react';
import { render } from 'react-testing-library'; // import 'jest-dom/extend-expect'; // add some helpful assertions

import Dashboard from '../index';
describe('<Dashboard />', function () {
  it('Expect to not log errors in console', function () {
    var spy = jest.spyOn(global.console, 'error');
    var dispatch = jest.fn();
    render(React.createElement(Dashboard, {
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
    var _render = render(React.createElement(Dashboard, null)),
        firstChild = _render.container.firstChild;

    expect(firstChild).toMatchSnapshot();
  });
});