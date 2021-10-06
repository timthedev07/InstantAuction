/* development urls */
export const BACKEND =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:4000"
    : "https://authauthauth.herokuapp.com"; // replace this URL with your production API
