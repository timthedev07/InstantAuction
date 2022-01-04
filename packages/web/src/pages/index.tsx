import { NextPage } from "next";
import { useHelloQuery } from "client-controllers";
import { CreateAuction } from "../components/CreateAuction";
import { withApollo } from "../utils/withApollo";
import { CreateItem } from "../components/CreateItem";
import { LogoutButton } from "../components/LogoutButton";
import { PageLoading } from "../components/PageLoading";

const Landing: NextPage = () => {
  const { data: testData, loading: testLoading } = useHelloQuery();

  return (
    <>
      <h3>
        {testLoading ? "Loading..." : testData?.hello || "No data returned"}
      </h3>
      <PageLoading />
      <CreateAuction />
      <CreateItem />
      <LogoutButton />
    </>
  );
};

export default withApollo({ ssr: true })(Landing);
