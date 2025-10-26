// src/widgets/AddPatientDialog.tsx
"use client";

import { useState, useEffect } from "react";
import { Dialog, Button, Icon, VStack, Text } from "@chakra-ui/react";
import { GoPlus } from "react-icons/go";
import { RxCross1 } from "react-icons/rx";
import { useForm } from "react-hook-form";
import api from "@/app/api";
import CustomSelect from "@/shared/ui/CustomSelect";
import ValidatedInput from "@/features/auth/ui/ValidatedInput";
import { toaster } from "@/components/ui/toaster";
import { useAppDispatch } from "@/shared/model/hooks";
import { fetchPatients } from "@/entities/patient/model/patientsSlice";

interface PatientFormValues {
  full_name: string;
  birth_date: string;
  gender: string;
  phone: string;
  passport: string;
  address: string;
  email: string;
}

const genderOptions = [
  { label: "Мужской", value: "male" },
  { label: "Женский", value: "female" },
];

export default function AddPatientDialog() {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<PatientFormValues>();

  // Регистрируем скрытое поле gender для react-hook-form (валидация)
  useEffect(() => {
    register("gender", { required: "Выберите пол" });
  }, [register]);

  const onSubmit = async (data: PatientFormValues) => {
    try {
      const response = await api.post("/patients/", data);

      toaster.create({
        description: `Пациент ${response.data.full_name} успешно добавлен.`,
        type: "success",
        closable: true,
      });

      // Закрываем диалог
      setIsOpen(false);

      // Сбрасываем форму
      reset();

      // Обновляем список пациентов (без перезагрузки страницы)
      try {
        dispatch(fetchPatients());
      } catch {
        // если dispatch по какой-то причине не сработал — можно как fallback перезагрузить страницу
        // window.location.reload();
      }
    } catch (error: any) {
      const detail =
        error?.response?.data?.detail ||
        error?.response?.data?.message ||
        error?.message ||
        "Не удалось добавить пациента.";

      toaster.create({
        description: String(detail),
        type: "error",
        closable: true,
      });
    }
  };

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(details) => setIsOpen(details.open)}
    >
      <Dialog.Trigger asChild>
        <Button colorPalette="teal" onClick={() => setIsOpen(true)}>
          Добавить
          <Icon as={GoPlus} ml={2} />
        </Button>
      </Dialog.Trigger>

      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content maxW="650px" p={6}>
          <Dialog.Header fontWeight="bold">Добавление пациента</Dialog.Header>

          <Dialog.CloseTrigger asChild>
            <Icon as={RxCross1} boxSize={4} cursor="pointer" />
          </Dialog.CloseTrigger>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Dialog.Body>
              <VStack align="stretch" gap={4}>
                <ValidatedInput
                  label="ФИО"
                  placeholder="Введите ФИО"
                  register={register("full_name", {
                    required: "Обязательное поле",
                  })}
                  error={errors.full_name}
                />

                <ValidatedInput
                  label="Дата рождения"
                  type="date"
                  register={register("birth_date", {
                    required: "Обязательное поле",
                  })}
                  error={errors.birth_date}
                />

                <VStack align="stretch">
                  <Text fontWeight="medium">Пол</Text>
                  <CustomSelect
                    placeholder="Выберите пол"
                    items={genderOptions}
                    onChange={(value: string) =>
                      setValue("gender", value, { shouldValidate: true })
                    }
                  />
                  {errors.gender && (
                    <Text color="red.500" fontSize="sm">
                      {errors.gender.message}
                    </Text>
                  )}
                </VStack>

                <ValidatedInput
                  label="Телефон"
                  placeholder="+998901234567"
                  register={register("phone", {
                    required: "Обязательное поле",
                  })}
                  error={errors.phone}
                />

                <ValidatedInput
                  label="Паспорт"
                  placeholder="AB1234567"
                  register={register("passport", {
                    required: "Обязательное поле",
                  })}
                  error={errors.passport}
                />

                <ValidatedInput
                  label="Адрес"
                  placeholder="Ташкент, ул. Навои 25"
                  register={register("address", {
                    required: "Обязательное поле",
                  })}
                  error={errors.address}
                />

                <ValidatedInput
                  label="Email"
                  type="email"
                  placeholder="example@example.uz"
                  register={register("email", {
                    required: "Обязательное поле",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Некорректный email",
                    },
                  })}
                  error={errors.email}
                />
              </VStack>
            </Dialog.Body>

            <Dialog.Footer>
              <Button
                w="100%"
                colorPalette="teal"
                type="submit"
                disabled={isSubmitting}
              >
                Сохранить
              </Button>
            </Dialog.Footer>
          </form>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
