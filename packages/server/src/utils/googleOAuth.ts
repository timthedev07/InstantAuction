import { FRONTEND } from "shared";
import axios from "axios";
import { GoogleUser } from "../modules/googleUser";

const getAccessTokenFromCode = async (code: string) => {
  try {
    const { data } = await axios({
      url: `https://oauth2.googleapis.com/token`,
      method: "post",
      data: {
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET || "",
        redirect_uri: `${FRONTEND}/auth/oauth/google`,
        grant_type: "authorization_code",
        code,
      },
    });

    return (data as any)?.access_token || "";
  } catch (err) {
    return "";
  }
};

export const getGoogleUserInfo = async (code: string): Promise<GoogleUser | {}> => {
  const accessToken: string = await getAccessTokenFromCode(code);

  try {
    const { data } = await axios({
      url: "https://www.googleapis.com/oauth2/v2/userinfo",
      method: "get",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data as GoogleUser;
  } catch (err) {
    return {};
  }
};
