import { useAuctionsOwnedQuery, useItemsOwnedQuery } from "client-controllers";
import { FC } from "react";
import { Auction } from "./Auction";

interface UserTabsProps {
  tab?: string;
}

type TabType = "auctions-owned" | "items-owned" | "bids";

const AuctionsTab = () => {
  const { data, loading, error } = useAuctionsOwnedQuery();

  return (
    <article>
      <ul>
        {loading
          ? "..."
          : !data
          ? JSON.stringify(error)
          : data.auctionsOwned.auctions.map(each => <Auction auction={each} />)}
      </ul>
    </article>
  );
};

const ItemsTab = () => {
  const { data, loading, error } = useItemsOwnedQuery({
    variables: {
      excludeAuctionedOff: false
    }
  });

  return (
    <article>
      <ul>
        {loading
          ? "..."
          : !data
          ? JSON.stringify(error)
          : data.itemsOwned.items.map(each => <li>{each.name}</li>)}
      </ul>
    </article>
  );
};

export const UserTabs: FC<UserTabsProps> = ({ tab }) => {
  return (
    <section className="">
      {(() => {
        switch (tab as TabType) {
          case "items-owned": {
            return <ItemsTab />;
          }
          case "bids": {
            return <></>;
          }
          default: {
            return <AuctionsTab />;
          }
        }
      })()}
    </section>
  );
};

UserTabs.defaultProps = {
  tab: "auctions-owned"
};
