import { unknownErrMsg } from "../constants/others";

export const parseGraphQLError = (error: any) => {
  try {
    return error.graphQLErrors[0].message;
  } catch (err) {
    return unknownErrMsg;
  }
};
