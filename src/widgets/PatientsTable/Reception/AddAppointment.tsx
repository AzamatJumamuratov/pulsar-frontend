import {
  Box,
  Button,
  VStack,
  Input,
  Textarea,
  Heading,
  NativeSelect,
} from "@chakra-ui/react";
import { useAppSelector } from "@/shared/model/hooks";
import { useColorModeValue } from "@/components/ui/color-mode";
import { useForm } from "react-hook-form";
import { toaster } from "@/components/ui/toaster";
import api from "@/app/api";

interface AppointmentForm {
  doctor_id: string;
  patient_id: string;
  date: string;
  notes: string;
  cost: number;
}

export default function AddAppointment() {
  const { data: patients, loading: PatientsLoading } = useAppSelector(
    (s) => s.patients
  );
  const { data: doctorsList, loading: DoctorsListLoading } = useAppSelector(
    (s) => s.doctorsList
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AppointmentForm>();

  if (PatientsLoading || DoctorsListLoading) return;

  const onSubmit = async (values: AppointmentForm) => {
    try {
      await api.post("/appointments/", {
        doctor_id: Number(values.doctor_id),
        patient_id: Number(values.patient_id),
        date: values.date,
        notes: values.notes,
        cost: Number(values.cost),
      });

      toaster.create({
        title: "Приём успешно создан",
        type: "success",
        duration: 2500,
      });
      reset();
    } catch {
      toaster.create({
        title: "Ошибка при создании приёма",
        type: "error",
        duration: 3000,
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
          <Input
            type="datetime-local"
            {...register("date", { required: "Укажите дату приёма" })}
          />
          {errors.date && (
            <Box color="red.500" fontSize="sm">
              {errors.date.message}
            </Box>
          )}

          {/* Стоимость */}
          <Input
            type="number"
            placeholder="Стоимость (сум)"
            {...register("cost", {
              required: "Укажите стоимость приёма",
              min: { value: 1000, message: "Минимум 1000 сум" },
            })}
          />
          {errors.cost && (
            <Box color="red.500" fontSize="sm">
              {errors.cost.message}
            </Box>
          )}

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

          <Button type="submit" colorScheme="teal" w="full">
            Создать приём
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
