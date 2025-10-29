import { Box, Input } from "@chakra-ui/react";
import { useFormContext, type FieldError } from "react-hook-form";

interface DateTimeInputProps {
  name: string;
  required?: string;
}

export const DateTimeInput: React.FC<DateTimeInputProps> = ({
  name,
  required = false,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const fieldError = errors[name] as FieldError | undefined;

  return (
    <>
      <Input
        type="datetime-local"
        {...register(name, {
          required: required ? "Укажите дату приёма" : false,
          validate: (value) => {
            if (!value) return true;
            const year = new Date(value).getFullYear();
            return (
              (year >= 1000 && year <= 9999) || "Год должен быть 4-х значным"
            );
          },
        })}
      />

      {fieldError && (
        <Box color="red.500" fontSize="sm">
          {fieldError.message}
        </Box>
      )}
    </>
  );
};
