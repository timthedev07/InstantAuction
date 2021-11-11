import { useCreateAuctionMutation } from "client-controllers";
import { Formik } from "formik";
import { FC } from "react";

interface CreateAuctionProps {}

export const CreateAuction: FC<CreateAuctionProps> = ({}) => {
  const [createAuction] = useCreateAuctionMutation();

  return (
    <div className="m-6 border-white border rounded p-5">
      <h1 className="text-3xl">Create Auction</h1>
      <Formik
        initialValues={{ title: "", description: "" }}
        onSubmit={async ({ title, description }) => {
          createAuction({ variables: { description, title } });
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
              name="title"
              className="px-4 py-3 rounded bg-gray-800 bg-opacity-90 border border-gray-50"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <br />
            <textarea
              name="description"
              className="px-4 py-3 rounded bg-gray-800 bg-opacity-90 border border-gray-50"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <br />
            <button type="submit">Create</button>
          </form>
        )}
      </Formik>
    </div>
  );
};
