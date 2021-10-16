import { FC } from "react";
import { useLogoutMutation, logoutOptions } from "client-controllers";

export const LogoutButton: FC = ({}) => {
  const [logout] = useLogoutMutation();

  return (
    <button
      className="border rounded p-2 px-4 text-center"
      onClick={() => logout(logoutOptions)}
    >
      Logout
    </button>
  );
};
