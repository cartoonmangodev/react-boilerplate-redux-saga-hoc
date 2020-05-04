/* eslint-disable indent */
import { cloneObject } from './cloneObject';

function deleteIn(obj, arr) {
  let i = 0;
  let o = obj;
  function update() {
    if (Array.isArray(o)) {
      return (() => {
        const a = !(arr.length - 1 === i && +arr[i] >= o.slice().length)
          ? o
              .slice()
              .map((data, ind) => {
                if (+arr[i] === ind) {
                  if (arr.length - 1 === i) {
                    if (Array.isArray(o)) o.splice(+arr[i], 1);
                    else delete o[arr[i]];
                    return Array.isArray(o) ? null : o;
                  }
                  return (() => {
                    o = data;
                    i += 1;
                    return update();
                  })();
                }
                return data;
              })
              .filter(e => e)
          : (() => {
              if (arr.length - 1 === i) {
                if (Array.isArray(o)) o.splice(+arr[i], 1);
                else delete o[arr[i]];
                return o;
              }
              return o;
            })();
        return a;
      })();
    }
    return (() => {
      if (arr.length - 1 === i) {
        delete o[arr[i]];
        return o;
      }
      return cloneObject(o, {
        [arr[i]]: (() => {
          o = o[arr[i]];
          i += 1;
          return update();
        })(),
      });
    })();
  }
  return update();
}

export { deleteIn };
