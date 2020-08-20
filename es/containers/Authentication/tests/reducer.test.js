"use strict";

var _reducer = _interopRequireDefault(require("../reducer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import produce from 'immer';
// import { someAction } from '../actions';

/* eslint-disable default-case, no-param-reassign */
describe('dashboardReducer', () => {
  let state;
  beforeEach(() => {
    state = {// default state params here
    };
  });
  it('returns the initial state', () => {
    const expectedResult = state;
    expect((0, _reducer.default)(undefined, {})).toEqual(expectedResult);
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