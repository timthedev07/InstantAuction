import { useRef } from "react";
import { Redirect, RouteComponentProps } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { unknownErrMsg } from "../../constants/general";
import { LOGIN_ROUTE } from "src/constants/routes";
import { useMeQuery } from "src/generated/graphql";

const EMAIL_VALIDATION_REGEX =
  // eslint-disable-next-line
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const validateEmail = (email: string) => {
  return EMAIL_VALIDATION_REGEX.test(email);
};

export const Register: React.FC<RouteComponentProps> = ({ history }) => {
  const { register } = useAuth()!;

  const emRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);
  const { data } = useMeQuery();

  if (data && data.me) {
    return <Redirect to="/account" />;
  }

  async function handleSubmit(event: any) {
    event.preventDefault();

    if (!emRef.current || !pwRef.current) return;

    const email = emRef.current.value;
    const password = pwRef.current.value;

    if (email.length < 1 || password.length < 1) {
      alert("Please make sure all fields are filled out");
      return;
    }

    if (password.length < 8) {
      alert("A password is required to be longer than 7 characters");
      return;
    }

    if (!validateEmail(email)) {
      alert("Invalid email");
      return;
    }

    try {
      const data = await register(email, password);

      if (data?.register) {
        history.push("/auth/confirm");
        return;
      }

      alert(unknownErrMsg);
    } catch (err: any) {
      alert(err.message);
    }
  }

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input placeholder="Email" ref={emRef} />
        <input placeholder="Password" type="password" ref={pwRef} />
        <button type="submit">Sign up</button>
      </form>
      <div>
        Or <a href={LOGIN_ROUTE}>Login</a>
      </div>
    </div>
  );
};
