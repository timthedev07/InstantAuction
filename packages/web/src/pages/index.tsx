import { NextPage } from "next";
import { useHelloQuery } from "shared";

const Landing: NextPage = () => {
  const { data, loading } = useHelloQuery();
  return <h1>{loading ? "Loading..." : JSON.stringify(data)}</h1>;
};

export default Landing;
