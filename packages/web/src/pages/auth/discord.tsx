import { createDiscordOAuthOptions, useDiscordOAuthMutation } from "client-controllers";
import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import queryString from "query-string";
import { useEffect, useState } from "react";

const Discord: NextPage = () => {
  const [state, setState] = useState<{}>();
  const [discordOAuth] = useDiscordOAuthMutation();
  const {push} = useRouter();

  useEffect(() => {
    (async () => {
      const urlParams = queryString.parse(window.location.search);
      let code = urlParams.code as string;
      let success = false;

      if (!code) {
        // TODO: handle error here
      }

      const response = await discordOAuth(createDiscordOAuthOptions({code}));

      if (!response.errors || !response.errors.length) {
        success = true;
      }

      setState(response.data?.discordOAuth || {})

      return success;
    })().then((result) => {
      if (result) {
        push("/");
      }
    });
  }, []);

  return (
    <>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </>
  );
};

export default Discord;
