import {
  useMeQuery,
  getGoogleAuthUrl,
  getDiscordAuthUrl,
  BACKEND
} from "client-controllers";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { useAlert } from "../../contexts/AlertContext";
import { getHeadForPage } from "../../utils/getHeadForPage";
import { OAuthButton } from "../OAuthButton";

interface LoginPageProps {}

export const LoginPage: FC<LoginPageProps> = ({}) => {
  const { data } = useMeQuery({ ssr: false });
  const router = useRouter();
  const alert = useAlert();

  useEffect(() => {
    const query = router.query;
    const error = query.err as string | undefined;
    if (error) {
      alert.triggerAlert(decodeURI(error), "warning", () => {
        router.push("/login");
      });
    }
  }, []);

  if (data && data.me) {
    router.push("/");
    return <></>;
  }

  return (
    <>
      {getHeadForPage({
        description:
          "Login to Instant Auction with Google, Discord & Microsoft!",
        path: "/login",
        title: "Login"
      })}
      <div className="flex justify-center items-center h-70vh min-h-450">
        <div className="flex bg-neutral-100 rounded-lg w-9/12 h-9/10 shadow-2xl">
          <div className="flex flex-col justify-start items-center bg-transparent w-full md:w-5/12 lg:w-2/4 h-full pt-7">
            <h3 className="border-b border-neutral-400 w-10/12 text-center">
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
