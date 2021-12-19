import { FC } from "react";
import {
  AllAuctionsQuery,
  createAuctionDeletionOptions,
  useDeleteAuctionMutation,
  useMeQuery
} from "client-controllers";
import { HStack, VStack } from "./utils/Stack";

export interface AuctionComponentProps {
  auction: AllAuctionsQuery["allAuctions"]["auctions"][0];
  showOwner?: boolean;
}

export const Auction: FC<AuctionComponentProps> = ({
  auction,
  showOwner = true
}) => {
  const [deleteAuction] = useDeleteAuctionMutation();
  const { data: meData, loading: meLoading } = useMeQuery();

  return (
    <li
      className="w-full h-44 p-3 border border-gray-500 border-opacity-60 rounded-lg"
      key={auction.id}
    >
      <HStack className="items-center justify-start gap-6 h-full">
        <img
          src={auction.item.picture}
          className="w-32 h-[90%] object-cover object-center rounded-lg"
        />
        <VStack>
          <h4>{auction.title}</h4>
          <i className="text-neutral-500">
            Status: {auction.status}
            <br />
            {showOwner ? <>Seller: {auction.seller.username}</> : ""}
          </i>

          {/* Conditional delete button */}
          {!meLoading &&
          meData &&
          meData.me &&
          meData.me.username === auction.seller.username ? (
            <button
              onClick={async () => {
                try {
                  await deleteAuction(
                    createAuctionDeletionOptions({ auctionId: auction.id })
                  );
                } catch (error) {
                  alert((error as any).graphQLErrors[0].message);
                }
              }}
              className="danger-button"
            >
              Delete Auction
            </button>
          ) : (
            ""
          )}
        </VStack>
      </HStack>
    </li>
  );
};
