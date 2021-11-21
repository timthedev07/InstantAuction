export const gqlErrorMessage = (errors: any) => {
  try {
    return errors[0].message as string;
  } catch (err) {
    return "accessGraphqlErrorMessage: No Errors Were Found";
  }
};
