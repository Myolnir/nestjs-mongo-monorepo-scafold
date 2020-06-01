export function flattenArray(array) {
  let flatten = [];
  for (let i = 0; i < array.length; i++) {
    if (Array.isArray(array[i])) {
      flatten = flatten.concat(flattenArray(array[i]));
    } else {
      flatten.push(array[i]);
    }
  }
  return flatten;
}
