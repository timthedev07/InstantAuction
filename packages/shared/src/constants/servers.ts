export const FRONTEND =
  process.env.NODE_ENV === "production"
    ? "https://instantauction.vercel.app"
    : "http://localhost:3000";
export const PLAYGROUND = "https://studio.apollographql.com";
export const BACKEND =
  process.env.NODE_ENV === "production"
    ? "https://instantauction.herokuapp.com"
    : "http://localhost:4000";
