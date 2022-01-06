import { FC } from "react";
import {
  accessErrMessage,
  AllAuctionsQuery,
  createAuctionDeletionOptions,
  useDeleteAuctionMutation,
  useMeQuery
} from "client-controllers";
import { HStack, VStack } from "./utils/Stack";
import { useAlert } from "../contexts/AlertContext";
import Link from "next/link";
import { RiShareBoxFill } from "@react-icons/all-files/ri/RiShareBoxFill";
import { useRouter } from "next/router";

export interface AuctionComponentProps {
  auction: AllAuctionsQuery["allAuctions"]["auctions"][0];
  showOwner?: boolean;
  className?: string;
}

export const dataItemBg = "bg-neutral-100";

export const Auction: FC<AuctionComponentProps> = ({
  auction,
  className = "",
  showOwner = true
}) => {
  const [deleteAuction] = useDeleteAuctionMutation();
  const { data: meData, loading: meLoading } = useMeQuery();
  const alert = useAlert();
  const { push } = useRouter();

  return (
    <li
      className={`${className} w-full h-44 p-3 ${dataItemBg} border border-gray-500 border-opacity-60 rounded-lg transition-all duration-300 hover:scale-[1.02] hover:bg-gray-300`}
    >
      <HStack className="items-center justify-start gap-6 h-full">
        <div className="flex items-center justify-center w-32 h-full">
          <img
            src={auction.item.picture}
            className="h-auto w-full rounded-lg"
          />
        </div>
        <VStack className="gap-2">
          <VStack className="rounded-lg border border-neutral-600 min-w-[200px] p-2">
            <HStack className="items-start">
              <h4>{auction.title}</h4>
              <Link href={`/auctions/${auction.id}`}>
                <RiShareBoxFill className="w-6 h-auto mt-1 ml-2 cursor-pointer transition duration-200 hover:bg-gray-400 bg-opacity-70 rounded-2xl p-1" />
              </Link>
            </HStack>
            <span className="text-neutral-500">
              {auction.status}
              {showOwner ? <> | from {auction.seller.username}</> : ""}
            </span>
          </VStack>

          {/* Conditional delete button */}
          {!meLoading && meData && meData.me ? (
            meData.me.username === auction.seller.username ? (
              <button
                onClick={async () => {
                  try {
                    await deleteAuction(
                      createAuctionDeletionOptions({ auctionId: auction.id })
                    );
                  } catch (error) {
                    alert.triggerAlert(accessErrMessage(error));
                  }
                }}
                className="danger-button w-[170px]"
              >
                Delete Auction
              </button>
            ) : (
              <button
                onClick={async () => {
                  push(`/bid/${auction.id}`);
                }}
                className="green-button w-[170px]"
              >
                Bid
              </button>
            )
          ) : (
            ""
          )}
        </VStack>
      </HStack>
    </li>
  );
};
