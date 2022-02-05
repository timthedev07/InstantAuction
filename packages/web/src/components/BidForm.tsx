import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from "@chakra-ui/react";
import {
  accessErrMessage,
  createBidCreationOptions,
  useCreateBidMutation
} from "client-controllers";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { useAlert } from "../contexts/AlertContext";
import { ItemsSelect } from "./ItemsSelect";

interface BidFormProps {
  auctionId: string;
}

export const BidForm: FC<BidFormProps> = ({ auctionId }) => {
  const [bid] = useCreateBidMutation();
  const { isOpen, onClose } = useDisclosure({
    defaultIsOpen: true
  });
  auctionId;
  const [itemId, setItemId] = useState<string>("-1");
  const { back, reload } = useRouter();
  const { triggerAlert } = useAlert();

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          back();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="flex gap-2">New Bid</ModalHeader>

          <ModalBody className="my-4">
            <ItemsSelect
              value={itemId}
              onChange={e => {
                setItemId(e.target.value);
              }}
            />
            <Link href="/me?t=items-owned&action=new">
              <Button variant="link" fontSize={"sm"}>
                Upload more items here
              </Button>
            </Link>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme={"teal"}
              onClick={async () => {
                try {
                  await bid(
                    createBidCreationOptions({
                      auctionId,
                      itemId: parseInt(itemId)
                    })
                  );
                  reload();
                } catch (err) {
                  triggerAlert(accessErrMessage(err));
                }
              }}
            >
              Bid
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
