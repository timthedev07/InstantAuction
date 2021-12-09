import { ConfidentialClientApplication } from "@azure/msal-node";
import { Router } from "express";
import { config } from "../constants/azureApp";

export const msRouter = Router();

export const cca = new ConfidentialClientApplication(config);
export const redirectUri = "http://localhost:3000/auth/microsoft";

msRouter.get("/", (_, res) => {
  const authCodeUrlParameters = {
    scopes: ["user.read"],
    redirectUri,
  };

  // get url to sign user in and consent to scopes needed for application
  cca
    .getAuthCodeUrl(authCodeUrlParameters)
    .then(response => {
      res.redirect(response);
    })
    .catch(error => console.log(JSON.stringify(error)));
});
