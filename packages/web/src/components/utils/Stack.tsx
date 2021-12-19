import { FC } from "react";

interface StackProps {
  className: string;
  reversed?: boolean;
}

export const HStack: FC<StackProps> = ({
  className,
  reversed = false,
  children
}) => {
  return (
    <div className={className + ` flex flex-row${reversed ? "-reverse" : ""}`}>
      {children}
    </div>
  );
};

export const VStack: FC<StackProps> = ({
  className,
  reversed = false,
  children
}) => {
  return (
    <div className={className + ` flex flex-col${reversed ? "-reverse" : ""}`}>
      {children}
    </div>
  );
};
