/* eslint-disable */
import { generateTimeStamp } from '../helpers';

export const dontUpdateDataHandler = ({ successDataStatusCode }) => ({
  statusCode,
} = {}) => ({
  stausCode: successDataStatusCode || statusCode,
  error: false,
  lastUpdated: generateTimeStamp(),
  isError: false,
});
