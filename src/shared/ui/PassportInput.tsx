import { Field, Input } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { useState } from "react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface PassportInputProps {
  label: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  mb?: string | number;
}

const PassportInput = ({
  label,
  register,
  error,
  mb = 4,
}: PassportInputProps) => {
  const fieldLabelColor = useColorModeValue("gray.700", "gray.300");
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();

    // Process input: first 2 chars as letters, next 7 as digits
    let series = "";
    let number = "";

    for (let char of input) {
      if (/[A-Z]/.test(char) && series.length < 2) {
        series += char;
      } else if (/[0-9]/.test(char) && number.length < 7) {
        number += char;
      }
    }

    const fullValue = series + number;
    setValue(fullValue);
    register.onChange({ target: { name: register.name, value: fullValue } });
  };

  const { onChange, ...rest } = register;

  return (
    <Field.Root invalid={!!error} mb={mb}>
      <Field.Label color={fieldLabelColor}>{label}</Field.Label>
      <Input
        placeholder="AA1234567"
        value={value}
        onChange={handleChange}
        maxLength={9}
        {...rest}
      />
      {error && <Field.ErrorText>{error.message}</Field.ErrorText>}
    </Field.Root>
  );
};

export default PassportInput;
