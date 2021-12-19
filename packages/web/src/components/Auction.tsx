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
      className="w-full h-44 p-3 bg-neutral-900 border border-gray-500 border-opacity-60 cursor-pointer rounded-lg transition-all duration-300 hover:scale-[1.02] hover:bg-gray-800"
      key={auction.id}
    >
      <HStack className="items-center justify-start gap-6 h-full">
        <img
          src={auction.item.picture}
          className="w-32 h-[90%] object-cover object-center rounded-lg"
        />
        <VStack className="gap-2">
          <VStack className="rounded-lg border border-neutral-600 min-w-[200px] p-2">
            <h4>{auction.title}</h4>
            <span className="text-neutral-500">
              {auction.status}
              {showOwner ? <> | from {auction.seller.username}</> : ""}
            </span>
          </VStack>

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
              className="danger-button w-[170px]"
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
