import {
  CreateItemMutationOptions,
  CreateItemMutationVariables,
  CreateItemWithPictureUrlMutationOptions,
  CreateItemWithPictureUrlMutationVariables,
  ItemsOwnedDocument,
  ItemsOwnedQuery,
  ItemsOwnedQueryVariables
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

export const createItemCreationWithPictureUrlOptions = (
  variables: CreateItemWithPictureUrlMutationVariables
): CreateItemWithPictureUrlMutationOptions => {
  return {
    variables,
    update: (store, { data }) => {
      if (!data || !data.createItemWithPictureUrl) return;

      const cachedData = {
        all: store.readQuery<ItemsOwnedQuery, ItemsOwnedQueryVariables>({
          query: ItemsOwnedDocument,
          variables: {
            excludeAuctionedOff: false
          }
        }),
        notAuctionedOff: store.readQuery<
          ItemsOwnedQuery,
          ItemsOwnedQueryVariables
        >({
          query: ItemsOwnedDocument,
          variables: {
            excludeAuctionedOff: true
          }
        })
      };

      let count = {
        all: 1,
        notAuctionedOff: 1
      };

      let items = {
        all: [data.createItemWithPictureUrl],
        notAuctionedOff: [data.createItemWithPictureUrl]
      };

      if (
        cachedData.all &&
        cachedData.all.itemsOwned &&
        cachedData.all.itemsOwned.count
      ) {
        // if there are cached items
        count.all = cachedData.all.itemsOwned.count + 1;
        items.all = [
          ...cachedData.all.itemsOwned.items,
          data.createItemWithPictureUrl
        ];
      }
      if (
        cachedData.notAuctionedOff &&
        cachedData.notAuctionedOff.itemsOwned &&
        cachedData.notAuctionedOff.itemsOwned.count
      ) {
        count.notAuctionedOff = cachedData.notAuctionedOff.itemsOwned.count + 1;
        items.notAuctionedOff = [
          ...cachedData.notAuctionedOff.itemsOwned.items,
          data.createItemWithPictureUrl
        ];
      }

      store.writeQuery<ItemsOwnedQuery, ItemsOwnedQueryVariables>({
        query: ItemsOwnedDocument,
        data: {
          itemsOwned: {
            count: count.all,
            items: items.all,
            __typename: "UserItemsResponse"
          }
        },
        variables: {
          excludeAuctionedOff: false
        }
      });

      store.writeQuery<ItemsOwnedQuery, ItemsOwnedQueryVariables>({
        query: ItemsOwnedDocument,
        data: {
          itemsOwned: {
            count: count.notAuctionedOff,
            items: items.notAuctionedOff,
            __typename: "UserItemsResponse"
          }
        },
        variables: {
          excludeAuctionedOff: true
        }
      });
    }
  };
};
