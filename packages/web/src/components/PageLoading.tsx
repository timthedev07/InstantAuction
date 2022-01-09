import { FC } from "react";

interface PageLoadingProps {
  fullScreen?: boolean;
}

export const PageLoading: FC<PageLoadingProps> = ({ fullScreen = true }) => {
  return (
    <div
      className={fullScreen ? "h-[80vh] flex justify-center items-center" : ""}
    >
      <div
        className={`
  w-11/12 rounded-full bg-neutral-300 h-2 m-auto relative
  before:absolute
  before:content-['']
  before:top-0
  before:h-2
  before:overflow-hidden
  before:left-[calc(50%-5px)]
  before:rounded-full
  before:bg-neutral-600
  before:animate-grow-horizontal
  `}
      />
    </div>
  );
};
