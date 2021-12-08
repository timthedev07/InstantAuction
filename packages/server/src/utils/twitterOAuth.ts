export const getTwitterB64BearerToken = () => {
  const consumerKey = process.env.TWITTER_CONSUMER_KEY;
  const consumerSecret = process.env.TWITTER_CONSUMER_SECRET;

  if (!consumerKey) {
    console.error("No Twitter Consumer Key Was Provided");
    process.exit(1);
  }

  if (!consumerSecret) {
    console.error("No Twitter Consumer Secret Was Provided");
    process.exit(1);
  }

  return Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");
};
