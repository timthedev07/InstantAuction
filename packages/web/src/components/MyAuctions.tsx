import { useAuctionsOwnedQuery } from "client-controllers";
import { FC } from "react";

export const MyAuctions: FC = ({}) => {
  const { data, error } = useAuctionsOwnedQuery();

  return (
    <div>
      <h3>My Auctions</h3>
      <ul>
        {data
          ? data.auctionsOwned.auctions.map(each => (
              <div className="border border-white rounded">
                <h3 />
                {each.title}
              </div>
            ))
          : error}
      </ul>
    </div>
  );
};
