import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

interface DeleteConfirmProps {
  title: string;
  isOpen: boolean;
  onConfirmClick: (isOpen: boolean) => void;
}

export default function DeleteConfirm(
  { title, isOpen, onConfirmClick }: DeleteConfirmProps,
) {
  return (
    <Modal isOpen={isOpen} backdrop="blur" isDismissable={false}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader>
              Confirmation
            </ModalHeader>
            <ModalBody>
              <p>
                {`Are sure you want to delete ${title} ?`}
              </p>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={() => onConfirmClick(true)}>
                Cancel
              </Button>
              <Button color="primary" onPress={() => onConfirmClick(false)}>
                Yes
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
