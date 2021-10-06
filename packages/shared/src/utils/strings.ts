export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const nonEmpty = (str: string): boolean => {
  return /(.|\s)*\S(.|\s)*/.test(str);
};
