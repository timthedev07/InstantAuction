export const isServerDown = (queryCallError: any) => {
  try {
    return (
      queryCallError &&
      (!queryCallError.graphQLErrors || queryCallError.graphQLErrors.length < 1)
    );
  } catch (err) {
    return false;
  }
};
