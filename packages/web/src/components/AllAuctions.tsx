import { useAllAuctionsQuery } from "client-controllers";
import { FC } from "react";

export const AllAuctions: FC = () => {
  const {data, loading, error} = useAllAuctionsQuery();

  const auctionsData = data?.allAuctions;

  return (
    <div>
      {loading ? "..." : error ? "Error fetching auctions" : <>
        <h3 className="text-xl">{auctionsData!.count} Auctions</h3>
        {auctionsData!.auctions.map(each => (
          <li className="w-64 h-64 p-3 border border-white" key={each.id}>
            <h3 className="text-xl">{each.title}</h3>
            <i>Started by: {each.seller.username}</i>
            <i>Status: {each.status}</i>
            <p>{each.description}</p>
            <img src={each.item.picture} />
          </li>
        ))}
      </>}
    </div>
  );
};
