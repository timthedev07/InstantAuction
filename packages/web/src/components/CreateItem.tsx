import { useCreateItemMutation } from "client-controllers";
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

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (file && name) {
      try {
        const result = await createItem({ variables: { name, picture: file } });
        alert(result.data?.createItem.valueOf());
      } catch(err: any) {
        alert(err.graphQLErrors[0].message)
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-2 rounded p-8">
      <h2 className="text-2xl">Add Item</h2>

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

      <button className="bg-cyan-600 text-white rounded p-4" type="submit">
        Upload
      </button>
    </form>
  );
};
