import { stringify } from "query-string";

export const getGoogleAuthUrl = (clientId: string) => {
  const params = stringify({
    client_id: clientId,
    redirect_uri: "https://www.example.com/authenticate/google",
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
