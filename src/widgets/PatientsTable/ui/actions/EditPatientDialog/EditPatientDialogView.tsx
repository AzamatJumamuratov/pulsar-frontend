"use client";

import { Dialog, Button, Box, Portal } from "@chakra-ui/react";
import { FormProvider, type UseFormReturn } from "react-hook-form";
import { PatientDetailsForm } from "@/widgets/PatientsTable/ui/actions/AddPatientDialog/PatientDetailsForm";
import type { PatientCreateAndEditRequest } from "@/entities/patient/model/types";

interface EditPatientDialogViewProps {
  isOpen: boolean;
  onClose: () => void;
  form: UseFormReturn<PatientCreateAndEditRequest>;
  onSubmit: (data: PatientCreateAndEditRequest) => void;
}

export function EditPatientDialogView({
  isOpen,
  onClose,
  form,
  onSubmit,
}: EditPatientDialogViewProps) {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  return (
    <Dialog.Root open={isOpen} size={{ smDown: "full" }}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content maxW="650px" p={6}>
            <Box as="h3" fontWeight="bold" fontSize="lg" mb={4}>
              Редактирование пациента
            </Box>
            <FormProvider {...form}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Dialog.Body>
                  <PatientDetailsForm form={form} isSubmitting={isSubmitting} />
                </Dialog.Body>
                <Dialog.Footer>
                  <Button variant="ghost" onClick={onClose}>
                    Отмена
                  </Button>
                  <Button
                    colorPalette="teal"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Сохранение..." : "Сохранить изменения"}
                  </Button>
                </Dialog.Footer>
              </form>
            </FormProvider>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
