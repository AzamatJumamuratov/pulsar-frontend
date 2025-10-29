// src/widgets/AddPatientDialog/useAddPatientDialog.ts
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toaster } from "@/components/ui/toaster";
import { useAppDispatch } from "@/shared/model/hooks";
import { fetchDefaultPatients } from "@/entities/patient/model/patientsSlice";
import type {
  PatientCreateAndEditRequest,
  PatientData,
} from "@/entities/patient/model/types";
import type { AppointmentRequest } from "@/entities/appointments/model/types";
import { createAppointment } from "@/entities/appointments/api/appointmentsApi";
import { CreatePatient } from "@/entities/patient/api/patientsApi";

type DialogStep = 1 | 2;

interface UseAddPatientDialogReturn {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  form: ReturnType<typeof useForm<PatientCreateAndEditRequest>>;
  onSubmitPatient: (data: PatientCreateAndEditRequest) => Promise<void>;
  onSubmitAppointment: (data: AppointmentRequest) => Promise<void>;
  currentStep: DialogStep;
  createdPatient: PatientData | null;
}

// Константы для сообщений
const MESSAGES = {
  PATIENT_CREATED: (name: string) => `Пациент ${name} успешно создан.`,
  PATIENT_CREATE_ERROR: "Ошибка при создании пациента.",
  APPOINTMENT_CREATED: "Приём успешно создан",
  APPOINTMENT_CREATE_ERROR: "Ошибка при создании приёма!",
} as const;

// Функция для обработки ошибок API
const handleApiError = (error: any, defaultMessage: string): string => {
  return error?.response?.data?.detail || defaultMessage;
};

export function useAddPatientDialog(): UseAddPatientDialogReturn {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<DialogStep>(1);
  const [createdPatient, setCreatedPatient] = useState<PatientData | null>(
    null
  );

  const form = useForm<PatientCreateAndEditRequest>({
    defaultValues: {
      full_name: "",
      birth_date: "",
      gender: "male",
      phone: "",
      passport: "",
      address: "",
    },
  });

  React.useEffect(() => {
    form.register("gender", { required: "Выберите пол" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const open = () => {
    setIsOpen(true);
    setCurrentStep(1);
    setCreatedPatient(null);
    form.reset();
  };

  const close = () => {
    setIsOpen(false);
    setCurrentStep(1);
    setCreatedPatient(null);
    form.reset();
  };

  const onSubmitPatient = async (data: PatientCreateAndEditRequest) => {
    try {
      const response = await CreatePatient(data);
      toaster.create({
        description: MESSAGES.PATIENT_CREATED(response?.full_name || ""),
        type: "success",
      });
      setCreatedPatient(response);
      setCurrentStep(2);
    } catch (err: any) {
      toaster.create({
        description: handleApiError(err, MESSAGES.PATIENT_CREATE_ERROR),
        type: "error",
      });
    }
  };

  const onSubmitAppointment = async (data: AppointmentRequest) => {
    try {
      await createAppointment(data);
      toaster.create({
        title: MESSAGES.APPOINTMENT_CREATED,
        type: "success",
        duration: 2500,
      });
      close();
      dispatch(fetchDefaultPatients());
    } catch (error: any) {
      toaster.create({
        description: handleApiError(error, MESSAGES.APPOINTMENT_CREATE_ERROR),
        type: "error",
      });
    }
  };

  return {
    isOpen,
    open,
    close,
    form,
    onSubmitPatient,
    onSubmitAppointment,
    currentStep,
    createdPatient,
  };
}
