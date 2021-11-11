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
          <li key={each.id}>
            {each.title}
          </li>
        ))}
      </>}
    </div>
  );
};
