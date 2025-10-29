import {
  Box,
  Button,
  VStack,
  Textarea,
  Heading,
  NativeSelect,
} from "@chakra-ui/react";
import { useAppSelector } from "@/shared/model/hooks";
import { useColorModeValue } from "@/components/ui/color-mode";
import { FormProvider, useForm } from "react-hook-form";
import type { AppointmentRequest } from "@/entities/appointments/model/types";
import { createAppointment } from "@/entities/appointments/api/appointmentsApi";
import { DateTimeInput } from "@/shared/ui/DateTimeInput";
import { toaster } from "@/components/ui/toaster";
import ValidatedCostInput from "@/shared/ui/ValidatedCostInput";

export default function AddAppointment() {
  const {
    data: { patients },
    loading: PatientsLoading,
  } = useAppSelector((s) => s.patients);
  const { data: doctorsList, loading: DoctorsListLoading } = useAppSelector(
    (s) => s.doctorsList
  );

  const methods = useForm<AppointmentRequest>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = methods;

  if (PatientsLoading || DoctorsListLoading) return;

  const onSubmit = async (values: AppointmentRequest) => {
    try {
      await createAppointment(values);
      reset();
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
    <Box
      mt={8}
      p={6}
      borderWidth="1px"
      borderRadius="2xl"
      bg={useColorModeValue("white", "gray.800")}
      boxShadow="sm"
    >
      <Heading size="md" mb={4}>
        Добавить приём
      </Heading>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack gap={4} align="stretch">
            {/* Врач */}
            <NativeSelect.Root size="md">
              <NativeSelect.Field
                placeholder="Выберите врача"
                {...register("doctor_id", { required: "Выберите врача" })}
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

            {/* Пациент */}
            <NativeSelect.Root size="md">
              <NativeSelect.Field
                placeholder="Выберите пациента"
                {...register("patient_id", { required: "Выберите пациента" })}
              >
                {patients.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.full_name}
                  </option>
                ))}
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
            {errors.patient_id && (
              <Box color="red.500" fontSize="sm">
                {errors.patient_id.message}
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
              colorScheme="teal"
              w="full"
            >
              {isSubmitting ? "Создание..." : "Создать приём"}
            </Button>
          </VStack>
        </form>
      </FormProvider>
    </Box>
  );
}
