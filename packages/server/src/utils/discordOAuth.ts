import { FRONTEND } from "shared";
import axios from "axios";
import { DiscordAccessTokenResponse } from "../types/Discord";
import { jsonToUrlParams } from "shared";
import { DiscordUser } from "../modules/discordUser";

const API_ENDPOINT = "https://discord.com/api/v8";
const CLIENT_ID = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID;
const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;

/**
 * Get access token from the discord api with the given code.
 * @param code
 * @param clientSecret
 * @returns Object
 */
export const exchangeCode = async (
  code: string
): Promise<DiscordAccessTokenResponse | null> => {
  if (!CLIENT_ID) {
    throw new Error("Unexpected falsy discord clientId");
  }
  if (!CLIENT_SECRET) {
    throw new Error("Unexpected falsy discord clientSecret");
  }

  try {
    const requestData = {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: "authorization_code",
      code: code,
      redirect_uri: FRONTEND + "/auth/discord",
    };

    const { data } = await axios({
      url: `${API_ENDPOINT}/oauth2/token`,
      method: "post",
      data: jsonToUrlParams(requestData),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return data as DiscordAccessTokenResponse;
  } catch (err) {
    throw new Error("Error getting discord access token.");
  }
};

/**
 * This function is used when the old current access token is expired
 * @param refreshToke
 * @param clientSecret
 * @returns new accessToken
 */
export const refreshToken = async (
  refreshToken: string,
  clientSecret: string
) => {
  const { data } = await axios({
    url: `${API_ENDPOINT}/oauth2/token`,
    method: "post",
    data: jsonToUrlParams({
      client_id: CLIENT_ID,
      client_secret: clientSecret,
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return data as DiscordAccessTokenResponse;
};

export const getDiscordUserInfoWithAccessToken = async (
  accessToken: string
) => {
  const { data } = await axios({
    url: "https://discordapp.com/api/users/@me",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data as DiscordUser;
};

export const getDiscordUserInfo = async (code: string) => {
  try {
    const discordCodeResponse = await exchangeCode(code);
    const accessToken = discordCodeResponse?.access_token;

    if (!accessToken) {
      throw new Error("No Access Token");
    }

    return await getDiscordUserInfoWithAccessToken(accessToken);

  } catch(err) {
    throw err;
  }
};