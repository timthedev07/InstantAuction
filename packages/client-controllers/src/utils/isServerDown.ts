export const isServerDown = (queryCallError: any) => {
  return (
    queryCallError &&
    (!queryCallError.graphQLErrors || queryCallError.graphQLErrors.length < 1)
  );
};
