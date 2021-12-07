export const clearValuesOnUndefined = (obj: Object) => {
  if (Object.values(obj).every(each => each === undefined)) return {};
  return obj;
};
