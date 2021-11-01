import {
  CreateItemMutationOptions,
  CreateItemMutationVariables,
  GetUserItemsDocument,
  GetUserItemsQuery
} from "../generated/graphql";

export const createItemCreationOptions = (
  variables: CreateItemMutationVariables
): CreateItemMutationOptions => {
  return {
    variables,
    update: (store, { data }) => {
      if (!data || !data.createItem) return;

      const cachedData = store.readQuery<GetUserItemsQuery>({
        query: GetUserItemsDocument
      });

      let count: number = 1;
      let items = [data.createItem];

      if (
        cachedData &&
        cachedData.getUserItems &&
        cachedData.getUserItems.count
      ) {
        // if there are cached items
        count = cachedData.getUserItems.count + 1;
        items = [...cachedData.getUserItems.items, data.createItem];
      }

      store.writeQuery<GetUserItemsQuery>({
        query: GetUserItemsDocument,
        data: {
          getUserItems: { count, items, __typename: "UserItemsResponse" }
        }
      });
    }
  };
};
