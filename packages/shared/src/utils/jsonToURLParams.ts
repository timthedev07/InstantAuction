/**
 * this has to be used when calling the discord api
 */

export const jsonToUrlParams = (data: Record<string, any>) => {
  const params = new URLSearchParams();
  for (const key in data) {
    params.append(key, `${data[key]}`);
  }
  return params;
};
