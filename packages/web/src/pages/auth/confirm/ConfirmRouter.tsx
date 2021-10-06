import React from "react";
import { Redirect, useParams } from "react-router";
import { Confirmation } from "./subroutes/Confirmation";
import { Resend } from "./subroutes/Resend";
import { useMeQuery } from "../../../generated/graphql";

export interface ConfirmationRouteParams {
  token?: string;
}

export const ConfirmRouter: React.FC = () => {
  const params = useParams<ConfirmationRouteParams>();
  const { data } = useMeQuery();

  if (data && data?.me) {
    return <Redirect to="/account" />;
  }

  const token = params.token;

  if (!token) {
    return (
      <div>
        confirm your email or try again <a href="/auth/confirm/resend">here</a>
      </div>
    );
  }

  if (token === "resend") {
    return <Resend />;
  }

  return <Confirmation token={token!} />;
};
