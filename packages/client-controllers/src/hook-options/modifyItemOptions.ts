import {
  ModifyItemMutationOptions,
  ModifyItemMutationVariables,
  GetUserItemsDocument,
  GetUserItemsQuery
} from "../generated/graphql";

export const modifyItemCreationOptions = (
  variables: ModifyItemMutationVariables
): ModifyItemMutationOptions => {
  return {
    variables,
    update: (store, { data }) => {
      if (!data || !data.modifyItem) return;

      const cachedData = store.readQuery<GetUserItemsQuery>({
        query: GetUserItemsDocument
      });

      let count: number = 1;
      let items = [data.modifyItem];

      if (
        cachedData &&
        cachedData.getUserItems &&
        cachedData.getUserItems.count
      ) {
        // if there are cached items
        count = cachedData.getUserItems.count + 1;
        items = cachedData.getUserItems.items;
        items[
          items.findIndex(val => {
            return val.id === data.modifyItem.id;
          })
        ] = data.modifyItem;
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
