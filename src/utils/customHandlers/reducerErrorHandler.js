/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import { newObject, generateTimeStamp } from '../helpers';

export const reducerErrorHandler = ({
  task: { error: errorData, isError } = {},
  successData = {},
  successDataStatusCode,
}) => ({
  data: { data, toast, infiniteEnd, error, isError: isErrorOld } = {},
  statusCode,
  ...rest
} = {}) => ({
  error: errorData || error || {},
  isError: typeof isError === 'boolean' ? isError : isErrorOld,
  lastUpdated: generateTimeStamp(),
  // initialState: false,
});
