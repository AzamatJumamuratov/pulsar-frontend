// src/widgets/AddPatientDialog/PatientDetailsForm.tsx
import { VStack, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { type UseFormReturn, type FieldError } from "react-hook-form";
import ValidatedInput from "@/features/auth/ui/ValidatedInput";
import CustomSelect from "@/shared/ui/CustomSelect";
import {
  type GenderType,
  type PatientCreateAndEditRequest,
} from "@/entities/patient/model/types";

// Типы пропсов для этого компонента
interface PatientDetailsFormProps {
  form: UseFormReturn<PatientCreateAndEditRequest>;
  isSubmitting: boolean;
}

const genderOptions = [
  { label: "Мужской", value: "male" },
  { label: "Женский", value: "female" },
];

const variants = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
  transition: { duration: 0.24 },
};

export function PatientDetailsForm({ form }: PatientDetailsFormProps) {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const getFieldError = (
    field: keyof PatientCreateAndEditRequest
  ): FieldError | undefined =>
    (errors as Record<string, FieldError | undefined>)[field];

  return (
    <motion.div
      key="step1"
      initial={variants.initial}
      animate={variants.animate}
      exit={variants.exit}
      transition={variants.transition}
    >
      <VStack align="stretch" gap={4}>
        <ValidatedInput
          label="ФИО"
          placeholder="Введите ФИО"
          register={register("full_name", {
            required: "Обязательное поле",
          })}
          error={getFieldError("full_name")}
        />

        <ValidatedInput
          label="Дата рождения"
          type="date"
          register={register("birth_date", {
            required: "Обязательное поле",
          })}
          error={getFieldError("birth_date")}
        />

        <VStack align="stretch">
          <Text fontWeight="medium">Пол</Text>
          <CustomSelect
            placeholder="Выберите пол"
            items={genderOptions}
            value={watch("gender")}
            onChange={(value: string) =>
              setValue("gender", value as GenderType, {
                shouldValidate: true,
              })
            }
          />
          {getFieldError("gender") && (
            <Text color="red.500" fontSize="sm">
              {getFieldError("gender")?.message}
            </Text>
          )}
        </VStack>

        <ValidatedInput
          label="Телефон"
          placeholder="+998901234567"
          register={register("phone", {
            required: "Обязательное поле",
          })}
          error={getFieldError("phone")}
        />

        <ValidatedInput
          label="Паспорт"
          placeholder="AB1234567"
          register={register("passport", {
            required: "Обязательное поле",
          })}
          error={getFieldError("passport")}
        />

        <ValidatedInput
          label="Адрес"
          placeholder="Ташкент, ул. Навои 25"
          register={register("address", {
            required: "Обязательное поле",
          })}
          error={getFieldError("address")}
        />
      </VStack>
    </motion.div>
  );
}
