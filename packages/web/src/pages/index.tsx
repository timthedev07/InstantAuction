import { NextPage } from "next";
import { useHelloQuery } from "../../../shared/src";

const Landing: NextPage = () => {
  const { data, loading } = useHelloQuery();
  return <h1>{loading ? "Loading..." : data}</h1>;
};

export default Landing;
