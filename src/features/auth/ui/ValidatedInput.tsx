// src/shared/ui/ValidatedInput.tsx
import { Field, Input } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface ValidatedInputProps {
  label: string;
  placeholder?: string;
  type?: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  mb?: string | number;
}

const ValidatedInput = ({
  label,
  placeholder,
  type = "text",
  register,
  error,
  mb = 4,
}: ValidatedInputProps) => {
  const fieldLabelColor = useColorModeValue("gray.700", "gray.300");

  return (
    <Field.Root invalid={!!error} mb={mb}>
      <Field.Label color={fieldLabelColor}>{label}</Field.Label>
      <Input type={type} placeholder={placeholder} {...register} />
      {error && <Field.ErrorText>{error.message}</Field.ErrorText>}
    </Field.Root>
  );
};

export default ValidatedInput;
