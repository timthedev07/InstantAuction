import React from "react";
import {
  FORGOT_PASSWORD_ROUTE,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  CONFIRM_EMAIL_ROUTE,
} from "src/constants/routes";

// Responsive Navigation Bar
export const Nav: React.FC = () => {
  return (
    <div style={{ width: "100%", minHeight: "200px", height: "auto" }}>
      <h3>Routes:</h3>
      <ul style={{ listStyle: "none" }}>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href={REGISTER_ROUTE}>Register</a>
        </li>
        <li>
          <a href={LOGIN_ROUTE}>Login</a>
        </li>
        <li>
          <a href={FORGOT_PASSWORD_ROUTE}>Forgot Password</a>
        </li>
        <li>
          <a href={CONFIRM_EMAIL_ROUTE}>Confirm email</a>
        </li>
        <li>
          <a href="/account">Account</a>
        </li>
      </ul>
    </div>
  );
};
