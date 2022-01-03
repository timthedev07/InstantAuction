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
            >
              <img
                className="w-4 h-4"
                src="/images/icons/info.svg"
                alt="infoIcon"
              />
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
              data-tip="dfd"
              className="danger-button"
              onClick={() => {
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
