import { NextPage } from "next";
import {
  useGetUserItemsQuery,
  useHelloQuery,
  useMeQuery,
} from "client-controllers";
import { OAuthButton } from "../components/OAuthButton";
import { getDiscordAuthUrl, getGoogleAuthUrl } from "shared";
import { CreateItem } from "../components/CreateItem";
import { ItemsList } from "../components/ItemsList";
import { ModifyItem } from "../components/ModifyItem";

const Landing: NextPage = () => {
  const { data: testData, loading: testLoading } = useHelloQuery();
  const { data, loading, error } = useMeQuery();
  const {
    data: itemsData,
    loading: itemsLoading,
    error: itemsError,
  } = useGetUserItemsQuery();

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
      <OAuthButton
        provider="google"
        href={getGoogleAuthUrl(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID)}
      />
      <OAuthButton
        provider="discord"
        href={getDiscordAuthUrl(process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID)}
      />

      <CreateItem />
      <ItemsList />
      {!itemsLoading && !itemsError && itemsData && (
        <ModifyItem {...itemsData.getUserItems.items[0]} />
      )}
    </>
  );
};

export default Landing;
