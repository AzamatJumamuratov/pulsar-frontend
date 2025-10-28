import { toaster } from "@/components/ui/toaster";
import type { PatientData } from "@/entities/patient/model/types";
import { DeletePatient } from "@/entities/patient/api/patientsApi";
import {
  Button,
  CloseButton,
  Dialog,
  IconButton,
  Portal,
} from "@chakra-ui/react";
import { MdDeleteOutline } from "react-icons/md";
import { useAppDispatch } from "@/shared/model/hooks";
import { fetchDefaultPatients } from "@/entities/patient/model/patientsSlice";
import { useState } from "react";

interface DeletePatientDialogProps {
  patient: PatientData;
}

const DeletePatientDialog = ({ patient }: DeletePatientDialogProps) => {
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  async function HandleDelete() {
    setIsSubmitting(true);
    try {
      await DeletePatient(patient.id);
      toaster.create({
        description: `Пациент ${patient.full_name} успешно Удален!.`,
        type: "success",
      });
      dispatch(fetchDefaultPatients());
    } catch (e) {
      toaster.create({
        description: `Пациент ${patient.full_name} успешно Удален!.`,
        type: "success",
      });
    }

    setIsSubmitting(false);
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <IconButton
          aria-label="Удалить"
          backgroundColor="teal"
          color="white"
          size="sm"
        >
          <MdDeleteOutline />
        </IconButton>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>
                Вы точно хотите удалить {patient.full_name}?
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Отмена</Button>
              </Dialog.ActionTrigger>
              <Button
                onClick={HandleDelete}
                variant={"solid"}
                backgroundColor={"red.500"}
                color={"white"}
                colorScheme={"light"}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Удаление..." : "Удалить"}
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

export default DeletePatientDialog;
