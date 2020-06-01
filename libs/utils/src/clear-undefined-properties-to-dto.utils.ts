export const clearUndefinedPropertiesUtil = (data: any, Dto) => {
  const dataCleaned = {};
  Object.keys(data).forEach((key: string): void => {
    if (data[key] !== undefined) {
      dataCleaned[key] = data[key];
    }
    return data[key];
  });
  return new Dto(dataCleaned);
};
