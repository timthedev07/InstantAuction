import { FRONTEND } from "../constants/app";
import { DiscordAccessTokenResponse } from "../types/Discord";
import { jsonToUrlParams } from "../utils/jsonToUrlParams";
import { DiscordUser } from "../modules/discordUser";
import fetch from "node-fetch";

const API_ENDPOINT = "https://discord.com/api/v8";
const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
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

    const response = await fetch(`${API_ENDPOINT}/oauth2/token`, {
      method: "post",
      body: jsonToUrlParams(requestData),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const data = await response.json();
    console.log(data);
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
  const response = await fetch(`${API_ENDPOINT}/oauth2/token`, {
    method: "post",
    body: jsonToUrlParams({
      client_id: CLIENT_ID,
      client_secret: clientSecret,
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return (await response.json()) as DiscordAccessTokenResponse;
};

export const getDiscordUserInfoWithAccessToken = async (
  accessToken: string
) => {
  const response = await fetch("https://discordapp.com/api/users/@me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return (await response.json()) as DiscordUser;
};

export const getDiscordUserInfo = async (code: string) => {
  try {
    const discordCodeResponse = await exchangeCode(code);
    const accessToken = discordCodeResponse?.access_token;

    if (!accessToken) {
      throw new Error("No Access Token");
    }

    return await getDiscordUserInfoWithAccessToken(accessToken);
  } catch (err) {
    throw err;
  }
};
