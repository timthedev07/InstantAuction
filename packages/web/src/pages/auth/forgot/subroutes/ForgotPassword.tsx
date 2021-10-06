import React, { useRef } from "react";
import { useForgotPasswordMutation } from "../../../../generated/graphql";

export const ForgotPassword: React.FC = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const [requestPasswordReset] = useForgotPasswordMutation();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!emailRef.current) {
      return;
    }

    await requestPasswordReset({
      variables: { email: emailRef.current.value },
    });

    alert("Check your inbox for further instructions.");
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <h2>Reset Password</h2>

        <input placeholder="Email" ref={emailRef} />

        <button type="submit">Send Request</button>
      </form>
    </div>
  );
};
