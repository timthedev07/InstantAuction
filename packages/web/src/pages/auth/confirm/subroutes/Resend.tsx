import React, { useRef } from "react";
import { useResendConfEmailMutation } from "../../../../generated/graphql";

interface ResendConfEmailProps {}

export const Resend: React.FC<ResendConfEmailProps> = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const [resend] = useResendConfEmailMutation();

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        if (!emailRef.current) {
          return;
        }
        await resend({
          variables: { email: emailRef.current.value },
        });

        alert("Check your inbox for further instructions");
      }}
    >
      <h2>Resend confirmation email</h2>

      <div>
        <input placeholder="Your Email" ref={emailRef} />
        <button type="submit">Resend</button>
      </div>
    </form>
  );
};
