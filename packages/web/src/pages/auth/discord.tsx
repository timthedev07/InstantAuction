import { useDiscordOAuthMutation } from "client-controllers";
import { NextPage } from "next";
import queryString from "query-string";
import { useEffect, useState } from "react";

const Discord: NextPage = () => {
  const [state, setState] = useState<{}>();
  const [googleOAuth] = useDiscordOAuthMutation();

  useEffect(() => {
    (async () => {
      const urlParams = queryString.parse(window.location.search);
      let code = urlParams.code as string;

      if (!code) {
        // TODO: handle error here
      }

      const response = await googleOAuth({
        variables: {
          code,
        },
      });
      setState(response.data?.discordOAuth || {})
    })();
  }, []);

  return (
    <>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </>
  );
};

export default Discord;
