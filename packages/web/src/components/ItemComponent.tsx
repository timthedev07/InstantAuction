import { FC } from "react";
import {
  createItemDeletionOptions,
  ItemsOwnedQuery,
  useDeleteItemMutation
} from "client-controllers";
import { VStack } from "./utils/Stack";

export interface ItemComponentProps {
  item: ItemsOwnedQuery["itemsOwned"]["items"][0];
}

export const Item: FC<ItemComponentProps> = ({ item }) => {
  const [deleteItem] = useDeleteItemMutation();

  return (
    <li
      className="w-60 h-72 p-3 bg-neutral-900 border border-gray-500 border-opacity-60 cursor-pointer rounded-lg transition-all duration-300 hover:scale-[1.02] hover:bg-gray-800"
      key={item.id}
    >
      <VStack className="items-center gap-4">
        <img
          src={item.picture}
          className="w-auto h-28 object-cover rounded-lg"
        />
        <h4>{item.name}</h4>
        <button
          className="danger-button"
          onClick={() => {
            deleteItem(
              createItemDeletionOptions({
                itemId: item.id
              })
            );
          }}
        >
          Delete
        </button>
      </VStack>
    </li>
  );
};
