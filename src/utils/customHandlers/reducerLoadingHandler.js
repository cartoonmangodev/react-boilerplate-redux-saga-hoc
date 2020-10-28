/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import { newObject, generateTimeStamp } from '../helpers';

export const reducerLoadingHandler = ({
  task: { error: errorData, loader } = {},
  successData = {},
  successDataStatusCode,
}) => ({
  data: {
    data,
    toast,
    infiniteEnd,
    error,
    isError: isErrorOld,
    loading: { status } = {},
  } = {},
  statusCode,
  ...rest
} = {}) => ({
  loading: {
    status: typeof loader === 'boolean' ? loader : status,
    lastUpdated: generateTimeStamp(),
  },
});
