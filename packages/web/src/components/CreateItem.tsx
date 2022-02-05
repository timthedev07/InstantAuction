import {
  accessErrMessage,
  createItemCreationOptions,
  createItemCreationWithPictureUrlOptions,
  useCreateItemMutation,
  useCreateItemWithPictureUrlMutation
} from "client-controllers";
import { FC, FormEventHandler, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Input, RadioGroup, Radio } from "@chakra-ui/react";
import { HStack, VStack } from "./utils/Stack";
import { useAlert } from "../contexts/AlertContext";
import { useRouter } from "next/router";

export const CreateItem: FC = ({}) => {
  const alert = useAlert();
  const [createItem] = useCreateItemMutation();
  const [createItemWithPicUrl] = useCreateItemWithPictureUrlMutation();
  const [file, setFile] = useState<any>(null);
  const [name, setName] = useState<string>("");
  const { push } = useRouter();
  const onDrop = useCallback(
    ([file]) => {
      setFile(file);
    },
    [setFile]
  );
  const [mode, setMode] = useState<"file" | "url">("url");
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
          alert.triggerAlert(accessErrMessage(err));
        }
      } else {
        alert.triggerAlert("Please make sure all information is provided.");
      }
    } else {
      if (
        picUrl !== "" &&
        picUrl.length < 200 /** && check pic url validity here */
      ) {
        try {
          await createItemWithPicUrl(
            createItemCreationWithPictureUrlOptions({
              name,
              pictureUrl: picUrl
            })
          );
          alert.triggerAlert("Item created", "success", () => {
            push("/me?t=items-owned");
          });
        } catch (err) {
          console.log(accessErrMessage(err));
        }
      } else {
        alert.triggerAlert("Please make sure the picture url is valid.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-2 rounded p-8 m-6">
      <h3>Add Item</h3>

      <VStack className="max-w-[400px] gap-4 mb-4">
        <Input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Item name"
        />
        <RadioGroup onChange={val => setMode(val as any)} value={mode}>
          <HStack className="gap-6">
            <Radio value="url">URL</Radio>
            <Radio value="file">File Upload</Radio>
          </HStack>
        </RadioGroup>
        <div
          {...getRootProps()}
          className={`border-2 rounded p-8 ${
            mode === "file" ? "block" : "hidden"
          }`}
        >
          <h4>{file ? file.path : "Drop your file here"}</h4>
          <input accept="image/*" {...getInputProps()} />
        </div>
        <Input
          placeholder="Image Url"
          value={picUrl}
          onChange={e => setPicUrl(e.target.value)}
          className={mode === "url" ? "block" : "hidden"}
          variant={"outline"}
        />
      </VStack>

      <div className="">{/* preview */}</div>

      <button className="cyan-button" type="submit">
        Add
      </button>
    </form>
  );
};
