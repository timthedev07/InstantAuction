import {
  createAuctionCreationOptions,
  useCreateAuctionMutation,
  useGetUserItemsQuery
} from "client-controllers";
import { Field, Form, Formik } from "formik";
import { FC } from "react";

export const CreateAuction: FC = ({}) => {
  const [createAuction] = useCreateAuctionMutation();
  const { data } = useGetUserItemsQuery({
    variables: { excludeAuctionedOff: true }
  });

  return (
    <div className="m-6 border-white border rounded p-5">
      <h1 className="text-3xl">Create Auction</h1>
      <Formik
        initialValues={{ title: "", description: "", itemId: "" }}
        validate={({ description, title }) => {
          return {
            description: !description
              ? "Required"
              : description.length > 400
              ? "Must be within 400 characters"
              : undefined,
            title: title!
              ? "Required"
              : title.length > 100
              ? "Must be within 100 characters"
              : undefined
          };
        }}
        onSubmit={async ({ title, description, itemId }) => {
          const itemIdNum = parseInt(itemId);
          if (itemIdNum === -1) {
            return;
          }
          createAuction(
            createAuctionCreationOptions({
              description,
              title,
              itemId: itemIdNum
            })
          );
        }}
      >
        {() => (
          <Form>
            <Field
              name="title"
              className="px-4 py-3 rounded bg-gray-800 bg-opacity-90 border border-gray-50"
            />
            <br />
            <Field
              className="bg-primary-700 rounded py-2 px-4"
              name="itemId"
              as="select"
            >
              <option disabled value="">
                -Select Item-
              </option>
              {data &&
                data.getUserItems.items.map(each => (
                  <option value={each.id}>{each.name}</option>
                ))}
            </Field>
            <br />
            <Field
              name="description"
              as="textarea"
              className="px-4 py-3 rounded bg-gray-800 bg-opacity-90 border border-gray-50"
            />
            <br />
            <button type="submit">Create</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
