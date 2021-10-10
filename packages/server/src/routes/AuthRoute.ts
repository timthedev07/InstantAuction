import express from "express";
import { verify } from "jsonwebtoken";
import {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
} from "../utils/AuthHelper";
import { User } from "../entity/User";

export const router = express.Router();

router.post("/refresh_token", async (req, res) => {
  const token = req.cookies.jimrayd;

  if (!token) {
    return res.send({ ok: false, accessToken: "" });
  }

  let payload: any = null;

  try {
    payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
  } catch (err) {
    console.error(err);
    return res.send({ ok: false, accessToken: "" });
  }
  // token is valid and we can send back an access token
  const user = await User.findOne({ id: payload.userId });

  // last check, if no such user
  if (!user) {
    return res.send({ ok: false, accessToken: "" });
  }

  if (user.tokenVersion !== payload.tokenVersion) {
    return res.send({ ok: false, accessToken: "" });
  }

  sendRefreshToken(res, createRefreshToken(user));

  const newAccessToken = createAccessToken(user);
  return res.send({ ok: true, accessToken: newAccessToken });
});
