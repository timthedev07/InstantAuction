import React from "react";
import { setAccessToken } from "src/accessToken";
import {
  MeDocument,
  MeQuery,
  useLogoutMutation,
  useMeQuery,
} from "src/generated/graphql";

export const Account: React.FC = () => {
  const [logout, { client }] = useLogoutMutation();
  const { data, loading } = useMeQuery();

  const handleLogout = async () => {
    await logout();
    setAccessToken("");
    client!.writeQuery<MeQuery>({
      query: MeDocument,
      data: {
        me: null,
      },
    });
  };

  return (
    <div id="account-page">
      <button onClick={() => handleLogout()}>Logout</button>
      {loading ? "loading" : JSON.stringify(data?.me || "Not Logged In")}
    </div>
  );
};
