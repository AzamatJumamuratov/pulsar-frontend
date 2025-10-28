// src/widgets/AddPatientDialog/AddPatientDialogView.tsx
"use client";

import { Button, Icon, Box, IconButton, Dialog } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { GoPlus } from "react-icons/go";
import { RxCross1 } from "react-icons/rx";
import { type UseFormReturn } from "react-hook-form";
import { type PatientFormValues } from "./useAddPatientDialog";
import { CreateAppointmentForm } from "./CreateAppointmentForm";
import { PatientDetailsForm } from "./PatientDetailsForm";
import type { AppointmentRequest } from "@/entities/appointments/model/types";

interface AddPatientDialogViewProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  form: UseFormReturn<PatientFormValues>;
  onSubmitPatient: (data: PatientFormValues) => void;
  onSubmitAppointment: (data: AppointmentRequest) => void;
  currentStep: number;
  createdPatient: any | null;
}

export function AddPatientDialogView({
  isOpen,
  onOpenChange,
  form,
  onSubmitPatient,
  onSubmitAppointment,
  currentStep,
  createdPatient,
}: AddPatientDialogViewProps) {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  return (
    <>
      <Button colorPalette="teal" onClick={() => onOpenChange(true)}>
        Добавить
        <Icon as={GoPlus} ml={2} />
      </Button>

      <Dialog.Root open={isOpen}>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content maxW="650px" p={6}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box as="h3" fontWeight="bold" fontSize="lg">
                {currentStep === 1 ? "Добавление пациента" : "Создание приёма"}
              </Box>
              <IconButton
                aria-label="Закрыть"
                onClick={() => onOpenChange(false)}
                size="sm"
                variant="ghost"
              >
                <RxCross1 />
              </IconButton>
            </Box>

            <AnimatePresence mode="wait">
              {currentStep === 1 ? (
                <form onSubmit={handleSubmit(onSubmitPatient)}>
                  <Dialog.Body>
                    <PatientDetailsForm
                      form={form}
                      isSubmitting={isSubmitting}
                    />
                  </Dialog.Body>

                  <Dialog.Footer>
                    <Button
                      w="100%"
                      colorPalette="teal"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Далее
                    </Button>
                  </Dialog.Footer>
                </form>
              ) : (
                <CreateAppointmentForm
                  isSubmitting={isSubmitting}
                  onClose={() => onOpenChange(false)}
                  createdPatient={createdPatient}
                  onSubmitAppointment={onSubmitAppointment}
                />
              )}
            </AnimatePresence>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </>
  );
}
