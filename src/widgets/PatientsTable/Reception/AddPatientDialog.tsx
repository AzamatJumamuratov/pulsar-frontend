// src/widgets/AddPatientDialog.tsx
"use client";

import { Dialog, Button, Icon, HStack, VStack, Text } from "@chakra-ui/react";
import { GoPlus } from "react-icons/go";
import { RxCross1 } from "react-icons/rx";
import { useForm } from "react-hook-form";
// import { toaster } from "@/components/ui/toaster";
// import api from "@/app/api";
import CustomSelect from "@/shared/ui/CustomSelect";
import ValidatedInput from "@/features/auth/ui/ValidatedInput";
import { useEffect } from "react";

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
  const {
    register,
    handleSubmit,
    setValue,
    // reset,
    formState: { isSubmitting, errors },
  } = useForm<PatientFormValues>();

  useEffect(() => {
    register("gender", { required: "Выберите пол" });
  }, [register]);

  const onSubmit = async (data: PatientFormValues) => {
    console.log(data);
    // try {
    //   await api.post("/patients", data);
    //   toaster.create({
    //     description: "Пациент успешно добавлен",
    //     type: "success",
    //     closable: true,
    //   });
    //   reset();
    // } catch (error: any) {
    //   toaster.create({
    //     description:
    //       error?.response?.data?.message || "Ошибка при добавлении пациента",
    //     type: "error",
    //     closable: true,
    //   });
    // }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button colorPalette="teal">
          Добавить
          <Icon as={GoPlus} ml={2} />
        </Button>
      </Dialog.Trigger>

      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content maxW="650px" p={6}>
          <Dialog.Header fontWeight="bold">Добавление пациента</Dialog.Header>

          <Dialog.CloseTrigger>
            <Icon as={RxCross1} boxSize={4} />
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

                <HStack align="center" alignItems="start">
                  <VStack align="stretch" flex="1">
                    <Text w="150px" fontWeight="medium">
                      Пол
                    </Text>
                    <CustomSelect
                      placeholder="Выберите пол"
                      items={genderOptions}
                      onChange={(value) =>
                        setValue("gender", value, { shouldValidate: true })
                      }
                    />
                    {errors.gender && (
                      <Text color="red.500" fontSize="sm">
                        {errors.gender.message}
                      </Text>
                    )}
                  </VStack>
                </HStack>

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
