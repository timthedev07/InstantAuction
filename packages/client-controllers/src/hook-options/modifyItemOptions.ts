import {
  ModifyItemMutationOptions,
  ModifyItemMutationVariables,
  ItemsOwnedDocument,
  ItemsOwnedQuery
} from "../generated/graphql";

export const createItemModificationOptions = (
  variables: ModifyItemMutationVariables
): ModifyItemMutationOptions => {
  return {
    variables,
    update: (store, { data }) => {
      if (!data || !data.modifyItem) return;

      const cachedData = store.readQuery<ItemsOwnedQuery>({
        query: ItemsOwnedDocument
      });

      let count: number = 1;
      let items = [data.modifyItem];

      if (cachedData && cachedData.itemsOwned && cachedData.itemsOwned.count) {
        // if there are cached items
        count = cachedData.itemsOwned.count;
        items = cachedData.itemsOwned.items;

        const ind = items.findIndex(val => {
          return val.id === data.modifyItem.id;
        });

        try {
          items[ind].name = data.modifyItem.name;
          items[ind].picture = data.modifyItem.picture;
        } catch (err) {}
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
