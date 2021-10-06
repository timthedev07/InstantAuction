export const production = process.env.NODE_ENV === "production";

export const FRONTEND = production
  ? "https://typeorm-react-auth-boilerplate.netlify.app" // change this line
  : "http://localhost:3000";
export const PLAYGROUND = "https://studio.apollographql.com";
export const PORT = parseInt(process.env.PORT || "9000");
export const HOSTNAME = production ? "0.0.0.0" : "localhost";
