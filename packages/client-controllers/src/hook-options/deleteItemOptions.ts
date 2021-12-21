import {
  DeleteItemMutationOptions,
  DeleteItemMutationVariables,
  ItemsOwnedDocument,
  ItemsOwnedQuery,
  ItemsOwnedQueryVariables
} from "../generated/graphql";

export const createItemDeletionOptions = (
  variables: DeleteItemMutationVariables
): DeleteItemMutationOptions => {
  return {
    variables,
    update: (store, { data }) => {
      if (!data || !data.deleteItem) return;

      const itemId = variables.itemId;

      const cachedData = store.readQuery<
        ItemsOwnedQuery,
        ItemsOwnedQueryVariables
      >({
        query: ItemsOwnedDocument,
        variables: {
          excludeAuctionedOff: false
        }
      });

      console.log(cachedData);

      let count: number = 0;
      let items: any[] = [];

      if (cachedData && cachedData.itemsOwned && cachedData.itemsOwned.count) {
        // if there are cached items
        count = cachedData.itemsOwned.count - 1;
        items = cachedData.itemsOwned.items.filter(each => each.id !== itemId);
      }

      store.writeQuery<ItemsOwnedQuery, ItemsOwnedQueryVariables>({
        query: ItemsOwnedDocument,
        data: {
          itemsOwned: { count, items, __typename: "UserItemsResponse" }
        },
        variables: {
          excludeAuctionedOff: false
        }
      });
    }
  };
};
