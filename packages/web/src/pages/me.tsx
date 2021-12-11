import { useMeQuery } from "client-controllers";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { LoginPage } from "../components/pages/LoginPage";
import { getHeadForPage } from "../utils/getHeadForPage";
import { withApollo } from "../utils/withApollo";

const MePage: NextPage = () => {
  const { query, isReady, asPath } = useRouter();
  const { data, loading } = useMeQuery({
    fetchPolicy: "cache-first",
    ssr: false
  });

  useEffect(() => {
    if (!isReady) return;
    const requestedTab = query.t;
    console.log(requestedTab);
  }, [isReady]);

  if (loading) {
    return <></>;
  }

  if (!data || !data.me) {
    return <LoginPage />;
  }

  return (
    <>
      {getHeadForPage({
        description: `User: ${data.me.username}`,
        path: asPath,
        title: `user - ${data.me.username}`
      })}
      <div>
        <div>
          {/* User information component */}
          <h1>{data.me.username}</h1>
        </div>
        <div>{/* Tabs */}</div>
      </div>
    </>
  );
};

export default withApollo({ ssr: true })(MePage);
