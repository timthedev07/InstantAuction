import {
  CreateItemMutationOptions,
  CreateItemMutationVariables,
  ItemsOwnedDocument,
  ItemsOwnedQuery
} from "../generated/graphql";

export const createItemCreationOptions = (
  variables: CreateItemMutationVariables
): CreateItemMutationOptions => {
  return {
    variables,
    update: (store, { data }) => {
      if (!data || !data.createItem) return;

      const cachedData = store.readQuery<ItemsOwnedQuery>({
        query: ItemsOwnedDocument
      });

      let count: number = 1;
      let items = [data.createItem];

      if (cachedData && cachedData.itemsOwned && cachedData.itemsOwned.count) {
        // if there are cached items
        count = cachedData.itemsOwned.count + 1;
        items = [...cachedData.itemsOwned.items, data.createItem];
      }

      store.writeQuery<ItemsOwnedQuery>({
        query: ItemsOwnedDocument,
        data: {
          itemsOwned: { count, items, __typename: "UserItemsResponse" }
        }
      });
    }
  };
};
