import { useGetAuctionQuery } from "client-controllers";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { NotFoundPage } from "../../components/pages/404";
import { withApollo } from "../../utils/withApollo";

const AuctionInfo: NextPage = () => {
  const { query } = useRouter();
  const id = query.id as string;
  const { data } = useGetAuctionQuery({
    variables: { auctionId: id }
  });

  return (
    <>
      {!data ? (
        <>loading</>
      ) : !data.getAuction ? (
        <NotFoundPage />
      ) : (
        <div className="flex justify-center items-center w-full h-full p-6">
          <div className="border rounded-lg w-full p-8 max-w-4xl border-gray-500 bg-neutral-800">
            <h2>{data.getAuction.title}</h2>
            <hr className="mb-5" />
            <img
              src={data.getAuction.item.picture}
              className="w-full h-auto max-w-md rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default withApollo({ ssr: true })(AuctionInfo);
