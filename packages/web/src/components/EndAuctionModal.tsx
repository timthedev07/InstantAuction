import { FC, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Tooltip
} from "@chakra-ui/react";
import { GetAuctionQuery } from "client-controllers";
import { InfoIcon } from "../icons/InfoIcon";
import { HStack } from "./utils/Stack";

interface EndAuctionModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  className?: string;
  auction: GetAuctionQuery["getAuction"];
}

export const EndAuctionModal: FC<EndAuctionModal> = ({
  isOpen,
  onClose,
  onOpen,
  className = "",
  auction
}) => {
  const [chosenBidId, setChosenBidId] = useState<number>(-1);

  return (
    <>
      <Button className={className} variant={"link"} onClick={onOpen}>
        End Auction
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          setChosenBidId(-1);
          onClose();
        }}
      >
        <ModalOverlay />
        <ModalContent maxW="56rem">
          <ModalHeader className="flex gap-2">
            Close Auction / Declare Winner
            <Tooltip
              shouldWrapChildren
              zIndex={1401}
              label="Caveat. This is irreversible - once you close the auction either with or without declaring a winner, it would be the final result and the auction cannnot be reopnened."
              hasArrow
            >
              <InfoIcon className="w-4 h-4" />
            </Tooltip>
          </ModalHeader>

          <ModalCloseButton />

          <ModalBody className="my-4">
            <HStack>
              {auction &&
                auction.bids.map(each => {
                  return (
                    <div
                      key={each.id}
                      onClick={() => {
                        setChosenBidId(each.id);
                      }}
                      className={`cursor-pointer transition duration-500 w-48 rounded p-4 ${
                        each.id === chosenBidId
                          ? "transform scale-105 shadow-xl bg-primary-300"
                          : ""
                      }`}
                    >
                      <h3>
                        {each.item.name} from {each.bidder.username}
                      </h3>
                      <img src={each.item.picture} />
                    </div>
                  );
                })}
            </HStack>
          </ModalBody>

          <ModalFooter>
            <button className="cyan-button" onClick={() => {}}>
              {chosenBidId === -1
                ? "Close Auction"
                : "Close Auction & Declare Winner"}
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
