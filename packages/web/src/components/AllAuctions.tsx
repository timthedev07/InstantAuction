import { useAllAuctionsQuery } from "client-controllers";
import { FC } from "react";
import { Auction } from "./AuctionComponent";

export const AllAuctions: FC = () => {
  const { data, loading, error } = useAllAuctionsQuery();

  return (
    <div>
      {loading
        ? "..."
        : error
        ? "Error fetching auctions"
        : (() => {
            if (!data) return;
            const auctionsData = data.allAuctions;
            return (
              <>
                <h4>{auctionsData!.count} Auctions</h4>
                <ul className="list-none">
                  {auctionsData!.auctions.map(each => (
                    <Auction key={each.id} auction={each} />
                  ))}
                </ul>
              </>
            );
          })()}
    </div>
  );
};
