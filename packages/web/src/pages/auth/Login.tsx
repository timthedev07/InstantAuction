import React, { useRef } from "react";
import { Redirect, RouteComponentProps } from "react-router-dom";
import { setAccessToken } from "../../accessToken";
import { useAuth } from "../../contexts/AuthContext";
import { unknownErrMsg } from "../../constants/general";
import { REGISTER_ROUTE } from "src/constants/routes";
import { useMeQuery } from "src/generated/graphql";

export const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const emRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);
  const { data } = useMeQuery();
  const { login } = useAuth()!;

  if (data && data.me) {
    return <Redirect to="/account" />;
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!emRef.current || !pwRef.current) return;

    const email = emRef.current.value;
    const password = pwRef.current.value;

    try {
      const data = await login(email, password);

      if (data?.login) {
        setAccessToken(data.login.accessToken);
        history.push("/account");
        return;
      }

      alert(unknownErrMsg);
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input placeholder="Email" ref={emRef} />
        <input placeholder="Password" type="password" ref={pwRef} />
        <button type="submit">Sign in</button>
      </form>
      <div>
        Or <a href={REGISTER_ROUTE}>register</a>
      </div>
    </div>
  );
};
