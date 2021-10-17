import {
  createUpdateCredentialsOptions,
  useUpdateCredentialsMutation
} from "client-controllers";
import { FC, useState } from "react";

export const UpdateUserCredentials: FC = ({}) => {
  const [updateCredentials] = useUpdateCredentialsMutation();
  const [inputUsername, setInputUsername] = useState<string>("");

  const handleSubmit = () => {
    (async () => {
      const result = await updateCredentials(
        createUpdateCredentialsOptions({ username: inputUsername })
      );

      console.log(result);
    })();
  };

  return (
    <fieldset className="border border-white rounded p-4">
      <legend className="text-xl">Change username</legend>
      <input
        className="border rounded p-2 px-4 text-center text-black"
        placeholder="New Username"
        value={inputUsername}
        onChange={e => setInputUsername(e.target.value)}
      />
      <button
        className="border rounded p-2 px-4 text-center"
        onClick={handleSubmit}
      >
        Update
      </button>
    </fieldset>
  );
};
