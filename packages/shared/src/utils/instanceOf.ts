export const instanceOfInterface = <T>(
  object: any,
  aMemberName: string
): object is T => {
  return aMemberName in object;
};
