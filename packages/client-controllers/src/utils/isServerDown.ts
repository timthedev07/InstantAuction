export const isServerDown = (queryCallError: any) => {
  return (
    !queryCallError.graphQLErrors || queryCallError.graphQLErrors.length < 1
  );
};
