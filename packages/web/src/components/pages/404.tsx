import { FC } from "react";
import { useRouter } from "next/dist/client/router";
import { getHeadForPage } from "../../utils/getHeadForPage";

export const NotFoundPage: FC = () => {
  const { back, asPath } = useRouter();

  return (
    <>
      {getHeadForPage({
        description: "Page Not Found",
        path: asPath,
        title: "404"
      })}
      <div className="flex items-center justify-center md:justify-end relative h-full">
        <img
          src="/images/404-bg.jpg"
          className="min-h-700 h-screen w-full object-cover object-left brightness-75"
        />
        <div className="w-4/12 min-w-[310px] h-[500px] bg-[#2e353577] z-10 absolute rounded-lg mr-[7%] shadow-lg flex flex-col items-center">
          <img
            src="/images/404-heading.svg"
            className="w-11/12 mt-12 md:mt-6"
          />
          <h5 className="text-center text-gray-300">
            Oops, you seem to be lost.
          </h5>
          <div className="w-full h-2/6 flex justify-center items-center">
            <button
              className="secondary-button z-50"
              onClick={() => {
                back();
              }}
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
