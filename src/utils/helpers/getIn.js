/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
function getIn(obj, arr) {
  let i = 0;
  let o = obj;
  function get() {
    return arr.length > 0 && arr.length - 1 === i
      ? typeof o === 'undefined' || o === null
        ? o
        : o[arr[i]]
      : (() => {
          if (typeof o === 'undefined' || o === null) return o;
          o = o[arr[i]];
          i += 1;
          return get();
        })();
  }
  return arr.length > 0 ? get() : obj;
}

export { getIn };
