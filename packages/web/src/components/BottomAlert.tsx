import { FC } from "react";

interface CannotReachServerProps {
  open: boolean;
}

export const CannotReachServer: FC<CannotReachServerProps> = ({ open }) => {
  return (
    <div
      className={`right-7 text-white fixed flex justify-center items-center p-3 w-48 h-11 rounded-md bg-red-800 transition duration-300 ${
        open ? "bottom-7" : "-bottom-[100vw]"
      }`}
    >
      Cannot reach server.
    </div>
  );
};
