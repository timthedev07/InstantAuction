import {
  createMicrosoftOAuthOptions,
  useMicrosoftOAuthMutation
} from "client-controllers";
import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import queryString from "query-string";
import { useEffect } from "react";
import { PageLoading } from "../../components/PageLoading";
import { withApollo } from "../../utils/withApollo";

const Google: NextPage = () => {
  const [microsoftOAuth] = useMicrosoftOAuthMutation();
  const { push } = useRouter();

  useEffect(() => {
    (async () => {
      const urlParams = queryString.parse(window.location.search);
      let code = urlParams.code as string;

      if (!code) {
        push("/login");
      }

      const response = await microsoftOAuth(
        createMicrosoftOAuthOptions({ code })
      );

      if (!response.errors || !response.errors.length) {
        return true;
      } else {
        return response.errors[0].message;
      }
    })().then(result => {
      if (result) {
        push("/");
      } else {
        push(`/login?err=${encodeURI(result)}`);
      }
    });
  }, []);

  return <PageLoading />;
};

export default withApollo({ ssr: false })(Google);
