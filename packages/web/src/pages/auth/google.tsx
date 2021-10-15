import { useGoogleOAuthMutation } from "client-controllers";
import { NextPage } from "next";
import queryString from "query-string";
import { useEffect, useState } from "react";

const Google: NextPage = () => {
  const [state, setState] = useState<{}>();
  const [googleOAuth] = useGoogleOAuthMutation();

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
      setState(response.data?.googleOAuth || {})
    })();
  }, []);

  return (
    <>
      <pre>{JSON.stringify(state)}</pre>
    </>
  );
};

export default Google;
