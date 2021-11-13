import { useAllAuctionsQuery } from "client-controllers";
import { FC } from "react";

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
                <h3 className="text-xl">{auctionsData!.count} Auctions</h3>
                {auctionsData!.auctions.map(each => (
                  <li
                    className="w-64 h-80 p-3 border border-white rounded-lg"
                    key={each.id}
                  >
                    <h3 className="text-xl">{each.title}</h3>
                    <i>
                      Started by: {each.seller.username}
                      <br />
                      Status: {each.status}
                    </i>
                    <p>{each.description}</p>
                    <img src={each.item.picture} className="w-auto h-28" />
                  </li>
                ))}
              </>
            );
          })()}
    </div>
  );
};
