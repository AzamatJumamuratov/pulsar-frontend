// src/widgets/AddPatientDialog/useAddPatientDialog.ts
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import api from "@/app/api";
import { toaster } from "@/components/ui/toaster";
import { useAppDispatch } from "@/shared/model/hooks";
import { fetchPatients } from "@/entities/patient/model/patientsSlice";
import type { PatientData } from "@/entities/patient/model/types";
import type { AppointmentRequest } from "@/entities/appointments/model/types";
import { appointmentsApi } from "@/entities/appointments/api/appointmentsApi";

export type PatientFormValues = {
  full_name: string;
  birth_date: string;
  gender: string;
  phone: string;
  passport: string;
  address: string;
};

export function useAddPatientDialog() {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [createdPatient, setCreatedPatient] = useState<PatientData | null>(
    null
  );

  const form = useForm<PatientFormValues>({
    defaultValues: {
      full_name: "",
      birth_date: "",
      gender: "",
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

  const onSubmitPatient = async (data: PatientFormValues) => {
    try {
      const response = await api.post<PatientData>("/patients/", data);
      toaster.create({
        description: `Пациент ${response.data.full_name} успешно создан.`,
        type: "success",
      });

      setCreatedPatient(response.data);
      setCurrentStep(2);
    } catch (err: any) {
      toaster.create({
        description:
          err?.response?.data?.detail || "Ошибка при создании пациента.",
        type: "error",
      });
    }
  };

  const onSubmitAppointment = async (data: AppointmentRequest) => {
    try {
      await appointmentsApi.createAppointment(data);
      close();
      dispatch(fetchPatients());
    } catch (error) {
      toaster.create({
        description: "Ошибка При создании Приема!",
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
