import {
  accessErrMessage,
  createAuctionCreationOptions,
  useCreateAuctionMutation,
  useItemsOwnedQuery
} from "client-controllers";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { FC } from "react";
import { useAlert } from "../contexts/AlertContext";
import { clearValuesOnUndefined } from "../utils/processFormikValidatorReturn";

export const CreateAuction: FC = ({}) => {
  const [createAuction] = useCreateAuctionMutation();
  const { data } = useItemsOwnedQuery({
    variables: { excludeAuctionedOff: true }
  });
  const { triggerAlert } = useAlert();

  return (
    <div className="m-6 border-white border rounded p-5">
      <h3>Create Auction</h3>
      <Formik
        initialValues={{ title: "", description: "", itemId: "" }}
        validate={({ description, title }) => {
          const returned = {
            description: !description
              ? "Required"
              : description.length > 400
              ? "Must be within 400 characters"
              : undefined,
            title: !title
              ? "Required"
              : title.length > 100
              ? "Must be within 100 characters"
              : undefined
          };
          return clearValuesOnUndefined(returned);
        }}
        onSubmit={async ({ title, description, itemId }) => {
          const itemIdNum = parseInt(itemId);

          if (itemIdNum === -1) {
            return;
          }

          try {
            await createAuction(
              createAuctionCreationOptions({
                description,
                title,
                itemId: itemIdNum
              })
            );
            triggerAlert("Auction created!", "success");
          } catch (err) {
            triggerAlert(accessErrMessage(err));
          }
        }}
      >
        {({ errors }) => (
          <Form>
            <Field
              name="title"
              className="px-4 py-3 rounded bg-gray-800 bg-opacity-90 border border-gray-50"
            />
            <ErrorMessage name="title" />
            <br />
            <Field
              className="bg-primary-700 rounded py-2 px-4"
              name="itemId"
              as="select"
              data-tip-disable={!errors.itemId}
              data-tip={errors.itemId}
            >
              <option disabled value="">
                -Select Item-
              </option>
              {data &&
                data.itemsOwned.items.map(each => (
                  <option key={each.name} value={each.id}>
                    {each.name}
                  </option>
                ))}
            </Field>
            <ErrorMessage name="itemId" />
            <br />
            <Field
              name="description"
              as="textarea"
              className="px-4 py-3 rounded bg-gray-800 bg-opacity-90 border border-gray-50"
              data-tip-disable={!errors.description}
              data-tip={errors.description}
            />
            <ErrorMessage name="description" />
            <br />
            <button type="submit">Create</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
