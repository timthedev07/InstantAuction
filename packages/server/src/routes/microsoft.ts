import { ConfidentialClientApplication } from "@azure/msal-node";
import { Router } from "express";
import fetch from "node-fetch";
import { config } from "../constants/azureApp";
import { User } from "../entity/User";
import { uploadToImgur } from "../utils/uploadToImgur";
import { promises } from "fs";
import { tmpdir } from "os";
import { join } from "path";

export const msRouter = Router();

const cca = new ConfidentialClientApplication(config);
const redirectUri = "http://localhost:4000/microsoft/redirect";

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

msRouter.get("/redirect", (req, res) => {
  const tokenRequest = {
    code: req.query.code as string,
    scopes: ["user.read"],
    redirectUri,
  };

  cca
    .acquireTokenByCode(tokenRequest)
    .then(async response => {
      const email = response.account.username;
      const username = response.account.name;
      const externalId = response.account.localAccountId;

      const asdf = await fetch(
        "https://graph.microsoft.com/v1.0/me/photo/$value",
        {
          headers: {
            Authorization: "Bearer " + response.accessToken,
            "Content-Type": "image/jpg",
          },
        }
      );
      const picData = await asdf.buffer();
      let avatarUrl: string;
      if (asdf.ok) {
        // there is a profile image
        const tempdir = tmpdir();
        const imageBufferPath = join(tempdir, "ms-user-profile-pick.jpg");
        await promises.writeFile(imageBufferPath, picData);
        avatarUrl = await uploadToImgur(imageBufferPath);
      } else {
        avatarUrl =
          "https://raw.githubusercontent.com/timthedev07/InstantAuction-ExternalAsset/staging/IA-user.png";
      }

      let user = await User.findOne({ where: { email } });
      // if there's not a user with this email
      if (!user) {
        // sign up
        User.insert({
          email,
          username,
          externalId,
          avatarUrl,
        });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).send(error);
    });
});
