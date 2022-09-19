/* eslint-disable no-unused-vars */
import { newObject, generateTimeStamp } from '../helpers';

export const resetReducerHandler = () => ({
  data: { data, toast, infiniteEnd } = {},
  statusCode,
  ...rest
} = {}) => ({
  data: Array.isArray(data) ? [] : {},
  toast: {
    message: '',
    status: '',
  },
  isError: false,
  statusCode: null,
  infiniteEnd: typeof infiniteEnd === 'boolean' ? false : undefined,
  lastUpdated: generateTimeStamp(),
  initialState: true,
});
