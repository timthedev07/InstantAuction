import { FRONTEND } from "../constants/app";
import { GoogleUser } from "../modules/googleUser";
import fetch from "node-fetch";

const getAccessTokenFromCode = async (code: string) => {
  try {
    const response = await fetch(`https://oauth2.googleapis.com/token`, {
      method: "post",
      body: JSON.stringify({
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET || "",
        redirect_uri: `${FRONTEND}/auth/google`,
        grant_type: "authorization_code",
        code,
      }),
    });

    return ((await response.json()) as any)?.access_token || "";
  } catch (err) {
    console.log(
      "something unexpected happened at function getAccessTokenFromCode"
    );
    return "";
  }
};

export const getGoogleUserInfo = async (code: string): Promise<GoogleUser> => {
  const accessToken: string = await getAccessTokenFromCode(code);

  try {
    const response = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        method: "get",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return (await response.json()) as GoogleUser;
  } catch (err) {
    console.log("something unexpected happened at function getGoogleUserInfo");
    throw new Error("Error getting Google user info.");
  }
};
