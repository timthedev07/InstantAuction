import { useTestUploadLazyQuery } from "client-controllers";
import { FC, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export const UploadImage: FC = ({}) => {
  const [uploadFile] = useTestUploadLazyQuery();
  const [file, setFile] = useState<any>(null);
  const onDrop = useCallback(
    ([file]) => {
      setFile(file);
    },
    [setFile]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop
  });

  const handleUpload = () => {
    if (file) {
      uploadFile({ variables: { file: file } });
      alert("Upload request sent...");
    }
  };

  return (
    <div className="border-2 rounded p-8">
      <h2 className="text-2xl">Upload image</h2>
      <div {...getRootProps()} className="border-2 rounded p-8">
        <h3>{file ? file.path : "Drop your file here"}</h3>
        <input accept="image/*" {...getInputProps()} />
      </div>
      <button
        className="bg-cyan-600 text-white rounded p-4"
        onClick={handleUpload}
      >
        Upload
      </button>
    </div>
  );
};
