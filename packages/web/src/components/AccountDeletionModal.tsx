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
  Tooltip,
  FormControl,
  FormLabel,
  Input,
  Checkbox
} from "@chakra-ui/react";
import {
  createDeleteAccountOptions,
  useDeleteAccountMutation
} from "client-controllers";
import { useAlert } from "../contexts/AlertContext";
import { InfoIcon } from "../icons/InfoIcon";

interface AccountDeletionModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  className?: string;
}

export const AccountDeletionModal: FC<AccountDeletionModalProps> = ({
  isOpen,
  onClose,
  onOpen,
  className = ""
}) => {
  const [emailInput, setEmailInput] = useState<string>("");
  const [checked, setChecked] = useState<boolean>(false);
  const [deleteAccount] = useDeleteAccountMutation();
  const { triggerAlert } = useAlert();

  return (
    <>
      <Button className={className} variant={"link"} onClick={onOpen}>
        Delete Account
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="flex gap-2">
            Account Deletion
            <Tooltip
              label="Once your account is deleted, all your information
              including items and auctions would be permanently erased.
              This action is irreversible."
              hasArrow
              shouldWrapChildren
            >
              <InfoIcon className="w-4 h-4" />
            </Tooltip>
          </ModalHeader>

          <ModalCloseButton />

          <ModalBody className="my-4">
            <FormControl isRequired>
              <FormLabel>
                Enter your email to confirm account deletion.
              </FormLabel>
              <Input
                value={emailInput}
                onChange={e => {
                  setEmailInput(e.target.value);
                }}
              />
            </FormControl>
            <div className="flex items-start pt-3">
              <Checkbox
                checked={checked}
                onChange={e => {
                  setChecked(e.target.checked);
                }}
              >
                I know the consequences of the following action, and agree to
                proceed.
              </Checkbox>
            </div>
          </ModalBody>

          <ModalFooter>
            <button
              className="danger-button"
              onClick={() => {
                if (!checked) {
                  triggerAlert("Please check the checkbox to proceed.");
                  return;
                }

                deleteAccount(
                  createDeleteAccountOptions({
                    email: emailInput
                  })
                );
              }}
            >
              <b>
                <i>Delete</i>
              </b>
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
