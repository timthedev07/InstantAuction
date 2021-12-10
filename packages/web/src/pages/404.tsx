import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";

const NotFound: NextPage = () => {
  const { back } = useRouter();

  return (
    <>
      404
      <br />
      <button
        className="cyan-button"
        onClick={() => {
          back();
        }}
      >
        Go Back
      </button>
    </>
  );
};

export default NotFound;
