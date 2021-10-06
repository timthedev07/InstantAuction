import React from "react";
import { useParams } from "react-router";
import { ForgotPassword } from "./subroutes/ForgotPassword";
import { ResetPassword } from "./subroutes/ResetPassword";

export interface ForgotRouteParams {
  token?: string;
}

export const Forgot: React.FC = () => {
  const params = useParams<ForgotRouteParams>();

  const token = params.token;

  if (!token) {
    return <ForgotPassword />;
  }

  return <ResetPassword token={token!} />;
};
