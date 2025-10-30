// src/widgets/AddPatientDialog/AddPatientDialogView.tsx
"use client";

import {
  Button,
  Icon,
  Box,
  IconButton,
  Dialog,
  Portal,
} from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { GoPlus } from "react-icons/go";
import { RxCross1 } from "react-icons/rx";
import { FormProvider, type UseFormReturn } from "react-hook-form";
import { CreateAppointmentForm } from "./CreateAppointmentForm";
import { PatientDetailsForm } from "./PatientDetailsForm";
import type { AppointmentRequest } from "@/entities/appointments/model/types";
import type {
  PatientCreateAndEditRequest,
  PatientData,
} from "@/entities/patient/model/types";

interface AddPatientDialogViewProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  form: UseFormReturn<PatientCreateAndEditRequest>;
  onSubmitPatient: (data: PatientCreateAndEditRequest) => void;
  onSubmitAppointment: (data: AppointmentRequest) => void;
  currentStep: number;
  createdPatient: PatientData | null;
}

// Компонент кнопки открытия диалога
const OpenDialogButton = ({
  onOpenChange,
}: {
  onOpenChange: (open: boolean) => void;
}) => (
  <Button colorPalette="teal" onClick={() => onOpenChange(true)}>
    Добавить
    <Icon as={GoPlus} ml={2} />
  </Button>
);

// Компонент заголовка диалога
const DialogHeader = ({
  currentStep,
  onClose,
}: {
  currentStep: number;
  onClose: () => void;
}) => (
  <Box display="flex" justifyContent="space-between" alignItems="center">
    <Box as="h3" fontWeight="bold" fontSize="lg">
      {currentStep === 1 ? "Добавление пациента" : "Создание приёма"}
    </Box>
    <IconButton
      aria-label="Закрыть"
      onClick={onClose}
      size="sm"
      variant="ghost"
    >
      <RxCross1 />
    </IconButton>
  </Box>
);

// Компонент формы пациента
const PatientFormStep = ({
  form,
  onSubmitPatient,
  isSubmitting,
}: {
  form: UseFormReturn<PatientCreateAndEditRequest>;
  onSubmitPatient: (data: PatientCreateAndEditRequest) => void;
  isSubmitting: boolean;
}) => (
  <FormProvider {...form}>
    <form onSubmit={form.handleSubmit(onSubmitPatient)}>
      <Dialog.Body>
        <PatientDetailsForm form={form} isSubmitting={isSubmitting} />
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
  </FormProvider>
);

// Компонент формы приёма
const AppointmentFormStep = ({
  createdPatient,
  onSubmitAppointment,
  onClose,
}: {
  createdPatient: PatientData | null;
  onSubmitAppointment: (data: AppointmentRequest) => void;
  onClose: () => void;
}) => (
  <CreateAppointmentForm
    onClose={onClose}
    createdPatient={createdPatient}
    onSubmitAppointment={onSubmitAppointment}
  />
);

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
    formState: { isSubmitting },
  } = form;

  return (
    <>
      <OpenDialogButton onOpenChange={onOpenChange} />

      <Dialog.Root
        open={isOpen}
        placement={"center"}
        size={{ smDown: "full", mdDown: "xs", md: "lg" }}
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content maxW="650px" p={6}>
              <DialogHeader
                currentStep={currentStep}
                onClose={() => onOpenChange(false)}
              />

              <AnimatePresence mode="wait">
                {currentStep === 1 ? (
                  <PatientFormStep
                    form={form}
                    onSubmitPatient={onSubmitPatient}
                    isSubmitting={isSubmitting}
                  />
                ) : (
                  <AppointmentFormStep
                    createdPatient={createdPatient}
                    onSubmitAppointment={onSubmitAppointment}
                    onClose={() => onOpenChange(false)}
                  />
                )}
              </AnimatePresence>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
}
