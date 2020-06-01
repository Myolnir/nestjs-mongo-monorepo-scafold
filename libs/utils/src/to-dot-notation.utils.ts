import { isPlainObject } from 'lodash';

/**
 * Transforms object to dot notation
 *
 * @param obj object to transform
 * @param div operator for iteration, defaults to '.'
 * @param pre prefix to attach to all dot notation strings
 * @returns dot notation object
 */

export const toDotNotation = (obj: object, div: string = '.', pre?: string): object => {
  let newPre: string = pre;
  if (pre != null) {
    newPre += div;
  } else {
    newPre = '';
  }
  const iteration: object = {};
  Object.keys(obj).forEach((key) => {
    if (isPlainObject(obj[key])) {
      Object.assign(iteration, this.toDotNotation(obj[key], div, newPre + key));
    } else {
      iteration[newPre + key] = obj[key];
    }
  });
  return iteration;
};
