import { FC, useCallback, useState } from "react";
import { Formik } from "formik";
import { useDropzone } from "react-dropzone";
import {
  createItemModificationOptions,
  useModifyItemMutation
} from "client-controllers";

interface ModifyItemProps {
  id: number;
  name: string;
  picture: string;
}

export const ModifyItem: FC<ModifyItemProps> = ({ name, picture, id }) => {
  const [file, setFile] = useState<any>(null);
  const onDrop = useCallback(
    ([file]) => {
      setFile(Object.assign(file, { preview: URL.createObjectURL(file) }));
    },
    [setFile]
  );
  const [modifyItem] = useModifyItemMutation();

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1
  });

  return (
    <div className="m-6 border-white border rounded p-5">
      <h3>Modify item of id {id}</h3>
      <Formik
        initialValues={{ inputtedName: name }}
        onSubmit={async ({ inputtedName }) => {
          const newName = inputtedName === name ? undefined : inputtedName;
          try {
            await modifyItem(
              createItemModificationOptions({
                itemId: id,
                newName,
                picture: file
              })
            );
          } catch (err) {
            console.log("Error: ", err);
          }
        }}
      >
        {({ values, handleChange, handleSubmit, handleBlur }) => (
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <input
              name="inputtedName"
              className="px-4 py-3 rounded bg-gray-800 bg-opacity-90 border border-gray-50"
              value={values.inputtedName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <br />
            <button onClick={() => setFile(null)}>Revert Picture</button>
            <div {...getRootProps()} className="p-0 h-60 w-60">
              <div className="rounded-lg h-60 w-60 bg-white opacity-0 absolute z-10 transition-all duration-300 hover:opacity-20 hover:cursor-pointer" />
              <img
                className="rounded-lg w-60 h-60 absolute z-0"
                src={file ? file.preview : picture}
              />
              <input accept="image/*" {...getInputProps()} />
            </div>

            <button type="submit">Submit</button>
          </form>
        )}
      </Formik>
    </div>
  );
};
