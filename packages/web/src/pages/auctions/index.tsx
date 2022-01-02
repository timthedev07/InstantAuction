import { NextPage } from "next";
import { AllAuctions } from "../../components/AllAuctions";
import { withApollo } from "../../utils/withApollo";

const Auctions: NextPage = () => {
  return (
    <div>
      <AllAuctions />
    </div>
  );
};

export default withApollo({ ssr: true })(Auctions);
