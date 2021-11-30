import {
  createItemCreationOptions,
  useCreateItemMutation
} from "client-controllers";
import { FC, FormEventHandler, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export const CreateItem: FC = ({}) => {
  const [createItem] = useCreateItemMutation();
  const [file, setFile] = useState<any>(null);
  const [name, setName] = useState<string>("");
  const onDrop = useCallback(
    ([file]) => {
      setFile(file);
    },
    [setFile]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault();
    if (file && name) {
      try {
        await createItem(createItemCreationOptions({ name, picture: file }));
      } catch (err) {
        alert((err as any).graphQLErrors[0].message);
      }
    } else {
      alert("Please make sure all information is provided.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-2 rounded p-8">
      <h2>Add Item</h2>

      <input
        placeholder="Item Name"
        value={name}
        onChange={e => setName(e.target.value)}
        className="bg-gray-500"
      />

      <div {...getRootProps()} className="border-2 rounded p-8">
        <h3>{file ? file.path : "Drop your file here"}</h3>
        <input accept="image/*" {...getInputProps()} />
      </div>

      <button className="cyan-button" type="submit">
        Add
      </button>
    </form>
  );
};
