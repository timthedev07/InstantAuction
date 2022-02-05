import { useDisclosure } from "@chakra-ui/react";
import {
  useAuctionsOwnedQuery,
  useItemsOwnedQuery,
  useUserBidsQuery
} from "client-controllers";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FC } from "react";
import { Auction } from "./AuctionComponent";
import { Bid } from "./BidComponent";
import { CreateAuctionModal } from "./CreateAuctionModal";
import { CreateItemModal } from "./CreateItemModal";
import { Item } from "./ItemComponent";
import { PageLoading } from "./PageLoading";

interface UserTabsProps {
  tab?: string;
  action?: string;
}

type TabType = "auctions-owned" | "items-owned" | "bids";
const TabColor = "bg-neutral-100";

const AuctionsTab = () => {
  const { data, loading } = useAuctionsOwnedQuery();
  const modalDisclosure = useDisclosure();

  return (
    <>
      <CreateAuctionModal {...modalDisclosure} />
      <ul>
        {loading || !data ? (
          <PageLoading />
        ) : (
          data.auctionsOwned.auctions.map(each => (
            <Auction
              className="my-3"
              key={each.id}
              auction={each}
              showOwner={false}
            />
          ))
        )}
      </ul>
    </>
  );
};

const ItemsTab: FC<{ action?: string }> = ({ action }) => {
  const { data, loading, error } = useItemsOwnedQuery({
    variables: {
      excludeAuctionedOff: false
    }
  });
  const modalDisclosure = useDisclosure();

  useEffect(() => {
    if (action === "new") {
      modalDisclosure.onOpen();
    }
  }, []);

  return (
    <>
      <CreateItemModal {...modalDisclosure} className="my-4" />
      <ul className="flex gap-5">
        {loading ? (
          <PageLoading />
        ) : !data ? (
          JSON.stringify(error)
        ) : (
          data.itemsOwned.items.map(each => <Item key={each.id} item={each} />)
        )}
      </ul>
    </>
  );
};

const BidsTab = () => {
  const { data, loading, error } = useUserBidsQuery();

  return (
    <ul className="flex gap-5">
      {loading ? (
        <PageLoading />
      ) : !data ? (
        JSON.stringify(error)
      ) : (
        data.getUserBids.bids.map(each => (
          <Bid key={JSON.stringify(each)} bid={each} />
        ))
      )}
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

export const UserTabs: FC<UserTabsProps> = ({ tab, action }) => {
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
          className={`transition duration-300 relative h-[3px] bg-slate-700 w-[33.3333%]`}
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
              return <ItemsTab action={action} />;
            }
            case "bids": {
              return <BidsTab />;
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
