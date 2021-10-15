import { stringify } from "query-string";
import { FRONTEND } from "../constants/servers";

export const getGoogleAuthUrl = (clientId: string | undefined | null) => {
  if (!clientId) {
    throw new Error("Falsy value provided for `clientId`");
  }
  const params = stringify({
    client_id: clientId,
    redirect_uri: `${FRONTEND}/auth/google`,
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ].join(" "),
    response_type: "code",
    access_type: "offline",
    prompt: "consent",
  });
  return `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
};
