import { FC } from "react";
import {
  createItemDeletionOptions,
  isServerDown,
  ItemsOwnedQuery,
  useDeleteItemMutation
} from "client-controllers";
import { VStack } from "./utils/Stack";
import { useAlert } from "../contexts/AlertContext";
import { dataItemBg } from "./AuctionComponent";

export interface ItemComponentProps {
  item: ItemsOwnedQuery["itemsOwned"]["items"][0];
}

export const Item: FC<ItemComponentProps> = ({ item }) => {
  const [deleteItem] = useDeleteItemMutation();
  const { triggerServerLostError } = useAlert();

  return (
    <li
      className={`w-60 h-72 ${dataItemBg} border border-gray-500 border-opacity-60 cursor-pointer rounded-lg transition-all duration-300 hover:scale-[1.02] hover:bg-neutral-200`}
      key={item.id}
    >
      <VStack className="items-center gap-4">
        <div className="bg-slate-700 p-4 h-36 w-full flex justify-center items-center">
          <img src={item.picture} className="w-auto max-h-32 rounded-lg" />
        </div>
        <h4>{item.name}</h4>
        <button
          className="danger-button"
          onClick={async () => {
            try {
              await deleteItem(
                createItemDeletionOptions({
                  itemId: item.id
                })
              );
            } catch (err) {
              if (isServerDown(err)) {
                triggerServerLostError();
              }
            }
          }}
        >
          Delete
        </button>
      </VStack>
    </li>
  );
};
