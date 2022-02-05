import { useDisclosure } from "@chakra-ui/react";
import { useGetAuctionQuery, useMeQuery } from "client-controllers";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { BidListItem } from "../../components/BidComponent";
import { EndAuctionModal } from "../../components/EndAuctionModal";
import { PageLoading } from "../../components/PageLoading";
import { NotFoundPage } from "../../components/pages/404";
import { withApollo } from "../../utils/withApollo";
import { FaLockOpen } from "@react-icons/all-files/fa/FaLockOpen";
import { FaUserTie } from "@react-icons/all-files/fa/FaUserTie";
import { FaLock } from "@react-icons/all-files/fa/FaLock";
import { FaMoneyCheckAlt } from "@react-icons/all-files/fa/FaMoneyCheckAlt";
import { HStack, VStack } from "../../components/utils/Stack";

const AUCTION_INFO_ROW_CLASS = "justify-start items-center gap-2";

const AuctionInfo: NextPage = () => {
  const { query } = useRouter();
  const id = query.id as string;
  const { data, loading, error } = useGetAuctionQuery({
    variables: { auctionId: id }
  });
  const { data: meData } = useMeQuery({ ssr: false });
  const modalDisclosure = useDisclosure();

  return (
    <>
      {loading ? (
        <PageLoading />
      ) : !data || error || !data.getAuction ? (
        <NotFoundPage />
      ) : (
        <div className="flex justify-center items-center w-full h-full p-0 md:p-6">
          <div className="w-full p-0 md:p-8 max-w-4xl">
            <img
              src={data.getAuction.item.picture}
              className="w-full h-auto max-w-none md:max-w-md md:rounded-lg"
            />

            <div className="p-6 md:p-0">
              <h2>{data.getAuction.title}</h2>
              {/* <h4>
                {data.getAuction.status} | {data.getAuction.seller.username}
              </h4> */}
              <VStack className="bg-gray-600 text-white p-11 rounded-md gap-10">
                <HStack className={AUCTION_INFO_ROW_CLASS}>
                  {<FaUserTie />} Seller: {data.getAuction.seller.username}
                </HStack>
                <HStack className={AUCTION_INFO_ROW_CLASS}>
                  {data.getAuction.status === "closed" ? (
                    <FaLock />
                  ) : (
                    <FaLockOpen />
                  )}{" "}
                  Status: {data.getAuction.status}
                </HStack>
                {data.getAuction.status === "closed" &&
                  (data.getAuction.winner ? (
                    <HStack className={AUCTION_INFO_ROW_CLASS}>
                      <FaMoneyCheckAlt /> Winner:{" "}
                      {data.getAuction.winner.username}
                    </HStack>
                  ) : (
                    <HStack className={AUCTION_INFO_ROW_CLASS}>
                      <FaMoneyCheckAlt /> No Winner
                    </HStack>
                  ))}
                <div className="w-full">
                  {meData &&
                    meData.me &&
                    meData.me.username === data.getAuction.seller.username &&
                    data.getAuction.status === "open" && (
                      <EndAuctionModal
                        {...modalDisclosure}
                        auction={data.getAuction}
                      />
                    )}
                </div>
              </VStack>
              <hr className="m-auto w-[90%]" />
            </div>

            <div>
              <h3>Bids</h3>
              <div className="p-3">
                {data.getAuction.bids.map(each => (
                  <BidListItem bid={each} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default withApollo({ ssr: false })(AuctionInfo);
