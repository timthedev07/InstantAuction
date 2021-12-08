import { randomBytes, createHmac } from "crypto";
import fetch from "node-fetch";

export const getTwitterUserEmail = async (token: string) => {
  token;
  const requestURL =
    "https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true";
  const authorizationValues: Record<string, string> = {
    oauth_token: process.env.TWITTER_ACCESS_TOKEN,
    oauth_consumer_key: process.env.TWITTER_CONSUMER_KEY,
    oauth_signature_method: "HMAC-SHA1",
    oauth_version: "1.0",
    oauth_timestamp: `${Math.ceil(Date.now() / 1000)}`,
    oauth_nonce: randomBytes(32)
      .toString("base64")
      .replace(/[^a-zA-Z_]/gi, ""),
  };

  // 1. Percent encode every key and value that will be signed
  const percentCoded: Record<string, string> = {};
  for (const key in authorizationValues) {
    percentCoded[encodeURIComponent(key)] = encodeURIComponent(
      authorizationValues[key]
    );
  }

  // 2. Sort the list of parameters alphabetically [1] by encoded key [2].
  const sortedKeys = Object.keys(percentCoded).sort();
  const sorted: Record<string, string> = {};
  for (const key of sortedKeys) {
    sorted[key] = percentCoded[key];
  }

  // 3. For each key/value pair:
  let paramsString = "OAuth ";
  for (const key of sortedKeys) {
    const val = sorted[key];
    // 4. Append the encoded key to the output string.
    // 5. Append the ‘=’ character to the output string.
    // 6. Append the encoded value to the output string.
    paramsString += `${key}=${val}`;

    // 7. If there are more key/value pairs remaining, append a ‘&’ character to the output string.
    if (key !== sortedKeys.at(-1)) {
      paramsString += "&";
    }
  }

  const outputString =
    "GET&" +
    `${encodeURIComponent(requestURL)}&` +
    encodeURIComponent(paramsString);
  const signingKey = getSigningKey();
  const signature = createHmac("sha1", signingKey)
    .update(outputString)
    .digest()
    .toString("base64");
  authorizationValues["oauth_signature"] = signature;

  let authHeaderStr = "";
  for (const key in authorizationValues) {
    authHeaderStr += `${key}="${authorizationValues[key]}",`;
  }
  console.log(authorizationValues);

  const response = await fetch(requestURL, {
    headers: {
      Authorization: authHeaderStr,
    },
  });

  const resultData = await response.json();

  console.log({ resultData });
  console.log(resultData.errors[0]);

  return resultData.email as string;
};
const getSigningKey = () => {
  return `${encodeURIComponent(
    process.env.TWITTER_CONSUMER_SECRET
  )}&${encodeURIComponent(process.env.TWITTER_ACCESS_TOKEN_SECRET)}`;
};
