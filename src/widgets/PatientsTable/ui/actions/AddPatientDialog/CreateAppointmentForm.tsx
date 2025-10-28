"use client";

import { Button, Box, Dialog, Input, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useAppSelector } from "@/shared/model/hooks";
import CustomSelect from "@/shared/ui/CustomSelect";
import type { PatientData } from "@/entities/patient/model/types";
import type { AppointmentRequest } from "@/entities/appointments/model/types";

interface CreateAppointmentFormProps {
  isSubmitting: boolean;
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
  isSubmitting,
  onClose,
  createdPatient,
  onSubmitAppointment,
}: CreateAppointmentFormProps) {
  const {
    data: { patients },
  } = useAppSelector((state) => state.patients);
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
      cost: 0,
    },
  });

  const { handleSubmit, register, setValue, watch } = form;
  // const selectedDoctorId = watch("doctor_id");
  // const selectedPatientId = watch("patient_id");

  const onSubmit = (data: AppointmentRequest) => {
    const appointmentData: AppointmentRequest = {
      patient_id: data.patient_id,
      doctor_id: data.doctor_id,
      date: data.date,
      notes: data.notes,
      cost: data.cost,
    };
    onSubmitAppointment(appointmentData);
  };

  return (
    <motion.div
      key="step2"
      initial={variants.initial}
      animate={variants.animate}
      exit={variants.exit}
      transition={variants.transition}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Dialog.Body>
          <VStack align="stretch" gap={4}>
            <CustomSelect
              placeholder="Выберите пациента"
              value={watch("patient_id")}
              items={patientOptions}
              onChange={(v) => setValue("patient_id", v)}
            />

            <CustomSelect
              placeholder="Выберите врача"
              value={watch("doctor_id")}
              items={doctorOptions}
              onChange={(v) => setValue("doctor_id", v)}
            />

            <Input
              type="datetime-local"
              {...register("date", { required: true })}
            />
            <Input placeholder="Заметки" {...register("notes")} />
            <Input
              placeholder="Стоимость"
              type="number"
              {...register("cost", { valueAsNumber: true })}
            />
          </VStack>
        </Dialog.Body>
        <Dialog.Footer>
          <Box display="flex" justifyContent="space-between" w="100%">
            <Button variant="ghost" type="button" onClick={onClose}>
              Закрыть
            </Button>
            <Button colorPalette="teal" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Создание..." : "Создать приём"}
            </Button>
          </Box>
        </Dialog.Footer>
      </form>
    </motion.div>
  );
}
