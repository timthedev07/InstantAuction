import { FC } from "react";
import { Button } from "@chakra-ui/react";
import { useLogoutMutation, logoutOptions } from "client-controllers";

export const LogoutButton: FC<{ className?: string }> = ({
  className = ""
}) => {
  const [logout] = useLogoutMutation();

  return (
    <Button
      variant={"link"}
      className={className}
      onClick={() => logout(logoutOptions)}
    >
      Logout
    </Button>
  );
};
