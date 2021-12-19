export const accessErrMessage = (gqlError: any) => {
  return gqlError.graphQLErrors[0].message as string;
};
