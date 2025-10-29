"use client";

import { Button, Box, Dialog, Input, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FormProvider, useForm } from "react-hook-form";
import { useAppSelector } from "@/shared/model/hooks";
import CustomSelect from "@/shared/ui/CustomSelect";
import type { PatientData } from "@/entities/patient/model/types";
import type { AppointmentRequest } from "@/entities/appointments/model/types";
import { useState } from "react";
import { DateTimeInput } from "@/shared/ui/DateTimeInput";
import ValidatedSelect from "@/shared/ui/ValidatedSelect";
import ValidatedCostInput from "@/shared/ui/ValidatedCostInput";

interface CreateAppointmentFormProps {
  onClose: () => void;
  createdPatient: PatientData | null;
  onSubmitAppointment: (data: AppointmentRequest) => void;
}

const variants = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
  transition: { duration: 0.24 },
};

export function CreateAppointmentForm({
  onClose,
  createdPatient,
  onSubmitAppointment,
}: CreateAppointmentFormProps) {
  const {
    data: { patients },
  } = useAppSelector((state) => state.patients);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: doctors } = useAppSelector((state) => state.doctorsList);
  const allPatients: PatientData[] = createdPatient
    ? [createdPatient, ...patients.filter((p) => p.id !== createdPatient.id)]
    : patients;

  const patientOptions = allPatients.map((p) => ({
    label:
      createdPatient?.id === p.id ? `${p.full_name} ⭐ Новый` : p.full_name,
    value: String(p.id),
  }));

  const doctorOptions = doctors.map((d) => ({
    label: d.full_name,
    value: String(d.id),
  }));

  const form = useForm<AppointmentRequest>({
    defaultValues: {
      patient_id: String(createdPatient?.id || ""),
      doctor_id: "",
      date: "",
      notes: "",
      cost: null, // ← вместо 0
    },
  });

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
    watch,
  } = form;

  const onSubmit = async (data: AppointmentRequest) => {
    const appointmentData: AppointmentRequest = {
      patient_id: data.patient_id,
      doctor_id: data.doctor_id,
      date: data.date,
      notes: data.notes,
      cost: data.cost,
    };
    setIsSubmitting(true);
    await onSubmitAppointment(appointmentData);
    setIsSubmitting(false);
  };

  return (
    <motion.div
      key="step2"
      initial={variants.initial}
      animate={variants.animate}
      exit={variants.exit}
      transition={variants.transition}
    >
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Dialog.Body>
            <VStack align="stretch" gap={4}>
              <CustomSelect
                placeholder="Выберите пациента"
                value={watch("patient_id")}
                items={patientOptions}
                onChange={(v) => setValue("patient_id", v)}
              />

              {errors.patient_id && (
                <Box color="red.500" fontSize="sm">
                  {errors.patient_id?.message}
                </Box>
              )}

              <ValidatedSelect
                name="doctor_id"
                placeholder="Выберите Врача"
                required="Выберите врача обязательно."
                options={doctorOptions}
              />

              <DateTimeInput name="date" required="укажите время" />

              <Input placeholder="Заметки" {...register("notes")} />

              <ValidatedCostInput
                name="cost"
                placeholder="Стоимость (сум)"
                required="стоимость обязательное."
              />
            </VStack>
          </Dialog.Body>
          <Dialog.Footer>
            <Box display="flex" justifyContent="space-between" w="100%">
              <Button
                variant="ghost"
                type="button"
                disabled={isSubmitting}
                onClick={onClose}
              >
                Закрыть
              </Button>
              <Button colorPalette="teal" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Создание..." : "Создать приём"}
              </Button>
            </Box>
          </Dialog.Footer>
        </form>
      </FormProvider>
    </motion.div>
  );
}
