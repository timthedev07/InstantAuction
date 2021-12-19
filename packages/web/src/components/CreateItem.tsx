import {
  createItemCreationOptions,
  createItemCreationWithPictureUrlOptions,
  useCreateItemMutation,
  useCreateItemWithPictureUrlMutation
} from "client-controllers";
import { FC, FormEventHandler, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from "@mui/material";
import { VStack } from "./utils/Stack";

export const CreateItem: FC = ({}) => {
  const [createItem] = useCreateItemMutation();
  const [createItemWithPicUrl] = useCreateItemWithPictureUrlMutation();
  const [file, setFile] = useState<any>(null);
  const [name, setName] = useState<string>("");
  const onDrop = useCallback(
    ([file]) => {
      setFile(file);
    },
    [setFile]
  );
  const [mode, setMode] = useState<"file" | "url">("file");
  const [picUrl, setPicUrl] = useState<string>("");

  const { getRootProps, getInputProps } = useDropzone({
    onDrop
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault();
    if (mode === "file") {
      if (file && name) {
        try {
          await createItem(createItemCreationOptions({ name, picture: file }));
        } catch (err) {
          alert((err as any).graphQLErrors[0].message);
        }
      } else {
        alert("Please make sure all information is provided.");
      }
    } else {
      if (picUrl !== "" /** && check pic url validity here */) {
        try {
          const res = await createItemWithPicUrl(
            createItemCreationWithPictureUrlOptions({
              name,
              pictureUrl: picUrl
            })
          );
        } catch (err) {
          console.log(err);
        }
      } else {
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-2 rounded p-8">
      <h3>Add Item</h3>

      <VStack className="max-w-[400px] gap-4 mb-4">
        <TextField
          value={name}
          onChange={e => setName(e.target.value)}
          label="Item name"
        />
        <FormControl variant="filled">
          <InputLabel>Image Format</InputLabel>
          <Select
            id="demo-simple-select"
            value={mode}
            label="Image Format"
            onChange={e => {
              setMode(e.target.value as any);
            }}
          >
            <MenuItem value="url">URL</MenuItem>
            <MenuItem value="file">File Upload</MenuItem>
          </Select>
        </FormControl>

        <div
          {...getRootProps()}
          className={`border-2 rounded p-8 ${
            mode === "file" ? "block" : "hidden"
          }`}
        >
          <h4>{file ? file.path : "Drop your file here"}</h4>
          <input accept="image/*" {...getInputProps()} />
        </div>
        <TextField
          label="Image Url"
          value={picUrl}
          onChange={e => setPicUrl(e.target.value)}
          className={mode === "url" ? "block" : "hidden"}
          variant="filled"
        />
      </VStack>

      <div className="">{/* preview */}</div>

      <button className="cyan-button" type="submit">
        Add
      </button>
    </form>
  );
};
