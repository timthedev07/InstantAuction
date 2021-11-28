export const jsonToUrlParams = (data: Record<string, any>): string => {
  const params = new URLSearchParams();
  for (const key in data) {
    params.append(key, `${data[key]}`);
  }
  return params.toString();
};
