import { FC } from "react";
import {
  createDeleteAccountOptions,
  useDeleteAccountMutation,
  useMeQuery
} from "client-controllers";

export const DeleteAccountButton: FC = () => {
  const [deleteAccount] = useDeleteAccountMutation();
  const { data, loading, error } = useMeQuery();

  return (
    <button
      className="border rounded p-2 px-4 text-center"
      onClick={() => {
        if (!loading && !error && data && data.me) {
          deleteAccount(
            createDeleteAccountOptions({
              email: data.me.email
            })
          );
        }
      }}
    >
      Delete account
    </button>
  );
};
