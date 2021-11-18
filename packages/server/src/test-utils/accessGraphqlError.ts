export const accessGraphqlErrorMessage = (errors: any) => {
  return errors[0].message as string;
};
