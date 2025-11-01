import { MdDelete } from "react-icons/md";
import {
  Button,
  CloseButton,
  Dialog,
  IconButton,
  Portal,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";

interface DeleteSurgeryDialogProps {
  surgeryId: number;
  surgeryName: string;
  onDelete: (surgeryId: number) => Promise<void>;
}

const DeleteSurgeryDialog = ({
  surgeryId,
  surgeryName,
  onDelete,
}: DeleteSurgeryDialogProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(surgeryId);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <IconButton
          backgroundColor={"teal"}
          color={"white"}
          size="xs"
          disabled={isDeleting}
        >
          <MdDelete />
        </IconButton>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Удалить операцию?</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              Вы уверены, что хотите удалить операцию "{surgeryName}"? Это
              действие нельзя отменить.
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline" disabled={isDeleting}>
                  Отмена
                </Button>
              </Dialog.ActionTrigger>
              <Button
                onClick={handleDelete}
                backgroundColor="red.500"
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <Spinner size="sm" mr={2} />
                    Удаление...
                  </>
                ) : (
                  "Удалить"
                )}
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" disabled={isDeleting} />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default DeleteSurgeryDialog;
