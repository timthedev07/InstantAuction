import { FRONTEND } from "shared";
import { GoogleUser } from "../modules/googleUser";

const getAccessTokenFromCode = async (code: string) => {
  try {
    const { json } = await fetch(`https://oauth2.googleapis.com/token`, {
      method: "post",
      body: JSON.stringify({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET || "",
        redirect_uri: `${FRONTEND}/auth/google`,
        grant_type: "authorization_code",
        code,
      }),
    });

    return (await json() as any)?.access_token || "";
  } catch (err) {
    console.log("something unexpected happened at function getAccessTokenFromCode")
    return "";
  }
};

export const getGoogleUserInfo = async (code: string): Promise<GoogleUser> => {
  const accessToken: string = await getAccessTokenFromCode(code);

  try {
    const { json } = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      method: "get",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return (await json()) as GoogleUser;
  } catch (err) {
    console.log("something unexpected happened at function getGoogleUserInfo")
    throw new Error("Error getting Google user info.")
  }
};
