import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import {
  useValidTmpTokenMutation,
  useResetPasswordMutation,
} from "../../../../generated/graphql";
import { Loading } from "../../../../components/Loading";
import { LOGIN_ROUTE } from "src/constants/routes";

interface ForgotPasswordProps {
  token: string;
}

export const ResetPassword: React.FC<ForgotPasswordProps> = ({ token }) => {
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(true);
  const [validToken, setValidToken] = useState<boolean>(false);

  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmationRef = useRef<HTMLInputElement>(null);

  const [verifyToken] = useValidTmpTokenMutation();
  const [resetPassword] = useResetPasswordMutation();

  useEffect(() => {
    const isTokenValid = async () => {
      setLoading(true);
      const res = await verifyToken({ variables: { token } });

      if (res.data && res.data.validTmpToken) {
        setValidToken(true);
        return;
      }

      setValidToken(false);
    };

    isTokenValid();
    setLoading(false);
  }, [token, verifyToken]);

  const handleSubmit = async () => {
    if (!passwordRef.current || !confirmationRef.current) {
      return;
    }

    const password = passwordRef.current.value;
    const confirmation = confirmationRef.current.value;

    // check for empty fields
    if (!password.length || !confirmation.length) {
      alert("Make sure all fields are filled out");
      return;
    }

    if (password.length < 8) {
      alert("A password is required to be longer than 7 characters");
      return;
    }

    if (password !== confirmation) {
      alert("Passwords don't match");
      return;
    }

    try {
      const { data } = await resetPassword({
        variables: { token, confirmation: confirmation, newPassword: password },
      });
      if (data && data.resetPassword) {
        history.push(LOGIN_ROUTE);
      }
    } catch (err) {
      history.push(LOGIN_ROUTE);
    }
  };

  return !loading ? (
    <div className="email-confirmation">
      <div className="email-confirmation-card">
        {validToken ? (
          <>
            <h2 style={{ width: "100%" }}>Reset Your Password</h2>
            <input
              className="rounded-input emphasized margin-20"
              placeholder="New Password"
              ref={passwordRef}
              type="password"
            />
            <input
              className="rounded-input emphasized margin-20"
              placeholder="Confirm Your Password"
              ref={confirmationRef}
              type="password"
            />
            <br />
            <button
              className="rounded-btn emphasized"
              onClick={() => handleSubmit()}
              style={{ margin: "40px" }}
            >
              Reset Your Password
            </button>
          </>
        ) : (
          <>
            <h2>Invalid Token</h2>
          </>
        )}
      </div>
    </div>
  ) : (
    <Loading />
  );
};
