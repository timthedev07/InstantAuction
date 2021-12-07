import { NextPage } from "next";
import { useHelloQuery, useMeQuery } from "client-controllers";
import { CreateAuction } from "../components/CreateAuction";
import { withApollo } from "../utils/withApollo";
import { CreateItem } from "../components/CreateItem";
import { LogoutButton } from "../components/LogoutButton";

const Landing: NextPage = () => {
  const { data: testData, loading: testLoading } = useHelloQuery();
  const { data } = useMeQuery();

  return (
    <>
      <h3>
        {testLoading ? "Loading..." : testData?.hello || "No data returned"}
      </h3>
      <pre>
        {data && data.me ? JSON.stringify(data!.me!.email, null, 2) : ""}
      </pre>
      <CreateAuction />
      <CreateItem />
      <LogoutButton />
    </>
  );
};

export default withApollo({ ssr: true })(Landing);
