import {
  DeleteItemMutationOptions,
  DeleteItemMutationVariables,
  ItemsOwnedDocument,
  ItemsOwnedQuery
} from "../generated/graphql";

export const createItemDeletionOptions = (
  variables: DeleteItemMutationVariables
): DeleteItemMutationOptions => {
  return {
    variables,
    update: (store, { data }) => {
      if (!data || !data.deleteItem) return;

      const itemId = variables.itemId;

      const cachedData = store.readQuery<ItemsOwnedQuery>({
        query: ItemsOwnedDocument
      });

      let count: number = 1;
      let items: any[] = [];

      if (cachedData && cachedData.itemsOwned && cachedData.itemsOwned.count) {
        // if there are cached items
        count = cachedData.itemsOwned.count + 1;
        items = cachedData.itemsOwned.items.filter(each => each.id !== itemId);
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
