// src/widgets/AddPatientDialog/AddPatientDialogContainer.tsx
import { AddPatientDialogView } from "./AddPatientDialogView";
import { useAddPatientDialog } from "./useAddPatientDialog";

export default function AddPatientDialogContainer() {
  const {
    isOpen,
    open,
    close,
    form,
    onSubmitPatient,
    onSubmitAppointment,
    currentStep,
    createdPatient,
  } = useAddPatientDialog();

  return (
    <AddPatientDialogView
      isOpen={isOpen}
      onOpenChange={(v) => (v ? open() : close())}
      form={form}
      onSubmitPatient={onSubmitPatient}
      onSubmitAppointment={onSubmitAppointment}
      currentStep={currentStep}
      createdPatient={createdPatient}
    />
  );
}
