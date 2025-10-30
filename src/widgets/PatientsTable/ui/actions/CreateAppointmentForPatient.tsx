import {
  Box,
  Button,
  VStack,
  Textarea,
  NativeSelect,
  Dialog,
  IconButton,
  Portal,
} from "@chakra-ui/react";
import { useAppSelector } from "@/shared/model/hooks";
import { FormProvider, useForm } from "react-hook-form";
import type { AppointmentRequest } from "@/entities/appointments/model/types";
import { createAppointment } from "@/entities/appointments/api/appointmentsApi";
import { DateTimeInput } from "@/shared/ui/DateTimeInput";
import { toaster } from "@/components/ui/toaster";
import ValidatedCostInput from "@/shared/ui/ValidatedCostInput";
import { useState } from "react";
import { MdOutlineEventNote } from "react-icons/md";

interface CreateAppointmentForPatientProps {
  patientId: number;
  patientName: string;
}

export default function CreateAppointmentForPatient({
  patientId,
  patientName,
}: CreateAppointmentForPatientProps) {
  const [open, setOpen] = useState(false);

  const { data: doctorsList, loading: DoctorsListLoading } = useAppSelector(
    (s) => s.doctorsList
  );

  const methods = useForm<Omit<AppointmentRequest, "patient_id">>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = methods;

  if (DoctorsListLoading) return null;

  const onSubmit = async (values: Omit<AppointmentRequest, "patient_id">) => {
    try {
      await createAppointment({ ...values, patient_id: patientId.toString() });
      reset();
      setOpen(false);
      toaster.create({
        description: "Прием Успешно Создан!",
        type: "success",
      });
    } catch (error) {
      toaster.create({
        description: "Ошибка При Создании Приема!",
        type: "error",
      });
    }
  };

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      placement={"center"}
      size={{ smDown: "full", mdDown: "xs", md: "lg" }}
    >
      <Dialog.Trigger asChild>
        <IconButton
          aria-label="Создать прием"
          backgroundColor={"teal"}
          color={"white"}
        >
          <MdOutlineEventNote />
        </IconButton>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Positioner>
          <Dialog.Backdrop />
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Создание назначения для {patientName}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <VStack gap={4} align="stretch">
                    {/* Врач */}
                    <NativeSelect.Root size="md">
                      <NativeSelect.Field
                        placeholder="Выберите врача"
                        {...register("doctor_id", {
                          required: "Выберите врача",
                        })}
                      >
                        {doctorsList.map((d) => (
                          <option key={d.id} value={d.id}>
                            {d.full_name}
                          </option>
                        ))}
                      </NativeSelect.Field>
                      <NativeSelect.Indicator />
                    </NativeSelect.Root>
                    {errors.doctor_id && (
                      <Box color="red.500" fontSize="sm">
                        {errors.doctor_id.message}
                      </Box>
                    )}

                    {/* Дата */}
                    <DateTimeInput name="date" required="Укажите дату приёма" />

                    {/* Стоимость */}
                    <ValidatedCostInput
                      name="cost"
                      placeholder="Стоимость (сум)"
                      required="Стоимость не может быть пустым"
                    />

                    {/* Заметки */}
                    <Textarea
                      placeholder="Заметки"
                      {...register("notes", {
                        required: "Заметка не может быть пустой",
                      })}
                      resize="none"
                    />
                    {errors.notes && (
                      <Box color="red.500" fontSize="sm">
                        {errors.notes.message}
                      </Box>
                    )}

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      backgroundColor={"teal"}
                      color={"white"}
                      w="full"
                    >
                      {isSubmitting ? "Создание..." : "Создать приём"}
                    </Button>
                    <Dialog.ActionTrigger>
                      <Button
                        backgroundColor={"teal"}
                        color={"white"}
                        width={"full"}
                      >
                        Закрыть
                      </Button>
                    </Dialog.ActionTrigger>
                  </VStack>
                </form>
              </FormProvider>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
