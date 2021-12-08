import { Router } from "express";
import passport from "passport";
import { FRONTEND } from "../constants/app";

export const authRouter = Router();

authRouter.get("/auth/twitter", passport.authenticate("twitter"));

authRouter.get(
  "/auth/twitter/callback",
  passport.authenticate("twitter", {
    failureRedirect: `${FRONTEND}/login?err="Failed to login with twitter."`,
    session: false,
  }),
  async (_, res) => {
    // Successful authentication, redirect home.
    res.redirect(`${FRONTEND}`);
  }
);
