import {
  DeleteItemMutationOptions,
  DeleteItemMutationVariables,
  GetUserItemsDocument,
  GetUserItemsQuery
} from "../generated/graphql";

export const createItemDeletionOptions = (
  variables: DeleteItemMutationVariables
): DeleteItemMutationOptions => {
  return {
    variables,
    update: (store, { data }) => {
      if (!data || !data.deleteItem) return;

      const itemId = variables.itemId;

      const cachedData = store.readQuery<GetUserItemsQuery>({
        query: GetUserItemsDocument
      });

      let count: number = 1;
      let items: any[] = [];

      if (
        cachedData &&
        cachedData.getUserItems &&
        cachedData.getUserItems.count
      ) {
        // if there are cached items
        count = cachedData.getUserItems.count + 1;
        items = cachedData.getUserItems.items.filter(
          each => each.id !== itemId
        );
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
