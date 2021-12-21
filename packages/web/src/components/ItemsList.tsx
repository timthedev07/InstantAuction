import {
  accessErrMessage,
  createItemDeletionOptions,
  useDeleteItemMutation,
  useItemsOwnedQuery
} from "client-controllers";
import { FC } from "react";
import { useAlert } from "../contexts/AlertContext";

export const ItemsList: FC = ({}) => {
  const { data, error, loading } = useItemsOwnedQuery({
    variables: { excludeAuctionedOff: false }
  });
  const alert = useAlert();
  const [deleteItem] = useDeleteItemMutation();

  return (
    <div>
      {loading
        ? "..."
        : error
        ? `${error}`
        : data!.itemsOwned.items.map(each => (
            <div key={each.id} className="border-white border my-4 mx-1 p-2">
              <h3>{each.name}</h3>
              <img
                className="min-w-350 w-3/4 h-3/4 max-w-md"
                src={each.picture}
              />
              <button
                onClick={async () => {
                  try {
                    await deleteItem(
                      createItemDeletionOptions({
                        itemId: each.id
                      })
                    );
                  } catch (error) {
                    alert.triggerAlert(accessErrMessage(error));
                  }
                }}
                className="danger-button"
              >
                Delete Item
              </button>
            </div>
          ))}
    </div>
  );
};
