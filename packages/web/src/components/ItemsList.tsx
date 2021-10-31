import { useGetUserItemsQuery } from "client-controllers";
import { FC } from "react";

export const ItemsList: FC = ({}) => {
  const {data, error, loading} = useGetUserItemsQuery();

  return (
    <div>
      {loading ? "..." : error ? `${error}` : data?.getUserItems.items.map(each => (
        <div className="border-white border my-4 mx-1 p-2">
          <h2>{each.name}</h2>
          <img src={each.picture} />
          <span>Owned by <b><i>{each.owner.username}</i></b></span>
        </div>
      ))}
    </div>
  );
};
