import { UserBidsQuery } from "client-controllers";
import { DetailedHTMLProps, FC, HTMLAttributes } from "react";
import DoubleArrow from "../icons/DoubleArrow";
import { HStack } from "./utils/Stack";

interface BidComponentProps {
  bid: UserBidsQuery["getUserBids"]["bids"][0];
}

type BidListItemProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  bid: Omit<BidComponentProps["bid"], "auction">;
  isChosen?: boolean;
  isSelectable?: boolean;
};

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

export const BidListItem: FC<BidListItemProps> = ({
  bid,
  className,
  isChosen = false,
  isSelectable = false,
  ...rest
}) => {
  return (
    <div
      key={bid.id}
      {...rest}
      className={`border min-w-[250px] cursor-pointer transition duration-500 w-40 rounded p-4 ${
        isChosen && isSelectable
          ? "transform -translate-y-1 shadow-xl bg-slate-300"
          : "bg-slate-100"
      }`}
    >
      <h3>
        {bid.item.name} from {bid.bidder.username}
      </h3>
      <img src={bid.item.picture} />
    </div>
  );
};
