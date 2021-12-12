import { MiddlewareFn } from "type-graphql";
import { notAuthenticatedErrorMessage } from "../constants/errorMessages";
import { User } from "../entity/User";
import { NetworkingContext } from "../types/NetworkingContext";

/**
 * This middleware function checks whether the user is authenticated
 * according to the context variable.
 */
export const isAuth: MiddlewareFn<NetworkingContext> = ({ context }, next) => {
  const userId = context.req.session.userId;

  if (!userId) {
    throw new Error(notAuthenticatedErrorMessage);
  }

  return next();
};

/**
 * This middleware function checks whether the user is authenticated
 * according to the context variable.
 *
 * **Tries to find the user in the database, and if there's no such user, an error is thrown.**
 *
 * This middleware is suitable when you don't need to fetch the user entity in your resolver again, i.e. only needs the userId
 */
export const isAuthStrict: MiddlewareFn<NetworkingContext> = async (
  { context },
  next
) => {
  const user = await User.findOne(context.req.session.userId);

  if (!user) {
    throw new Error(notAuthenticatedErrorMessage);
  }

  return next();
};
