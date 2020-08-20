// // /**
// //  * Test sagas
// //  */
// import { Generator } from 'shared/containers/Authentication/generator';
// import * as constants from 'shared/containers/Authentication/constants';
// /* eslint-disable redux-saga/yield-effects */
// import { runSaga } from 'redux-saga';
// // import { defaultSaga } from '../saga';
// // const generator = defaultSaga();
// const dispatch = action => {
//   console.warn(action);
// };
// describe('defaultSaga Saga', () => {
//   it('login/register generator', () => {
//     jest.setTimeout(100000);
//     return runSaga(
//       {
//         dispatch,
//         getState: state => {
//           console.warn(state);
//         },
//       },
//       Generator,
//       {
//         payload: {
//           mobile_number: '8220725964',
//         },
//         type: constants.LOGIN_REGISTER_API_CALL,
//       },
//     ).toPromise();
//     // expect(true).toEqual(false);
//   });
// });