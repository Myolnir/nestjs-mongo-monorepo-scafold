export const obfuscateObjectUtil = (data: any) => {
  const objectToObfuscate = { ...data };
  Object.keys(objectToObfuscate).map((key) => {
    if (/^\d{4}-\d{2}-\d{2}/.test(objectToObfuscate[key])) {
      objectToObfuscate[key] = null;
      return objectToObfuscate[key];
    }

    if (typeof objectToObfuscate[key] === 'string') {
      objectToObfuscate[key] = '****';
      return objectToObfuscate[key];
    }

    if (typeof objectToObfuscate[key] === 'number') {
      objectToObfuscate[key] = 0;
      return objectToObfuscate[key];
    }

    return objectToObfuscate[key];
  });
  return objectToObfuscate;
};
