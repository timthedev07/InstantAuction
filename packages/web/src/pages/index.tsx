import { NextPage } from "next";
import { useHelloQuery, useMeQuery } from "client-controllers";
import { OAuthButton } from "../components/OAuthButton";
import { getDiscordAuthUrl, getGoogleAuthUrl } from "shared";
import { CreateAuction } from "../components/CreateAuction";
import { AllAuctions } from "../components/AllAuctions";

const Landing: NextPage = () => {
  const { data: testData, loading: testLoading } = useHelloQuery();
  const { data, loading, error } = useMeQuery();

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
          : JSON.stringify(data!.me!.email, null, 2)}
      </pre>
      <OAuthButton
        provider="google"
        href={getGoogleAuthUrl(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID)}
      />
      <OAuthButton
        provider="discord"
        href={getDiscordAuthUrl(process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID)}
      />
      <CreateAuction />
      <AllAuctions />
    </>
  );
};

export default Landing;
