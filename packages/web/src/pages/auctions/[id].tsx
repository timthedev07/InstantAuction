import { useDisclosure } from "@chakra-ui/react";
import { useGetAuctionQuery, useMeQuery } from "client-controllers";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { BidListItem } from "../../components/BidComponent";
import { EndAuctionModal } from "../../components/EndAuctionModal";
import { PageLoading } from "../../components/PageLoading";
import { NotFoundPage } from "../../components/pages/404";
import { withApollo } from "../../utils/withApollo";

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
              <h4>
                {data.getAuction.status} | {data.getAuction.seller.username}
              </h4>
              <hr className="m-auto w-[90%]" />
            </div>
            {meData && meData.me && data.getAuction.status === "open" ? (
              <EndAuctionModal {...modalDisclosure} auction={data.getAuction} />
            ) : (
              ""
            )}
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

export default withApollo({ ssr: true })(AuctionInfo);
