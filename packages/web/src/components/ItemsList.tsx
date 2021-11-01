import {
  createItemDeletionOptions,
  useDeleteItemMutation,
  useGetUserItemsQuery
} from "client-controllers";
import { FC } from "react";

export const ItemsList: FC = ({}) => {
  const { data, error, loading } = useGetUserItemsQuery();
  const [deleteItem] = useDeleteItemMutation();

  return (
    <div>
      {loading
        ? "..."
        : error
        ? `${error}`
        : data!.getUserItems.items.map(each => (
            <div className="border-white border my-4 mx-1 p-2">
              <h2 className="text-3xl">{each.name}</h2>
              <img
                className="min-w-350 w-3/4 h-3/4 max-w-md"
                src={each.picture}
              />
              <button
                onClick={async () => {
                  try {
                    const result = await deleteItem(
                      createItemDeletionOptions({
                        itemId: each.id
                      })
                    );
                    if (result.data && result.data.deleteItem) {
                      alert("Item deleted");
                    }
                  } catch (error) {
                    alert((error as any).graphQLErrors[0].message);
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
