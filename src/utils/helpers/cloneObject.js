export const cloneObject = (oldState, newState = {}) =>
  Object.assign({}, oldState, newState);

export const newObject = (oldState = {}, ...rest) =>
  rest.length === 0
    ? cloneObject(oldState)
    : rest.reduce(
        (acc, curr) =>
          cloneObject(
            acc,
            (typeof curr === 'function' && curr(oldState, acc)) || curr,
          ),
        cloneObject(oldState),
      );
