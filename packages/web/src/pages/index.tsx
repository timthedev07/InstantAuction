import { NextPage } from "next";
import {
  useHelloQuery,
  useMeQuery,
  useLogoutMutation,
  logoutOptions,
} from "client-controllers";
import { OAuthButton } from "../components/OAuthButton";
import { getDiscordAuthUrl, getGoogleAuthUrl } from "shared";

const Landing: NextPage = () => {
  const { data: testData, loading: testLoading } = useHelloQuery();
  const { data, loading, error } = useMeQuery();
  const [logout] = useLogoutMutation();
  return (
    <>
      <h1 className="text-3xl">
        {testLoading ? "Loading..." : testData?.hello || "No data returned"}
      </h1>
      <pre>
        {loading
          ? "loading..."
          : error
          ? JSON.stringify(error.message, null, 2)
          : JSON.stringify(data, null, 2)}
      </pre>
      <button onClick={() => logout(logoutOptions)}>Logout</button>
      <OAuthButton
        provider="google"
        href={getGoogleAuthUrl(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID)}
      />
      <OAuthButton
        provider="discord"
        href={getDiscordAuthUrl(process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID)}
      />
    </>
  );
};

export default Landing;
