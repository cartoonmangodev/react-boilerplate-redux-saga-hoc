/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import { newObject, generateTimeStamp } from '../helpers';

export const reducerToastHandler = ({
  task: { toast: toastData } = {},
  successData = {},
  successDataStatusCode,
}) => ({
  data: { data, toast, infiniteEnd } = {},
  statusCode,
  ...rest
} = {}) => ({
  toast: toastData ||
    toast || {
      message: '',
      status: '',
    },
  isError: false,
  lastUpdated: generateTimeStamp(),
});
