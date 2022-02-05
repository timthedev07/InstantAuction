import { Button } from "@chakra-ui/react";
import Link from "next/link";
import { FC } from "react";

interface ItemUploadRedirectButtonProps {}

export const ItemUploadRedirectButton: FC<
  ItemUploadRedirectButtonProps
> = ({}) => {
  return (
    <Link href="/me?t=items-owned&action=new">
      <Button variant="link" fontSize={"sm"}>
        Upload more items here
      </Button>
    </Link>
  );
};
