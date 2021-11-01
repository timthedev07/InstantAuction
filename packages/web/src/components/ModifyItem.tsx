import { FC, useCallback, useState } from "react";
import { Formik } from "formik";
import { useDropzone } from "react-dropzone";

interface ModifyItemProps {
  id: number;
  name: string;
  picture: string;
}

export const ModifyItem: FC<ModifyItemProps> = ({ name, picture, id }) => {
  const handleChangePicture = () => {};
  const [file, setFile] = useState<any>(null);
  const onDrop = useCallback(
    ([file]) => {
      setFile(Object.assign(file, { preview: URL.createObjectURL(file) }));
    },
    [setFile]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1
  });

  return (
    <div className="m-6 border-white border rounded p-5">
      <h1 className="text-3xl">Modify item of id {id}</h1>
      <Formik
        initialValues={{ name }}
        onSubmit={({ name }) => {
          name;
        }}
      >
        {({ values, handleChange, handleSubmit, handleBlur }) => (
          <form onSubmit={handleSubmit}>
            <input
              name="name"
              value={values.name}
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
                onClick={handleChangePicture}
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