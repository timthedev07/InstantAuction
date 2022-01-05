import { useMeQuery, useGetBidQuery } from "client-controllers";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { BidForm } from "../../components/BidForm";
import { PageLoading } from "../../components/PageLoading";
import { NotFoundPage } from "../../components/pages/404";
import { withApollo } from "../../utils/withApollo";

/**
 * Receives a query param used to determine the auction
 *
 * Scenarios
 *  - An unauthenticated user tries to access this url => c) show 404
 *  - A user tries to bid at the auction => a) show bid form
 *  - A user tries to view an existing bid
 *    * The user bid at this auction already => b) view bid
 *    * They haven't bid yet => a) show bid form
 */

const Bid: NextPage = () => {
  const { query } = useRouter();
  const auctionId = query.auctionId as string;
  const { data: meData, loading: meLoading } = useMeQuery();

  const { data, loading } = useGetBidQuery({
    variables: {
      auctionId
    }
  });

  if (loading || meLoading) {
    return <PageLoading />;
  }

  if (!meData || !meData.me) {
    return <NotFoundPage />;
  }

  if (!loading && (!data || !data.getBid)) {
    return (
      <>
        <BidForm auctionId={auctionId} />
      </>
    );
  }

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export default withApollo({ ssr: false })(Bid);
