import { UserBidsQuery } from "client-controllers";
import { FC } from "react";
import DoubleArrow from "../icons/DoubleArrow";
import { HStack } from "./utils/Stack";

interface BidComponentProps {
  bid: UserBidsQuery["getUserBids"]["bids"][0];
}

export const Bid: FC<BidComponentProps> = ({ bid }) => {
  return (
    <div className="h-">
      <HStack className="justify-center items-center gap-2">
        <img className="h-32" src={bid.item.picture} />
        <DoubleArrow className="w-16" />
        <img className="h-32" src={bid.auction.item.picture} />
      </HStack>
    </div>
  );
};
