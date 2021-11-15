import { graphql, GraphQLSchema } from "graphql";
import { createSchema } from "../schema";

interface Options {
  source: string;
  variableValues?: {
    [key: string]: any;
  };
  userId?: number;
}

let schema: GraphQLSchema;

export const callGraphql = async ({
  source,
  variableValues,
  userId
}: Options) => {
  if (!schema) {
    schema = await createSchema();
  }
  return await graphql({
    schema,
    source,
    variableValues,
    contextValue: {
      req: {
        session: {
          userId
        }
      },
      res: {
        clearCookie: () => jest.fn()
      }
    }
  });
};
