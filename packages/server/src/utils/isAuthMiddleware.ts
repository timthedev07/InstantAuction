import { MiddlewareFn } from "type-graphql";
import { notAuthenticatedErrorMessage } from "../constants/errorMessages";
import { NetworkingContext } from "../types/NetworkingContext";

/**
 * This middleware function checks whether the user is authenticated
 * according to the context variable.
 *
 * Tries to find the user in the database, and if there's no such user, an error is thrown.
 * @returns
 */
export const isAuth: MiddlewareFn<NetworkingContext> = ({ context }, next) => {
  const userId = context.req.session.userId;

  if (!userId) {
    throw new Error(notAuthenticatedErrorMessage);
  }

  return next();
};
