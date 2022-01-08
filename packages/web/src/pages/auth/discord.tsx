import {
  accessErrMessage,
  createDiscordOAuthOptions,
  useDiscordOAuthMutation
} from "client-controllers";
import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import queryString from "query-string";
import { useEffect } from "react";
import { PageLoading } from "../../components/PageLoading";
import { withApollo } from "../../utils/withApollo";

const Discord: NextPage = () => {
  const [discordOAuth] = useDiscordOAuthMutation();
  const { push } = useRouter();

  useEffect(() => {
    (async () => {
      const urlParams = queryString.parse(window.location.search);
      let code = urlParams.code as string;

      if (!code) {
        push("/login");
      }

      try {
        await discordOAuth(createDiscordOAuthOptions({ code }));
        return true;
      } catch (err) {
        return accessErrMessage(err);
      }
    })().then(result => {
      if (result === true) {
        push("/");
      } else {
        push(`/login?err=${encodeURI(result)}`);
      }
    });
  }, []);

  return (
    <>
      <PageLoading />
    </>
  );
};

export default withApollo({ ssr: false })(Discord);
