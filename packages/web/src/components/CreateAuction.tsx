import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea
} from "@chakra-ui/react";
import {
  accessErrMessage,
  createAuctionCreationOptions,
  useCreateAuctionMutation
} from "client-controllers";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { FC } from "react";
import { useAlert } from "../contexts/AlertContext";
import { clearValuesOnUndefined } from "../utils/processFormikValidatorReturn";
import { ItemsSelect } from "./ItemsSelect";
import { ItemUploadRedirectButton } from "./ItemUploadRedirectButton";

export const CreateAuction: FC = ({}) => {
  const [createAuction] = useCreateAuctionMutation();
  const router = useRouter();
  const { triggerAlert } = useAlert();
  const formik = useFormik({
    initialValues: { title: "", description: "", itemId: "-1" },
    validate: ({ description, title, itemId }) => {
      const returned = {
        itemId:
          !itemId || itemId === "-1"
            ? "Please select an item to sell."
            : undefined,
        description: !description
          ? "Please provide a description"
          : description.length > 400
          ? "Must be within 400 characters"
          : undefined,
        title: !title
          ? "Please provide a title for the auction"
          : title.length > 100
          ? "Must be within 100 characters"
          : undefined
      };
      return clearValuesOnUndefined(returned);
    },
    onSubmit: async ({ title, description, itemId }) => {
      const itemIdNum = parseInt(itemId);

      try {
        const result = await createAuction(
          createAuctionCreationOptions({
            description,
            title,
            itemId: itemIdNum
          })
        );

        if (!result || !result.data || !result.data.createAuction) {
          triggerAlert("Something unexpected happened.");
        }

        triggerAlert("Auction created!", "success", () => {
          router.push(`/auctions/${result.data!.createAuction.id}`);
        });
      } catch (err) {
        triggerAlert(accessErrMessage(err));
      }
    }
  });

  return (
    <div className="m-6 border rounded p-5">
      <h3>Create Auction</h3>

      <form className="flex flex-col gap-3 m-3" onSubmit={formik.handleSubmit}>
        <FormControl isRequired isInvalid={!!formik.errors.title}>
          <FormLabel as="legend" htmlFor="title-input">
            Auction Title
          </FormLabel>
          <Input
            onChange={formik.handleChange}
            value={formik.values.title}
            id="title-input"
            name="title"
            onBlur={formik.handleBlur}
          />
          <FormErrorMessage>{formik.errors.title}</FormErrorMessage>
        </FormControl>

        <ItemsSelect
          isRequired
          isInvalid={!!formik.errors.itemId}
          name="itemId"
          value={formik.values.itemId}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        <div className="w-full">
          <ItemUploadRedirectButton />
        </div>

        <FormControl isRequired isInvalid={!!formik.errors.description}>
          <FormLabel htmlFor="description-textarea" as="legend">
            Auction Description
          </FormLabel>
          <Textarea
            value={formik.values.description}
            onChange={formik.handleChange}
            name="description"
            onBlur={formik.handleBlur}
          />
          <FormErrorMessage name="description">
            {formik.errors.description}
          </FormErrorMessage>
        </FormControl>

        <button className="cyan-button max-w-[100px]" type="submit">
          Create
        </button>
      </form>
    </div>
  );
};
