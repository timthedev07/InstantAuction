import { NextPage } from "next";
import { useHelloQuery } from "client-controllers";

const Landing: NextPage = () => {
  const { data, loading } = useHelloQuery();
  return (
    <h1 className="text-3xl">
      {loading ? "Loading..." : data?.hello || "No data returned"}
    </h1>
  );
};

export default Landing;
