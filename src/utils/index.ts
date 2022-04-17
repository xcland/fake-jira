export const isFalsy = (value: any) => (value === 0 ? false : !value);

export const cleanObject = (object: any) => {
  const result = { ...object };
  Object.keys(object).forEach((key) => {
    const value = object[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};
