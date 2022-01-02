import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Textarea
} from "@chakra-ui/react";
import {
  accessErrMessage,
  createAuctionCreationOptions,
  useCreateAuctionMutation,
  useItemsOwnedQuery
} from "client-controllers";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { FC } from "react";
import { useAlert } from "../contexts/AlertContext";
import { clearValuesOnUndefined } from "../utils/processFormikValidatorReturn";

export const CreateAuction: FC = ({}) => {
  const [createAuction] = useCreateAuctionMutation();
  const { data } = useItemsOwnedQuery({
    variables: { excludeAuctionedOff: true }
  });
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

        <FormControl isRequired isInvalid={!!formik.errors.itemId}>
          <FormLabel as="legend" htmlFor={"item-id-select"}>
            Item
          </FormLabel>
          <Select
            value={formik.values.itemId}
            onChange={formik.handleChange}
            id="item-id-select"
            name="itemId"
            onBlur={formik.handleBlur}
          >
            <option disabled value="-1">
              -Select Item-
            </option>
            {data &&
              data.itemsOwned.items.map(each => (
                <option key={each.name} value={each.id}>
                  {each.name}
                </option>
              ))}
          </Select>
          <FormErrorMessage>Please select an item to sell.</FormErrorMessage>
        </FormControl>

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
