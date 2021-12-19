import { useAuctionsOwnedQuery, useItemsOwnedQuery } from "client-controllers";
import { useRouter } from "next/router";
import { useState } from "react";
import { FC } from "react";
import { Auction } from "./Auction";

interface UserTabsProps {
  tab?: string;
}

type TabType = "auctions-owned" | "items-owned" | "bids";
const TabColor = "bg-neutral-900";

const AuctionsTab = () => {
  const { data, loading, error } = useAuctionsOwnedQuery();

  return (
    <ul>
      {loading
        ? "..."
        : !data
        ? JSON.stringify(error)
        : data.auctionsOwned.auctions.map(each => (
            <Auction auction={each} showOwner={false} />
          ))}
    </ul>
  );
};

const ItemsTab = () => {
  const { data, loading, error } = useItemsOwnedQuery({
    variables: {
      excludeAuctionedOff: false
    }
  });

  return (
    <ul>
      {loading
        ? "..."
        : !data
        ? JSON.stringify(error)
        : data.itemsOwned.items.map(each => (
            <li key={each.name}>{each.name}</li>
          ))}
    </ul>
  );
};

export const computeTabBottomLineLeftPercentage = (tab: string) => {
  switch (tab) {
    case "items-owned": {
      return "100%";
    }
    case "bids": {
      return "200%";
    }
    default: {
      return "0";
    }
  }
};

export const UserTabs: FC<UserTabsProps> = ({ tab }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>(
    tab ? tab : "auctions-owned"
  );
  const [tabBottomLinePos, setTabBottomLinePos] = useState<string>(() => {
    return computeTabBottomLineLeftPercentage(activeTab);
  });

  return (
    <section className="h-full">
      <div className={`relative ${TabColor}`}>
        <ul className="flex items-center justify-around py-3">
          {[
            {
              name: "Auctions",
              tParam: "auctions-owned"
            },
            {
              name: "Items",
              tParam: "items-owned"
            },
            {
              name: "Bids",
              tParam: "bids"
            }
          ].map(({ name, tParam }) => (
            <li
              key={name}
              className="user-tab-item"
              onClick={() => {
                setTabBottomLinePos(computeTabBottomLineLeftPercentage(tParam));
                setActiveTab(tParam);
                router.push(
                  {
                    pathname: "/me",
                    query: { t: tParam }
                  },
                  undefined,
                  { shallow: true }
                );
              }}
            >
              {name}
            </li>
          ))}
        </ul>
        <div
          className={`transition duration-300 relative h-[3px] bg-white w-[33.3333%]`}
          style={{
            transform: `translateX(${tabBottomLinePos})`
          }}
          key={tabBottomLinePos}
        />
      </div>
      <article className={`${TabColor} p-5 min-h-400`}>
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
      </article>
    </section>
  );
};

UserTabs.defaultProps = {
  tab: "auctions-owned"
};
