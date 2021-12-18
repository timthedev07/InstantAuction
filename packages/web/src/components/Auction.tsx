import { FC } from "react";
import {
  AllAuctionsQuery,
  createAuctionDeletionOptions,
  useDeleteAuctionMutation,
  useMeQuery
} from "client-controllers";

export interface AuctionComponentProps {
  auction: AllAuctionsQuery["allAuctions"]["auctions"][0];
}

export const Auction: FC<AuctionComponentProps> = ({ auction }) => {
  const [deleteAuction] = useDeleteAuctionMutation();
  const { data: meData, loading: meLoading } = useMeQuery();
  return (
    <li
      className="w-64 h-80 p-3 border border-gray-500 rounded-lg"
      key={auction.id}
    >
      <h4>{auction.title}</h4>
      <i>
        Started by: {auction.seller.username}
        <br />
        Status: {auction.status}
      </i>
      <p>{auction.description}</p>
      <img src={auction.item.picture} className="w-auto h-28" />
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
    </li>
  );
};
