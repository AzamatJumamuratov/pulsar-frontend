// src/widgets/AddPatientDialog/PatientDetailsForm.tsx
import { VStack, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { type UseFormReturn } from "react-hook-form";
import ValidatedInput from "@/features/auth/ui/ValidatedInput";
import CustomSelect from "@/shared/ui/CustomSelect";
import ValidatedPhoneInput from "@/shared/ui/ValidatedPhoneInput";
import { ValidatedDateTimeInput } from "@/shared/ui/DateTimeInput";
import {
  type GenderType,
  type PatientCreateAndEditRequest,
} from "@/entities/patient/model/types";

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

// Утилита для получения ошибки поля
const getFieldError = (errors: any, field: keyof PatientCreateAndEditRequest) =>
  errors[field];

export function PatientDetailsForm({ form }: PatientDetailsFormProps) {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = form;

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
          error={getFieldError(errors, "full_name")}
        />

        <ValidatedDateTimeInput
          name="birth_date"
          type="date"
          required="Обязательное поле"
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
          {getFieldError(errors, "gender") && (
            <Text color="red.500" fontSize="sm">
              {getFieldError(errors, "gender")?.message}
            </Text>
          )}
        </VStack>
        <VStack align="stretch">
          <Text fontWeight="medium">Номер Телефона</Text>
          <ValidatedPhoneInput name="phone" required="Обязательное поле" />
        </VStack>

        <ValidatedInput
          label="Паспорт"
          placeholder="AB1234567"
          register={register("passport", {
            required: "Обязательное поле",
          })}
          error={getFieldError(errors, "passport")}
        />

        <ValidatedInput
          label="Адрес"
          placeholder="Ташкент, ул. Навои 25"
          register={register("address", {
            required: "Обязательное поле",
          })}
          error={getFieldError(errors, "address")}
        />
      </VStack>
    </motion.div>
  );
}
