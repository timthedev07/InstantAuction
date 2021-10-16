import { FC } from "react";
import {
  createDeleteAccountOptions,
  useDeleteAccountMutation,
} from "client-controllers";

export const DeleteAccountButton: FC = () => {
  const [deleteAccount] = useDeleteAccountMutation();

  return (
    <button
      className="border rounded p-2 px-4 text-center"
      onClick={() =>
        deleteAccount(
          createDeleteAccountOptions({
            email: "bot.rem.autogenerate@gmail.com",
          })
        )
      }
    >
      Delete account
    </button>
  );
};
