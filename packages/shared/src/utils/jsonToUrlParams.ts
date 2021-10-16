export const jsonToUrlParams = (data: Record<string, any>) => {
  const params = new URLSearchParams();
  for (const key in data) {
    params.append(key, `${data[key]}`);
  }
  return params;
};
