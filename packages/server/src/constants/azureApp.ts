import { LogLevel, Configuration } from "@azure/msal-node";

export const config: Configuration = {
  auth: {
    clientId: process.env.AZURE_CLIENT_ID,
    authority: "https://login.microsoftonline.com/common",
    clientSecret: process.env.AZURE_CLIENT_SECRET,
  },
  system: {
    loggerOptions: {
      loggerCallback(_, message, __) {
        console.log(message);
      },
      piiLoggingEnabled: false,
      logLevel: LogLevel.Error,
    },
  },
};
