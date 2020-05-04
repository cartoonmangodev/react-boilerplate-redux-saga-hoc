/* eslint-disable indent */
import { cloneObject } from './cloneObject';
function updateIn(obj, arr = [], callback) {
  let i = 0;
  let o = obj;
  function update() {
    if (Array.isArray(o)) {
      return o.slice().map((data, ind) => {
        if (+arr[i] === ind) {
          return arr.length - 1 === i
            ? callback(data)
            : (() => {
                o = data;
                i += 1;
                return update();
              })();
        }
        return data;
      });
    }
    return cloneObject(o, {
      [arr && arr[i]]:
        arr.length - 1 === i
          ? callback(o[arr[i]])
          : (() => {
              o = o[arr[i]] || {};
              i += 1;
              return update();
            })(),
    });
  }
  return arr.length > 0 ? update() : obj;
}

export { updateIn };
