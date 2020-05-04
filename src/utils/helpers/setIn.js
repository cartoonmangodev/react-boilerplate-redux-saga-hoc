/* eslint-disable indent */
import { cloneObject } from './cloneObject';

function setIn(obj, arr, value) {
  let i = 0;
  let o = obj;
  function update() {
    if (Array.isArray(o)) {
      return (() => {
        const a = !(arr.length - 1 === i && +arr[i] >= o.slice().length)
          ? o.slice().map((data, ind) => {
              if (+arr[i] === ind) {
                return arr.length - 1 === i
                  ? value
                  : (() => {
                      o = data;
                      i += 1;
                      return update();
                    })();
              }
              return data;
            })
          : (() => {
              o[+arr[i]] = value;
              return o;
            })();
        return a;
      })();
    }
    return cloneObject(o, {
      [arr[i]]:
        arr.length - 1 === i
          ? value
          : (() => {
              o = o[arr[i]] || {};
              i += 1;
              return update();
            })(),
    });
  }
  return update();
}

export { setIn };
