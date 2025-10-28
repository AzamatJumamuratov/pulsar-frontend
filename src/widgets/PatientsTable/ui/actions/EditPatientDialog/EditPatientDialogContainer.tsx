import { IconButton } from "@chakra-ui/react";
import { EditPatientDialogView } from "./EditPatientDialogView";
import { useEditPatientDialog } from "./useEditPatientDialog";
import type { PatientData } from "@/entities/patient/model/types";
import { FaRegEdit } from "react-icons/fa";

interface Props {
  patient: PatientData;
}

export default function EditPatientDialogContainer({ patient }: Props) {
  const { isOpen, open, close, form, onSubmit } = useEditPatientDialog(patient);

  return (
    <>
      <IconButton
        onClick={open}
        aria-label="Редактировать"
        backgroundColor="teal"
        color="white"
        size="sm"
      >
        <FaRegEdit />
      </IconButton>
      <EditPatientDialogView
        isOpen={isOpen}
        onClose={close}
        form={form}
        onSubmit={onSubmit}
      />
    </>
  );
}
