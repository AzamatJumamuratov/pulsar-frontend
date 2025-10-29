import { Box, Input } from "@chakra-ui/react";
import { useFormContext, type FieldError } from "react-hook-form";

interface ValidatedDateTimeInputProps {
  name: string;
  required?: string;
  type?: "datetime-local" | "date";
  defaultYear?: number;
}

export const ValidatedDateTimeInput: React.FC<ValidatedDateTimeInputProps> = ({
  name,
  required = false,
  type = "datetime-local",
  defaultYear = 2025,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const fieldError = errors[name] as FieldError | undefined;

  const getRequiredMessage = () => {
    if (type === "date") {
      return required ? "Укажите дату рождения" : false;
    }
    return required ? "Укажите дату приёма" : false;
  };

  const getYearValidation = (value: string) => {
    if (!value) return true;
    const date = new Date(value);
    const year = date.getFullYear();

    // Для даты рождения проверяем, что год 4-значный и не в будущем
    if (type === "date") {
      const currentYear = new Date().getFullYear();
      if (year > currentYear) {
        return "Дата рождения не может быть в будущем";
      }
      if (year < 1900) {
        return "Год должен быть не менее 1900";
      }
    }

    // Проверяем, что год в диапазоне 1000-9999
    // Проверяем, что год ровно 4 цифры
    const yearStr = year.toString();
    return yearStr.length === 4 || "Год должен содержать ровно 4 цифры";
  };

  return (
    <>
      <Input
        type={type}
        defaultValue={type === "date" ? `${defaultYear}-01-01` : undefined}
        {...register(name, {
          required: getRequiredMessage(),
          validate: getYearValidation,
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

// Обратная совместимость
export const DateTimeInput = ValidatedDateTimeInput;
