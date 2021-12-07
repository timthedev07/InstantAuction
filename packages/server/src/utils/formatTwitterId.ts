export const formatTwitterId = (twitterId: string) => {
  return `tw:${twitterId}`;
};
export const isTwitterId = (dbExternalId: string) => {
  return dbExternalId.indexOf("tw") === 0;
};
