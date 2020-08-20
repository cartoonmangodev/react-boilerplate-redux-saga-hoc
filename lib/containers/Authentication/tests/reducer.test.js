// import produce from 'immer';
import dashboardReducer from '../reducer'; // import { someAction } from '../actions';

/* eslint-disable default-case, no-param-reassign */

describe('dashboardReducer', function () {
  var state;
  beforeEach(function () {
    state = {// default state params here
    };
  });
  it('returns the initial state', function () {
    var expectedResult = state;
    expect(dashboardReducer(undefined, {})).toEqual(expectedResult);
  });
  /**
   * Example state change comparison
   *
   * it('should handle the someAction action correctly', () => {
   *   const expectedResult = produce(state, draft => {
   *     draft.loading = true;
   *     draft.error = false;
   *     draft.userData.nested = false;
   *   });
   *
   *   expect(appReducer(state, someAction())).toEqual(expectedResult);
   * });
   */
});