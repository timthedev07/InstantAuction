import { NextPage } from "next";
import {
  useHelloQuery,
  useGetProfileQuery,
  useLogoutLazyQuery,
} from "client-controllers";
import { OAuthButton } from "../components/OAuthButton";
import { getDiscordAuthUrl, getGoogleAuthUrl } from "shared";

const Landing: NextPage = () => {
  const { data: testData, loading: testLoading } = useHelloQuery();
  const { data, loading, error } = useGetProfileQuery();
  const [logout] = useLogoutLazyQuery();
  return (
    <>
      <h1 className="text-3xl">
        {testLoading ? "Loading..." : testData?.hello || "No data returned"}
      </h1>
      <pre>
        {loading
          ? "loading..."
          : error
          ? JSON.stringify(error, null, 2)
          : JSON.stringify(data, null, 2)}
      </pre>
      <button onClick={() => logout()}>Logout</button>
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
