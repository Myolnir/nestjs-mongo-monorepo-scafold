import { isArray } from 'lodash';

export const convertToArray = (info: any): Array<any> => {
  let array: Array<any> = [];
  if (info) {
    array = isArray(info) ? info : [info];
  }
  return array;
};
