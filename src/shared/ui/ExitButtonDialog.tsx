import { IoExitOutline } from "react-icons/io5";
import {
  Button,
  CloseButton,
  Dialog,
  IconButton,
  Portal,
} from "@chakra-ui/react";
import { clearTokens } from "@/app/api";
import { useNavigate } from "react-router";

const ExitButtonDialog = () => {
  const navigate = useNavigate();

  function exitProfile() {
    clearTokens();
    navigate("/login");
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <IconButton variant={"ghost"}>
          <IoExitOutline />
        </IconButton>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Вы точно хотите Выйти?</Dialog.Title>
            </Dialog.Header>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Отмена</Button>
              </Dialog.ActionTrigger>
              <Button onClick={exitProfile} variant={"solid"}>
                Выйти
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default ExitButtonDialog;
