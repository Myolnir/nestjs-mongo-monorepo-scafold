export const convertToBoolean = (param) => {
  if (!param || param === 'false' || param === 'FALSE') {
    return false;
  }
  return true;
};
