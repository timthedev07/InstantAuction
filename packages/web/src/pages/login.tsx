import { NextPage } from "next";
import { LoginPage } from "../components/pages/LoginPage";
import { withApollo } from "../utils/withApollo";

const Login: NextPage = () => {
  return <LoginPage />;
};

export default withApollo({ ssr: true })(Login);
