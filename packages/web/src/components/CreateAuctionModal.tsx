import { FC } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Divider
} from "@chakra-ui/react";
import { CreateAuction } from "./CreateAuction";

interface CreateAuctionModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  className?: string;
}

export const CreateAuctionModal: FC<CreateAuctionModalProps> = ({
  isOpen,
  onClose,
  onOpen,
  className = ""
}) => {
  return (
    <>
      <Button
        className={className}
        variant={"solid"}
        colorScheme="linkedin"
        onClick={onOpen}
      >
        Create Auction
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          maxW="3xl"
          className="max-w-full md:max-w-[80%] lg:max-w-[60%]"
        >
          <ModalHeader>Create Auction</ModalHeader>

          <ModalCloseButton />

          <ModalBody>
            <CreateAuction />
          </ModalBody>

          <Divider />

          <ModalFooter>
            <Button colorScheme="orange" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
