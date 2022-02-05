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
import {
  GetAuctionQuery,
  useCloseAuctionMutation,
  useEndAuctionMutation
} from "client-controllers";
import { InfoIcon } from "../icons/InfoIcon";
import { HStack, VStack } from "./utils/Stack";
import { MdCancel } from "@react-icons/all-files/md/MdCancel";
import { BidListItem } from "./BidComponent";

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
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [endAuction] = useEndAuctionMutation();
  const [closeAuction] = useCloseAuctionMutation();

  return (
    <>
      <Button
        className={className}
        colorScheme="blue"
        variant="solid"
        onClick={onOpen}
      >
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
              defaultIsOpen={false}
              defaultChecked={false}
              isOpen={showTooltip}
              shouldWrapChildren
              zIndex={1401}
              label="Caveat. This is irreversible - once you close the auction either with or without declaring a winner, it would be the final result and the auction cannnot be reopnened."
              hasArrow
            >
              <InfoIcon
                className="w-4 h-4"
                onMouseEnter={() => {
                  setShowTooltip(true);
                }}
                onMouseLeave={() => {
                  setShowTooltip(false);
                }}
              />
            </Tooltip>
          </ModalHeader>

          <ModalCloseButton />

          <ModalBody data-bid-deselect="true" className="my-4">
            <VStack className="gap-6">
              <div className="w-48">
                <Button
                  leftIcon={<MdCancel />}
                  colorScheme="orange"
                  variant="solid"
                  disabled={chosenBidId === -1}
                  size="md"
                  w="full"
                  onClick={() => {
                    // un select handler
                    setChosenBidId(-1);
                  }}
                >
                  Clear Selection
                </Button>
              </div>
              <HStack className="w-full">
                {auction &&
                  auction.bids.map(each => (
                    <BidListItem
                      bid={each}
                      onClick={() => {
                        setChosenBidId(each.id);
                      }}
                      isSelectable
                      isChosen={chosenBidId === each.id}
                    />
                  ))}
              </HStack>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <button
              className="cyan-button"
              onClick={async () => {
                if (!auction) return;
                if (!confirm("Are you sure to proceed?")) return;

                try {
                  if (chosenBidId === -1) {
                    await closeAuction({
                      variables: {
                        auctionId: auction.id
                      }
                    });
                  } else {
                    await endAuction({
                      variables: {
                        auctionId: auction.id,
                        winningBidId: chosenBidId
                      }
                    });
                  }
                } catch (err) {}
              }}
            >
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
