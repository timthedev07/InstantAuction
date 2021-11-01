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
      const count =
        cachedData && cachedData.getUserItems
          ? cachedData.getUserItems.count + 1
          : 1;
      const items =
        cachedData && cachedData.getUserItems
          ? [...cachedData.getUserItems.items, data.createItem]
          : [data.createItem];

      store.writeQuery<GetUserItemsQuery>({
        query: GetUserItemsDocument,
        data: {
          getUserItems: { count, items, __typename: "UserItemsResponse" }
        }
      });
    }
  };
};
