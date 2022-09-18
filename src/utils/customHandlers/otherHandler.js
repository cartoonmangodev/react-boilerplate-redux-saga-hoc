export const previousDataHandler = ({ data } = {}) => ({ previousData: data });

export const reducerLogHandler = (old, newData) => {
  // eslint-disable-next-line no-console
  console.log('OLD STATE : ', old, '\n', 'NEW STATE : ', newData);
};
