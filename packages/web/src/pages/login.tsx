import {
  BACKEND,
  getDiscordAuthUrl,
  getGoogleAuthUrl,
  useMeQuery
} from "client-controllers";
import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import { OAuthButton } from "../components/OAuthButton";
import { withApollo } from "../utils/withApollo";

const Login: NextPage = () => {
  const { data } = useMeQuery();
  const router = useRouter();

  useEffect(() => {
    const query = router.query;
    console.log(query);
    const error = query.err;
    if (error) {
      alert(error);
    }
  }, []);

  if (data && data.me) {
    router.push("/");
    return <></>;
  }

  return (
    <>
      <div className="flex justify-center items-center h-70vh min-h-450">
        <div className="flex bg-neutral-800 rounded-lg w-9/12 h-9/10">
          <div className="flex flex-col justify-start items-center bg-transparent w-full md:w-5/12 lg:w-2/4 h-full pt-7">
            <h3 className="border-b border-neutral-700 w-10/12 text-center">
              Sign in
            </h3>
            <div className="flex flex-col h-2/4 justify-center items-center w-full px-4">
              <OAuthButton
                provider="google"
                href={getGoogleAuthUrl(
                  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
                )}
              />
              <OAuthButton
                provider="discord"
                href={getDiscordAuthUrl(
                  process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID
                )}
              />
              <OAuthButton
                provider="microsoft"
                href={`${BACKEND}/microsoft/`}
              />
            </div>
          </div>
          <div className="bg-login-image-bg hidden rounded-r-lg md:w-7/12 md:flex lg:flex lg:w-2/4 items-center">
            <img src="/images/login.jpg" alt="login" />
          </div>
        </div>
      </div>
    </>
  );
};

export default withApollo({ ssr: true })(Login);
