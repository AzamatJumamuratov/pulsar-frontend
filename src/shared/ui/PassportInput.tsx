import { Field, Input, HStack } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { useState, useEffect } from "react";
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
  const [series, setSeries] = useState("");
  const [number, setNumber] = useState("");

  useEffect(() => {
    const fullValue = series + number;
    // Simulate onChange for register
    register.onChange({ target: { name: register.name, value: fullValue } });
  }, [series, number, register]);

  const handleSeriesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
      .replace(/[^a-zA-Z]/g, "")
      .toUpperCase()
      .slice(0, 2);
    setSeries(value);
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "").slice(0, 7);
    setNumber(value);
  };

  return (
    <Field.Root invalid={!!error} mb={mb}>
      <Field.Label color={fieldLabelColor}>{label}</Field.Label>
      <HStack>
        <Input
          placeholder="AA"
          value={series}
          onChange={handleSeriesChange}
          maxLength={2}
          flex="1"
        />
        <Input
          placeholder="1234567"
          value={number}
          onChange={handleNumberChange}
          maxLength={7}
          flex="2"
        />
      </HStack>
      {error && <Field.ErrorText>{error.message}</Field.ErrorText>}
    </Field.Root>
  );
};

export default PassportInput;
